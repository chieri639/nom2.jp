import React from 'react';
import { notFound } from 'next/navigation';
import { getBreweryDetail, getSakes } from '@/lib/microcms';
import BreweryDetailClient from './BreweryDetailClient';

export const revalidate = 0;

export default async function BreweryDetailPage(props: any) {
  const params = await props.params;
  try {
    const brewery = await getBreweryDetail(params.id);

    if (!brewery) {
      notFound();
    }

    // CMSからこの酒蔵の関連日本酒を取得（会社名などの表記揺れを吸収）
    const searchName = brewery.name.replace(/(株式会社|有限会社|合名会社|合資会社)/g, '').trim();
    
    // microCMS APIのfiltersにはエンコード済みの文字列を渡す必要がある場合がありますが、SDKが良しなに処理する前提
    const { contents: cmsSakes } = await getSakes({
      filters: `brewery[contains]${searchName}`,
      limit: 6
    });

    // BreweryDetailClient にデータを渡す
    return <BreweryDetailClient brewery={brewery} initialCmsSakes={cmsSakes} />;
  } catch (error) {
    console.error('酒蔵詳細取得エラー:', error);
    notFound();
  }
}
