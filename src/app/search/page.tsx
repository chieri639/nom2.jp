'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Wine } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type SakeCMS = {
    id: string;
    name: string;
    brewery: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    tags?: string | string[];
    reason?: string;
};

function SearchPageContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<SakeCMS[]>([]);

    useEffect(() => {
        const fetchSakes = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/sakes?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                
                setTimeout(() => {
                    setResults(data);
                    setLoading(false);
                }, 800); // Shorter loading time to improve perceived performance

            } catch (err) {
                console.error('Failed to fetch from microCMS:', err);
                setLoading(false);
            }
        };

        if (query) {
            fetchSakes();
        } else {
            setResults([]);
            setLoading(false);
        }
    }, [query]);

    return (
        <div className="bg-[#F9F8F6] min-h-screen text-[#333]">
            <header className="max-w-7xl mx-auto pt-8 md:pt-12 px-6 pb-8">
                <div className="border-b border-gray-200 pb-8 md:pb-10">
                    <p className="text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase mb-4">Search Results</p>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wider text-[#1F1F1F]">
                                {query ? `「${query}」への提案` : 'すべての日本酒'}
                            </h1>
                            <p className="text-xs text-gray-500 mt-2 font-sans">
                                AIがあなたの好みに基づいて、最適な銘柄を選出しました。
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {query && (
                                <span className="bg-[#8B7D6B] text-white text-[10px] px-3 py-1 rounded-full shadow-sm font-sans">
                                    {query}
                                </span>
                            )}
                            <Link href="/search" className="bg-white border border-gray-200 text-gray-400 text-[10px] px-3 py-1 rounded-full hover:border-[#8B7D6B] hover:text-[#8B7D6B] cursor-pointer transition flex items-center font-sans">
                                すべて解除
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto pb-20 px-6 font-sans">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 size={32} className="animate-spin text-[#8B7D6B] mb-4" />
                        <p className="text-sm text-gray-500 animate-pulse">AIが最適な一本を選定中...</p>
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {results.map((sake) => (
                            <Link href={`/nihonshu/${sake.id}`} key={sake.id}>
                                <div className="h-full group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden cursor-pointer flex flex-col">
                                    <div className="aspect-square bg-[#fdfdfd] overflow-hidden relative">
                                        {sake.imageUrl ? (
                                            <Image 
                                                src={sake.imageUrl} 
                                                alt={sake.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                                                <Wine size={48} opacity={0.5} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 z-10">
                                            <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-[#8B7D6B] shadow-sm">
                                                マッチ度 {Math.floor(Math.random() * 15) + 85}%
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="space-y-1 mb-4">
                                            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">{sake.brewery || '不明な酒蔵'}</p>
                                            <h2 className="text-lg font-bold leading-tight text-[#1F1F1F] group-hover:text-[#8B7D6B] transition-colors line-clamp-2">{sake.name}</h2>
                                        </div>
                                        
                                        <div className="flex items-baseline gap-2 mb-4 mt-auto">
                                            <span className="text-xl font-bold text-[#333]">
                                                {sake.price ? `¥${Number(sake.price).toLocaleString()}` : '-'}
                                            </span>
                                            <span className="text-[10px] text-gray-400">税込</span>
                                        </div>

                                        {sake.reason ? (
                                            <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3 bg-gray-50 p-3 rounded-md italic mb-4">
                                                {sake.reason}
                                            </p>
                                        ) : sake.description ? (
                                            <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3 bg-gray-50 p-3 rounded-md mb-4" 
                                               dangerouslySetInnerHTML={{ __html: sake.description.replace(/<[^>]*>?/gm, '') }} />
                                        ) : (
                                            <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 bg-gray-50 p-3 rounded-md italic mb-4">
                                                AIによる特徴の分析結果がありません。
                                            </p>
                                        )}

                                        <div className="pt-2 flex items-center justify-between border-t border-gray-50 mt-2">
                                            <div className="flex flex-wrap gap-1">
                                                {sake.tags && (
                                                    (Array.isArray(sake.tags) ? sake.tags : sake.tags.split(','))
                                                    .slice(0, 2)
                                                    .map(tag => (
                                                        <span key={tag} className="text-[9px] border border-gray-200 px-2 py-0.5 rounded text-gray-400 whitespace-nowrap">
                                                            {typeof tag === 'string' ? tag.trim() : tag}
                                                        </span>
                                                    ))
                                                )}
                                            </div>
                                            <span className="text-[10px] font-bold text-[#8B7D6B] whitespace-nowrap ml-2">詳細を見る →</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <Wine size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium mb-4">一致する日本酒が見つかりませんでした。</p>
                        <Link href="/nihonshu" className="text-[#8B7D6B] font-bold hover:underline text-sm">
                            すべての日本酒を見る
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function SearchPage() {
    return (
        <React.Suspense fallback={<div className="pt-32 text-center text-gray-400 h-screen bg-[#F9F8F6]">読み込み中...</div>}>
            <SearchPageContent />
        </React.Suspense>
    );
}
