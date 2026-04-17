'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wine, MapPin, Phone, Globe, Info, CreditCard, Clock, Calendar } from 'lucide-react';
import { SHOP } from '@/lib/microcms';

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

export default function ShopDetailClient({ 
    shop,
    serverCleanedData 
}: { 
    shop: SHOP,
    serverCleanedData: { 
        description: string, 
        address: string, 
        phone: string, 
        website: string,
        business_hours: string,
        holiday: string,
        payment_method: string,
        facilities: string,
        instagram?: string,
        facebook?: string
    }
}) {
    const { 
        description, address, phone, website, 
        business_hours, holiday, payment_method, facilities 
    } = serverCleanedData;
    
    const displayUrlText = useMemo(() => {
        if (!website) return '';
        try {
            const urlObj = new URL(website.startsWith('http') ? website : `https://${website}`);
            return urlObj.hostname;
        } catch (e) {
            return website;
        }
    }, [website]);

    const infoList = [
        { label: '営業時間', value: business_hours, icon: Clock },
        { label: '定休日', value: holiday, icon: Calendar },
        { label: '設備', value: facilities, icon: Info },
        { label: '決済方法', value: payment_method, icon: CreditCard },
    ];

    return (
        <div className="bg-[#F9F8F6] min-h-screen font-sans text-[#333] pb-24">
            {/* ── Header ── */}
            <header className="max-w-4xl mx-auto pt-20 px-6">
                <Link href="/shop" className="text-xs text-[#8B7D6B] mb-12 inline-flex items-center gap-2 hover:opacity-70 transition-opacity duration-200 tracking-[0.2em] font-bold uppercase">
                    ← BACK TO SHOPS
                </Link>
                
                <div className="mt-8 text-center border-b border-gray-200/60 pb-16">
                    <p className="text-[10px] text-[#8B7D6B] mb-4 tracking-[0.4em] uppercase font-bold">
                        {shop.prefecture || 'SHOP'} / {shop.address?.includes('新潟') ? 'Niigata' : 'AREA'}
                    </p>
                    <h1 className="text-3xl md:text-5xl font-serif-jp font-bold tracking-wider leading-tight text-[#1F1F1F]">
                        {unescapeHtml(shop.name)}
                    </h1>
                    
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 mt-12 text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto">
                        <div className="text-left flex-1 min-w-[200px]">
                            <p className="font-bold text-[#8B7D6B] mb-2 tracking-widest uppercase flex items-center gap-1.5">
                                <MapPin size={12} /> 住所
                            </p>
                            <span className="text-[#555]">{address || '-'}</span>
                        </div>
                        <div className="text-left flex-1 min-w-[150px]">
                            <p className="font-bold text-[#8B7D6B] mb-2 tracking-widest uppercase flex items-center gap-1.5">
                                <Phone size={12} /> 電話番号
                            </p>
                            <span className="text-[#555] font-medium">{phone || '-'}</span>
                        </div>
                        <div className="text-left flex-1 min-w-[150px]">
                            <p className="font-bold text-[#8B7D6B] mb-2 tracking-widest uppercase flex items-center gap-1.5">
                                <Globe size={12} /> 公式サイト
                            </p>
                            {website && website !== '-' ? (
                                <a href={website} target="_blank" rel="noopener noreferrer" className="text-[#8B7D6B] underline decoration-[#8B7D6B]/30 underline-offset-4 hover:decoration-[#8B7D6B] transition-all">
                                    {displayUrlText}
                                </a>
                            ) : (
                                <span className="text-gray-300">-</span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-20 px-6">
                {/* ── About ── */}
                <section className="mb-24">
                    <h2 className="text-xl font-serif-jp font-bold mb-10 flex items-center text-[#1F1F1F]">
                        <span className="w-8 h-[1px] bg-[#8B7D6B] mr-4"></span>ショップについて
                    </h2>
                    <div className="text-[#555] leading-loose text-base md:text-lg space-y-6 whitespace-pre-wrap">
                        {description || 'ショップの詳細情報がまだありません。'}
                    </div>
                </section>

                {/* ── Recommendations ── */}
                <section className="mb-24">
                    <h2 className="text-xl font-serif-jp font-bold mb-12 flex items-center text-[#1F1F1F]">
                        <span className="w-8 h-[1px] bg-[#8B7D6B] mr-4"></span>おすすめ・取り扱い
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-500">
                            <div className="aspect-[16/9] bg-gray-50 relative overflow-hidden">
                                {shop.imageUrl ? (
                                    <Image 
                                        src={shop.imageUrl} 
                                        alt={shop.name} 
                                        fill 
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-100">
                                        <Wine size={64} strokeWidth={1} />
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg mb-3 text-[#1F1F1F] group-hover:text-[#8B7D6B] transition-colors">
                                    {unescapeHtml(shop.name)}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                    店主が厳選したこだわりの日本酒を豊富に取り揃えております。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Information ── */}
                <section>
                    <h2 className="text-xl font-serif-jp font-bold mb-10 flex items-center text-[#1F1F1F]">
                        <span className="w-8 h-[1px] bg-[#8B7D6B] mr-4"></span>営業情報
                    </h2>
                    <div className="bg-white rounded-xl border border-gray-100/50 shadow-sm p-8 md:p-12">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 text-sm">
                            {infoList.map((item, idx) => (
                                <div key={idx} className="flex flex-col border-b border-gray-50 pb-5">
                                    <dt className="flex items-center gap-2 font-bold text-[#8B7D6B] tracking-wider uppercase mb-3">
                                        <item.icon size={14} className="opacity-70" /> {item.label}
                                    </dt>
                                    <dd className="text-[#333] leading-relaxed pl-5 border-l-2 border-gray-50">
                                        {item.value && item.value !== '-' ? item.value : (
                                            <span className="text-gray-300 italic">情報がありません</span>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        
                        {(shop.instagram || shop.facebook) && (
                            <div className="mt-12 pt-8 border-t border-gray-50 flex items-center gap-6">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Follow us</p>
                                <div className="flex gap-4">
                                    {shop.instagram && (
                                        <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8B7D6B] font-bold hover:opacity-70 transition-opacity">INSTAGRAM</a>
                                    )}
                                    {shop.facebook && (
                                        <a href={shop.facebook} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8B7D6B] font-bold hover:opacity-70 transition-opacity">FACEBOOK</a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
