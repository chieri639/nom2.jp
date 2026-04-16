'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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

// ── 動的クリーニング関数 ──
function parseBreweryData(html: string, originalBrewery: any) {
    if (!html) return { description: '', address: originalBrewery.address, phone: originalBrewery.phone, website: originalBrewery.website || originalBrewery.url };

    let text = html
        .replace(/<br\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<figcaption>.*?<\/figcaption>/gi, '') // 画像のキャプションなどを除去
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x2F;/gi, "/")
        .replace(/&#x3D;/gi, "=");

    const noises = [
        'keyboard_arrow_leftpausekeyboard_arrow_right',
        '代表的な銘柄',
        '代表銘柄',
        '商品一覧',
        '酒蔵について',
        '酒蔵の紹介',
        '購入ページへ（外部サイト）',
        '飲める・買えるお店',
        '該当するリストがありません'
    ];
    noises.forEach(n => {
        text = text.replace(new RegExp(n, 'gi'), '');
    });

    let address: string | null = originalBrewery.address || null;
    let phone: string | null = originalBrewery.phone || null;
    let website: string | null = originalBrewery.website || originalBrewery.url || null;

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const cleanedLines = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // 商品の残骸をスキップ
        if (
            /(¥|円|\(税込\)|720ml|1800ml)/.test(line) ||
            /^(純米大吟醸|純米吟醸|大吟醸酒|特別純米|純米酒|本醸造|普通酒|生酒|にごり酒)$/.test(line)
        ) {
            continue;
        }

        // ラベルのみの行をスキップ
        if (/^(住所|所在地|電話番号|TEL|公式サイト|WEB|URL|営業時間|定休日)$/i.test(line)) {
            continue;
        }

        // Webサイト抽出
        if (/https?:\/\/[^\s]+/.test(line)) {
            if (!website) website = line.match(/(https?:\/\/[^\s]+)/)?.[1] || null;
            if (line.replace(/(https?:\/\/[^\s]+)/, '').replace(/公式サイト|URL|WEB/i, '').trim().length <= 2) continue;
        }

        // 電話番号抽出
        if (/(\d{2,4}-\d{2,4}-\d{3,4})/.test(line) || /TEL[:：]\s*\d+/.test(line)) {
            if (!phone) phone = line.match(/(\d{2,4}-\d{2,4}-\d{3,4})/)?.[1] || line.replace(/.*TEL[:：]\s*/i, '') || null;
            if (line.length < 25 && !line.includes('。')) continue;
        }

        // 住所抽出 (〒 か 住所というキーワード)
        if (/(〒\d{3}-\d{4})/.test(line)) {
            if (!address) address = line.replace(/^(住所|所在地)[:：]?\s*/, '').trim();
            if (!line.includes('。')) continue; // 住所だけの行はスキップ
        }

        // "[名前] / [地域] 住所" のようなCMS特有のヘッダー行をスキップ
        if (line.includes(originalBrewery.name) && line.includes('/') && (line.includes('市') || line.includes('県') || line.includes('道')) && line.length < 50 && !line.includes('。')) {
            continue;
        }

        cleanedLines.push(line);
    }

    let description = cleanedLines.join('\n\n').trim();

    return { description, address, phone, website };
}

