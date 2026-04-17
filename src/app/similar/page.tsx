'use client';

import { useEffect, useState } from 'react';
import SakeSimilarPage from './SakeSimilarPage';
import { Sparkles } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen pb-24">
            {/* ── イントロセクション ── */}
            <header className="px-6 pt-20 pb-12 text-center relative">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-flex items-center gap-2 bg-[#8B7D6B]/10 text-[#8B7D6B] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                        <Sparkles size={12} /> AI POWERED SEARCH
                    </span>
                    <h1 className="text-3xl md:text-5xl font-serif-jp font-bold tracking-[0.1em] text-[#1F1F1F] mb-6">
                        似た日本酒AI
                    </h1>
                    <div className="w-12 h-1 bg-[#8B7D6B] mx-auto mb-6"></div>
                    <p className="text-sm text-gray-400 tracking-[0.3em] uppercase max-w-lg mx-auto leading-loose">
                        お気に入りの銘柄から、新しい出会いを見つけましょう。
                    </p>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto px-6">
                <section className="bg-white rounded-lg p-0 shadow-sm border border-gray-100 overflow-hidden">
                    <SakeSimilarPage />
                </section>
            </main>
        </div>
    );
}
