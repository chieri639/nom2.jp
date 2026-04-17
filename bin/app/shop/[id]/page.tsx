import React from 'react';
import { notFound } from 'next/navigation';
import { getShopDetail, cleanBreweryData } from '@/lib/microcms';
import ShopDetailClient from './ShopDetailClient';

export const revalidate = 3600;

export default async function ShopDetailPage(props: any) {
  const params = await props.params;
  try {
    const shop = await getShopDetail(params.id);

    if (!shop) {
      notFound();
    }

    const cleanedData = cleanBreweryData(shop.content || '', shop);

    return <ShopDetailClient shop={shop} serverCleanedData={cleanedData} />;
  } catch (error) {
    console.error('詳細取得エラー:', error);
    notFound();
  }
}
