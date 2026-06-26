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
          <DynamicBackButton defaultHref={article.category === 'event' ? '/event' : '/article'} defaultText={article.category === 'event' ? 'BACK TO EVENTS' : 'BACK TO ARTICLES'} />

          {article.category === 'event' ? (
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-3xl p-6 md:p-8 my-4 shadow-sm backdrop-blur-sm">
              <h2 className="text-xl font-bold text-[#1F1F1F] mb-6 flex items-center gap-2">
                📅 イベント開催概要
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-8">
                {article.eventDateLabel && (
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-500 w-20 flex-shrink-0">開催日程</span>
                    <span className="bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm font-medium">{article.eventDateLabel}</span>
                  </div>
                )}
                {article.eventLocation && (
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-500 w-20 flex-shrink-0">開催場所</span>
                    <span className="bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm font-medium">{article.eventLocation}</span>
                  </div>
                )}
                {article.eventOrganizer && (
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-500 w-20 flex-shrink-0">主催者</span>
                    <span className="bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm font-medium">{article.eventOrganizer}</span>
                  </div>
                )}
                {article.eventSource && (
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-500 w-20 flex-shrink-0">情報配信元</span>
                    <span className="bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm capitalize font-medium">{article.eventSource}</span>
                  </div>
                )}
              </div>
              
              {article.content && (
                <div className="mb-8 pt-6 border-t border-gray-200/60">
                  <h3 className="font-bold text-[#1F1F1F] mb-3">イベント内容・紹介</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">
                    {article.content}
                  </p>
                </div>
              )}

              {article.eventUrl && (
                <div className="text-center">
                  <a
                    href={article.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#8B7D6B] text-white rounded-full text-sm font-bold hover:bg-[#6B5D4B] transition-all shadow-lg hover:-translate-y-0.5"
                  >
                    イベント公式 / 詳細ページを見る
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <article
              className="rich-text custom-prose max-w-none text-[#333] leading-[2.2] font-medium selection:bg-[#8B7D6B]/20 [&>div:first-child]:!pt-4 [&>div:first-child]:!px-0 md:[&>div:first-child]:!pt-8"
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />
          )}

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
