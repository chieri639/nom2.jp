import React from 'react';
import { notFound } from 'next/navigation';
import { getBrandDetail } from '@/lib/microcms';
import BreweryDetailClient from '@/app/brewery/[id]/BreweryDetailClient';

export const revalidate = 0;

export default async function BrandDetailPage({ params }: { params: { id: string } }) {
  try {
    const brand = await getBrandDetail(params.id);

    if (!brand) {
      notFound();
    }

    return <BreweryDetailClient brewery={brand} type="brand" />;
  } catch (error) {
    console.error('詳細取得エラー:', error);
    notFound();
  }
}
