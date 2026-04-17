'use client';

import React from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';

const STORE_ITEMS = [
    {
        id: '69e1e5e0fbf9f73f847f5803',
        variationId: '69e1e5e0fbf9f73f847f5804',
        name: '来福酒造「くるにゃん」オリジナルトートバック',
        price: '3,500 JPY',
        desc: '茨城県の来福酒造の公式ロゴ「くるにゃん」のデザインがあしらわれたトートバックです！四合瓶であれば４本程度が余裕で入ります。',
        layout: 'layout_c'
    },
    {
        id: '69e20f9ef3e168ad8db4b02b',
        variationId: '', 
        name: '来福酒造「くるにゃん」升',
        price: '650 JPY',
        desc: '茨城県の来福酒造の公式ロゴ「くるにゃん」のデザインがあしらわれました、升です！飾るのでもよし、何かの入れ物にしてもよし、お酒を入れる酒器もよし！',
        layout: 'layout_c'
    }
];

export default function Nom2Store() {
    return (
        <section className="py-24 bg-[#F9F8F6]">
            {/* STORES Button Script */}
            <Script 
                src="//btn.stores.jp/button.js" 
                strategy="lazyOnload"
                charSet="UTF-8"
            />

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 text-[#8B7D6B] text-[10px] font-bold tracking-[0.3em] uppercase mb-4"
                    >
                        <ShoppingBag size={14} /> NEW ARRIVAL
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif-jp text-3xl md:text-5xl font-bold tracking-[0.1em] text-[#1F1F1F]"
                    >
                        nom2.jp Web Store
                    </motion.h2>
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        className="w-16 h-1 bg-[#8B7D6B] mx-auto mt-6"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {STORE_ITEMS.map((item, index) => (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col h-full"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Star size={14} className="text-[#8B7D6B]" fill="currentColor" />
                                <span className="text-[10px] font-bold text-[#8B7D6B] tracking-[0.2em] uppercase">OFFICIAL PRODUCT</span>
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-serif-jp font-bold text-[#1F1F1F] mb-4">
                                {item.name}
                            </h3>
                            
                            <p className="text-sm text-gray-500 leading-loose mb-8 flex-grow">
                                {item.desc}
                            </p>

                            {/* STORES Widget Insertion Point */}
                            <div className="mt-auto pt-8 border-t border-gray-50">
                                <div 
                                    className="storesjp-button flex justify-center" 
                                    data-storesjp-item={item.id} 
                                    data-storesjp-variation={item.variationId} 
                                    data-storesjp-name="nom2jp" 
                                    data-storesjp-layout={item.layout} 
                                    data-storesjp-lang="ja"
                                ></div>
                                <p className="text-[10px] text-gray-400 text-center mt-4 tracking-widest uppercase">
                                    Secure checkout via STORES.jp
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <a 
                        href="https://nom2jp.stores.jp/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 text-xs font-bold text-[#8B7D6B] border-b border-[#8B7D6B] pb-2 hover:opacity-70 transition-opacity tracking-[0.2em] uppercase"
                    >
                        VISIT FULL STORE <Star size={12} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
