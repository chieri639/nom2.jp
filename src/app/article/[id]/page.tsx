import React from 'react';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import { getArticleDetail } from '@/lib/microcms';
import { ArrowLeft, ArrowRight, Search, Sparkles } from 'lucide-react';
import DynamicBackButton from '@/components/layout/DynamicBackButton';

export const revalidate = 0;

export default async function ArticleDetailPage(props: any) {
  const params = await props.params;
  const id = params?.id;

  if (!id) return null;

  let article: any = null;
  try {
    article = await getArticleDetail(id);
  } catch (error) {
    console.error('Article fetch error:', error);
  }

  if (!article) {
    // もし大文字が含まれるIDで記事が見つからなかった場合、小文字のIDで再検索する（SEO救済用301リダイレクト）
    if (id !== id.toLowerCase()) {
      let lowerArticle = null;
      try {
        lowerArticle = await getArticleDetail(id.toLowerCase());
      } catch (e) {
        // 小文字でも見つからなかった場合は無視
      }

      if (lowerArticle) {
        // 小文字の記事が存在すれば、SEO評価を引き継ぐ「301 Permanent Redirect」を実行
        // 注: permanentRedirectはエラーをスローしてルーティングを中断するため、try-catchの外で呼ぶ必要がある
        permanentRedirect(`/article/${id.toLowerCase()}`);
      }
    }

    permanentRedirect('/');
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
            <div className="relative aspect-[4/3] md:aspect-[21/9] w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl bg-[#1A1A1A]">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-2xl scale-110"
                style={{ backgroundImage: `url(${article.imageUrl})` }}
              />
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="relative z-10 w-full h-full object-contain" 
              />
            </div>
          )}
        </div>
      </header>

      {/* Article Body */}
      <main className="max-w-3xl mx-auto px-6 pt-16">
        <div className="flex flex-col gap-16">
          <DynamicBackButton defaultHref="/article" defaultText="BACK TO ARTICLES" />

          <article
            className="rich-text custom-prose max-w-none text-[#333] leading-[2.2] font-medium selection:bg-[#8B7D6B]/20"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />

          {/* Social / Share Area could go here */}

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
