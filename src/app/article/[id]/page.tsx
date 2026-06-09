import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getArticleDetail } from '@/lib/microcms';
import RelatedArticles from '@/components/common/RelatedArticles';

// other imports remain

// otherArticles will be fetched inside the component

import { Search, Sparkles } from 'lucide-react';
import DynamicBackButton from '@/components/layout/DynamicBackButton';

export const revalidate = 0;


async function fetchArticle(id: string, draftKey?: string) {
  try {
    const queries = draftKey ? { draftKey } : undefined;
    return await getArticleDetail(id, queries);
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
      canonical: `https://nom2.jp/article/${canonicalId.toLowerCase()}`,
    },
  };
}

export default async function ArticleDetailPage(props: any) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const id = params?.id;
  const draftKey = searchParams?.draftKey as string | undefined;

  // Draft Mode の状態を取得
  const { isEnabled: isDraftMode } = await draftMode();

  if (!id) return null;

  // Draft Mode でない場合のみリダイレクト処理を行う
  if (!isDraftMode) {
    // 大文字のIDが来た場合は小文字へ301リダイレクト
    if (id !== id.toLowerCase()) {
      const lowerId = id.toLowerCase();
      const lowerArticle = await fetchArticle(lowerId).catch(() => null);
      if (lowerArticle) {
        permanentRedirect(`/article/${lowerId}`);
      }
    }
  }

  // Draft Mode 時は draftKey を渡して下書きデータを取得
  let article: any = isDraftMode && draftKey
    ? await fetchArticle(id, draftKey)
    : await fetchArticle(id);

  // 直接取得できない場合は小文字で再試行
  if (!article) {
    article = isDraftMode && draftKey
      ? await fetchArticle(id.toLowerCase(), draftKey)
      : await fetchArticle(id.toLowerCase());
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
      {/* Draft Mode バナー */}
      {isDraftMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-black text-center py-2 px-4 text-sm font-bold shadow-lg">
          🔍 プレビューモード — 下書きコンテンツを表示中（ID: {article.id}）
          <a
            href="/api/disable-draft"
            className="ml-4 inline-block bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800 transition-colors"
          >
            プレビューを終了
          </a>
        </div>
      )}
      {/* Article Header (Hero) */}
      <header className={`px-6 ${isDraftMode ? 'pt-28' : 'pt-20'} pb-16 text-center border-b border-gray-100 bg-white`}>
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-[#8B7D6B]/10 text-[#8B7D6B] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            FEATURED ARTICLE
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif-jp text-[#1F1F1F] leading-tight mb-12">
            {article.title}
          </h1>

          {article.imageUrl && (
            <div className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl">
              <img
                src={article.imageUrl}
                alt={article.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
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
          {/* Related Articles - カテゴリベースの関連記事 */}
          <RelatedArticles
            currentArticleId={article.id}
            category={article.category}
          />
        </div>
      </main>
    </div>
  );
}
