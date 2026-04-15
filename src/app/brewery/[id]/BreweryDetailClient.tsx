'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wine } from 'lucide-react';
import { BREWERY, SAKE } from '@/lib/microcms';
import { fetchRakutenSakes } from '@/lib/rakuten';

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

export default function BreweryDetailClient({ brewery, initialCmsSakes = [], type = 'brewery' }: { brewery: BREWERY, initialCmsSakes?: SAKE[], type?: 'brewery' | 'brand' | 'shop' }) {
    const [rakutenSakes, setRakutenSakes] = useState<any[]>([]);
    const [loadingRakuten, setLoadingRakuten] = useState(false);

    useEffect(() => {
        // CMSに該当酒蔵の日本酒データがない場合、楽天APIから自動取得
        if (initialCmsSakes.length === 0) {
            setLoadingRakuten(true);
            const searchName = unescapeHtml(brewery.name).replace(/(株式会社|有限会社|合名会社|合資会社)/g, '').trim();
            
            fetchRakutenSakes(searchName).then(sakes => {
                setRakutenSakes(sakes);
            }).catch(e => {
                console.error("Rakuten fetch error:", e);
            }).finally(() => {
                setLoadingRakuten(false);
            });
        }
    }, [brewery.name, initialCmsSakes.length]);

    // contentに含まれる余分なHTMLタグや「二重レンダリング」の一因となる不正なタグ構造を除去
    // プロトタイプ通り、whitespace-pre-wrap のプレーンテキストとして流し込む
    const plainDescription = unescapeHtml(
        (brewery.content || '')
            .replace(/<br\/?>/gi, '\n')
            .replace(/<p>/gi, '')
            .replace(/<\/p>/gi, '\n\n')
            .replace(/<[^>]+>/g, '') 
            .trim()
    );

    const breweryData = brewery as any;
    const prefectureDisplay = breweryData.prefecture || '日本';
    const addressDisplay = breweryData.address || '-';
    const phoneDisplay = breweryData.phone || '-';
    const websiteDisplay = breweryData.website || breweryData.url || '';

    // 表示する日本酒リスト (第1優先: CMSデータ、第2優先: 楽天APIデータ)
    const displaySakes = initialCmsSakes.length > 0 ? initialCmsSakes : rakutenSakes;
    const isRakutenFallback = initialCmsSakes.length === 0 && rakutenSakes.length > 0;

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-[#1F1F1F] pb-24">
            {/* ── ヒーロー画像 ── */}
            <section className="w-full h-[45vh] overflow-hidden bg-[#F9F9F8]">
                {brewery.imageUrl ? (
                    <img src={brewery.imageUrl} alt={unescapeHtml(brewery.name)} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Wine size={64} strokeWidth={1} />
                    </div>
                )}
            </section>

            {/* ── コンテンツカード ── */}
            <section className="max-w-[900px] mx-auto -mt-[10vh] relative z-10 bg-white p-10 md:p-16 shadow-sm">
                <Link href={`/${type === 'shop' ? 'shop/search' : type}`} className="text-sm text-gray-400 mb-10 inline-block hover:text-[#1F1F1F] transition-colors tracking-widest font-bold">
                    ← 戻る
                </Link>

                <div className="text-center mb-10">
                    <p className="text-xs text-[#8B7D6B] tracking-[0.2em] uppercase mb-2">
                        {prefectureDisplay}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1F1F1F] font-serif leading-tight">
                        {unescapeHtml(brewery.name)}
                    </h1>
                </div>

                <hr className="border-t border-gray-100 mb-10" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-100 pb-10 mb-12">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 tracking-widest uppercase mb-1">住所</span>
                        <span className="text-sm">{addressDisplay}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 tracking-widest uppercase mb-1">電話番号</span>
                        <span className="text-sm">{phoneDisplay}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 tracking-widest uppercase mb-1">公式サイト</span>
                        {websiteDisplay ? (
                            <a href={websiteDisplay} target="_blank" rel="noopener noreferrer" className="text-sm text-[#8B7D6B] hover:underline">
                                リンク
                            </a>
                        ) : (
                            <span className="text-sm text-gray-300">-</span>
                        )}
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl font-serif mb-6 border-b border-gray-100 pb-2 text-[#1F1F1F]">
                        酒蔵について
                    </h2>
                    <p className="text-gray-700 leading-loose text-base whitespace-pre-wrap">
                        {plainDescription || '詳細情報がまだありません。'}
                    </p>
                </div>
                
                {/* ── 代表的な銘柄・商品 ── */}
                {(displaySakes.length > 0 || loadingRakuten) && (
                    <div className="mt-20">
                        <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-2">
                            <h2 className="text-2xl font-serif text-[#1F1F1F]">
                                代表的な銘柄
                            </h2>
                            {isRakutenFallback && (
                                <span className="text-[10px] text-gray-400">※楽天から自動取得</span>
                            )}
                        </div>

                        {loadingRakuten ? (
                            <div className="text-center py-10 text-gray-400 text-sm tracking-widest animate-pulse">
                                Loading items...
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {displaySakes.map((sake: any) => {
                                    const id = sake.id;
                                    const name = unescapeHtml(sake.name);
                                    const price = sake.price ? `¥${sake.price.toLocaleString()}` : 'オープン価格';
                                    const imageUrl = sake.imageUrl;
                                    
                                    const href = isRakutenFallback ? sake.affiliateUrl : `/nihonshu/${id}`;
                                    const targetProps = isRakutenFallback ? { target: "_blank", rel: "noopener noreferrer" } : {};

                                    const CardComponent = () => (
                                        <>
                                            <div className="aspect-[3/4] bg-[#F9F9F8] flex items-center justify-center p-4 overflow-hidden mb-4 transition-opacity group-hover:opacity-80">
                                                {imageUrl ? (
                                                    <img src={imageUrl} alt={name} className="max-h-full object-contain" />
                                                ) : (
                                                    <div className="text-gray-300">
                                                        <Wine size={32} strokeWidth={1} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-center px-2">
                                                <h3 className="text-sm font-bold text-[#1F1F1F] font-serif leading-relaxed h-[3em] overflow-hidden mb-1">
                                                    {name}
                                                </h3>
                                                <p className="text-[11px] text-gray-400">
                                                    {price}
                                                </p>
                                            </div>
                                        </>
                                    );

                                    return isRakutenFallback ? (
                                        <a href={href} key={id} {...targetProps} className="group block">
                                            <CardComponent />
                                        </a>
                                    ) : (
                                        <Link href={href} key={id} className="group block">
                                            <CardComponent />
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
