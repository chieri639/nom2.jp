import React from 'react';
import { notFound } from 'next/navigation';
import { getBreweryDetail, getBreweries, getSakes, getBrands, BREWERY, SAKE, cleanBreweryData } from '@/lib/microcms';
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
      try {
        const slugRes = await getBreweries({ filters: `oldId[equals]${idOrSlug}`, limit: 1 });
        brewery = slugRes.contents[0] || null;
      } catch (e) {
        console.error('Brewery fetch error by slug:', e);
      }
    }

    if (!brewery) notFound();

    // 2. 検索キーワードの生成
    // 「男山株式会社（男山）」→「男山」のように極限までシンプルにする
    const originalName = brewery.name.trim();
    let cleanedName = brewery.name
      .replace(/[（(].*?[）)]/g, '') // 括弧内を削除
      .replace(/(株式会社|有限会社|合名会社|合資会社|酒造|醸造|酒造場|（株）|\(株\))/g, '')
      .trim();
    
    if (!cleanedName || cleanedName.length < 1) {
      cleanedName = originalName;
    }
    
    // 3. サーバー側でデータを極限までクリーンアップ
    const cleanedData = cleanBreweryData(brewery.content || '', brewery);

    // 4. 関連データの取得（IDベースの厳密な紐付けを優先）
    let brands: BREWERY[] = [];
    let cmsSakes: SAKE[] = [];
    
    try {
      // 酒蔵IDに紐づく銘柄を取得
      const brandsRes = await getBrands({ 
        filters: `brewery[equals]${brewery.id}`, 
        limit: 50 
      }).catch(() => ({ contents: [] }));
      brands = brandsRes.contents;

      // 酒蔵IDに紐づく日本酒を取得（IDベース、および名称ベースの両方でカバー）
      const idFilters = `brewery[equals]${brewery.id}`;
      const nameFilters = `brewery[contains]${cleanedName}[or]brand[contains]${cleanedName}[or]name[contains]${cleanedName}`;
      
      const [idSakes, nameSakes] = await Promise.all([
        getSakes({ filters: idFilters, limit: 100 }).catch(() => ({ contents: [] })),
        getSakes({ filters: nameFilters, limit: 100 }).catch(() => ({ contents: [] }))
      ]);

      // 重複を除去して結合
      const allSakesMap = new Map();
      idSakes.contents.forEach(s => allSakesMap.set(s.id, s));
      nameSakes.contents.forEach(s => allSakesMap.set(s.id, s));
      cmsSakes = Array.from(allSakesMap.values());

    } catch (apiErr) {
      console.error('Related data fetch error (non-fatal):', apiErr);
    }

    return (
      <BreweryDetailClient 
        brewery={brewery} 
        initialCmsSakes={cmsSakes} 
        brands={brands} 
        serverCleanedData={cleanedData}
      />
    );
  } catch (error) {
    console.error('酒蔵詳細ページ全体エラー:', error);
    // 致命的なエラー（酒蔵自体が見つからない等）の場合は 404 またはエラーを再投
    notFound();
  }
}
