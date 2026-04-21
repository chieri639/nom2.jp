import React from 'react';
import Link from 'next/link';
import { getArticles } from '@/lib/microcms';
import { BookOpen, ArrowRight, Languages } from 'lucide-react';
import DynamicBackButton from '@/components/layout/DynamicBackButton';

export const revalidate = 0;

export default async function ArticleIndexPage() {
    let articles: any[] = [];
    try {
        const res = await getArticles({ limit: 100 });
        articles = res.contents || [];
    } catch (e) {
        console.error('Article fetch error:', e);
    }

    return (
        <div className="min-h-screen pb-24">
            {/* ── イントロセクション ── */}
            <header className="px-6 pt-12 pb-12 text-center relative">
                <div className="max-w-4xl mx-auto">
                    <div className="absolute top-0 left-6 md:left-12">
                        <DynamicBackButton defaultHref="/" defaultText="BACK TO TOP" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif-jp font-bold tracking-[0.1em] text-[#1F1F1F] mb-6">
                        ARTICLES
                    </h1>
                    <div className="w-12 h-1 bg-[#8B7D6B] mx-auto mb-6"></div>
                    <p className="text-sm text-gray-400 tracking-[0.3em] uppercase max-w-lg mx-auto leading-loose">
                        日本酒をもっと深く、もっと美味しく。<br/>
                        和食とのペアリング理論や、おすすめの飲み方など、充実した日本酒ライフを送るための特集をお届けします。
                    </p>
                </div>
            </header>

            {/* Language Switch CTA */}
            <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-end">
                <Link href="/en/article" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-100 rounded-full text-xs font-bold text-[#1F1F1F] hover:border-[#8B7D6B] hover:text-[#8B7D6B] transition-all shadow-sm">
                    <span className="text-base">🇬🇧</span> English Guides for Travelers <ArrowRight size={14} />
                </Link>
            </div>

            {/* Grid Container */}
            <main className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map((article) => (
                        <Link href={`/article/${article.id}`} key={article.id} className="group flex flex-col h-full">
                            <article className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col transform-gpu">
                                <div className="aspect-[16/10] relative overflow-hidden bg-gray-50">
                                    <span className="absolute top-4 left-4 z-10 bg-[#8B7D6B] text-white text-[9px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                                        特集記事
                                    </span>
                                    {article.imageUrl ? (
                                        <img 
                                            src={article.imageUrl} 
                                            alt={article.title} 
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                                            <BookOpen size={48} strokeWidth={1} />
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold text-[#1F1F1F] leading-snug mb-4 group-hover:text-[#8B7D6B] transition-colors font-serif-jp line-clamp-2 min-h-[2.8em]">
                                        {article.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-8 flex-grow">
                                        {(article.content || '').replace(/<[^>]+>/g, '').replace(/\n+/g, ' ')}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                                        <span className="text-[10px] font-bold text-gray-300 tracking-[0.2em] uppercase">FEATURED ARTICLE</span>
                                        <span className="text-[10px] text-[#8B7D6B] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                            READ MORE <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {articles.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-gray-400 tracking-[0.2em]">NO ARTICLES FOUND</p>
                    </div>
                )}
            </main>
        </div>
    );
}
