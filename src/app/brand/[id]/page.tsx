import React from 'react';
import { notFound } from 'next/navigation';
import { getBrandDetail, cleanBreweryData } from '@/lib/microcms';
import BreweryDetailClient from '@/app/brewery/[id]/BreweryDetailClient';

export const revalidate = 3600;

export default async function BrandDetailPage(props: any) {
  const params = await props.params;
  try {
    const brand = await getBrandDetail(params.id);

    if (!brand) {
      notFound();
    }

    const cleanedData = cleanBreweryData(brand.content || '', brand);

    return <BreweryDetailClient brewery={brand} type="brand" serverCleanedData={cleanedData} />;
  } catch (error) {
    console.error('詳細取得エラー:', error);
    notFound();
  }
}
