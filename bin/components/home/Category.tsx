'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CATEGORIES = [
    { title: '記事を読む', link: '/article', img: '/images/washoku_pairing_hero_1.png' },
    { title: '酒蔵を知る', link: '/brewery', img: '/images/hokkaido_sake_hero.png' },
    { title: 'お酒を探す', link: '/nihonshu', img: '/images/traditional_ochoko_cup.png' },
    { title: 'お店を探す', link: '/shop', img: '/images/izakaya_sakelab.png' },
];

export default function Category() {
    return (
        <section className="py-24 bg-[#F0EEEB]">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="font-serif text-center text-3xl md:text-4xl tracking-[0.2em] mb-16 text-[#1F1F1F]"
                >
                    Category
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {CATEGORIES.map((cat, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group"
                        >
                            <Link href={cat.link} className="block text-center space-y-4">
                                <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative shadow-sm group-hover:shadow-lg transition-shadow duration-300 rounded-md">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={cat.img} 
                                        alt={cat.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-[#1F1F1F]/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <p className="text-[#1F1F1F] font-bold text-sm tracking-widest group-hover:text-[#BA9156] transition-colors">
                                    {cat.title}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
