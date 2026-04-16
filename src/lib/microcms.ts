// microCMS API client - Direct fetch implementation
// SDKを使わず直接fetchでAPIを呼ぶ（Vercel環境でのSSL/SDK互換性の問題を回避）

const SERVICE_ID = process.env.X_MICROCMS_SERVICE_ID;
const API_KEY = process.env.X_MICROCMS_API_KEY;

if (!SERVICE_ID) {
  throw new Error('X_MICROCMS_SERVICE_ID is required');
}
if (!API_KEY) {
  throw new Error('X_MICROCMS_API_KEY is required');
}

const BASE_URL = `https://${SERVICE_ID}.microcms.io/api/v1`;

// Type definitions
export type SAKE = {
  id: string;
  name: string;
  brewery: string;
  brand?: string;
  price: number;
  description: string;
  imageUrl: string;
  oldId: string;
  purchaseUrl?: string;
};

export type ARTICLE = {
  id: string;
  title: string;
  category: string;
  content: string;
  imageUrl: string;
  oldId: string;
};

export type BREWERY = {
  id: string;
  name: string;
  content: string;
  imageUrl: string;
  prefecture?: string;
  address?: string;
  phone?: string;
  website?: string;
  oldId: string;
};

export type BRAND = BREWERY;
export type SHOP = BREWERY;

// Common private fetcher with retry and timeout
async function robustFetch(url: string, options: RequestInit = {}, retries = 1): Promise<any> {
  const timeout = 10000; // 10秒タイムアウト
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Connection': 'close', // 不安定な接続の再利用を避けるため「使い捨て」設定に変更
        ...(options.headers || {})
      }
    });

    clearTimeout(id);

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'No error body');
      throw new Error(`microCMS API error: ${res.status} ${res.statusText}. Response: ${errorText}`);
    }
    return res.json();
  } catch (err: any) {
    clearTimeout(id);
    
    // エラー詳細をより詳しくログ出力
    const errorDetail = {
      message: err.message,
      name: err.name,
      code: err.code,
      cause: err.cause, // Node.jsのfetchエラーの根本原因が含まれる場合がある
    };
    
    // 接続断（Connection closed）の場合は1回だけリトライ
    if (retries > 0 && (err.message?.includes('closed') || err.name === 'AbortError' || err.code === 'ECONNRESET')) {
      console.warn(`Retrying fetch for ${url} due to connection issue:`, errorDetail);
      return robustFetch(url, options, retries - 1);
    }
    
    console.error(`Fetch failed for ${url}:`, errorDetail);
    throw err;
  }
}

// Generic fetch helpers
async function fetchList<T>(endpoint: string, queries?: any, options: RequestInit = {}): Promise<{ contents: T[], totalCount: number, offset: number, limit: number }> {
  const serviceId = process.env.X_MICROCMS_SERVICE_ID || 'nom2';
  const apiKey = process.env.X_MICROCMS_API_KEY || '9jTt1rBZrk5OfQ9QL2MdwxjgAGDOq1qUAvMA';
  
  const baseUrl = `https://${serviceId}.microcms.io/api/v1`;
  const params = new URLSearchParams();
  if (queries) {
    Object.entries(queries).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    });
  }
  
  const url = `${baseUrl}/${endpoint}${params.toString() ? '?' + params.toString() : ''}`;
  
  return robustFetch(url, {
    ...options,
    headers: { 
      'X-MICROCMS-API-KEY': apiKey,
      'User-Agent': 'node-fetch',
      ...(options.headers || {})
    },
    cache: options.cache,
  });
}

async function fetchDetail<T>(endpoint: string, contentId: string, queries?: any, options: RequestInit = {}): Promise<T> {
  const serviceId = process.env.X_MICROCMS_SERVICE_ID || 'nom2';
  const apiKey = process.env.X_MICROCMS_API_KEY || '9jTt1rBZrk5OfQ9QL2MdwxjgAGDOq1qUAvMA';
  
  const baseUrl = `https://${serviceId}.microcms.io/api/v1`;
  const params = new URLSearchParams();
  if (queries) {
    Object.entries(queries).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    });
  }
  const url = `${baseUrl}/${endpoint}/${contentId}${params.toString() ? '?' + params.toString() : ''}`;
  
  return robustFetch(url, {
    ...options,
    headers: { 
      'X-MICROCMS-API-KEY': apiKey,
      'User-Agent': 'node-fetch',
      ...(options.headers || {})
    },
    cache: options.cache,
  });
}

// Fetch functions
export const getSakes = (queries?: any, options?: RequestInit) => fetchList<SAKE>('sake', queries, options);
export const getSakeDetail = (contentId: string, queries?: any, options?: RequestInit) => fetchDetail<SAKE>('sake', contentId, queries, options);

export const getArticles = (queries?: any, options?: RequestInit) => fetchList<ARTICLE>('article', queries, options);
export const getArticleDetail = (contentId: string, queries?: any, options?: RequestInit) => fetchDetail<ARTICLE>('article', contentId, queries, options);

export const getBreweries = (queries?: any, options?: RequestInit) => fetchList<BREWERY>('brewery', queries, options);
export const getBreweryDetail = (contentId: string, queries?: any, options?: RequestInit) => fetchDetail<BREWERY>('brewery', contentId, queries, options);

/**
 * slug (oldId) を指定して酒蔵を1件取得する
 */
export async function getBreweryByOldId(oldId: string): Promise<BREWERY | null> {
  try {
    const res = await getBreweries({
      filters: `oldId[equals]${oldId}`,
      limit: 1
    });
    return res.contents[0] || null;
  } catch (err) {
    console.error(`Failed to fetch brewery by oldId: ${oldId}`, err);
    return null;
  }
}

export const getBrands = (queries?: any, options?: RequestInit) => fetchList<BRAND>('brand', queries, options);
export const getBrandDetail = (contentId: string, queries?: any, options?: RequestInit) => fetchDetail<BRAND>('brand', contentId, queries, options);

export const getShops = (queries?: any, options?: RequestInit) => fetchList<SHOP>('shop', queries, options);
export const getShopDetail = (contentId: string, queries?: any, options?: RequestInit) => fetchDetail<SHOP>('shop', contentId, queries, options);

/**
 * 酒蔵・銘柄・ショップのHTMLコンテンツをサーバーサイドでクリーンアップする
 */
export function cleanBreweryData(html: string, entity: BREWERY) {
  if (!html) return { description: '', address: entity.address, phone: entity.phone, website: entity.website };

  let text = html
    .replace(/<br\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<figcaption>.*?<\/figcaption>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const noises = ['keyboard_arrow_leftpausekeyboard_arrow_right', '代表的な銘柄', '代表銘柄', '商品一覧', '酒蔵について', '銘柄について'];
  noises.forEach(n => { text = text.replace(new RegExp(n, 'gi'), ''); });

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const cleanedLines = [];
  
  let address = entity.address || '';
  let phone = entity.phone || '';
  let website = entity.website || '';

  for (const line of lines) {
    if (/(¥|円|\(税込\)|720ml|1800ml)/.test(line)) continue;
    if (/https?:\/\/[^\s]+/.test(line) && !website) website = line.match(/(https?:\/\/[^\s]+)/)?.[1] || '';
    if (/(\d{2,4}-\d{2,4}-\d{3,4})/.test(line) && !phone) phone = line.match(/(\d{2,4}-\d{2,4}-\d{3,4})/)?.[1] || '';
    cleanedLines.push(line);
  }

  return {
    description: cleanedLines.join('\n\n').trim(),
    address: address || '-',
    phone: phone || '-',
    website: website || ''
  };
}
