'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wine } from 'lucide-react';
import { BREWERY, SAKE, BRAND } from '@/lib/microcms';
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

export default function BreweryDetailClient({ 
    brewery, 
    initialCmsSakes = [], 
    brands = [], 
    serverCleanedData,
    type = 'brewery' 
}: { 
    brewery: BREWERY, 
    initialCmsSakes?: SAKE[], 
    brands?: BRAND[], 
    serverCleanedData: { description: string, address: string, phone: string, website: string },
    type?: 'brewery' | 'brand' | 'shop' 
}) {
    const [rakutenSakes, setRakutenSakes] = useState<any[]>([]);
    const [loadingRakuten, setLoadingRakuten] = useState(false);

    useEffect(() => {
        // CMSデータが1件もない場合のみ楽天から取得
        if (initialCmsSakes.length === 0) {
            setLoadingRakuten(true);
            const searchName = unescapeHtml(brewery.name)
                .replace(/[（(].*?[）)]/g, '')
                .replace(/(株式会社|有限会社|合名会社|合資会社|（株）|\(株\))/g, '')
                .trim();
            
            fetchRakutenSakes(searchName).then(sakes => {
                setRakutenSakes(sakes || []);
            }).catch(e => {
                console.error("Rakuten fetch error:", e);
            }).finally(() => {
                setLoadingRakuten(false);
            });
        }
    }, [brewery.name, initialCmsSakes.length]);

    const { description, address, phone, website } = serverCleanedData;
    
    const displayUrlText = useMemo(() => {
        if (!website) return '';
        try {
            const urlObj = new URL(website.startsWith('http') ? website : `https://${website}`);
            return urlObj.hostname;
        } catch (e) {
            return website;
        }
    }, [website]);

    const prefectureDisplay = brewery.prefecture || '日本';
    const displaySakes = initialCmsSakes.length > 0 ? initialCmsSakes : rakutenSakes;
    const isRakutenFallback = initialCmsSakes.length === 0 && rakutenSakes.length > 0;

    // 銘柄ID -> 名称 のマップを作成
    const brandNameMap = useMemo(() => {
        const map: Record<string, string> = {};
        brands.forEach(b => {
            map[b.id] = b.name;
        });
        return map;
    }, [brands]);

    // 日本酒を銘柄ごとにグループ化
    const sakesByBrand = useMemo(() => {
        const groups: Record<string, SAKE[]> = {};
        if (!isRakutenFallback && displaySakes.length > 0) {
            displaySakes.forEach((sake: SAKE) => {
                // 1. 銘柄IDからの名称変換
                let bName = '';
                if (sake.brand && brandNameMap[sake.brand]) {
                    bName = brandNameMap[sake.brand];
                } 
                // 2. sake.brand フィールド自体に名称が入っている場合（「来福」「真向勝負」など）
                else if (sake.brand && sake.brand.trim().length > 0) {
                    bName = sake.brand.trim();
                }
                // 3. どちらもダメな場合、銘柄リストの1つ目、またはデフォルト
                else if (brands.length > 0) {
                    bName = brands[0].name;
                } else {
                    bName = 'その他の日本酒';
                }
                
                if (!groups[bName]) groups[bName] = [];
                groups[bName].push(sake);
            });
        }
        return groups;
    }, [displaySakes, isRakutenFallback, brandNameMap, brands]);

    const showLineupSection = loadingRakuten || isRakutenFallback || Object.keys(sakesByBrand).length > 0;

    return (
        <div className="min-h-screen bg-[#F9F8F6] font-['Noto_Sans_JP'] text-[#333] pb-24">
            {/* ── ヒーロー画像 ── */}
            <section className="w-full h-[40vh] md:h-[50vh] overflow-hidden bg-[#F2F1EF]">
                {brewery.imageUrl ? (
                    <Image 
                        src={brewery.imageUrl} 
                        alt={unescapeHtml(brewery.name)} 
                        fill
                        priority={true}
                        sizes="100vw"
                        className="object-cover" 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Wine size={64} strokeWidth={1} />
                    </div>
                )}
            </section>

            {/* ── コンテンツカード ── */}
            <section className="max-w-[1024px] mx-auto -mt-[8vh] relative z-10 bg-white p-8 md:p-16 rounded-xl shadow-sm border border-gray-100/50 mb-12">
                <Link href={`/${type === 'shop' ? 'shop/search' : type}`} className="text-sm text-[#8B7D6B] mb-12 flex items-center gap-2 hover:opacity-70 transition-opacity duration-200 font-medium">
                    <span className="text-xs">←</span> {type === 'shop' ? 'ショップ一覧' : '酒蔵一覧'}へ戻る
                </Link>

                <div className="text-center mb-12">
                    <p className="text-[10px] text-[#8B7D6B] tracking-[0.3em] uppercase mb-3 font-bold">
                        {prefectureDisplay}
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-[#1F1F1F] font-serif-jp leading-tight">
                        {unescapeHtml(brewery.name)}
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-gray-100 mb-16">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-[#8B7D6B] tracking-widest uppercase font-bold">住所</span>
                        <span className="text-sm leading-relaxed">{address || '-'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-[#8B7D6B] tracking-widest uppercase font-bold">電話番号</span>
                        <span className="text-sm font-medium">{phone || '-'}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-[#8B7D6B] tracking-widest uppercase font-bold">公式サイト</span>
                        {website ? (
                            <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#8B7D6B] hover:underline break-all font-medium">
                                {displayUrlText}
                            </a>
                        ) : (
                            <span className="text-sm text-gray-300">-</span>
                        )}
                    </div>
                </div>

                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-serif-jp font-bold text-[#8B7D6B] whitespace-nowrap">
                            酒蔵について
                        </h2>
                        <div className="h-px flex-1 bg-gray-100"></div>
                    </div>
                    <div className="prose max-w-none text-gray-600 leading-loose text-sm md:text-base">
                        <p className="whitespace-pre-wrap">
                            {description || '詳細情報がまだありません。'}
                        </p>
                    </div>
                </div>

                {/* ── 商品ラインナップ (銘柄別セクション) ── */}
                {showLineupSection && (
                    <div className="space-y-24">
                        {loadingRakuten ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#8B7D6B] border-t-transparent mb-4"></div>
                                <p className="text-xs text-gray-400 tracking-[0.2em]">LOADING COLLECTION</p>
                            </div>
                        ) : isRakutenFallback ? (
                            <div>
                                <div className="flex items-center gap-4 mb-10">
                                    <h2 className="text-2xl font-serif-jp font-bold text-[#8B7D6B] whitespace-nowrap">
                                        関連製品（外部サイト）
                                    </h2>
                                    <div className="h-[1px] flex-1 bg-gray-200"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {rakutenSakes.map((sake: any) => (
                                        <SakeCard key={sake.id} sake={sake} isRakuten={true} breweryName={unescapeHtml(brewery.name)} />
                                    ))}
                                </div>
                            </div>
                        ) : Object.keys(sakesByBrand).length > 0 ? (
                            Object.entries(sakesByBrand).map(([brandName, sakes]) => (
                                <section key={brandName}>
                                    <div className="flex items-center gap-4 mb-10">
                                        <h2 className="text-2xl font-serif-jp font-bold text-[#8B7D6B] whitespace-nowrap">
                                            銘柄：{unescapeHtml(brandName)}
                                        </h2>
                                        <div className="h-[1px] flex-1 bg-gray-200"></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {sakes.map((sake) => (
                                            <SakeCard key={sake.id} sake={sake} isRakuten={false} breweryName={unescapeHtml(brewery.name)} />
                                        ))}
                                    </div>
                                </section>
                            ))
                        ) : (
                            <div className="text-center py-12 text-gray-400">
                                日本酒の情報がまだありません。
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

// 指示書に基づいた新しい酒販カードUI
const SakeCard = React.memo(({ sake, isRakuten, breweryName }: { sake: any, isRakuten: boolean, breweryName: string }) => {
    const name = unescapeHtml(sake.name);
    const imageUrl = sake.imageUrl;
    
    const description = useMemo(() => 
        sake.description ? unescapeHtml(sake.description).replace(/<[^>]+>/g, '').trim() : ''
    , [sake.description]);

    const href = isRakuten ? sake.affiliateUrl : `/nihonshu/${sake.oldId || sake.id}`;
    const targetProps = isRakuten ? { target: "_blank", rel: "noopener noreferrer" } : {};

    const tags = useMemo(() => {
        const keywords = ["純米大吟醸", "大吟醸", "純米吟醸", "吟醸", "特別純米", "純米", "特別本醸造", "本醸造", "普通酒", "生酒", "原酒", "にごり", "スパークリング", "無濾過", "生原酒"];
        const found = keywords.filter(k => name.includes(k));
        // より長い名前を優先（例：純米大吟醸が含まれていたら純米は含めない）
        return found.filter((tag, index) => !found.some((other, otherIndex) => index !== otherIndex && other.includes(tag) && other !== tag));
    }, [name]);

    return (
        <Link href={href} {...targetProps} className="group bg-white rounded-lg border border-[#F3F4F6] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full transform-gpu">
            {/* 3:4比率の画像エリア */}
            <div className="aspect-[3/4] bg-[#f9f9f9] overflow-hidden relative">
                {imageUrl ? (
                    <Image 
                        src={imageUrl} 
                        alt={name} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-100 bg-gray-50">
                        <Wine size={64} strokeWidth={1} />
                    </div>
                )}
                {/* 以前あった左上のソースタグは不要とのことで削除しました */}
            </div>
            
            <div className="p-5 flex flex-col flex-1">
                {/* タブ形式の属性表示 */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {tags.length > 0 ? tags.map(tag => (
                        <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-[#8B7D6B]/10 text-[#8B7D6B] rounded">
                            {tag}
                        </span>
                    )) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
                            製品
                        </span>
                    )}
                </div>
                
                <h3 className="font-bold text-lg leading-tight group-hover:text-[#8B7D6B] transition-colors mb-2 font-serif-jp line-clamp-2 h-[2.5em]">
                    {name}
                </h3>
                
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
                    {description || `${breweryName}が醸す、こだわりの一本です。`}
                </p>
                
                <div className="pt-2 flex items-center justify-between border-t border-gray-50 mt-2">
                    <span className="text-xs font-bold text-gray-300">
                        {isRakuten ? (sake.price ? `約¥${sake.price.toLocaleString()}` : '720ml / 1.8L') : '720ml / 1.8L'}
                    </span>
                    <span className="text-xs text-[#8B7D6B] font-bold group-hover:translate-x-1 transition-transform">
                        詳細を見る →
                    </span>
                </div>
            </div>
        </Link>
    );
});

