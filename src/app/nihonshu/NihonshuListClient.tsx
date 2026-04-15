'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SAKE } from '@/lib/microcms';
import { Search, Wine } from 'lucide-react';

// ── ヘルパー ──────────────────────────────────
function cleanPrice(price: number | undefined | null): string {
  if (!price) return 'オープン価格';
  return `¥${price.toLocaleString()}`;
}

function cleanBrewery(brewery: string | undefined): string {
  if (!brewery || brewery === '価格') return '';
  return brewery;
}

// ── メインコンポーネント ───────────────────────
export default function NihonshuListClient({ sakes }: { sakes: SAKE[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return sakes;
    const q = query.toLowerCase();
    return sakes.filter((s) => {
      const haystack = `${s.name} ${s.brewery || ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [sakes, query]);

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* ── ヘッダー ── */}
      <header className="px-6 py-16 text-center relative">
        <div className="max-w-4xl mx-auto">
          <div className="absolute top-6 left-6 md:left-12">
            <Link href="/" className="inline-flex items-center text-xs text-gray-400 hover:text-[#1F1F1F] transition-colors tracking-widest uppercase font-bold">
              ← TOP
            </Link>
          </div>
          <h1 className="text-3xl font-serif font-black tracking-widest text-[#1F1F1F] mb-4">
            SAKE DATABASE
          </h1>
          <p className="text-sm text-gray-400 mb-10 tracking-widest uppercase">
            {sakes.length} Sakes
          </p>

          {/* 検索バー */}
          <div className="relative max-w-sm mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="銘柄・蔵名で検索"
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:border-gray-400 transition-colors shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* ── 件数バー ── */}
      <div className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-end">
          <span className="text-xs text-gray-400 tracking-wider">
            {filtered.length === sakes.length
              ? `全 ${sakes.length} 銘柄`
              : `${filtered.length} / ${sakes.length} 銘柄`}
          </span>
        </div>
      </div>

      {/* ── カードグリッド ── */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {filtered.map((sake) => {
            const breweryDisplay = cleanBrewery(sake.brewery);
            const priceDisplay = cleanPrice(sake.price);

            return (
              <Link href={`/nihonshu/${sake.id}`} key={sake.id} className="group cursor-pointer">
                {/* 画像エリア */}
                <div className="aspect-[3/4] bg-[#F9F9F8] flex items-center justify-center p-6 overflow-hidden transition-opacity group-hover:opacity-80">
                  {sake.imageUrl ? (
                    <img
                      src={sake.imageUrl}
                      alt={sake.name}
                      loading="lazy"
                      className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-gray-300">
                      <Wine size={48} strokeWidth={1} />
                    </div>
                  )}
                </div>

                {/* テキストエリア */}
                <div className="mt-5 text-center px-2">
                  <p className="text-[10px] text-[#8B7D6B] tracking-widest mb-2 uppercase min-h-[15px]">
                    {breweryDisplay}
                  </p>
                  <h3 className="text-[15px] font-bold leading-relaxed h-[3em] overflow-hidden text-[#1F1F1F] font-serif">
                    {sake.name}
                  </h3>
                  <p className="text-[12px] text-gray-400 mt-3 font-sans tracking-wider">
                    {priceDisplay}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 検索0件 */}
        {filtered.length === 0 && (
          <div className="text-center py-32 text-gray-400">
            <Wine size={48} strokeWidth={1} className="mx-auto mb-6 opacity-30" />
            <p className="text-sm tracking-widest">該当する銘柄が見つかりません</p>
          </div>
        )}
      </main>
    </div>
  );
}
