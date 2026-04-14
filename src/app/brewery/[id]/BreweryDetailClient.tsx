'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, MapPin, Globe, Image as ImageIcon } from 'lucide-react';
import { BREWERY } from '@/lib/microcms';

export default function BreweryDetailClient({ brewery, type = 'brewery' }: { brewery: BREWERY, type?: 'brewery' | 'brand' | 'shop' }) {
    const labels = {
        brewery: { title: '酒蔵一覧へ戻る', tag: '酒蔵', icon: <Building2 size={16} /> },
        brand: { title: '銘柄一覧へ戻る', tag: '銘柄', icon: <MapPin size={16} /> },
        shop: { title: '酒販店一覧へ戻る', tag: '酒販店', icon: <Globe size={16} /> }
    };
    
    const config = labels[type];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-50">
            {/* Minimalist Top Nav */}
            <nav className="fixed w-full z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href={`/${type === 'shop' ? 'shop/search' : type}`} className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors">
                        <ArrowLeft size={16} className="mr-2" />
                        {config.title}
                    </Link>
                </div>
            </nav>

            <main className="pt-20 pb-24">
                {/* Hero Section */}
                <div className="relative w-full h-[40vh] min-h-[300px] max-h-[500px] bg-slate-900 overflow-hidden">
                    {brewery.imageUrl ? (
                        <motion.img 
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.6 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src={brewery.imageUrl} 
                            alt={brewery.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800 opacity-50">
                            <ImageIcon size={64} className="text-slate-600" />
                        </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent dark:from-slate-900 dark:via-slate-900/40" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-center text-center">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-amber-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold shadow-lg"
                        >
                            {config.icon}
                            <span>{config.tag}</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white drop-shadow-sm tracking-tight"
                        >
                            {brewery.name}
                        </motion.h1>
                    </div>
                </div>

                {/* Content Section */}
                <article className="container mx-auto px-4 max-w-4xl -mt-8 relative z-10">
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8 md:p-12 lg:p-16"
                    >
                        {brewery.content && String(brewery.content).includes('<') ? (
                            <div 
                                className="custom-prose text-slate-700 dark:text-slate-300 rich-text"
                                dangerouslySetInnerHTML={{ __html: brewery.content }}
                            />
                        ) : (
                            <div className="custom-prose text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                                {brewery.content || '詳細情報がまだ登録されていません。'}
                            </div>
                        )}
                    </motion.div>
                </article>
            </main>
        </div>
    );
}
