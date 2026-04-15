'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Tag, Wine, ShoppingCart, Info, ExternalLink } from 'lucide-react';
import { SAKE } from '@/lib/microcms';

export default function SakeDetailClient({ sake }: { sake: SAKE }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-50">
            {/* Minimalist Top Nav */}
            <nav className="fixed w-full z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/nihonshu" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors">
                        <ArrowLeft size={16} className="mr-2" />
                        日本酒一覧へ戻る
                    </Link>
                </div>
            </nav>

            <main className="pt-24 pb-24">
                <article className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Left Column: Image with Glassmorphism */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="sticky top-32">
                                <div className="absolute inset-x-0 -top-10 -bottom-10 bg-indigo-500/10 dark:bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
                                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/10 dark:shadow-black/40 border border-white/30 dark:border-white/5 bg-white dark:bg-slate-800">
                                    {sake.imageUrl ? (
                                        <img 
                                            src={sake.imageUrl} 
                                            alt={sake.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800">
                                            <Wine size={64} opacity={0.2} className="mb-4" />
                                            <span>No Image</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Information */}
                        <div className="lg:col-span-7">
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="flex items-center px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-bold uppercase tracking-wider rounded-full shadow-sm">
                                        <MapPin size={14} className="mr-1.5" />
                                        蔵元
                                    </span>
                                    <span className="text-base font-bold text-slate-600 dark:text-slate-300">
                                        {sake.brewery || '情報なし'}
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-8 tracking-tight">
                                    {sake.name}
                                </h1>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-10 border-b border-slate-200 dark:border-slate-800">
                                    <div className="flex flex-col">
                                        <span className="text-sm uppercase font-bold tracking-widest text-slate-400 mb-1">参考価格</span>
                                        <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                            {sake.price ? `¥${sake.price.toLocaleString()}` : '--'}
                                        </span>
                                    </div>
                                    
                                    <a 
                                        href={`https://search.rakuten.co.jp/search/mall/${encodeURIComponent(sake.name)}/?v=2&scid=af_pc_etc&sc2id=af_103_1_10000645`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-900 text-base font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-600/20 dark:shadow-amber-500/20 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                                    >
                                        <ShoppingCart size={20} className="mr-2" />
                                        <span>購入を検討する</span>
                                        <ExternalLink size={16} className="ml-2 opacity-50" />
                                    </a>
                                </div>

                                <div className="custom-prose">
                                    <h3 className="flex items-center text-xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-indigo-500 dark:border-amber-500 pl-4 py-1" style={{marginTop:0}}>
                                        <Info size={22} className="mr-2 text-indigo-500 dark:text-amber-500 hidden sm:block" />
                                        この日本酒について
                                    </h3>
                                    
                                    {/* Handle both raw Text with newlines AND structured HTML */}
                                    {sake.description && String(sake.description).includes('<') ? (
                                        <div 
                                            className="text-slate-700 dark:text-slate-300 leading-relaxed rich-text"
                                            dangerouslySetInnerHTML={{ __html: sake.description }}
                                        />
                                    ) : (
                                        <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                            {sake.description || '詳細情報がまだ登録されていません。'}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                        
                    </div>
                </article>
            </main>
        </div>
    );
}
