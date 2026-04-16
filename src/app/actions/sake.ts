'use server';

import { getSakes } from '@/lib/microcms';
import { SakeData } from '@/lib/sake-logic';

/**
 * microCMSから全ての日本酒データを取得し、診断アプリ用の型に整える
 * キャッシュを無効化し、常に最新のデータを取得します。
 */
export async function fetchAllSakesAction(): Promise<SakeData[]> {
  try {
    // 320件程度であれば一度に取得可能
    const response = await getSakes({ limit: 500 }, { next: { revalidate: 0 } });
    
    return response.contents.map(item => ({
      id: item.id,
      name: item.name,
      brewery: item.brewery,
      brand: item.brand,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl,
      purchaseUrl: item.purchaseUrl,
      prefecture: item.prefecture,
      oldId: item.oldId, // スラッグとして利用
    }));
  } catch (error) {
    console.error('Failed to fetch sakes from microCMS:', error);
    return [];
  }
}
