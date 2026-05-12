'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

const REGIONS = [
  {
    id: 'hokkaido',
    name: '北海道',
    prefectures: ['北海道']
  },
  {
    id: 'tohoku',
    name: '東北',
    prefectures: ['青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県']
  },
  {
    id: 'kanto',
    name: '関東',
    prefectures: ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県']
  },
  {
    id: 'chubu',
    name: '中部',
    prefectures: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県']
  },
  {
    id: 'kansai',
    name: '関西',
    prefectures: ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県']
  },
  {
    id: 'chugoku_shikoku',
    name: '中国・四国',
    prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県']
  },
  {
    id: 'kyushu_okinawa',
    name: '九州・沖縄',
    prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県']
  }
];

function getTabRegion(pref: string): string {
  const chugoku = ['鳥取県', '島根県', '岡山県', '広島県', '山口県'];
  const shikoku = ['徳島県', '香川県', '愛媛県', '高知県'];
  if (chugoku.includes(pref)) return '中国';
  if (shikoku.includes(pref)) return '四国';
  
  const kinki = ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'];
  if (kinki.includes(pref)) return '近畿';
  
  const r = REGIONS.find(r => r.prefectures.includes(pref));
  return r ? r.name : 'すべて';
}

type Props = {
  onSelectPrefecture?: (pref: string, regionName: string) => void;
};

