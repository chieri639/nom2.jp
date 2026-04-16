import React from 'react';
import { notFound } from 'next/navigation';
import { getBreweryDetail, getBreweries, getSakes, getBrands, BREWERY, cleanBreweryData } from '@/lib/microcms';
import BreweryDetailClient from './BreweryDetailClient';

// キャッシュ有効化：1時間（3600秒）
export const revalidate = 3600;

export default async function BreweryDetailPage(props: any) {
  const params = await props.params;
  const idOrSlug = params.id;
  
  try {
    // 1. 酒蔵情報の取得
    let brewery: BREWERY | null = null;
    try {
      brewery = await getBreweryDetail(idOrSlug, { next: { revalidate: 3600 } });
    } catch {
      const slugRes = await getBreweries({ filters: `oldId[equals]${idOrSlug}`, limit: 1 });
      brewery = slugRes.contents[0] || null;
    }

    if (!brewery) notFound();

    // 2. 検索キーワードの生成
    // 「男山株式会社（男山）」→「男山」のように極限までシンプルにする
    const cleanedName = brewery.name
      .replace(/[（(].*?[）)]/g, '') // 括弧内を削除
      .replace(/(株式会社|有限会社|合名会社|合資会社|酒造|醸造|酒造場|（株）|\(株\))/g, '')
      .trim();
    
    // 3. サーバー側でデータを極限までクリーンアップ
    const cleanedData = cleanBreweryData(brewery.content || '', brewery);

    // 4. 関連データの取得（検索範囲を拡大）
    // brewery, brand, name のいずれかに cleanedName が含まれるものを検索
    const filters = `brewery[contains]${cleanedName}[or]brand[contains]${cleanedName}[or]name[contains]${cleanedName}`;
    
    const [brandsRes, sakesRes] = await Promise.all([
      getBrands({ filters, limit: 20 }),
      getSakes({ filters, limit: 100 })
    ]);

    const brands = brandsRes.contents || [];
    const cmsSakes = sakesRes.contents || [];

    return (
      <BreweryDetailClient 
        brewery={brewery} 
        initialCmsSakes={cmsSakes} 
        brands={brands} 
        serverCleanedData={cleanedData}
      />
    );
  } catch (error) {
    console.error('酒蔵詳細取得エラー:', error);
    throw error;
  }
}
