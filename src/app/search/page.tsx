'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Wine, Star, ThumbsUp, MapPin, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MOCK_SAKES, Sake } from '../../lib/mockData';



export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<Sake[]>([]);

    useEffect(() => {
        // Simulate AI processing time
        const timer = setTimeout(() => {
            setLoading(false);
            // Simple verify to filter results based on query (mock logic)
            if (query) {
                const lowerQuery = query.toLowerCase();
                const filtered = MOCK_SAKES.filter(sake =>
                    sake.name.toLowerCase().includes(lowerQuery) ||
                    sake.brewery.toLowerCase().includes(lowerQuery) ||
                    sake.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
                    sake.flavor.toLowerCase().includes(lowerQuery)
                );
                // If no exact matches, just return all for demo (so it doesn't look empty) 
                // but sort by match score generally
                setResults(filtered.length > 0 ? filtered : MOCK_SAKES);
            } else {
                setResults(MOCK_SAKES);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [query]);

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
                        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-1.5 text-sm text-slate-500">
                            <span>検索中: {query}</span>
                        </div>
                        <Link href="/login" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            ログイン
                        </Link>
                    </div>
                </div>
            </nav>

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
                        「{query}」への提案
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
                                数千種類の日本酒データと照合しています<br />
                                少々お待ちください
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {results.map((sake) => (
                                <div key={sake.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="md:flex">
                                        {/* Image Placeholder */}
                                        <div className="md:w-48 bg-slate-200 dark:bg-slate-800 h-48 md:h-auto flex items-center justify-center text-slate-400">
                                            <Wine size={48} opacity={0.5} />
                                        </div>

                                        <div className="p-6 md:p-8 flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <div className="flex items-center text-sm text-slate-500 mb-1">
                                                        <MapPin size={14} className="mr-1" />
                                                        {sake.brewery}
                                                    </div>
                                                    <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{sake.name}</h2>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{sake.price}</span>
                                                    <div className="flex items-center text-indigo-600 text-sm font-bold bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                                                        <Star size={14} className="mr-1 fill-indigo-600" />
                                                        マッチ度 {sake.matchScore}%
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {sake.tags.map(tag => (
                                                    <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                                                {sake.description}
                                            </p>

                                            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-4 border border-indigo-100 dark:border-indigo-900/50 mb-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 bg-indigo-600 rounded-full p-1 text-white">
                                                        <ThumbsUp size={12} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-indigo-800 dark:text-indigo-300 mb-1">AIのおすすめポイント</p>
                                                        <p className="text-sm text-indigo-900 dark:text-indigo-200">
                                                            {sake.aiReason}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <a
                                                    href={sake.affiliateUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm hover:shadow-md"
                                                >
                                                    <ExternalLink size={16} />
                                                    楽天で購入する
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main >
        </div >
    );
}
