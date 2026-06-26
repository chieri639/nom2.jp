import { SakeEvent, EventSource } from './event-scraper';

const GOOGLE_API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_SEARCH_CX;

type SearchResultItem = {
  title: string;
  link: string;
  snippet: string;
  pagemap?: {
    metatags?: Array<Record<string, string>>;
    cse_image?: Array<{ src: string }>;
  };
};

/**
 * Google Custom Search APIを使って日本酒関連のイベント記事情報を検索取得
 */
export async function searchGoogleEvents(): Promise<SakeEvent[]> {
  if (!GOOGLE_API_KEY || !GOOGLE_CX) {
    console.warn('Google Search API credentials are not set. Skipping Google search.');
    return [];
  }

  // 複数のキーワードで検索を行い、重複を排除しながらイベントを収集
  const queryKeywords = [
    '日本酒 イベント 開催',
    '日本酒 蔵開き',
    '酒蔵まつり 試飲会'
  ];

  const eventsMap = new Map<string, SakeEvent>();

  for (const q of queryKeywords) {
    try {
      const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(q)}&num=10&hl=ja`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });

      if (!res.ok) {
        console.error(`Google Search API error for query "${q}": ${res.status}`);
        continue;
      }

      const data = await res.json();
      const items: SearchResultItem[] = data.items || [];

      for (const item of items) {
        const link = item.link;
        if (!link) continue;

        // ノイズサイトや大元の重複しやすいトップページは除外
        if (
          link.includes('twitter.com') ||
          link.includes('facebook.com') ||
          link.includes('instagram.com') ||
          /https?:\/\/[^/]+\/?$/.test(link) // トップドメインだけ
        ) {
          continue;
        }

        const title = item.title || '';
        const snippet = item.snippet || '';
        const metatags = item.pagemap?.metatags?.[0] || {};
        
        // 画像URLをpagemapから取得
        let imageUrl = item.pagemap?.cse_image?.[0]?.src || metatags['og:image'] || '';
        if (imageUrl.startsWith('//')) {
          imageUrl = 'https:' + imageUrl;
        }

        // タイトルやスニペットから「開催日」を抽出
        const parsedDate = parseEventDateFromText(`${title} ${snippet}`);

        // 主催者 / 配信元をメタタグやドメイン名から適宜推定
        const siteName = metatags['og:site_name'] || parseDomainName(link);

        // 重複チェックキー: URLのホストと日付、もしくはタイトル前方
        const dedupeKey = `${parseDomainName(link)}-${parsedDate.date}`;

        if (!eventsMap.has(dedupeKey)) {
          eventsMap.set(dedupeKey, {
            id: `google-${Buffer.from(link).toString('base64').slice(0, 16).replace(/[^a-zA-Z0-9]/g, '')}`,
            title: title.split(' - ')[0].split(' | ')[0].trim(),
            date: parsedDate.date,
            dateLabel: parsedDate.dateLabel,
            location: extractLocation(snippet) || '',
            imageUrl,
            eventUrl: link,
            source: 'google' as EventSource,
            description: snippet.slice(0, 120) + '...',
            organizer: siteName || '',
          });
        }
      }
    } catch (err) {
      console.error(`Google Search scrape error for query "${q}":`, err);
    }
  }

  return Array.from(eventsMap.values());
}

/**
 * テキストからイベント開催日を抽出する (Google検索用拡張)
 */
function parseEventDateFromText(text: string): { date: string; dateLabel: string } {
  const datePattern1 = /(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日/;
  const datePattern2 = /(\d{1,2})月\s*(\d{1,2})日/;
  const datePattern3 = /(\d{4})[-/](\d{1,2})[-/](\d{1,2})/;

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
      }
    }
  }

  if (hasMatch && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

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

  return {
    date: '',
    dateLabel: '開催日未定',
  };
}

/**
 * スニペットから場所らしきキーワードを抽出
 */
function extractLocation(text: string): string {
  // 都道府県リスト
  const prefectures = [
    '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
    '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
    '新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県',
    '静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県',
    '奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県',
    '徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県',
    '熊本県','大分県','宮崎県','鹿児島県','沖縄県'
  ];

  for (const pref of prefectures) {
    if (text.includes(pref)) {
      // 「東京都千代田区」などのパターンを簡易抽出
      const idx = text.indexOf(pref);
      const sub = text.substring(idx, idx + 12);
      const spaceIdx = sub.indexOf(' ');
      return spaceIdx !== -1 ? sub.substring(0, spaceIdx) : sub;
    }
  }
  return '';
}

/**
 * URLからドメイン名を抽出
 */
function parseDomainName(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    return url.hostname.replace('www.', '');
  } catch {
    return '';
  }
}
