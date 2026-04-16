import React from 'react';
import Link from 'next/link';
import { getBreweries } from '@/lib/microcms';
import BreweryListClient from './BreweryListClient';

export const revalidate = 0; // リアルタイム性を重視

export default async function BreweryIndexPage() {
    let initialBreweries: any[] = [];
    let totalCount = 0;

    try {
        // 初期表示用に12件取得（モック表示時もバランスよく表示するため）
        const res = await getBreweries({ 
            limit: 12,
            orders: '-createdAt'
        });
        initialBreweries = res.contents || [];
        totalCount = res.totalCount || 0;
    } catch (error) {
        console.error('Brewery Index Fetch Error:', error);
        // エラー時は開発確認用にモックデータを生成
        initialBreweries = Array.from({ length: 8 }).map((_, i) => ({
            id: `mock-init-${i}`,
            name: `【サンプル】酒蔵サンプル ${i + 1}`,
            content: "これは読み込みテスト用のサンプルテキストです。ネットワークエラー等の理由で microCMS からデータを取得できなかった場合に表示されています。",
            imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&q=80&w=800",
            prefecture: i % 2 === 0 ? "北海道" : "青森県",
            address: "サンプル県サンプル市サンプル町 1-2-3",
            oldId: `old-${i}`
        }));
        totalCount = 100;
    }

    return (
        <div className="min-h-screen bg-[#F9F8F6]">
            {/* ── イントロセクション ── */}
            <header className="px-6 pt-20 pb-16 text-center relative">
                <div className="max-w-4xl mx-auto">
                    <div className="absolute top-10 left-6 md:left-12">
                        <Link href="/" className="inline-flex items-center text-xs text-gray-400 hover:text-[#8B7D6B] transition-colors tracking-[0.2em] uppercase font-bold">
                            ← BACK TO TOP
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black tracking-[0.1em] text-[#1F1F1F] mb-6">
                        BREWERIES
                    </h1>
                    <div className="w-12 h-1 bg-[#8B7D6B] mx-auto mb-6"></div>
                    <p className="text-sm text-gray-400 tracking-[0.3em] uppercase">
                        日本全国の酒造りを訪ねる
                    </p>
                </div>
            </header>

            {/* ── メインリスト（Client Side） ── */}
            <BreweryListClient 
                initialBreweries={initialBreweries} 
                totalCount={totalCount} 
            />
        </div>
    );
}
