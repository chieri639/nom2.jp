import { MetadataRoute } from 'next';
import { getArticles, getBreweries, getBrands, getShops, getSakes } from '@/lib/microcms';

// ヘルパー関数：全件のIDを再帰的に取得する
async function fetchAllIds(fetcher: any): Promise<any[]> {
  let allIds: any[] = [];
  let offset = 0;
  const limit = 100; // MicroCMSの最大取得件数
  
  while (true) {
    try {
      const res = await fetcher({ limit, offset, fields: 'id,updatedAt,publishedAt' });
      const ids = res.contents.map((c: any) => ({
        id: c.id,
        updatedAt: c.updatedAt || c.publishedAt || new Date().toISOString()
      }));
      allIds = [...allIds, ...ids];
      
      // 全件取得できた場合、または取得件数がlimit未満（最終ページ）の場合は終了
      if (allIds.length >= res.totalCount || res.contents.length < limit) {
        break;
      }
      offset += limit;
    } catch (e) {
      console.error('Failed to fetch for sitemap', e);
      break;
    }
  }
  return allIds;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nom2.jp';

  // 各コンテンツの全IDを並列で取得
  const [articles, breweries, brands, shops, sakes] = await Promise.all([
    fetchAllIds(getArticles),
    fetchAllIds(getBreweries),
    fetchAllIds(getBrands),
    fetchAllIds(getShops),
    fetchAllIds(getSakes),
  ]);

  // 固定ページ（トップページや一覧ページ）
  const routes = ['', '/article', '/brewery', '/brand', '/shop', '/nihonshu', '/sake-reco', '/ai-diagnose'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 動的ページ（個別記事・詳細ページ）
  const dynamicRoutes = [
    ...articles.map(item => ({ url: `${baseUrl}/article/${item.id}`, lastModified: item.updatedAt, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...breweries.map(item => ({ url: `${baseUrl}/brewery/${item.id}`, lastModified: item.updatedAt, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...brands.map(item => ({ url: `${baseUrl}/brand/${item.id}`, lastModified: item.updatedAt, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...shops.map(item => ({ url: `${baseUrl}/shop/${item.id}`, lastModified: item.updatedAt, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...sakes.map(item => ({ url: `${baseUrl}/nihonshu/${item.id}`, lastModified: item.updatedAt, changeFrequency: 'weekly' as const, priority: 0.7 })),
  ];

  return [...routes, ...dynamicRoutes];
}
