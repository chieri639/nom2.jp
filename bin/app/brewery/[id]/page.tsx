import React from 'react';
import { notFound } from 'next/navigation';
import { getBreweryDetail } from '@/lib/microcms';
import BreweryDetailClient from './BreweryDetailClient';

export const revalidate = 0;

export default async function BreweryDetailPage({ params }: { params: { id: string } }) {
  try {
    const brewery = await getBreweryDetail(params.id);

    if (!brewery) {
      notFound();
    }

    return <BreweryDetailClient brewery={brewery} type="brewery" />;
  } catch (error) {
    console.error('詳細取得エラー:', error);
    notFound();
  }
}
