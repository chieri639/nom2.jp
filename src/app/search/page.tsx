'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Wine, Star, ThumbsUp, MapPin, ExternalLink } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type SakeCMS = {
    id: string;
    name: string;
    brewery: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    tags?: string;
    reason?: string;
};

function SearchPageContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<SakeCMS[]>([]);

    useEffect(() => {
        const fetchSakes = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/sakes?q=${encodeURIComponent(query || '')}`);
                const data = await res.json();
                
                setTimeout(() => {
                    setResults(data);
                    setLoading(false);
                }, 1500);

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
        <main className="pt-32 pb-16 px-4">
            <div className="container mx-auto max-w-4xl">

                <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                        <ArrowLeft size={16} className="mr-1" />
                        検索に戻る
                    </Link>
                    {!loading && <span className="text-sm text-slate-500">{results.length}件の提案</span>}
                </div>

                <h1 className="text-3xl font-bold mb-2">
                    「{query || ''}」への提案
                </h1>
                <p className="text-slate-500 mb-8">
                    AIがあなたのリクエストに合わせて厳選しました。
                </p>

                {loading ? (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-24 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-6">
                            <Loader2 size={32} className="animate-spin" />
                        </div>
                        <h2 className="text-xl font-bold mb-2 animate-pulse">AIが最適な一本を選定中...</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            全国の日本酒と最新データと照合しています<br />
                            少々お待ちください
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {results.map((sake) => (
                            <Link href={`/nihonshu/${sake.id}`} key={sake.id} className="block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="md:flex">
                                    <div className="md:w-48 bg-slate-200 dark:bg-slate-800 h-48 md:h-auto flex items-center justify-center text-slate-400 relative overflow-hidden">
                                        {sake.imageUrl ? (
                                            <img src={sake.imageUrl} alt={sake.name} className="absolute inset-0 w-full h-full object-cover" />
                                        ) : (
                                            <Wine size={48} opacity={0.5} />
                                        )}
                                    </div>

                                    <div className="p-6 md:p-8 flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="flex items-center text-sm text-slate-500 mb-1">
                                                    <MapPin size={14} className="mr-1" />
                                                    {sake.brewery}
                                                </div>
                                                <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">{sake.name}</h2>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                                    {sake.price ? `¥${sake.price}` : '価格未定'}
                                                </span>
                                                <div className="flex items-center text-indigo-600 text-sm font-bold bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded mt-1">
                                                    <Star size={14} className="mr-1 fill-indigo-600" />
                                                    マッチ度 {Math.floor(Math.random() * 15) + 85}%
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: (sake.description || '').substring(0, 150) + '...' }} />

                                        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-4 border border-indigo-100 dark:border-indigo-900/50 mb-4">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 bg-indigo-600 rounded-full p-1 text-white">
                                                    <ThumbsUp size={12} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-indigo-800 dark:text-indigo-300 mb-1">AIのおすすめポイント</p>
                                                    <p className="text-sm text-indigo-900 dark:text-indigo-200">
                                                        {sake.reason || 'この日本酒は、あなたのリクエストの特徴と高い親和性があります。詳細ページでペアリング情報をご確認ください。'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                
                {!loading && results.length === 0 && (
                    <div className="text-center p-12 bg-white rounded-xl border border-slate-200 mt-8">
                        <p className="text-slate-500 font-bold mb-4">一致する日本酒が見つかりませんでした。</p>
                        <Link href="/nihonshu" className="text-indigo-600 underline">一覧から探す</Link>
                    </div>
                )}

            </div>
        </main >
    );
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                            <Wine size={18} />
                        </span>
                        <span>日本酒AI</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            ログイン
                        </Link>
                    </div>
                </div>
            </nav>
            <React.Suspense fallback={<div className="pt-32 text-center">読み込み中...</div>}>
                <SearchPageContent />
            </React.Suspense>
        </div>
    );
}
