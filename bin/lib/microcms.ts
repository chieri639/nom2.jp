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
  price: number;
  description: string;
  imageUrl: string;
  oldId: string;
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
  oldId: string;
};

export type BRAND = BREWERY;
export type SHOP = BREWERY;

// Generic fetch helpers
async function fetchList<T>(endpoint: string, queries?: any): Promise<{ contents: T[], totalCount: number, offset: number, limit: number }> {
  const params = new URLSearchParams();
  if (queries) {
    Object.entries(queries).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    });
  }
  const url = `${BASE_URL}/${endpoint}?${params.toString()}`;
  const res = await fetch(url, {
    headers: { 'X-MICROCMS-API-KEY': API_KEY! },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`microCMS API error: ${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

async function fetchDetail<T>(endpoint: string, contentId: string, queries?: any): Promise<T> {
  const params = new URLSearchParams();
  if (queries) {
    Object.entries(queries).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    });
  }
  const url = `${BASE_URL}/${endpoint}/${contentId}?${params.toString()}`;
  const res = await fetch(url, {
    headers: { 'X-MICROCMS-API-KEY': API_KEY! },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`microCMS API error: ${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

// Fetch functions
export const getSakes = (queries?: any) => fetchList<SAKE>('sake', queries);
export const getSakeDetail = (contentId: string, queries?: any) => fetchDetail<SAKE>('sake', contentId, queries);

export const getArticles = (queries?: any) => fetchList<ARTICLE>('article', queries);
export const getArticleDetail = (contentId: string, queries?: any) => fetchDetail<ARTICLE>('article', contentId, queries);

export const getBreweries = (queries?: any) => fetchList<BREWERY>('brewery', queries);
export const getBreweryDetail = (contentId: string, queries?: any) => fetchDetail<BREWERY>('brewery', contentId, queries);

export const getBrands = (queries?: any) => fetchList<BRAND>('brand', queries);
export const getBrandDetail = (contentId: string, queries?: any) => fetchDetail<BRAND>('brand', contentId, queries);

export const getShops = (queries?: any) => fetchList<SHOP>('shop', queries);
export const getShopDetail = (contentId: string, queries?: any) => fetchDetail<SHOP>('shop', contentId, queries);
