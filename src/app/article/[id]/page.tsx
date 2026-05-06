import React from 'react';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';
import { getArticleDetail } from '@/lib/microcms';
import { Search, Sparkles } from 'lucide-react';
import DynamicBackButton from '@/components/layout/DynamicBackButton';

export const revalidate = 86400;

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

  // 1. まず直接IDで取得
  let article: any = await fetchArticle(id);

  // 2. 見つからない場合、大文字→小文字で再試行
  if (!article && id !== id.toLowerCase()) {
    article = await fetchArticle(id.toLowerCase());
    if (article) {
      permanentRedirect(`/article/${id.toLowerCase()}`);
    }
  }

  // 3. 記事が見つかったが、アクセスIDと正規IDが異なる場合はリダイレクト
  if (article && article.id !== id) {
    permanentRedirect(`/article/${article.id}`);
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
            <div className="aspect-[21/9] w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl">
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
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
        </div>
      </main>
    </div>
  );
}
