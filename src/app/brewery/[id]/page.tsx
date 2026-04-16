import React from 'react';
import { notFound } from 'next/navigation';
import { getBreweryDetail, getBreweries, getSakes, getBrands, BREWERY } from '@/lib/microcms';
import BreweryDetailClient from './BreweryDetailClient';

// キャッシュ有効化：1時間（3600秒）
export const revalidate = 3600;

// ── サーバーサイドでのデータクリーンアップ関数 ──
function cleanBreweryData(html: string, brewery: BREWERY) {
  if (!html) return { description: '', address: brewery.address, phone: brewery.phone, website: brewery.website };

  // HTMLタグ除去などの処理をサーバーで行う
  let text = html
    .replace(/<br\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<figcaption>.*?<\/figcaption>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const noises = ['keyboard_arrow_leftpausekeyboard_arrow_right', '代表的な銘柄', '代表銘柄', '商品一覧', '酒蔵について'];
  noises.forEach(n => { text = text.replace(new RegExp(n, 'gi'), ''); });

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const cleanedLines = [];
  
  let address = brewery.address || '';
  let phone = brewery.phone || '';
  let website = brewery.website || '';

  for (const line of lines) {
    if (/(¥|円|\(税込\)|720ml|1800ml)/.test(line)) continue;
    if (/https?:\/\/[^\s]+/.test(line) && !website) website = line.match(/(https?:\/\/[^\s]+)/)?.[1] || '';
    if (/(\d{2,4}-\d{2,4}-\d{3,4})/.test(line) && !phone) phone = line.match(/(\d{2,4}-\d{2,4}-\d{3,4})/)?.[1] || '';
    cleanedLines.push(line);
  }

  return {
    description: cleanedLines.join('\n\n').trim(),
    address: address || '-',
    phone: phone || '-',
    website: website || ''
  };
}

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
