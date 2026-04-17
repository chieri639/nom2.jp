import React from 'react';
import Link from 'next/link';
import { getShops } from '@/lib/microcms';
import { MapPin, Phone, ExternalLink, Info, Store } from 'lucide-react';
import DynamicBackButton from '@/components/layout/DynamicBackButton';

export const revalidate = 0;

function unescapeHtml(text: string) {
    if (!text) return '';
    return text
        .replace(/<br\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

export default async function ShopIndexPage() {
    let shops: any[] = [];
    try {
        const res = await getShops({ limit: 100 });
        shops = res.contents || [];
    } catch (error) {
        console.error('Shop fetch error:', error);
    }

    return (
        <div className="min-h-screen bg-[#F9F8F6] pb-24">
            {/* ── イントロセクション ── */}
            <header className="px-6 pt-12 pb-12 text-center relative">
                <div className="max-w-4xl mx-auto">
                    <div className="absolute top-0 left-6 md:left-12">
                        <DynamicBackButton defaultHref="/" defaultText="BACK TO TOP" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif-jp font-bold tracking-[0.1em] text-[#1F1F1F] mb-6">
                        SHOPS
                    </h1>
                    <div className="w-12 h-1 bg-[#8B7D6B] mx-auto mb-6"></div>
                    <p className="text-sm text-gray-400 tracking-[0.3em] uppercase">
                        厳選された日本酒と出会える場所
                    </p>
                </div>
            </header>

            {/* ── メインリスト ── */}
            <main className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {shops.map((shop) => (
                        <Link 
                            href={`/shop/${shop.id}`} 
                            key={shop.id} 
                            className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full transform-gpu"
                        >
                            {/* 16:9 Image Area */}
                            <div className="aspect-[16/9] relative overflow-hidden bg-gray-50 border-b border-gray-50">
                                {shop.imageUrl ? (
                                    <img 
                                        src={shop.imageUrl} 
                                        alt={shop.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                                        <Store size={48} strokeWidth={1} />
                                    </div>
                                )}
                                
                                {shop.prefecture && (
                                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-[#8B7D6B] shadow-sm tracking-wider">
                                        {shop.prefecture}
                                    </span>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-[10px] font-bold text-[#8B7D6B] tracking-[0.2em] uppercase mb-2">SHOP</span>
                                <h2 className="text-lg font-bold text-[#1F1F1F] mb-3 group-hover:text-[#8B7D6B] transition-colors font-serif-jp line-clamp-1">
                                    {shop.name}
                                </h2>
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
                                    {unescapeHtml(shop.content).substring(0, 100)}...
                                </p>
                                
                                <div className="space-y-2 pt-4 border-t border-gray-50">
                                    {shop.address && (
                                        <div className="flex items-start text-[10px] text-gray-400">
                                            <MapPin size={12} className="mr-2 mt-0.5 shrink-0" />
                                            <span className="line-clamp-1">{shop.address}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[10px] font-bold text-gray-300">DETAILS VIEW</span>
                                        <span className="text-[10px] text-[#8B7D6B] font-bold group-hover:translate-x-1 transition-transform">
                                            詳細を見る →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {shops.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-gray-400 tracking-[0.2em]">NO SHOPS FOUND</p>
                    </div>
                )}
            </main>
        </div>
    );
}
