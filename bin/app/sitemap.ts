import { MetadataRoute } from 'next';

const SERVICE_ID = process.env.X_MICROCMS_SERVICE_ID || process.env.MICROCMS_SERVICE_DOMAIN || 'nom2';
const API_KEY = process.env.X_MICROCMS_API_KEY || process.env.MICROCMS_API_KEY || '';
const BASE_URL = `https://${SERVICE_ID}.microcms.io/api/v1`;

export const revalidate = 86400; // 24時間に1回キャッシュを更新

async function fetchAllIds(endpoint: string): Promise<{ id: string; updatedAt: string }[]> {
  const limit = 100;
  
  try {
    // 最初に総件数を取得
    const initialRes = await fetch(`${BASE_URL}/${endpoint}?limit=1&fields=id`, {
      headers: { 'X-MICROCMS-API-KEY': API_KEY },
      next: { revalidate: 86400 } // Fetch自体のキャッシュ
    });
    
    if (!initialRes.ok) return [];
    
    const initialData = await initialRes.json();
    const totalCount = initialData.totalCount || 0;

    const promises = [];
    for (let offset = 0; offset < totalCount; offset += limit) {
      promises.push(
        fetch(`${BASE_URL}/${endpoint}?limit=${limit}&offset=${offset}&fields=id,updatedAt`, {
          headers: { 'X-MICROCMS-API-KEY': API_KEY },
          next: { revalidate: 86400 }
        }).then(res => res.json())
      );
    }

    const results = await Promise.all(promises);
    return results.flatMap(res => res.contents || []);
  } catch (error) {
    console.error(`Sitemap generation error for ${endpoint}:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://nom2.jp';

  const [articles, breweries, brands, sakes] = await Promise.all([
    fetchAllIds('article'),
    fetchAllIds('brewery'),
    fetchAllIds('brand'),
    fetchAllIds('sake'),
  ]);

  const sitemapUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/article`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/brand`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/similar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  articles.forEach((item) => {
    sitemapUrls.push({
      url: `${siteUrl}/article/${item.id}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  breweries.forEach((item) => {
    sitemapUrls.push({
      url: `${siteUrl}/brewery/${item.id}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  brands.forEach((item) => {
    sitemapUrls.push({
      url: `${siteUrl}/brand/${item.id}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  sakes.forEach((item) => {
    sitemapUrls.push({
      url: `${siteUrl}/nihonshu/${item.id}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  return sitemapUrls;
}
