import React from 'react';
import { notFound } from 'next/navigation';
import { getBreweryDetail, getSakes, getBrands } from '@/lib/microcms';
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
    
    // 関連ブランドを取得
    const { contents: brands } = await getBrands({
      filters: `brewery[contains]${searchName}`,
      limit: 10
    });

    const { contents: cmsSakes } = await getSakes({
      filters: `brewery[contains]${searchName}`,
      limit: 20
    });

    // BreweryDetailClient にデータを渡す
    return <BreweryDetailClient brewery={brewery} initialCmsSakes={cmsSakes} brands={brands} />;
  } catch (error) {
    console.error('酒蔵詳細取得エラー:', error);
    notFound();
  }
}
