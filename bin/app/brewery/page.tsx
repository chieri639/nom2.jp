import React from 'react';
import Link from 'next/link';
import { getBreweries, SAKE } from '@/lib/microcms';
import { Wine } from 'lucide-react';

export const revalidate = 0;

function unescapeHtml(text: string) {
    if (!text) return '';
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x2F;/gi, "/")
        .replace(/&#x3D;/gi, "=");
}

export default async function BreweryIndexPage() {
    const { contents: breweries } = await getBreweries({ limit: 100 });

    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            {/* ── ヘッダー ── */}
            <header className="px-6 py-16 text-center relative border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="absolute top-6 left-6 md:left-12">
                        <Link href="/" className="inline-flex items-center text-xs text-gray-400 hover:text-[#1F1F1F] transition-colors tracking-widest uppercase font-bold">
                            ← TOP
                        </Link>
                    </div>
                    <h1 className="text-3xl font-serif font-black tracking-widest text-[#1F1F1F] mb-4">
                        BREWERIES
                    </h1>
                    <p className="text-sm text-gray-400 tracking-widest uppercase">
                        全国の酒蔵
                    </p>
                </div>
            </header>

            {/* ── グリッド ── */}
            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {breweries.map((brewery) => {
                        // 重複表示防止のためHTMLタグを完全除去後、空白を正規化
                        const plainContent = unescapeHtml(
                            (brewery.content || '')
                                .replace(/<[^>]+>/g, ' ')
                                .replace(/\s+/g, ' ')
                                .trim()
                        );

                        return (
                            <Link href={`/brewery/${brewery.id}`} key={brewery.id} className="group block">
                                {/* 画像 (16:9) */}
                                <div className="aspect-video bg-[#F9F9F8] flex items-center justify-center overflow-hidden transition-opacity group-hover:opacity-80">
                                    {brewery.imageUrl ? (
                                        <img 
                                            src={brewery.imageUrl} 
                                            alt={brewery.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="text-gray-300">
                                            <Wine size={48} strokeWidth={1} />
                                        </div>
                                    )}
                                </div>

                                {/* テキスト */}
                                <div className="pt-6 text-center px-4">
                                    <h3 className="text-lg font-serif font-bold text-[#1F1F1F] mb-3">
                                        {unescapeHtml(brewery.name)}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                        {plainContent}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {breweries.length === 0 && (
                    <div className="text-center py-32 text-gray-400">
                        <Wine size={48} strokeWidth={1} className="mx-auto mb-6 opacity-30" />
                        <p className="text-sm tracking-widest">酒蔵データが見つかりません</p>
                    </div>
                )}
            </main>
        </div>
    );
}
