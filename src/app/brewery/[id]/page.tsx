import React from 'react';
import { notFound } from 'next/navigation';
import { getBreweryDetail, getSakes, getBrands } from '@/lib/microcms';
import BreweryDetailClient from './BreweryDetailClient';

// キャッシュ有効化：1時間（3600秒）
export const revalidate = 3600;

export default async function BreweryDetailPage(props: any) {
  const params = await props.params;
  
  try {
    // 1. まず酒蔵の基本情報を取得
    const brewery = await getBreweryDetail(params.id);

    if (!brewery) {
      notFound();
    }

    // 2. 検索名のクリーンアップ
    const searchName = brewery.name.replace(/(株式会社|有限会社|合名会社|合資会社)/g, '').trim();
    
    // 3. 関連ブランドと日本酒を【並列】で取得
    // 個別のリクエストに cache: 'force-cache' や next: { revalidate } を指定可能
    const [brandsRes, sakesRes] = await Promise.all([
      getBrands({
        filters: `brewery[contains]${searchName}`,
        limit: 10
      }),
      getSakes({
        filters: `brewery[contains]${searchName}`,
        limit: 20
      })
    ]);

    const brands = brandsRes.contents || [];
    const cmsSakes = sakesRes.contents || [];

    // BreweryDetailClient にデータを渡す
    return <BreweryDetailClient brewery={brewery} initialCmsSakes={cmsSakes} brands={brands} />;
  } catch (error) {
    console.error('酒蔵詳細取得エラー:', error);
    notFound();
  }
}
