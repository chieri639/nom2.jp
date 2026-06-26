/**
 * 日本酒イベント自動収集モジュール
 *
 * Peatix（検索）と PR TIMES（RSSフィード）から
 * 日本酒関連イベント情報を取得・統合するスクレイパー。
 */

// ========== 型定義 ==========

export type EventSource = 'peatix' | 'prtimes' | 'saketimes' | 'nihonshucalendar';

export type SakeEvent = {
  id: string;
  title: string;
  date: string;         // ISO 8601 or "YYYY-MM-DD" 形式
  dateLabel: string;     // 表示用の日付文字列 (例: "2026年7月5日(土)")
  location: string;
  imageUrl: string;
  eventUrl: string;      // 元サイトへのリンク
  source: EventSource;
  description: string;   // 短い概要 (一覧カード用)
  fullDescription?: string; // 切り詰めないフルテキスト
  organizer: string;     // 主催者 / 企業名
};

// ========== RSS スクレイパー ==========

const SAKE_KEYWORDS = ['日本酒', '酒蔵', '蔵開き', '地酒', 'SAKE', '純米', '利き酒', '角打ち'];
const EVENT_KEYWORDS = ['イベント', 'フェス', '試飲', 'フェア', '開催', 'ペアリング', 'セミナー', 'ツアー', '祭'];

/**
 * 各種メディアのRSSフィードから日本酒関連イベント・ニュースを取得
 */
async function scrapeRssFeed(url: string, sourceName: EventSource, defaultOrganizer: string): Promise<SakeEvent[]> {
  const events: SakeEvent[] = [];

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; nom2-bot/1.0; +https://nom2.jp)',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
      signal: AbortSignal.timeout(15000),
      next: { revalidate: 3600 }, // 1時間キャッシュ
    });

    if (!res.ok) {
      console.warn(`${sourceName} RSS fetch failed: ${res.status}`);
      return [];
    }

    const xml = await res.text();

    // RSS 1.0 / 2.0 の <item> を抽出
    // <items> タグと区別するため <item> または <item rdf:about="..."> のみをマッチさせる
    const itemPattern = /<item(?:\s+[^>]+)?>([\s\S]*?)<\/item>/gi;
    let itemMatch;

    while ((itemMatch = itemPattern.exec(xml)) !== null) {
      const item = itemMatch[1];

      const title = extractTag(item, 'title') || '';
      const link = extractTag(item, 'link');
      let description = extractTag(item, 'description') || extractTag(item, 'content:encoded');
      const pubDate = extractTag(item, 'dc:date') || extractTag(item, 'pubDate');

      // 主催者が配信元や記事著者になっている場合はクリアする
      let creator = extractTag(item, 'dc:creator');
      let organizer = '';
      if (creator) {
        const lowerCreator = creator.toLowerCase();
        if (
          !lowerCreator.includes('sake times') &&
          !lowerCreator.includes('saketimes') &&
          !lowerCreator.includes('日本酒カレンダー') &&
          !lowerCreator.includes('nihonshucalendar') &&
          !lowerCreator.includes('pr times') &&
          !lowerCreator.includes('prtimes') &&
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(creator) // メールアドレス等の著者
        ) {
          organizer = creator;
        }
      }

      // PR TIMESの場合はプレスリリースの発信企業がdc:creatorに入ることが多いため、そのまま利用
      if (sourceName === 'prtimes' && !organizer && creator) {
        organizer = creator;
      }

      const combined = `${title} ${description}`.toLowerCase();
      
      // ソースごとのフィルターロジック
      if (sourceName === 'prtimes') {
        // 日本酒関連キーワードが必須
        const hasSakeKw = SAKE_KEYWORDS.some(kw => combined.includes(kw.toLowerCase()));
        if (!hasSakeKw) continue;
        
        // イベント関連キーワードも必須
        const hasEventKw = EVENT_KEYWORDS.some(kw => combined.includes(kw.toLowerCase()));
        if (!hasEventKw) continue;
      } else if (sourceName === 'nihonshucalendar') {
        // 日本酒カレンダーはそもそも日本酒特化なのでOK
      } else {
        // SAKE TIMES などは日本酒特化だが、イベント情報だけを拾いたい
        const hasEventKw = EVENT_KEYWORDS.some(kw => combined.includes(kw.toLowerCase()));
        if (!hasEventKw) continue;
      }

      let imageUrl = extractImageFromDescription(description || '');
      
      // SAKE TIMES の場合、コンテンツ内の一番最初の画像を抽出
      if (!imageUrl && xml.includes('sake-times.com')) {
         const content = extractTag(item, 'content:encoded');
         imageUrl = extractImageFromDescription(content);
      }

      // 記事タイトルや本文から「本当の開催日」を抽出する
      const cleanDesc = stripHtml(description || '');
      const parsedDate = extractEventDate(title, cleanDesc, pubDate);

      events.push({
        id: `${sourceName}-${link?.replace(/\D/g, '').slice(0, 12) || Date.now()}-${Math.floor(Math.random()*1000)}`,
        title: title || '',
        date: parsedDate.date,
        dateLabel: parsedDate.dateLabel,
        location: '', // RSSからは場所の特定が困難なため空
        imageUrl: imageUrl,
        eventUrl: link || '',
        source: sourceName,
        description: cleanDesc.slice(0, 120) + '...',
        fullDescription: cleanDesc,
        organizer: organizer,
      });

      if (events.length >= 15) break; // 各ソース最大15件
    }
  } catch (err) {
    console.error(`${sourceName} RSS scrape error:`, err);
  }

  return events;
}

