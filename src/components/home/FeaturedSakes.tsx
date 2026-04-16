'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MOCK_SAKES = [
    {
        id: '1',
        brewery: '旭酒造',
        name: '獺祭 純米大吟醸 磨き二割三分',
        tags: ['#フルーティー', '#甘口'],
        image: 'https://images.unsplash.com/photo-1569485741656-78e87ad3eb28?auto=format&fit=crop&q=80&w=400',
        rakutenUrl: 'https://search.rakuten.co.jp/search/mall/%E7%8D%AD%E7%A5%AD+%E7%B4%94%E7%B1%B3%E5%A4%A7%E5%90%9F%E9%86%B8/'
    },
    {
        id: '2',
        brewery: '新政酒造',
        name: 'No.6 X-type',
        tags: ['#モダン', '#酸味'],
        image: 'https://images.unsplash.com/photo-1544146950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
        rakutenUrl: 'https://search.rakuten.co.jp/search/mall/%E6%96%B0%E6%94%BF+No.6/'
    },
    {
        id: '3',
        brewery: '黒龍酒造',
        name: '黒龍 石田屋',
        tags: ['#芳醇', '#辛口'],
        image: 'https://images.unsplash.com/photo-1574621100236-d25b64dcdaec?auto=format&fit=crop&q=80&w=400',
        rakutenUrl: 'https://search.rakuten.co.jp/search/mall/%E9%BB%92%E9%BE%8D+%E7%9F%B3%E7%94%B0%E5%B1%8B/'
    }
];

export default function FeaturedSakes({ sakes = MOCK_SAKES }: { sakes?: any[] }) {
    // Override with real data if provided
    const displaySakes = sakes && sakes.length > 0 ? sakes.slice(0, 3).map(s => ({
        id: s.id,
        oldId: s.oldId,
        brewery: s.brewery || '不明',
        name: s.name,
        tags: ['#おすすめ'], // Simplified tag logic for real data
        image: s.imageUrl || 'https://images.unsplash.com/photo-1569485741656-78e87ad3eb28?auto=format&fit=crop&q=80&w=400',
        rakutenUrl: s.purchaseUrl || `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(s.name)}/`
    })) : MOCK_SAKES;

    return (
        <section className="py-24 bg-[#FDFDFD]">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="font-serif text-center text-3xl md:text-4xl tracking-[0.2em] mb-16 text-[#1F1F1F]"
                >
                    Featured Sakes
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {displaySakes.map((sake, index) => (
                        <motion.div 
                            key={sake.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="flex flex-col h-full"
                        >
                            <Link href={`/nihonshu/${sake.oldId || sake.id}`} className="block flex-grow group">
                                <div className="aspect-square bg-gray-100 mb-6 overflow-hidden relative shadow-sm rounded-md">
                                    <img 
                                        src={sake.image} 
                                        alt={sake.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[#A0A0A0] text-xs font-bold tracking-widest">
                                        {sake.brewery}
                                    </p>
                                    <h3 className="text-[#1F1F1F] font-bold text-lg leading-relaxed group-hover:text-[#BA9156] transition-colors">
                                        {sake.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {sake.tags.map((tag: string, i: number) => (
                                            <span key={i} className="text-[#5D5D5D] text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>

                            <div className="mt-8">
                                <a 
                                    href={sake.rakutenUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block w-full bg-[#1F1F1F] hover:bg-[#444] text-white text-center py-3 text-sm font-bold tracking-widest transition-colors duration-300 shadow-md rounded-md"
                                >
                                    楽天で見る
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="text-center mt-16">
                    <Link 
                        href="/nihonshu" 
                        className="inline-block border border-[#1F1F1F] text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white px-8 py-4 text-sm font-bold tracking-widest transition-colors duration-300 rounded-md"
                    >
                        日本酒一覧を見る
                    </Link>
                </div>
            </div>
        </section>
    );
}
