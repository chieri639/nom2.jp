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
    let cleanedName = brewery.name
      .replace(/[（(].*?[）)]/g, '') // 括弧内を削除
      .replace(/(株式会社|有限会社|合名会社|合資会社|酒造|醸造|酒造場|（株）|\(株\))/g, '')
      .trim();
    
    // キーワードが空になった場合（例：名前が「株式会社」のみだった場合など）は元の名前を使う
    if (!cleanedName || cleanedName.length < 1) {
      cleanedName = brewery.name.trim();
    }
    
    // 3. サーバー側でデータを極限までクリーンアップ
    const cleanedData = cleanBreweryData(brewery.content || '', brewery);

    // 4. 関連データの取得（堅牢化：エラーが発生してもページ全体の表示は止めない）
    let brands: BREWERY[] = [];
    let cmsSakes: SAKE[] = [];
    
    try {
      // brewery, brand, name のいずれかに cleanedName が含まれるものを検索
      const filters = `brewery[contains]${cleanedName}[or]brand[contains]${cleanedName}[or]name[contains]${cleanedName}`;
      
      const [brandsRes, sakesRes] = await Promise.all([
        getBrands({ filters, limit: 20 }).catch(() => ({ contents: [] })),
        getSakes({ filters, limit: 100 }).catch(() => ({ contents: [] }))
      ]);

      brands = brandsRes.contents || [];
      cmsSakes = sakesRes.contents || [];
    } catch (apiErr) {
      console.error('Related data fetch error (non-fatal):', apiErr);
      // 空配列のまま継続
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
