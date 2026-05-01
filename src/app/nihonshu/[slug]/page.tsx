import React from "react";
import { notFound } from "next/navigation";
import { getSakeDetail, getSakes, SAKE } from "../../../lib/microcms";
import SakeDetailClient from "./SakeDetailClient";

export const revalidate = 0;

export default async function NihonshuDetailPage(props: any) {
  const params = await props.params;
  const idOrSlug = params.slug;

  try {
    // 1. まず直接IDで取得を試みる
    let sake: SAKE | null = null;

    try {
      sake = await getSakeDetail(idOrSlug);
    } catch {
      // 失敗した場合は oldId (slug) で検索
      const res = await getSakes({
        filters: `oldId[equals]${idOrSlug}`,
        limit: 1
      });
      sake = res.contents[0] || null;
    }

    if (!sake) {
      notFound();
    }

    return <SakeDetailClient sake={sake} />;
  } catch (err) {
    console.error("日本酒詳細取得エラー:", err);
    notFound();
  }
}
