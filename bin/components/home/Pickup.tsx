'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MOCK_PICKUPS = [
    {
        id: '1',
        tag: '特集',
        title: 'AIが選ぶ、魚料理に合う日本酒5選',
        image: 'https://images.unsplash.com/photo-1623065611411-dc45ba3ed5f4?auto=format&fit=crop&q=80&w=600',
        link: '/article/fish-pairing'
    },
    {
        id: '2',
        tag: '知識',
        title: '「純米」と「大吟醸」の違い、知っていますか？',
        image: 'https://images.unsplash.com/photo-1541544426514-c1157297e59c?auto=format&fit=crop&q=80&w=600',
        link: '/article/junmai-daiginjo'
    },
    {
        id: '3',
        tag: '蔵紹介',
        title: '歴史を紡ぐ、伝統の蔵を訪ねて',
        image: 'https://images.unsplash.com/photo-1510419356345-42cf6347c0b0?auto=format&fit=crop&q=80&w=600',
        link: '/article/brewery-visit'
    }
];

export default function Pickup({ articles }: { articles?: any[] }) {
    const displayItems = articles && articles.length > 0 ? articles.slice(0, 3).map(a => ({
        id: a.id,
        tag: a.category || '特集',
        title: a.title,
        image: a.imageUrl || 'https://images.unsplash.com/photo-1623065611411-dc45ba3ed5f4?auto=format&fit=crop&q=80&w=600',
        link: `/article/${a.id}`
    })) : MOCK_PICKUPS;

    return (
        <section className="py-24 bg-[#FDFDFD]">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="font-serif text-center text-3xl md:text-4xl tracking-[0.2em] mb-16 text-[#1F1F1F]"
                >
                    Pick up
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {displayItems.map((item, index) => (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group cursor-pointer"
                        >
                            <Link href={item.link} className="block">
                                <div className="aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative rounded-md">
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>
                                <div className="space-y-3 px-2">
                                    <p className="text-[#5D5D5D] text-xs font-bold tracking-widest bg-[#F0EEEB] inline-block px-3 py-1">
                                        [{item.tag}]
                                    </p>
                                    <h3 className="text-[#1F1F1F] font-bold text-lg leading-relaxed group-hover:text-[#BA9156] transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