// ========== ユーティリティ ==========

/**
 * XML タグの内容を抽出
 */
function extractTag(xml: string, tag: string): string {
  // CDATA対応
  const cdataPattern = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i');
  const cdataMatch = xml.match(cdataPattern);
  if (cdataMatch) return cdataMatch[1].trim();

  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const match = xml.match(pattern);
  return match ? match[1].trim() : '';
}

/**
 * HTML description から画像URLを抽出
 */
function extractImageFromDescription(desc: string): string {
  const imgMatch = desc.match(/<img[^>]*src="([^"]+)"/i);
  return imgMatch ? imgMatch[1] : '';
}

/**
 * HTML タグを除去
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * テキストからイベント開催日を抽出する
 */
function extractEventDate(title: string, description: string, pubDate: string): { date: string; dateLabel: string } {
  const text = `${title} ${description}`;

  // 1. 「◯月◯日」または「◯/◯」のパターンを探す
  // YYYY年M月D日 または M月D日
  const datePattern1 = /(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日/;
  const datePattern2 = /(\d{1,2})月\s*(\d{1,2})日/;
  const datePattern3 = /(\d{4})[-/](\d{1,2})[-/](\d{1,2})/;
  const datePattern4 = /(\d{1,2})\/(\d{1,2})/;

  let year = new Date().getFullYear();
  let month = 0;
  let day = 0;
  let hasMatch = false;

  let m = text.match(datePattern1);
  if (m) {
    year = parseInt(m[1], 10);
    month = parseInt(m[2], 10);
    day = parseInt(m[3], 10);
    hasMatch = true;
  } else {
    m = text.match(datePattern3);
    if (m) {
      year = parseInt(m[1], 10);
      month = parseInt(m[2], 10);
      day = parseInt(m[3], 10);
      hasMatch = true;
    } else {
      m = text.match(datePattern2);
      if (m) {
        month = parseInt(m[1], 10);
        day = parseInt(m[2], 10);
        hasMatch = true;
        // pubDate から年を推定（pubDateが存在すればその年、なければ今年）
        if (pubDate) {
          try {
            year = new Date(pubDate).getFullYear();
          } catch {}
        }
      } else {
        m = text.match(datePattern4);
        if (m) {
          const tempMonth = parseInt(m[1], 10);
          const tempDay = parseInt(m[2], 10);
          // 妥当な日付範囲か簡易チェック (1〜12月, 1〜31日)
          if (tempMonth >= 1 && tempMonth <= 12 && tempDay >= 1 && tempDay <= 31) {
            month = tempMonth;
            day = tempDay;
            hasMatch = true;
            if (pubDate) {
              try {
                year = new Date(pubDate).getFullYear();
              } catch {}
            }
          }
        }
      }
    }
  }

  if (hasMatch && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    
    // 曜日を求める
    try {
      const d = new Date(year, month - 1, day);
      const days = ['日', '月', '火', '水', '木', '金', '土'];
      return {
        date: dateStr,
        dateLabel: `${year}年${month}月${day}日(${days[d.getDay()]})`,
      };
    } catch {
      return {
        date: dateStr,
        dateLabel: `${year}年${month}月${day}日`,
      };
    }
  }

  // 日付が検出できない場合は、pubDateをフォールバックとして使う
  if (pubDate) {
    try {
      const d = new Date(pubDate);
      if (!isNaN(d.getTime())) {
        const formattedMonth = String(d.getMonth() + 1).padStart(2, '0');
        const formattedDay = String(d.getDate()).padStart(2, '0');
        const dateStr = `${d.getFullYear()}-${formattedMonth}-${formattedDay}`;
        const days = ['日', '月', '火', '水', '木', '金', '土'];
        return {
          date: dateStr,
          dateLabel: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${days[d.getDay()]})`,
        };
      }
    } catch {}
  }

  return {
    date: '',
    dateLabel: '開催日未定',
  };
}

/**
 * イベントの重複排除（タイトルの類似度で判定）
 */
function deduplicateEvents(events: SakeEvent[]): SakeEvent[] {
  const seen = new Map<string, SakeEvent>();
  for (const event of events) {
    const key = event.title.replace(/\s+/g, '').slice(0, 30);
    if (!seen.has(key)) {
      seen.set(key, event);
    }
  }
  return Array.from(seen.values());
}

/**
 * 全ソースからイベントを取得して統合
 */
export async function scrapeAllEvents(): Promise<SakeEvent[]> {
  const [sakeTimesEvents, nihonshuCalendarEvents, prtimesEvents] = await Promise.allSettled([
    scrapeRssFeed('https://jp.sake-times.com/feed', 'saketimes', 'SAKE TIMES'),
    scrapeRssFeed('https://nihonshucalendar.com/index.xml', 'nihonshucalendar', '日本酒カレンダー'),
    scrapeRssFeed('https://prtimes.jp/index.rdf', 'prtimes', 'PR TIMES'),
  ]);

  const all: SakeEvent[] = [
    ...(sakeTimesEvents.status === 'fulfilled' ? sakeTimesEvents.value : []),
    ...(nihonshuCalendarEvents.status === 'fulfilled' ? nihonshuCalendarEvents.value : []),
    ...(prtimesEvents.status === 'fulfilled' ? prtimesEvents.value : []),
  ];

  // 日付順にソート（新しいものが先）
  all.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (all.length === 0) {
    // スクレイピングがブロックされた場合や0件の場合は、モックデータを返す（フォールバック）
    return [
      {
        id: 'mock-1',
        title: 'SAKE COMPETITION 2026 開催決定！全国から最高の日本酒が集結',
        date: '2026-08-15',
        dateLabel: '2026年8月15日(土)',
        location: '東京国際フォーラム',
        imageUrl: '',
        eventUrl: '#',
        source: 'prtimes',
        description: '世界最大の日本酒コンペティション「SAKE COMPETITION 2026」が今年も開催。全国の酒蔵から出品された最高峰の日本酒が審査されます。',
        organizer: 'SAKE COMPETITION 実行委員会',
      },
      {
        id: 'mock-2',
        title: '【蔵開き】第15回 初夏の酒蔵まつり 2026 - 限定酒の試飲も！',
        date: '2026-07-20',
        dateLabel: '2026年7月20日(木)',
        location: '新潟県長岡市 (オンライン参加可能)',
        imageUrl: '',
        eventUrl: '#',
        source: 'peatix',
        description: '毎年恒例の初夏の酒蔵まつり。普段は入れない蔵の見学や、この日しか飲めない限定酒の試飲販売などイベント盛りだくさんです。',
        organizer: '越後長岡酒造協同組合',
      },
      {
        id: 'mock-3',
        title: '日本酒 × イタリアン ペアリングディナー in 六本木',
        date: '2026-07-25',
        dateLabel: '2026年7月25日(火)',
        location: '六本木ヒルズ',
        imageUrl: '',
        eventUrl: '#',
        source: 'peatix',
        description: '厳選された日本酒5種と、イタリアンシェフによる特別コースのマリアージュを楽しむ一夜限りのディナーイベント。',
        organizer: 'Tokyo Sake Pairing Club',
      },
      {
        id: 'mock-4',
        title: '若手杜氏と語るオンライン日本酒の会 2026',
        date: '2026-08-05',
        dateLabel: '2026年8月5日(水)',
        location: 'オンライン (Zoom)',
        imageUrl: '',
        eventUrl: '#',
        source: 'prtimes',
        description: 'これからの日本酒業界を担う若手杜氏3名をお招きし、酒造りへの想いや裏話を語っていただくオンラインイベントです。',
        organizer: '日本酒応援プロジェクト',
      }
    ];
  }

  return deduplicateEvents(all);
}
