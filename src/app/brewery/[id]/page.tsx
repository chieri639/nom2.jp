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

    // 1. 酒蔵情報の取得... (省略)
    if (!brewery) notFound();

    // 2. 検索キーワードの生成（多様な表記揺れに対応）
    // 「来福酒造株式会社（来福）」から [来福, 来福酒造, 来福酒造株式会社] を抽出
    const originalName = brewery.name.trim();
    const searchTerms = new Set<string>();
    searchTerms.add(originalName);
    
    // 括弧内を抽出（例：来福）
    const parenMatch = brewery.name.match(/[（(](.*?)[）)]/);
    if (parenMatch && parenMatch[1]) {
      searchTerms.add(parenMatch[1].trim());
    }
    
    // 会社名・酒造などを除いた純粋な名称
    let baseName = brewery.name
      .replace(/[（(].*?[）)]/g, '')
      .replace(/(株式会社|有限会社|合名会社|合資会社|（株）|\(株\))/g, '')
      .trim();
    if (baseName) {
      searchTerms.add(baseName);
      // さらに「酒造」「醸造」なども除いたもの
      const rawName = baseName.replace(/(酒造|醸造|酒造場|分店|本店|蔵)/g, '').trim();
      if (rawName) searchTerms.add(rawName);
    }
    
    const cleanedName = Array.from(searchTerms)[searchTerms.size - 1] || originalName;
    
    // 3. サーバー側でデータを極限までクリーンアップ
    const cleanedData = cleanBreweryData(brewery.content || '', brewery);

    // 4. 関連データの取得（IDベースの厳密な紐付けを優先）
    let brands: BREWERY[] = [];
    let cmsSakes: SAKE[] = [];
    
    try {
      // microCMSのフィルタ文字列を構築（[or]で連結）
      // searchTerms内の各単語につき brewery, brand, name のいずれかに含まれるかを検索
      const filterConditions: string[] = [];
      searchTerms.forEach(term => {
        if (term.length > 0) {
          filterConditions.push(`brewery[contains]${term}[or]brand[contains]${term}[or]name[contains]${term}`);
        }
      });
      // 内部IDによる検索も追加
      filterConditions.push(`brewery[equals]${brewery.id}`);
      
      const filters = filterConditions.join('[or]');
      
      // 銘柄と日本酒を同時に取得
      const [brandsRes, sakesRes] = await Promise.all([
        getBrands({ filters, limit: 50 }).catch(() => ({ contents: [] })),
        getSakes({ filters, limit: 100 }).catch(() => ({ contents: [] }))
      ]);

      brands = brandsRes.contents;
      cmsSakes = sakesRes.contents;

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
