import React from 'react';
import Link from 'next/link';
import { getBrands } from '@/lib/microcms';
import { Wine, ArrowRight, Tags } from 'lucide-react';
import DynamicBackButton from '@/components/layout/DynamicBackButton';

export const revalidate = 0;

export default async function BrandIndexPage() {
    let brands: any[] = [];
    try {
        const res = await getBrands({ limit: 100 });
        brands = res.contents || [];
    } catch (error) {
        console.error('Brand fetch error:', error);
    }

    return (
        <div className="min-h-screen pb-24">
            {/* ── イントロセクション ── */}
            <header className="px-6 pt-12 pb-12 text-center relative">
                <div className="max-w-4xl mx-auto">
                    <div className="absolute top-0 left-6 md:left-12">
                        <DynamicBackButton defaultHref="/" defaultText="BACK TO TOP" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif-jp font-bold tracking-[0.1em] text-[#1F1F1F] mb-6">
                        BRANDS
                    </h1>
                    <div className="w-12 h-1 bg-[#8B7D6B] mx-auto mb-6"></div>
                    <p className="text-sm text-gray-400 tracking-[0.3em] uppercase">
                        銘柄ごとの個性が響き合う
                    </p>
                </div>
            </header>

            {/* ── メインリスト ── */}
            <main className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {brands.map((brand) => (
                        <Link 
                            href={`/brand/${brand.id}`} 
                            key={brand.id} 
                            className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full transform-gpu"
                        >
                            {/* Brand Image / Icon Area */}
                            <div className="aspect-[16/9] relative overflow-hidden bg-gray-50 flex items-center justify-center">
                                {brand.imageUrl ? (
                                    <img 
                                        src={brand.imageUrl} 
                                        alt={brand.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                ) : (
                                    <div className="text-gray-200">
                                        <Wine size={64} strokeWidth={1} />
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-8 flex flex-col flex-grow">
                                <span className="text-[10px] font-bold text-[#8B7D6B] tracking-[0.2em] uppercase mb-2">BRAND</span>
                                <h2 className="text-xl font-bold text-[#1F1F1F] mb-4 group-hover:text-[#8B7D6B] transition-colors font-serif-jp line-clamp-1">
                                    {brand.name}
                                </h2>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-8 flex-grow">
                                    {(brand.content || '').replace(/<[^>]+>/g, ' ').trim()}
                                </p>
                                
                                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-300">
                                        <Tags size={12} /> COLLECTIVE
                                    </div>
                                    <span className="text-[10px] text-[#8B7D6B] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                        LINEUP VIEW <ArrowRight size={12} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {brands.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-gray-400 tracking-[0.2em]">NO BRANDS FOUND</p>
                    </div>
                )}
            </main>
        </div>
    );
}
