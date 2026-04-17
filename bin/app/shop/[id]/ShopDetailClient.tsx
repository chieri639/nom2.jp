'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Wine, MapPin, Phone, Globe, Info } from 'lucide-react';
import { SHOP } from '@/lib/microcms';

type Props = {
    shop: SHOP;
    serverCleanedData: {
        description: string;
        address: string;
        phone: string;
        website: string;
    };
};

export default function ShopDetailClient({ shop, serverCleanedData }: Props) {
    const { description } = serverCleanedData;

    // スマート・パース (Smart Parser) ロジック
    const { introText, details } = useMemo(() => {
        const rawContent = shop.content || '';
        // HTMLタグを除去しつつ、改行や読点で分割
        const lines = rawContent
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/p>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .split(/\n|、/);
        
        const detailKeywords = ['住所', '電話', 'TEL', '営業', '定休', '席数', '決済', 'アクセス', '駐車場', '支払い', 'メニュー', '予算'];
        
        const tempDetails: { label: string; value: string }[] = [];
        const tempIntro: string[] = [];
        
        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return;

            const foundKeyword = detailKeywords.find(k => trimmedLine.includes(k));
            const hasColon = trimmedLine.includes('：') || trimmedLine.includes(':');

            if (foundKeyword && hasColon) {
                const separator = trimmedLine.includes('：') ? '：' : ':';
                const parts = trimmedLine.split(separator);
                const label = parts[0].trim();
                const value = parts.slice(1).join(separator).trim();
                
                if (label && value) {
                    tempDetails.push({ label, value });
                } else {
                    tempIntro.push(trimmedLine);
                }
            } else {
                tempIntro.push(trimmedLine);
            }
        });

        // IntroTextが空だった場合のフォールバック（全体を表示）
        const finalIntro = tempIntro.length > 0 
            ? tempIntro.join(' ') 
            : (tempDetails.length === 0 ? rawContent.replace(/<[^>]+>/g, ' ') : '');

        return {
            introText: finalIntro,
            details: tempDetails
        };
    }, [shop.content]);

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#333] font-sans pb-24">
            {/* ── ヒーロー画像 ── */}
            <section className="w-full h-[40vh] md:h-[50vh] overflow-hidden bg-[#F2F1EF] relative">
                {shop.imageUrl ? (
                    <img 
                        src={shop.imageUrl} 
                        alt={shop.name} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Wine size={80} strokeWidth={1} />
                    </div>
                )}
            </section>

            {/* ── メインコンテンツ ── */}
            <main className="max-w-4xl mx-auto -mt-[8vh] relative z-10 px-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header Area */}
                    <div className="p-8 md:p-12 border-b border-gray-50 bg-white">
                        <Link href="/shop" className="text-xs text-[#8B7D6B] hover:opacity-70 transition-opacity flex items-center gap-2 mb-8 font-bold tracking-widest uppercase">
                            ← BACK TO LIST
                        </Link>
                        
                        <h1 className="text-3xl md:text-5xl font-bold font-serif-jp text-[#1F1F1F] leading-tight mb-6">
                            {shop.name}
                        </h1>
                        
                        <div className="flex flex-wrap gap-6 text-[11px] text-[#8B7D6B] font-bold tracking-widest uppercase ornament-list">
                            {shop.prefecture && <span className="flex items-center gap-1.5"><MapPin size={12} /> {shop.prefecture}</span>}
                            {serverCleanedData.phone && serverCleanedData.phone !== '-' && <span className="flex items-center gap-1.5"><Phone size={12} /> {serverCleanedData.phone}</span>}
                        </div>
                    </div>

                    {/* Shop Story Section */}
                    <div className="p-8 md:p-12 bg-white">
                        <h2 className="text-xl font-serif-jp font-bold mb-8 flex items-center text-[#8B7D6B]">
                            <span className="w-8 h-[1px] bg-[#8B7D6B] mr-4 opacity-40"></span>
                            SHOP STORY
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-loose text-sm md:text-base">
                            <p className="whitespace-pre-wrap">
                                {introText || 'ショップの紹介文を準備中です。'}
                            </p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-8 md:p-12 bg-[#F9F8F6]/30 border-t border-gray-50">
                        <h2 className="text-xl font-serif-jp font-bold mb-8 flex items-center text-[#8B7D6B]">
                            <span className="w-8 h-[1px] bg-[#8B7D6B] mr-4 opacity-40"></span>
                            SHOP DETAILS
                        </h2>
                        
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                            <dl className="divide-y divide-gray-50">
                                {details.length > 0 ? (
                                    details.map((item, idx) => (
                                        <div key={idx} className="flex px-6 py-5 text-sm sm:text-base group hover:bg-gray-50/50 transition-colors">
                                            <dt className="w-24 md:w-32 font-bold text-[#8B7D6B] shrink-0 text-xs tracking-widest uppercase pt-0.5">
                                                {item.label}
                                            </dt>
                                            <dd className="text-gray-600 leading-relaxed pl-4 border-l border-gray-100 flex-1">
                                                {item.value}
                                            </dd>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-8 text-center text-gray-400 text-sm">
                                        詳細なスペック情報は現在確認中です。
                                    </div>
                                )}
                                
                                {serverCleanedData.website && (
                                    <div className="flex px-6 py-5 text-sm sm:text-base group hover:bg-gray-50/50 transition-colors">
                                        <dt className="w-24 md:w-32 font-bold text-[#8B7D6B] shrink-0 text-xs tracking-widest uppercase pt-0.5">
                                            公式サイト
                                        </dt>
                                        <dd className="text-gray-600 leading-relaxed pl-4 border-l border-gray-100 flex-1">
                                            <a href={serverCleanedData.website} target="_blank" rel="noopener noreferrer" className="text-[#8B7D6B] hover:underline break-all font-medium">
                                                {serverCleanedData.website}
                                            </a>
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>

                    {/* Footer Info / Badge */}
                    <div className="px-8 py-10 bg-gray-50/50 flex flex-col items-center">
                        <div className="w-10 h-px bg-gray-200 mb-6"></div>
                        <p className="text-[10px] text-gray-400 tracking-[0.4em] uppercase font-bold text-center">
                            nom × nom curators database
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

// カスタムCSS（ ornament-list などが必要な場合は追加 ）