export default function BreweryMapUI({ onSelectPrefecture }: Props) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoverSource, setHoverSource] = useState<'map' | 'list' | null>(null);
  const regionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    // 地図からのホバー時のみ、該当のリストパネルへ自動スクロールする
    if (hoverSource === 'map' && hoveredRegion) {
      const el = regionRefs.current[hoveredRegion];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [hoveredRegion, hoverSource]);

  return (
    <section className="max-w-6xl mx-auto py-12 px-6 font-sans">
      
      {/* 検索ヘッダー */}
      <div className="text-center mb-8">
        <h2 className="text-xs font-bold text-[#8B7D6B] tracking-[0.4em] uppercase mb-4">Search by Map</h2>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1F1F1F]">地図から探す</h3>
      </div>

      {/* マップUIコンテナ */}
      <div className="bg-white rounded-lg border border-gray-100 p-6 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-10">
        
        {/* インタラクティブ日本地図 (SVG) */}
        <div className="flex items-center justify-center bg-[#F9F8F6] rounded-lg min-h-[350px] md:min-h-[450px] relative overflow-hidden group">
          <div className="text-[#8B7D6B] opacity-10 font-serif text-6xl md:text-8xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none tracking-widest z-0 transition-opacity duration-500">
            JAPAN
          </div>
          
          <div className="relative z-10 w-full max-w-[400px] aspect-square flex items-center justify-center">
            <svg 
              viewBox="0 0 400 400" 
              className="w-full h-full drop-shadow-sm"
              onMouseLeave={() => {
                setHoveredRegion(null);
                setHoverSource(null);
              }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* 北海道 */}
              <g 
                onMouseEnter={() => { setHoveredRegion('hokkaido'); setHoverSource('map'); }}
                className="cursor-pointer transition-all duration-300"
              >
                <rect x="270" y="30" width="80" height="70" rx="8" 
                  fill={hoveredRegion === 'hokkaido' ? '#8B7D6B' : '#E5E0D8'} 
                  stroke={hoveredRegion === 'hokkaido' ? '#fff' : 'none'} strokeWidth="2"
                  style={hoveredRegion === 'hokkaido' ? { filter: 'url(#glow)' } : {}}
                />
              </g>

              {/* 東北 */}
              <g 
                onMouseEnter={() => { setHoveredRegion('tohoku'); setHoverSource('map'); }}
                className="cursor-pointer transition-all duration-300"
              >
                <rect x="270" y="110" width="50" height="90" rx="8" 
                  fill={hoveredRegion === 'tohoku' ? '#8B7D6B' : '#E5E0D8'} 
                  stroke={hoveredRegion === 'tohoku' ? '#fff' : 'none'} strokeWidth="2"
                  style={hoveredRegion === 'tohoku' ? { filter: 'url(#glow)' } : {}}
                />
              </g>

              {/* 関東 */}
              <g 
                onMouseEnter={() => { setHoveredRegion('kanto'); setHoverSource('map'); }}
                className="cursor-pointer transition-all duration-300"
              >
                <rect x="270" y="210" width="60" height="60" rx="8" 
                  fill={hoveredRegion === 'kanto' ? '#8B7D6B' : '#E5E0D8'} 
                  stroke={hoveredRegion === 'kanto' ? '#fff' : 'none'} strokeWidth="2"
                  style={hoveredRegion === 'kanto' ? { filter: 'url(#glow)' } : {}}
                />
              </g>

              {/* 中部 */}
              <g 
                onMouseEnter={() => { setHoveredRegion('chubu'); setHoverSource('map'); }}
                className="cursor-pointer transition-all duration-300"
              >
                <rect x="210" y="150" width="50" height="90" rx="8" 
                  fill={hoveredRegion === 'chubu' ? '#8B7D6B' : '#E5E0D8'} 
                  stroke={hoveredRegion === 'chubu' ? '#fff' : 'none'} strokeWidth="2"
                  style={hoveredRegion === 'chubu' ? { filter: 'url(#glow)' } : {}}
                />
              </g>

              {/* 関西 */}
              <g 
                onMouseEnter={() => { setHoveredRegion('kansai'); setHoverSource('map'); }}
                className="cursor-pointer transition-all duration-300"
              >
                <rect x="150" y="190" width="50" height="60" rx="8" 
                  fill={hoveredRegion === 'kansai' ? '#8B7D6B' : '#E5E0D8'} 
                  stroke={hoveredRegion === 'kansai' ? '#fff' : 'none'} strokeWidth="2"
                  style={hoveredRegion === 'kansai' ? { filter: 'url(#glow)' } : {}}
                />
              </g>

              {/* 中国・四国 */}
              <g 
                onMouseEnter={() => { setHoveredRegion('chugoku_shikoku'); setHoverSource('map'); }}
                className="cursor-pointer transition-all duration-300"
              >
                <rect x="70" y="180" width="70" height="40" rx="8" 
                  fill={hoveredRegion === 'chugoku_shikoku' ? '#8B7D6B' : '#E5E0D8'} 
                  stroke={hoveredRegion === 'chugoku_shikoku' ? '#fff' : 'none'} strokeWidth="2"
                  style={hoveredRegion === 'chugoku_shikoku' ? { filter: 'url(#glow)' } : {}}
                />
                <rect x="90" y="230" width="50" height="30" rx="8" 
                  fill={hoveredRegion === 'chugoku_shikoku' ? '#8B7D6B' : '#E5E0D8'} 
                  stroke={hoveredRegion === 'chugoku_shikoku' ? '#fff' : 'none'} strokeWidth="2"
                  style={hoveredRegion === 'chugoku_shikoku' ? { filter: 'url(#glow)' } : {}}
                />
              </g>

              {/* 九州・沖縄 */}
              <g 
                onMouseEnter={() => { setHoveredRegion('kyushu_okinawa'); setHoverSource('map'); }}
                className="cursor-pointer transition-all duration-300"
              >
                <rect x="20" y="220" width="40" height="70" rx="8" 
                  fill={hoveredRegion === 'kyushu_okinawa' ? '#8B7D6B' : '#E5E0D8'} 
                  stroke={hoveredRegion === 'kyushu_okinawa' ? '#fff' : 'none'} strokeWidth="2"
                  style={hoveredRegion === 'kyushu_okinawa' ? { filter: 'url(#glow)' } : {}}
                />
                <rect x="10" y="320" width="30" height="20" rx="8" 
                  fill={hoveredRegion === 'kyushu_okinawa' ? '#8B7D6B' : '#E5E0D8'} 
                  stroke={hoveredRegion === 'kyushu_okinawa' ? '#fff' : 'none'} strokeWidth="2"
                  style={hoveredRegion === 'kyushu_okinawa' ? { filter: 'url(#glow)' } : {}}
                />
              </g>

            </svg>
          </div>
        </div>

        {/* 県名リストパネル */}
        <div 
          className="space-y-6 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar"
          onMouseLeave={() => { setHoveredRegion(null); setHoverSource(null); }}
        >
          {REGIONS.map((region) => (
            <div 
              key={region.id}
              ref={(el) => { regionRefs.current[region.id] = el; }}
              onMouseEnter={() => { setHoveredRegion(region.id); setHoverSource('list'); }}
              className={`transition-opacity duration-300 ${hoveredRegion && hoveredRegion !== region.id ? 'opacity-40' : 'opacity-100'}`}
            >
              <h4 className="text-sm font-serif font-bold text-[#8B7D6B] border-b border-gray-100 pb-2 mb-3">
                {region.name}
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                {region.prefectures.map((pref) => (
                  <button 
                    key={pref} 
                    onClick={() => {
                      if (onSelectPrefecture) {
                        onSelectPrefecture(pref, getTabRegion(pref));
                      }
                    }}
                    className={`text-[11px] text-left px-3 py-2 rounded transition-colors duration-200
                      ${hoveredRegion === region.id 
                        ? 'bg-[#8B7D6B]/10 text-[#8B7D6B] font-medium' 
                        : 'text-gray-500 hover:text-[#8B7D6B] hover:bg-gray-50'
                      }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
