import React from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import { getSakeDetail, getSakes, SAKE } from "../../../lib/microcms";
import SakeDetailClient from "./SakeDetailClient";

export const revalidate = 86400;

async function fetchSake(idOrSlug: string): Promise<SAKE | null> {
  try {
    return await getSakeDetail(idOrSlug);
  } catch {
    // 失敗した場合は oldId (slug) で検索
    const res = await getSakes({
      filters: `oldId[equals]${idOrSlug}`,
      limit: 1
    });
    return res.contents[0] || null;
  }
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const sake = await fetchSake(params.slug);
  if (!sake) return {};

  const canonicalId = sake.id;
  return {
    title: `${sake.name} | nom × nom`,
    description: sake.description?.slice(0, 120) || `${sake.name}の詳細情報`,
    alternates: {
      canonical: `https://nom2.jp/nihonshu/${canonicalId}`,
    },
  };
}

export default async function NihonshuDetailPage(props: any) {
  const params = await props.params;
  const idOrSlug = params.slug;

  // 大文字のIDが来た場合は小文字へ301リダイレクト
  if (idOrSlug !== idOrSlug.toLowerCase()) {
    const lowerSlug = idOrSlug.toLowerCase();
    const lowerSake = await fetchSake(lowerSlug).catch(() => null);
    if (lowerSake) {
      permanentRedirect(`/nihonshu/${lowerSlug}`);
    }
  }

  try {
    const sake = await fetchSake(idOrSlug);

    if (!sake) {
      notFound();
    }

    return <SakeDetailClient sake={sake} />;

  } catch (err) {
    console.error("日本酒詳細取得エラー:", err);
    notFound();
  }
}
