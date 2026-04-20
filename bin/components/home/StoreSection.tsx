'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PRODUCTS = [
    {
        id: '69e1e5e0fbf9f73f847f5803',
        variation: '69e1e5e0fbf9f73f847f5804',
        name: '来福酒造「くるにゃん」オリジナルトートバック',
        price: '¥3,500',
        description: '茨城県の来福酒造の公式ロゴ「くるにゃん」のデザインがあしらわれたトートバックです！四合瓶であれば４本程度が余裕で入ります。',
        image: 'https://imagedelivery.net/QondspN4HIUvB_R16-ddAQ/69e1e0a46396ba197b092865/b32117c8ff89b0458a32.png/fit=cover,w=920,h=920'
    },
    {
        id: '69e20f9ef3e168ad8db4b02b',
        variation: '69e20f9ef3e168ad8db4b02c',
        name: '来福酒造「くるにゃん」升',
        price: '¥650',
        description: '茨城県の来福酒造の公式ロゴ「くるにゃん」のデザインがあしらわれました、升です！飾るのでもよし、何かの入れ物にしてもよし、お酒を入れる酒器もよし！',
        image: 'https://imagedelivery.net/QondspN4HIUvB_R16-ddAQ/69e1e0a46396ba197b092865/fc72becf998e5bc021ec.jpg/fit=cover,w=920,h=920'
    }
];

export default function StoreSection() {
    useEffect(() => {
        // STORES.jpのボタンはスクリプトでiframeを生成するため、マウント後にアクセシビリティ用のタイトルを付与
        const timer = setInterval(() => {
            const iframes = document.querySelectorAll('iframe.storesjp-button-cart');
            if (iframes.length > 0) {
                iframes.forEach((iframe, idx) => {
                    if (!iframe.getAttribute('title')) {
                        iframe.setAttribute('title', `STORES 決済ボタン ${idx + 1}`);
                    }
                });
                // タイトル付与完了したらインターバルをクリア
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-[#F9F8F6]">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-4xl tracking-[0.2em] mb-4 text-[#1F1F1F]">
                        nom2.jp 販売商品
                    </h2>
                    <div className="w-12 h-1 bg-[#BA9156] mx-auto opacity-60"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="bg-white rounded-lg border border-[#F3F4F6] overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-[#1F1F1F] mb-1 font-serif">
                                        {product.name}
                                    </h3>
                                    <p className="text-[#BA9156] font-bold text-lg">
                                        {product.price} <span className="text-xs font-normal text-gray-400 font-sans tracking-normal">(税込)</span>
                                    </p>
                                </div>
                                <p className="text-gray-500 text-sm leading-loose mb-8 flex-grow">
                                    {product.description}
                                </p>
                                
                                <div className="flex justify-center mt-auto border-t pt-8 border-[#F9F8F6]">
                                    {/* STORES.jp Button Container */}
                                    <div 
                                        className="storesjp-button" 
                                        data-storesjp-item={product.id} 
                                        data-storesjp-variation={product.variation} 
                                        data-storesjp-name="nom2jp" 
                                        data-storesjp-layout="layout_c" 
                                        data-storesjp-lang="ja"
                                    ></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
