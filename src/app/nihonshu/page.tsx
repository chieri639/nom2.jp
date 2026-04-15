import React from 'react';
import { getSakes, SAKE } from '@/lib/microcms';
import NihonshuListClient from './NihonshuListClient';

export const revalidate = 0;

async function getAllSakes(): Promise<SAKE[]> {
  const allSakes: SAKE[] = [];
  let offset = 0;
  const limit = 100;
  
  while (true) {
    const { contents, totalCount } = await getSakes({ limit, offset });
    allSakes.push(...contents);
    if (offset + limit >= totalCount) break;
    offset += limit;
  }
  
  return allSakes;
}

export default async function NihonshuIndexPage() {
  const sakes = await getAllSakes();

  return <NihonshuListClient sakes={sakes} />;
}
