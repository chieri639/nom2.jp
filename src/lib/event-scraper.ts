/**
 * 日本酒イベント自動収集モジュール
 *
 * Peatix（検索）と PR TIMES（RSSフィード）から
 * 日本酒関連イベント情報を取得・統合するスクレイパー。
 */

// ========== 型定義 ==========

export type EventSource = 'peatix' | 'prtimes';

export type SakeEvent = {
  id: string;
  title: string;
  date: string;         // ISO 8601 or "YYYY-MM-DD" 形式
  dateLabel: string;     // 表示用の日付文字列 (例: "2026年7月5日(土)")
  location: string;
  imageUrl: string;
  eventUrl: string;      // 元サイトへのリンク
  source: EventSource;
  description: string;   // 短い概要
  organizer: string;     // 主催者 / 企業名
};

// ========== Peatix スクレイパー ==========

const PEATIX_SEARCH_KEYWORDS = ['日本酒', '酒蔵', '蔵開き', '地酒', '純米酒', 'SAKE'];

/**
 * Peatix の検索ページ HTML をパースしてイベント情報を抽出する
 */
async function scrapePeatixKeyword(keyword: string): Promise<SakeEvent[]> {
  const events: SakeEvent[] = [];

  try {
    const url = `https://peatix.com/search?q=${encodeURIComponent(keyword)}&country=JP&p=1&s=date`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; nom2-bot/1.0; +https://nom2.jp)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'ja,en;q=0.5',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.warn(`Peatix search failed for "${keyword}": ${res.status}`);
      return [];
    }

    const html = await res.text();

    // Peatix の検索結果から JSON-LD (Event schema) を抽出
    const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    if (jsonLdMatches) {
      for (const match of jsonLdMatches) {
        try {
          const jsonStr = match.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
          const data = JSON.parse(jsonStr);
          if (data['@type'] === 'Event' || (Array.isArray(data) && data[0]?.['@type'] === 'Event')) {
            const items = Array.isArray(data) ? data : [data];
            for (const item of items) {
              events.push(jsonLdToSakeEvent(item, 'peatix'));
            }
          }
        } catch {
          // JSON parse error — skip
        }
      }
    }

    // JSON-LD が無い場合は HTML からリンクとタイトルを抽出
    if (events.length === 0) {
      // パターン: <a href="/event/XXXXXX" ...>タイトル</a>
      const linkPattern = /<a[^>]*href="(\/event\/\d+[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
      let linkMatch;
      const seen = new Set<string>();
      while ((linkMatch = linkPattern.exec(html)) !== null) {
        const path = linkMatch[1];
        const text = linkMatch[2].replace(/<[^>]+>/g, '').trim();
        if (!text || text.length < 5 || seen.has(path)) continue;
        seen.add(path);

        // 日本酒関連のタイトルかチェック
        const isRelevant = PEATIX_SEARCH_KEYWORDS.some(kw =>
          text.includes(kw) || text.toLowerCase().includes(kw.toLowerCase())
        );
        if (!isRelevant && keyword === '日本酒') continue; // メインキーワードなら全件OK

        events.push({
          id: `peatix-${path.replace(/\D/g, '')}`,
          title: text,
          date: '',
          dateLabel: '',
          location: '',
          imageUrl: '',
          eventUrl: `https://peatix.com${path}`,
          source: 'peatix',
          description: '',
          organizer: '',
        });
      }
    }

    // 取得間隔を守る (5秒)
    await new Promise(resolve => setTimeout(resolve, 2000));

  } catch (err) {
    console.error(`Peatix scrape error for "${keyword}":`, err);
  }

  return events;
}

/**
 * JSON-LD (Schema.org Event) を SakeEvent に変換
 */
