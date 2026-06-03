import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';
import { getArticles, getArticleDetail } from '@/lib/microcms';

// other imports remain

// otherArticles will be fetched inside the component

import { Search, Sparkles } from 'lucide-react';
import DynamicBackButton from '@/components/layout/DynamicBackButton';

export const revalidate = 0;


async function fetchArticle(id: string) {
  try {
    return await getArticleDetail(id);
  } catch {
    return null;
  }
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const id = params?.id;
  if (!id) return {};

  // 大文字IDの場合は小文字IDで取得を試みる
  const article = await fetchArticle(id) || await fetchArticle(id.toLowerCase());
  if (!article) return {};

  const canonicalId = article.id;
  return {
    title: `${article.title} | nom × nom`,
    description: article.content?.replace(/<[^>]+>/g, '').slice(0, 120) || article.title,
    alternates: {
      canonical: `https://nom2.jp/article/${canonicalId}`,
    },
  };
}

export default async function ArticleDetailPage(props: any) {
  const params = await props.params;
  const id = params?.id;

  if (!id) return null;

  // 大文字のIDが来た場合は小文字へ301リダイレクト
  if (id !== id.toLowerCase()) {
    const lowerId = id.toLowerCase();
    const lowerArticle = await fetchArticle(lowerId).catch(() => null);
    if (lowerArticle) {
      permanentRedirect(`/article/${lowerId}`);
    }
  }

  let article: any = await fetchArticle(id);
const otherArticlesResponse = await getArticles({ limit: 6, offset: 0 });
const otherArticles = otherArticlesResponse.contents as any[];

  // 直接取得できない場合は小文字で再試行
  if (!article) {
    article = await fetchArticle(id.toLowerCase());
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">記事が見つかりませんでした</h1>
        <Link href="/article" className="text-[#8B7D6B] hover:underline">← 記事一覧に戻る</Link>
      </div>
    );
  }



  return (
    <div className="min-h-screen pb-24">
      {/* Article Header (Hero) */}
      <header className="px-6 pt-20 pb-16 text-center border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-[#8B7D6B]/10 text-[#8B7D6B] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            FEATURED ARTICLE
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif-jp text-[#1F1F1F] leading-tight mb-12">
            {article.title}
          </h1>

          {article.imageUrl && (
            <div className="aspect-[21/9] w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl relative">
              <Image 
                src={article.imageUrl} 
                alt={article.title} 
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover" 
              />
            </div>
          )}
        </div>
      </header>

      {/* Article Body */}
      <main className="max-w-3xl mx-auto px-6 pt-8">
        <div className="flex flex-col gap-6">
          <DynamicBackButton defaultHref="/article" defaultText="BACK TO ARTICLES" />

          <article
            className="rich-text custom-prose max-w-none text-[#333] leading-[2.2] font-medium selection:bg-[#8B7D6B]/20 [&>div:first-child]:!pt-4 [&>div:first-child]:!px-0 md:[&>div:first-child]:!pt-8"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />

          {/* Read More / Next Actions */}
          <div className="mt-20 pt-16 border-t border-gray-100 text-center">
            <h2 className="text-2xl font-serif-jp font-bold text-[#1F1F1F] mb-12">
              日本酒の世界をもっと探求する
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/nihonshu" className="group flex items-center gap-3 px-8 py-4 bg-[#1F1F1F] text-white rounded-full text-sm font-bold hover:bg-[#8B7D6B] transition-all shadow-lg hover:-translate-y-1">
                <Search size={18} /> 日本酒一覧を見る
              </Link>
              <Link href="/similar" className="group flex items-center gap-3 px-8 py-4 bg-[#8B7D6B] text-white rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-lg hover:-translate-y-1">
                <Sparkles size={18} /> AIにおすすめを聞く
              </Link>
            </div>
          </div>
          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold text-[#1F1F1F] mb-6 text-center">関連記事</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherArticles.filter(a => a.id !== article.id).map((rel) => (
                <Link key={rel.id} href={`/article/${rel.id}`} className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {rel.imageUrl && (
                    <div className="aspect-[16/9] relative">
                      <Image src={rel.imageUrl} alt={rel.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-[#1F1F1F] group-hover:text-[#8B7D6B] transition-colors line-clamp-2">{rel.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
