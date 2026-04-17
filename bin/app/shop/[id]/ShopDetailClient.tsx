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

    // スマート・パース (Smart Parser) ロジック：改行がない場合でもキーワードでスキャンする方式に強化
    const { introText, details } = useMemo(() => {
        let text = (shop.content || '')
            .replace(/&amp;/g, '&')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/p>/gi, '\n')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ') // 連続する空白を1つに
            .trim();
        
        const detailKeywords = ['住所', '電話番号', 'TEL', '電話', '営業時間', '定休日', '公式サイト', 'アクセス', '駐車場', '決済方法', '支払い', 'メニュー', '予算'];
        const tempDetails: { label: string; value: string }[] = [];
        
        // 1. 各キーワードの出現位置を特定し、文章を分割
        let remainingText = text;
        
        // キーワードが見つかった位置で文章を切り分ける
        const foundItems: { label: string; start: number; value: string }[] = [];
        
        detailKeywords.forEach(k => {
            const regex = new RegExp(k + '[:：\\s]', 'g');
            let match;
            while ((match = regex.exec(text)) !== null) {
                foundItems.push({ label: k, start: match.index, value: '' });
            }
        });

        // 位置順にソート
        foundItems.sort((a, b) => a.start - b.start);

        // 各項目の値を切り出す
        for (let i = 0; i < foundItems.length; i++) {
            const current = foundItems[i];
            const next = foundItems[i + 1];
            const end = next ? next.start : text.length;
            
            // 「住所 〒...」などの形式からラベル以降を抽出
            let val = text.substring(current.start + current.label.length, end).trim();
            val = val.replace(/^[:：\s]+/, ''); // 先頭の記号を削除
            
            // 商品一覧やHOME以降のノイズを除去（必要に応じて）
            if (val.includes('商品一覧')) val = val.split('商品一覧')[0].trim();
            if (val.includes('HOME')) val = val.split('HOME')[0].trim();

            current.value = val;
            tempDetails.push({ label: current.label, value: val });
        }

        // 2. イントロテキストの抽出（最初のキーワードより前の部分）
        let finalIntro = '';
        if (foundItems.length > 0) {
            finalIntro = text.substring(0, foundItems[0].start).trim();
        } else {
            finalIntro = text;
        }

        // 「商品一覧」以降に長文がある場合は、それもイントロ（または末尾）として扱う
        if (text.includes('酒蔵について')) {
            const aboutPart = text.split('酒蔵について')[1]?.split('商品一覧')[0] || '';
            if (aboutPart) finalIntro += (finalIntro ? '\n\n' : '') + aboutPart.trim();
        }

        return {
            introText: finalIntro.replace(/MENU|TABI BAR & CAFE SUZUVEL/g, '').trim(),
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
