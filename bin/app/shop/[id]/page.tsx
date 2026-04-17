import React from 'react';
import { notFound } from 'next/navigation';
import { getShopDetail, cleanShopData } from '@/lib/microcms';
import ShopDetailClient from './ShopDetailClient';

export const revalidate = 3600;

export default async function ShopDetailPage(props: any) {
  const params = await props.params;
  try {
    const shop = await getShopDetail(params.id);

    if (!shop) {
      notFound();
    }

    // ショップ専用のクリーンアップ（営業情報抽出を含む）を実行
    const cleanedData = cleanShopData(shop.content || '', shop);

    return <ShopDetailClient shop={shop} serverCleanedData={cleanedData} />;
  } catch (error) {
    console.error('詳細取得エラー:', error);
    notFound();
  }
}
