import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';
import { getBrandDetail, cleanBreweryData } from '@/lib/microcms';
import BreweryDetailClient from '@/app/brewery/[id]/BreweryDetailClient';

export const revalidate = 86400;

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  try {
    const brand = await getBrandDetail(params.id);
    if (!brand) return {};
    return {
      title: `${brand.name} | nom × nom`,
      description: `${brand.name}の日本酒銘柄情報`.slice(0, 120),
      alternates: {
        canonical: `https://nom2.jp/brand/${brand.id}`,
      },
    };
  } catch {
    return {};
  }
}

export default async function BrandDetailPage(props: any) {
  const params = await props.params;
  const idOrSlug = params.id;

  // 大文字のIDが来た場合は小文字へ301リダイレクト
  if (idOrSlug !== idOrSlug.toLowerCase()) {
    const lowerSlug = idOrSlug.toLowerCase();
    try {
      const lowerBrand = await getBrandDetail(lowerSlug).catch(() => null);
      if (lowerBrand) permanentRedirect(`/brand/${lowerSlug}`);
    } catch {}
  }

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