export default function BreweryDetailClient({ brewery, initialCmsSakes = [], brands = [], type = 'brewery' }: { brewery: BREWERY, initialCmsSakes?: SAKE[], brands?: BRAND[], type?: 'brewery' | 'brand' | 'shop' }) {
    const [rakutenSakes, setRakutenSakes] = useState<any[]>([]);
    const [loadingRakuten, setLoadingRakuten] = useState(false);

    useEffect(() => {
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

    const { description: cleanDescription, address: extractedAddress, phone: extractedPhone, website: extractedWebsite } = parseBreweryData(brewery.content || '', brewery);
    
    // URL表示の整形
    let displayUrlText = extractedWebsite || '';
    if (displayUrlText.startsWith('http')) {
        try {
            const urlObj = new URL(displayUrlText);
            displayUrlText = urlObj.hostname;
        } catch (e) {
            // ignore
        }
    }

    const prefectureDisplay = brewery.prefecture || '日本';
    const finalAddress = extractedAddress || '-';
    const finalPhone = extractedPhone || '-';
    const finalWebsite = extractedWebsite || '';

    const displaySakes = initialCmsSakes.length > 0 ? initialCmsSakes : rakutenSakes;
    const isRakutenFallback = initialCmsSakes.length === 0 && rakutenSakes.length > 0;

    // 日本酒を銘柄ごとにグループ化
    const sakesByBrand: Record<string, SAKE[]> = {};
    if (!isRakutenFallback) {
        displaySakes.forEach((sake: SAKE) => {
            const bName = sake.brand || 'その他のお酒';
            if (!sakesByBrand[bName]) sakesByBrand[bName] = [];
            sakesByBrand[bName].push(sake);
        });
    }

    return (
        <div className="min-h-screen bg-[#F9F8F6] font-['Noto_Sans_JP'] text-[#333] pb-24">
            {/* ── ヒーロー画像 ── */}
            <section className="w-full h-[40vh] md:h-[50vh] overflow-hidden bg-[#F2F1EF]">
                {brewery.imageUrl ? (
                    <img src={brewery.imageUrl} alt={unescapeHtml(brewery.name)} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Wine size={64} strokeWidth={1} />
                    </div>
                )}
            </section>

            {/* ── コンテンツカード ── */}
            <section className="max-w-[1024px] mx-auto -mt-[8vh] relative z-10 bg-white p-8 md:p-16 rounded-xl shadow-sm border border-gray-100/50">
                <Link href={`/${type === 'shop' ? 'shop/search' : type}`} className="text-sm text-[#8B7D6B] mb-12 flex items-center gap-2 hover:opacity-70 transition-opacity font-medium">
                    <span className="text-xs">←</span> 酒蔵一覧へ戻る
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
                        <span className="text-sm leading-relaxed">{finalAddress}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-[#8B7D6B] tracking-widest uppercase font-bold">電話番号</span>
                        <span className="text-sm font-medium">{finalPhone}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-[#8B7D6B] tracking-widest uppercase font-bold">公式サイト</span>
                        {finalWebsite ? (
                            <a href={finalWebsite} target="_blank" rel="noopener noreferrer" className="text-sm text-[#8B7D6B] hover:underline break-all font-medium">
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
                            {cleanDescription || '詳細情報がまだありません。'}
                        </p>
                    </div>
                </div>
                
                {/* ── ブランド一覧 (銘柄データがある場合) ── */}
                {brands.length > 0 && (
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-serif-jp font-bold text-[#8B7D6B] whitespace-nowrap">
                                主要銘柄
                            </h2>
                            <div className="h-px flex-1 bg-gray-100"></div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {brands.map((brand) => (
                                <div key={brand.id} className="bg-white border border-[#8B7D6B]/20 px-6 py-3 rounded-lg shadow-sm">
                                    <span className="text-[#8B7D6B] font-bold font-serif-jp">{unescapeHtml(brand.name)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* ── 商品ラインナップ (銘柄別セクション) ── */}
                {(isRakutenFallback || Object.keys(sakesByBrand).length > 0 || loadingRakuten) && (
                    <div className="space-y-24">
                        {loadingRakuten ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#8B7D6B] border-t-transparent mb-4"></div>
                                <p className="text-xs text-gray-400 tracking-[0.2em]">LOADING COLLECTION</p>
                            </div>
                        ) : isRakutenFallback ? (
                            <div>
                                <div className="flex items-center gap-4 mb-12">
                                    <h2 className="text-2xl font-serif-jp font-bold text-[#8B7D6B] whitespace-nowrap">
                                        関連製品（自動取得）
                                    </h2>
                                    <div className="h-px flex-1 bg-gray-100"></div>
                                    <span className="text-[10px] text-gray-300">※楽天から自動取得</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {displaySakes.map((sake: any) => (
                                        <SakeCard key={sake.id} sake={sake} isRakuten={true} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            Object.entries(sakesByBrand).map(([brandName, sakes]) => (
                                <section key={brandName}>
                                    <div className="flex items-center gap-4 mb-12">
                                        <h2 className="text-2xl font-serif-jp font-bold text-[#8B7D6B] whitespace-nowrap">
                                            銘柄：{unescapeHtml(brandName)}
                                        </h2>
                                        <div className="h-px flex-1 bg-gray-100"></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {sakes.map((sake) => (
                                            <SakeCard key={sake.id} sake={sake} isRakuten={false} />
                                        ))}
                                    </div>
                                </section>
                            ))
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

function SakeCard({ sake, isRakuten }: { sake: any, isRakuten: boolean }) {
    const name = unescapeHtml(sake.name);
    const imageUrl = sake.imageUrl;
    const description = sake.description ? unescapeHtml(sake.description).replace(/<[^>]+>/g, '').trim() : '';
    const href = isRakuten ? sake.affiliateUrl : `/nihonshu/${sake.id}`;
    const targetProps = isRakuten ? { target: "_blank", rel: "noopener noreferrer" } : {};

    // スペックタグの抽出ロジック
    const extractTags = (text: string) => {
        const keywords = ["純米大吟醸", "大吟醸", "純米吟醸", "吟醸", "特別純米", "純米", "特別本醸造", "本醸造", "普通酒", "生酒", "原酒", "にごり", "スパークリング", "無濾過", "生原酒"];
        const found = keywords.filter(k => text.includes(k));
        // 重複除去（例：純米大吟醸が含まれるなら純米は表示しないなど）
        return found.filter((tag, index) => !found.some((other, otherIndex) => index !== otherIndex && other.includes(tag) && other !== tag));
    };

    const tags = extractTags(name);

    return (
        <Link href={href} {...targetProps} className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="aspect-[3/4] bg-[#f9f9f9] overflow-hidden relative border-b border-gray-50/50">
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={name} 
                        className="w-full h-full object-cover md:object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <Wine size={48} strokeWidth={1} />
                    </div>
                )}
                {isRakuten && (
                    <div className="absolute top-3 left-3">
                        <span className="bg-red-500/80 text-white text-[9px] px-2 py-0.5 rounded-full backdrop-blur-sm font-bold tracking-wider">RAKUTEN</span>
                    </div>
                )}
            </div>
            
            <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {tags.length > 0 ? tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-[#8B7D6B]/10 text-[#8B7D6B] rounded tracking-tighter">
                            {tag}
                        </span>
                    )) : (
                        <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-100 text-gray-400 rounded tracking-tighter">
                            REGULAR
                        </span>
                    )}
                </div>
                
                <h3 className="font-bold text-base leading-snug group-hover:text-[#8B7D6B] transition-colors mb-2 font-serif-jp h-[2.5em] overflow-hidden">
                    {name}
                </h3>
                
                <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
                    {description || `${unescapeHtml(sake.brewery)}が醸す、こだわりの一本です。`}
                </p>
                
                <div className="pt-3 flex items-center justify-between border-t border-gray-50">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        {isRakuten ? 'Purchase' : 'Detail'}
                    </span>
                    <span className="text-[11px] text-[#8B7D6B] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {isRakuten ? '楽天で探す' : '詳細を見る'} <span className="text-[8px]">→</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}

