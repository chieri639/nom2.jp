'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { BREWERY } from '@/lib/microcms';
import { Search, MapPin, Loader2, Wine } from 'lucide-react';
import { fetchBreweriesAction } from '@/app/actions/brewery';

type Props = {
  initialBreweries: BREWERY[];
  totalCount: number;
};

const REGIONS = [
  'すべて',
  '北海道',
  '東北',
  '関東',
  '中部',
  '近畿',
  '中国',
  '四国',
  '九州・沖縄',
];

function unescapeHtml(text: string) {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/gi, "/")
    .replace(/&#x3D;/gi, "=");
}

export default function BreweryListClient({ initialBreweries, totalCount }: Props) {
  const [breweries, setBreweries] = useState<BREWERY[]>(initialBreweries);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('すべて');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialBreweries.length < totalCount);
  const [offset, setOffset] = useState(initialBreweries.length);
  
  const sentinelRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const loadMore = useCallback(async (currentOffset: number, q: string, region: string, reset = false) => {
    if (isLoading) return;
    setIsLoading(true);

    const res = await fetchBreweriesAction({
      q,
      region,
      offset: reset ? 0 : currentOffset,
      limit: 20,
    });

    if (res.success) {
      if (reset) {
        setBreweries(res.data);
        setOffset(res.data.length);
      } else {
        setBreweries(prev => [...prev, ...res.data]);
        setOffset(prev => prev + res.data.length);
      }
      setHasMore(res.hasMore);
    }
    setIsLoading(false);
  }, [isLoading]);

  // 初期化 & フィルタ変更時の処理
  const handleFilterChange = (q: string, region: string) => {
    setOffset(0);
    setHasMore(true);
    // スクロールをトップに戻す（UX向上のため）
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    loadMore(0, q, region, true);
  };

  // 検索入力（デバウンス処理）
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      handleFilterChange(val, selectedRegion);
    }, 500);
  };

  // リージョン変更
  const onRegionChange = (region: string) => {
    if (region === selectedRegion) return;
    setSelectedRegion(region);
    handleFilterChange(searchQuery, region);
  };

  // 無限スクロールの監視
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore(offset, searchQuery, selectedRegion);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, offset, searchQuery, selectedRegion, loadMore]);

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-shadow duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
          {/* Search Input */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#8B7D6B] transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="蔵名、銘柄、地域で検索..."
              className="w-full bg-white border border-gray-200 rounded-full py-3.5 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7D6B]/20 focus:border-[#8B7D6B] transition-all shadow-sm placeholder:text-gray-300"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => onRegionChange(region)}
                className={`
                  flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all
                  ${selectedRegion === region
                    ? 'bg-[#8B7D6B] text-white shadow-md'
                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                  }
                `}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Brewery Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {breweries.map((brewery) => {
             const plainContent = unescapeHtml(
                (brewery.content || '')
                    .replace(/<[^>]+>/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim()
            );

            return (
              <Link 
                href={`/brewery/${brewery.id}`} 
                key={brewery.id} 
                className="brewery-card group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-[box-shadow,transform] duration-500 flex flex-col h-full overflow-hidden"
              >
                {/* 16:9 Image Area */}
                <div className="aspect-[16/9] relative overflow-hidden bg-gray-50 border-b border-gray-50">
                  {/* Typography Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                     <span className="font-serif text-5xl font-black italic break-all text-center px-4 leading-none">
                        {brewery.name.replace(/公式|サイト|株式会社|有限会社|合名会社|合資会社|\(.*\)|（.*）/g, '').trim()}
                     </span>
                  </div>

                  {brewery.imageUrl ? (
                    <img 
                      src={brewery.imageUrl} 
                      alt={brewery.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                      <Wine size={48} strokeWidth={1} />
                    </div>
                  )}

                  {/* Prefecture Badge */}
                  {brewery.prefecture && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-[#8B7D6B] shadow-sm tracking-wider">
                      {brewery.prefecture}
                    </span>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-serif font-bold text-base text-[#1F1F1F] mb-1.5 group-hover:text-[#8B7D6B] transition-colors duration-200 line-clamp-1">
                    {unescapeHtml(brewery.name)}
                  </h3>
                  {brewery.address && (
                    <div className="flex items-center text-[10px] text-gray-400 font-medium mb-3">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="truncate">{brewery.address.replace(/^〒?\d{3}-\d{4}\s*/, '')}</span>
                    </div>
                  )}
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-4">
                    {plainContent}
                  </p>
                  
                  <div className="mt-auto pt-3 border-t border-gray-50 flex justify-end">
                    <span className="text-[10px] font-bold text-[#8B7D6B] flex items-center group-hover:translate-x-1 transition-transform duration-300">
                      VIEW DETAIL <span className="ml-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Empty State ── */}
        {!isLoading && breweries.length === 0 && (
          <div className="text-center py-40">
            <div className="bg-white/50 inline-block p-8 rounded-full mb-6">
              <Search className="w-12 h-12 text-gray-200 mx-auto" />
            </div>
            <p className="text-sm text-gray-400 tracking-widest uppercase">
              該当する酒蔵が見つかりません
            </p>
          </div>
        )}

        {/* ── Infinite Scroll Sentinel / Loading ── */}
        <div 
          ref={sentinelRef} 
          className="h-40 flex flex-col items-center justify-center mt-12 transition-opacity duration-300"
        >
          {isLoading && (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2">
              <Loader2 className="w-8 h-8 text-[#8B7D6B] animate-spin mb-3" />
              <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">Loading Archives</p>
            </div>
          )}
          {!hasMore && breweries.length > 0 && (
            <div className="flex flex-col items-center opacity-40">
              <div className="w-12 h-px bg-gray-300 mb-6"></div>
              <p className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase">End of Database</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
