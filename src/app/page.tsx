'use client';

import Link from 'next/link';
import { Search, Wine } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-indigo-500/30">

            {/* Navigation (Simple) */}
            <nav className="fixed w-full z-50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                            <Wine size={18} />
                        </span>
                        <span>日本酒AI</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            ログイン
                        </Link>
                        <Link href="/signup" className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                            無料で始める
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-16 px-4">
                <div className="container mx-auto max-w-5xl">

                    {/* Hero Section */}
                    <div className="flex flex-col items-center text-center space-y-8 mb-24 anim-fade-in">
                        <div className="inline-flex items-center rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 text-sm text-indigo-800 dark:text-indigo-300 backdrop-blur-xl">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
                            AIがあなたにぴったりの一本を提案
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white pb-2 max-w-4xl">
                            未知なる日本酒との<br className="md:hidden" />出会いを、<br />
                            <span className="text-indigo-600 dark:text-indigo-400">AIコンシェルジュ</span>と共に。
                        </h1>

                        <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            好みの味わい、ペアリングしたい料理、今の気分。<br />
                            簡単な質問に答えるだけで、膨大なデータベースから<br />
                            あなただけの「最高の一本」を見つけ出します。
                        </p>

                        {/* Search Input */}
                        <form onSubmit={handleSearch} className="w-full max-w-xl relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2">
                                <Search className="ml-4 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="「フルーティーで辛口な大吟醸は？」"
                                    className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 h-12"
                                />
                                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 h-12 flex items-center font-medium transition-colors shadow-md">
                                    検索
                                </button>
                            </div>
                        </form>

                        <div className="flex gap-4 pt-4 text-sm text-slate-500">
                            <span>Try:</span>
                            <button onClick={() => setQuery("刺身に合うお酒")} className="hover:text-indigo-600 underline">刺身に合うお酒</button>
                            <button onClick={() => setQuery("初心者向け")} className="hover:text-indigo-600 underline">初心者向け</button>
                            <button onClick={() => setQuery("プレゼント用")} className="hover:text-indigo-600 underline">プレゼント用</button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 px-4">
                        {[
                            { title: "パーソナライズ", desc: "あなたの味覚嗜好を学習し、使えば使うほど精度が向上します。", icon: "🎯" },
                            { title: "包括的なデータ", desc: "全国1,000以上の酒蔵データから、隠れた名酒を発掘します。", icon: "🍶" },
                            { title: "購入サポート", desc: "気になったお酒は、RakutenなどのECサイトですぐに購入可能。", icon: "🛒" }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-colors shadow-sm hover:shadow-xl">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </main>

            <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <p>&copy; 2024 日本酒AI. All rights reserved.</p>
            </footer>
        </div>
    );
}
