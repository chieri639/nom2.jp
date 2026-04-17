'use server';

import { getSakes } from '@/lib/microcms';
import { SakeData } from '@/lib/sake-logic';

/**
 * microCMSから全ての日本酒データを取得し、診断アプリ用の型に整える
 * キャッシュを無効化し、常に最新のデータを取得します。
 */
export async function fetchAllSakesAction(): Promise<SakeData[]> {
  try {
    const allSakes: SakeData[] = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      // microCMS APIの上限は100件のため、ループで全件取得
      const response = await getSakes({ limit, offset }, { next: { revalidate: 0 } });
      
      const items = response.contents.map(item => ({
        id: item.id,
        name: item.name,
        brewery: item.brewery,
        brand: item.brand,
        price: item.price,
        description: item.description,
        imageUrl: item.imageUrl,
        purchaseUrl: item.purchaseUrl,
        prefecture: item.prefecture,
        oldId: item.oldId, 
      }));
      
      allSakes.push(...items);

      if (offset + limit >= response.totalCount || items.length === 0) {
        break;
      }
      
      offset += limit;
    }
    
    return allSakes;
  } catch (error) {
    console.error('Failed to fetch sakes from microCMS:', error);
    return [];
  }
}
