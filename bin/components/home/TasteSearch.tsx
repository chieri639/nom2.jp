'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TASTES = [
    { label: 'フルーティー', emoji: '🍊', query: 'フルーティ' },
    { label: '辛口 (Dry)', emoji: '⚡', query: '辛口' },
    { label: '芳醇 (Rich)', emoji: '🌾', query: '芳醇' },
    { label: 'スパークリング', emoji: '✨', query: 'スパークリング' },
];

export default function TasteSearch() {
    return (
        <section className="py-24 bg-[#1F1F1F] text-white">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="font-serif text-3xl md:text-4xl tracking-[0.2em] mb-4 text-white">
                        AI Taste Search
                    </h2>
                    <p className="text-[#A0A0A0] text-sm tracking-widest mb-16">
                        好みの味わいからAIが検索します
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {TASTES.map((taste, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Link 
                                href={`/search?q=${encodeURIComponent(taste.query)}`}
                                className="flex flex-col items-center justify-center p-8 bg-[#2A2A2A] hover:bg-[#BA9156] transition-colors duration-300 rounded-sm group h-full"
                            >
                                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {taste.emoji}
                                </span>
                                <span className="text-sm font-bold tracking-widest group-hover:text-white text-[#E0E0E0]">
                                    {taste.label}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
