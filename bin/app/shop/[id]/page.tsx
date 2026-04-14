import React from 'react';
import { notFound } from 'next/navigation';
import { getShopDetail } from '@/lib/microcms';
import BreweryDetailClient from '@/app/brewery/[id]/BreweryDetailClient';

export const revalidate = 0;

export default async function ShopDetailPage({ params }: { params: { id: string } }) {
  try {
    const shop = await getShopDetail(params.id);

    if (!shop) {
      notFound();
    }

    return <BreweryDetailClient brewery={shop} type="shop" />;
  } catch (error) {
    console.error('詳細取得エラー:', error);
    notFound();
  }
}
