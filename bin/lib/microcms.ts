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
  
  try {
    const res = await fetch(url, {
      ...options,
      headers: { 
        'X-MICROCMS-API-KEY': apiKey,
        'User-Agent': 'node-fetch',
        ...(options.headers || {})
      },
      // デフォルトではキャッシュを有効にし、必要に応じて上書き可能にする
      cache: options.cache || (options.next ? undefined : 'no-store'),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'No error body');
      throw new Error(`microCMS API error: ${res.status} ${res.statusText}. Response: ${errorText}`);
    }
    return res.json();
  } catch (err) {
    console.error(`Fetch failed for ${url}:`, err);
    throw err;
  }
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
  
  try {
    const res = await fetch(url, {
      ...options,
      headers: { 
        'X-MICROCMS-API-KEY': apiKey,
        'User-Agent': 'node-fetch',
        ...(options.headers || {})
      },
      cache: options.cache || (options.next ? undefined : 'no-store'),
    });

    if (!res.ok) {
      throw new Error(`microCMS API error: ${res.status} ${res.statusText} for ${url}`);
    }
    return res.json();
  } catch (err) {
    console.error(`Fetch failed for ${url}:`, err);
    throw err;
  }
}

// Fetch functions
export const getSakes = (queries?: any, options?: RequestInit) => fetchList<SAKE>('sake', queries, options);
export const getSakeDetail = (contentId: string, queries?: any, options?: RequestInit) => fetchDetail<SAKE>('sake', contentId, queries, options);

export const getArticles = (queries?: any, options?: RequestInit) => fetchList<ARTICLE>('article', queries, options);
export const getArticleDetail = (contentId: string, queries?: any, options?: RequestInit) => fetchDetail<ARTICLE>('article', contentId, queries, options);

export const getBreweries = (queries?: any, options?: RequestInit) => fetchList<BREWERY>('brewery', queries, options);
export const getBreweryDetail = (contentId: string, queries?: any, options?: RequestInit) => fetchDetail<BREWERY>('brewery', contentId, queries, options);

export const getBrands = (queries?: any, options?: RequestInit) => fetchList<BRAND>('brand', queries, options);
export const getBrandDetail = (contentId: string, queries?: any, options?: RequestInit) => fetchDetail<BRAND>('brand', contentId, queries, options);

export const getShops = (queries?: any, options?: RequestInit) => fetchList<SHOP>('shop', queries, options);
export const getShopDetail = (contentId: string, queries?: any, options?: RequestInit) => fetchDetail<SHOP>('shop', contentId, queries, options);
