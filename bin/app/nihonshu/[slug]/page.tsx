import React from "react";
import { notFound } from "next/navigation";
import { getSakeDetail } from "../../../lib/microcms";
import SakeDetailClient from "./SakeDetailClient";

export const revalidate = 0;

export default async function NihonshuDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const sake = await getSakeDetail(params.slug);

    if (!sake) {
      notFound();
    }

    return <SakeDetailClient sake={sake} />;
  } catch (err) {
    console.error(err);
    notFound();
  }
}
