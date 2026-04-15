'use client';

import React from 'react';
import Link from 'next/link';
import { Wine } from 'lucide-react';
import { SAKE } from '@/lib/microcms';

export default function SakeDetailClient({ sake }: { sake: SAKE }) {
    // 購入リンクのフォールバック
    const purchaseUrl = sake.purchaseUrl || `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(sake.name)}/?v=2&scid=af_pc_etc&sc2id=af_103_1_10000645`;

    // 不正なデータの除外
    const breweryDisplay = sake.brewery && sake.brewery !== '価格' ? sake.brewery : '';
    const priceDisplay = sake.price ? `¥${sake.price.toLocaleString()}` : 'オープン価格';

    // DescriptionからSTUDIOの定型文を除去する
    function cleanDescriptionHTML(html: string) {
        if (!html) return '詳細情報がまだありません。';
        
        let cleaned = html.replace(/^(<[^>]+>)*商品詳細(<\/[^>]+>|\s)*/, '');
        
        // カットオフキーワード（これ以降のテキストは不要なリンクリスト等なので削除）
        const cutOffs = ['購入ページへ（外部サイト）', 'その他商品一覧', '飲める・買えるお店'];
        let earliestIdx = cleaned.length;
        
        for (const word of cutOffs) {
            const idx = cleaned.indexOf(word);
            if (idx !== -1 && idx < earliestIdx) {
                earliestIdx = idx;
            }
        }
        
        cleaned = cleaned.substring(0, earliestIdx);
        return cleaned;
    }

    const cleanedDesc = cleanDescriptionHTML(sake.description);

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-[#1F1F1F]">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
              {/* 戻るリンク */}
              <div className="mb-10 lg:mb-16">
                <Link href="/nihonshu" className="inline-flex items-center text-xs text-gray-400 hover:text-[#1F1F1F] transition-colors tracking-widest uppercase font-bold">
                  ← Back to List
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                {/* 左側：商品画像 */}
                <div className="aspect-[3/4] bg-[#F9F9F8] flex items-center justify-center p-8 lg:p-12">
                  {sake.imageUrl ? (
                      <img 
                          src={sake.imageUrl} 
                          alt={sake.name} 
                          className="max-h-full object-contain drop-shadow-sm" 
                      />
                  ) : (
                      <div className="text-gray-300">
                          <Wine size={64} strokeWidth={1} />
                      </div>
                  )}
                </div>

                {/* 右側：商品情報 */}
                <div className="flex flex-col justify-center">
                  {/* 蔵元・都道府県 */}
                  <p className="text-xs text-[#8B7D6B] tracking-[0.2em] mb-4 uppercase min-h-[18px]">
                    {breweryDisplay}
                  </p>
                  
                  {/* 銘柄名 */}
                  <h1 className="text-3xl md:text-4xl font-bold text-[#1F1F1F] leading-tight mb-8 font-serif">
                    {sake.name}
                  </h1>
                  
                  {/* 価格 */}
                  <div className="mb-10">
                    <p className="text-[10px] text-gray-400 mb-1 tracking-widest uppercase font-bold">参考価格</p>
                    <p className="text-2xl font-sans tracking-tight text-[#1F1F1F]">
                        {priceDisplay}
                    </p>
                  </div>
                  
                  {/* アフィリエイト（購入）ボタン */}
                  <a 
                      href={purchaseUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block w-full text-center bg-[#1F1F1F] text-white py-4 text-sm font-bold tracking-widest hover:bg-black transition-colors mb-12 shadow-sm shadow-gray-900/10"
                  >
                    楽天で探す
                  </a>
                  
                  {/* 商品詳細 */}
                  <div className="prose prose-sm md:prose-base text-gray-600 leading-relaxed font-sans max-w-none">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-3 mb-5">
                        Description
                    </h3>
                    
                    {cleanedDesc.includes('<') ? (
                        <div 
                            className="rich-text"
                            dangerouslySetInnerHTML={{ __html: cleanedDesc }}
                        />
                    ) : (
                        <div className="whitespace-pre-wrap">
                            {cleanedDesc}
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}
