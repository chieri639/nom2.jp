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

    // 4. 関連データの取得（全文検索 q と ID検索 のハイブリッド戦略）
    let brands: BREWERY[] = [];
    let cmsSakes: SAKE[] = [];
    
    try {
      // 検索キーワードの決定（最も短い名称を全文検索に使用）
      const qKeyword = (Array.from(searchTerms).find(t => t.length > 1 && t.length < 5) || cleanedName).trim();

      // 1. 全文検索 (qパラメータ)
      // 2. 内部ID検索 (filters)
      const tasks = [
        // 銘柄検索
        getBrands({ q: qKeyword, limit: 50 }).catch(() => ({ contents: [] })),
        getBrands({ filters: `brewery[equals]${brewery.id}`, limit: 50 }).catch(() => ({ contents: [] })),
        // 日本酒検索
        getSakes({ q: qKeyword, limit: 100 }).catch(() => ({ contents: [] })),
        getSakes({ filters: `brewery[equals]${brewery.id}`, limit: 100 }).catch(() => ({ contents: [] }))
      ];

      const [qBrands, idBrands, qSakes, idSakes] = await Promise.all(tasks);

      // ブランドの重複排除とマージ
      const allBrandsMap = new Map();
      [...qBrands.contents, ...idBrands.contents].forEach(b => allBrandsMap.set(b.id, b));
      brands = Array.from(allBrandsMap.values());

      // 日本酒の重複排除とマージ
      const allSakesMap = new Map();
      [...qSakes.contents, ...idSakes.contents].forEach(s => {
        // 全文検索の場合は、その酒蔵に無関係なものも混じる可能性があるため、
        // 名前やbreweryフィールドにキーワードが含まれているか軽くチェック（簡易フィルタ）
        const nameMatch = s.name.includes(qKeyword);
        const breweryMatch = s.brewery && s.brewery.includes(qKeyword);
        if (nameMatch || breweryMatch || idSakes.contents.some(is => is.id === s.id)) {
          allSakesMap.set(s.id, s);
        }
      });
      cmsSakes = Array.from(allSakesMap.values());

    } catch (apiErr) {
      console.error('Related data fetch error (critical):', apiErr);
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
