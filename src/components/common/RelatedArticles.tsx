import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRelatedArticles } from '@/lib/microcms';

type RelatedArticlesProps = {
  currentArticleId: string;
  category?: string;
};

export default async function RelatedArticles({
  currentArticleId,
  category,
}: RelatedArticlesProps) {
  const articles = await getRelatedArticles(currentArticleId, category, 5);

  if (articles.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-200/60" id="related-articles">
      {/* セクションヘッダー */}
      <div className="text-center mb-10">
        <span className="inline-block bg-[#8B7D6B]/10 text-[#8B7D6B] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
          RELATED ARTICLES
        </span>
        <h3 className="text-2xl font-serif-jp font-bold text-[#1F1F1F]">
          あわせて読みたい記事
        </h3>
      </div>

      {/* 記事カード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.slice(0, 5).map((article, index) => (
          <Link
            key={article.id}
            href={`/article/${article.id.toLowerCase()}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* サムネイル */}
            <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
              {article.imageUrl ? (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#8B7D6B]/10 to-[#8B7D6B]/5">
                  <span className="text-[#8B7D6B]/40 text-4xl font-serif-jp">酒</span>
                </div>
              )}

              {/* カテゴリバッジ */}
              {article.category && (
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#8B7D6B] px-3 py-1 rounded-full text-[11px] font-bold tracking-wider shadow-sm">
                  {article.category}
                </span>
              )}
            </div>

            {/* テキスト部分 */}
            <div className="p-4 pb-5">
              <h4 className="font-bold text-[#1F1F1F] text-sm leading-relaxed line-clamp-2 group-hover:text-[#8B7D6B] transition-colors duration-200">
                {article.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
