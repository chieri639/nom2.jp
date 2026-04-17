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
  prefecture?: string; // 都道府県フィールドを追加
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
export type SHOP = BREWERY & {
  business_hours?: string;
  holiday?: string;
  facilities?: string;
  payment_method?: string;
  instagram?: string;
  facebook?: string;
};

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

/**
 * ショップ詳細向けに、紹介文(content)から営業情報を抽出・クリーンアップする
 */
export function cleanShopData(html: string, entity: SHOP) {
  const base = cleanBreweryData(html, entity);
// ...
  
  const text = base.description;
  const lines = text.split('\n\n');
  
  let business_hours = entity.business_hours || '';
  let holiday = entity.holiday || '';
  let payment_method = entity.payment_method || '';
  let facilities = entity.facilities || '';

  // 抽出ロジック
  for (const line of lines) {
    // 営業時間
    if (!business_hours && /(営業時間|OPEN|10:00|11:00|12:00)/i.test(line)) {
      business_hours = line.replace(/^(営業時間|OPEN)[:：\s]*/i, '').trim();
    }
    // 定休日
    if (!holiday && /(定休日|CLOSED|休み|水曜|日曜)/i.test(line)) {
      holiday = line.replace(/^(定休日|CLOSED)[:：\s]*/i, '').trim();
    }
    // 決済
    if (!payment_method && /(決済|支払い|カード|PayPay|電子マネー)/i.test(line)) {
      payment_method = line.replace(/^(決済方式|決済方法|支払い方法|決済)[:：\s]*/i, '').trim();
    }
    // 設備
    if (!facilities && /(設備|Wi-Fi|駐車場|席数)/i.test(line)) {
      facilities = line.replace(/^(設備|付帯設備)[:：\s]*/i, '').trim();
    }
  }

  return {
    ...base,
    business_hours: business_hours || '-',
    holiday: holiday || '-',
    payment_method: payment_method || '-',
    facilities: facilities || '-',
    instagram: entity.instagram,
    facebook: entity.facebook
  };
}