function jsonLdToSakeEvent(data: any, source: EventSource): SakeEvent {
  const startDate = data.startDate || '';
  return {
    id: `${source}-${(data.url || '').replace(/\D/g, '').slice(0, 12) || Date.now()}`,
    title: data.name || '',
    date: startDate,
    dateLabel: startDate ? formatDateLabel(startDate) : '',
    location: typeof data.location === 'string'
      ? data.location
      : data.location?.name || data.location?.address?.addressLocality || '',
    imageUrl: typeof data.image === 'string' ? data.image : (data.image?.[0] || ''),
    eventUrl: data.url || '',
    source,
    description: (data.description || '').slice(0, 200),
    organizer: data.organizer?.name || '',
  };
}

/**
 * Peatix から日本酒イベントを取得（全キーワード統合）
 */
export async function scrapePeatix(): Promise<SakeEvent[]> {
  // メインキーワードだけで取得（負荷を抑える）
  const events = await scrapePeatixKeyword('日本酒');
  return deduplicateEvents(events);
}

// ========== PR TIMES RSS スクレイパー ==========

const PRTIMES_KEYWORDS = ['日本酒', '酒蔵', '蔵開き', '地酒', 'SAKE', '純米', '酒フェス', '酒イベント', '利き酒', '角打ち'];

/**
 * PR TIMES の RSS フィードから日本酒関連プレスリリースを取得
 */
export async function scrapePRTimes(): Promise<SakeEvent[]> {
  const events: SakeEvent[] = [];

  try {
    const res = await fetch('https://prtimes.jp/index.rdf', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; nom2-bot/1.0; +https://nom2.jp)',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.warn(`PR TIMES RSS fetch failed: ${res.status}`);
      return [];
    }

    const xml = await res.text();

    // RSS の <item> を抽出
    const itemPattern = /<item>([\s\S]*?)<\/item>/gi;
    let itemMatch;

    while ((itemMatch = itemPattern.exec(xml)) !== null) {
      const item = itemMatch[1];

      const title = extractTag(item, 'title');
      const link = extractTag(item, 'link');
      const description = extractTag(item, 'description');
      const pubDate = extractTag(item, 'dc:date') || extractTag(item, 'pubDate');
      const creator = extractTag(item, 'dc:creator');

      // 日本酒関連かフィルター
      const combined = `${title} ${description}`.toLowerCase();
      const isRelevant = PRTIMES_KEYWORDS.some(kw => combined.includes(kw.toLowerCase()));
      if (!isRelevant) continue;

      // イベント/フェア関連のキーワードがあればより高優先度
      const eventKeywords = ['イベント', 'フェア', 'フェス', '開催', '試飲', '蔵開き', '限定', 'POP UP', '角打ち'];
      const isEventRelated = eventKeywords.some(kw => combined.includes(kw.toLowerCase()));

      events.push({
        id: `prtimes-${link?.replace(/\D/g, '').slice(0, 12) || Date.now()}`,
        title: title || '',
        date: pubDate || '',
        dateLabel: pubDate ? formatDateLabel(pubDate) : '',
        location: '',
        imageUrl: extractImageFromDescription(description || ''),
        eventUrl: link || '',
        source: 'prtimes',
        description: stripHtml(description || '').slice(0, 200),
        organizer: creator || '',
      });

      // 最大20件まで
      if (events.length >= 20) break;
    }
  } catch (err) {
    console.error('PR TIMES RSS scrape error:', err);
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
 * 日付文字列を「2026年7月5日(土)」形式に変換
 */
function formatDateLabel(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${days[d.getDay()]})`;
  } catch {
    return dateStr;
  }
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
  const [peatixEvents, prtimesEvents] = await Promise.allSettled([
    scrapePeatix(),
    scrapePRTimes(),
  ]);

  const all: SakeEvent[] = [
    ...(peatixEvents.status === 'fulfilled' ? peatixEvents.value : []),
    ...(prtimesEvents.status === 'fulfilled' ? prtimesEvents.value : []),
  ];

  // 日付順にソート（新しいものが先）
  all.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return deduplicateEvents(all);
}
