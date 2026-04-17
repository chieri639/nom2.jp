'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { fetchAllSakesAction } from '@/app/actions/sake';
import { SakeData, calculateSimilarity } from '@/lib/sake-logic';
import { Search, RefreshCw, Wine, ArrowRight, Star, MapPin } from 'lucide-react';

type SimilarSake = SakeData & {
    similarityScore: number;
    similarPoints: string[];
};

export default function SakeSimilarPage() {
    const [allSakes, setAllSakes] = useState<SakeData[]>([]);
    const [baseSake, setBaseSake] = useState<SakeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAllSakesAction().then(items => {
            setAllSakes(items);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const filteredSakes = useMemo(() => {
        if (!searchQuery.trim()) return allSakes;
        const q = searchQuery.toLowerCase();
        return allSakes.filter(s =>
            s.name.toLowerCase().includes(q) ||
            s.brewery.toLowerCase().includes(q)
        );
    }, [allSakes, searchQuery]);

    const similarSakes = useMemo(() => {
        if (!baseSake) return [];
        return allSakes
            .filter(s => s.id !== baseSake.id)
            .map(s => {
                const { score, similarPoints } = calculateSimilarity(baseSake, s);
                return { ...s, similarityScore: score, similarPoints };
            })
            .filter(s => s.similarityScore > 0)
            .sort((a, b) => b.similarityScore - a.similarityScore)
            .slice(0, 5);
    }, [baseSake, allSakes]);

    if (loading) {
        return (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-gray-400">
                <RefreshCw className="animate-spin" size={32} />
                <p className="text-sm font-bold tracking-[0.2em]">ANALYZING DATABASE...</p>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {!baseSake ? (
                <div className="p-8 md:p-12">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-serif-jp font-bold text-[#1F1F1F] mb-4">
                            基準となる日本酒を選択
                        </h2>
                        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-8">
                            SELECT YOUR FAVORITE BRAND
                        </p>
                        
                        <div className="relative max-w-2xl mx-auto md:mx-0">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="銘柄名、酒蔵名で検索..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 rounded-full bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B7D6B]/20 focus:bg-white transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                        {filteredSakes.map(s => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    setBaseSake(s);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="group flex flex-col p-6 text-left bg-white border border-gray-100 rounded-lg hover:border-[#8B7D6B] hover:shadow-md transition-all duration-300"
                            >
                                <span className="text-[10px] font-bold text-[#8B7D6B]/60 tracking-widest uppercase mb-1">BRAND</span>
                                <div className="font-bold text-[#1F1F1F] group-hover:text-[#8B7D6B] transition-colors mb-2">{s.name}</div>
                                <div className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-auto">
                                    <MapPin size={10} /> {s.brewery}
                                </div>
                            </button>
                        ))}
                        {filteredSakes.length === 0 && (
                            <div className="col-span-full py-12 text-center text-gray-400 italic text-sm">
                                一致する銘柄が見つかりませんでした。
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="anim-fade-in divide-y divide-gray-50">
                    <div className="p-8 md:p-12">
                        <button
                            onClick={() => setBaseSake(null)}
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#8B7D6B] hover:opacity-70 transition-opacity mb-8 tracking-widest uppercase"
                        >
                            <RefreshCw size={12} /> CHANGE SELECTION
                        </button>

                        <div className="mb-10">
                            <span className="text-[10px] font-bold text-[#8B7D6B] tracking-[0.2em] uppercase mb-4 block">RECOMMENDATION ENGINE</span>
                            <h2 className="text-2xl md:text-3xl font-serif-jp font-bold text-[#1F1F1F] leading-tight mb-6">
                                「{baseSake.name}」をお好みの方へ<br className="hidden md:block" />
                                味わいの近い推奨銘柄
                            </h2>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                                AIによる成分解析とデータベース（全{allSakes.length}件）との照合により、
                                特徴の類似性が高いトップ5銘柄を選定しました。
                            </p>
                        </div>

                        <div className="flex flex-col gap-8">
                            {similarSakes.map((s, idx) => (
                                <SakeItemCard key={s.id} sake={s} rank={idx + 1} />
                            ))}
                        </div>

                        {similarSakes.length === 0 && (
                            <div className="py-24 text-center text-gray-400 text-sm italic">
                                似ているお酒が現在データベースに見つかりませんでした。
                            </div>
                        )}
                    </div>

                    <div className="p-8 md:p-12 bg-gray-50/50 flex flex-col items-center">
                        <div className="w-10 h-px bg-gray-200 mb-6"></div>
                        <p className="text-[10px] text-gray-400 tracking-[0.4em] uppercase font-bold text-center">
                            nom × nom ai analytical database
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function SakeItemCard({ sake, rank }: { sake: SimilarSake; rank: number }) {
    return (
        <section className="flex flex-col md:flex-row gap-8 py-8 first:pt-0 group border-b border-gray-50 last:border-0 last:pb-0">
            {/* Image Area */}
            <div className="w-full md:w-48 aspect-[4/3] rounded-lg bg-gray-50 overflow-hidden relative flex-shrink-0 border border-gray-100 shadow-sm transform transition-transform duration-500 group-hover:scale-[1.02]">
                {sake.imageUrl ? (
                    <img
                        src={sake.imageUrl}
                        alt={sake.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-200 gap-2">
                        <Wine size={48} strokeWidth={1} />
                        <span className="text-[10px] font-bold tracking-widest">NO IMAGE</span>
                    </div>
                )}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center font-serif-jp text-sm font-bold shadow-lg">
                    {rank}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow flex flex-col">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Star size={12} className="text-[#8B7D6B]" fill="currentColor" />
                        <span className="text-[10px] font-bold text-[#8B7D6B] tracking-[0.2em] uppercase">MATCH RECOMMEND</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1F1F1F] mb-1 font-serif-jp group-hover:text-[#8B7D6B] transition-colors">
                        <Link href={`/nihonshu/${sake.oldId || sake.id}`} className="hover:underline">
                            {sake.name}
                        </Link>
                    </h3>
                    <p className="text-xs text-gray-400 font-bold">{sake.brewery}</p>
                </div>

                {/* Similarity Reason */}
                <div className="bg-[#F9F8F6] p-5 rounded-lg border border-gray-100/50 mb-6">
                    <p className="text-[10px] font-bold text-[#8B7D6B] tracking-widest uppercase mb-3 flex items-center gap-2">
                        <SparkleIcon /> SIMILAR POINTS
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                        {sake.similarPoints.map((p, i) => (
                            <li key={i} className="text-[13px] text-gray-600 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-[#8B7D6B] flex-shrink-0"></span>
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-sm text-gray-500 leading-relaxed mb-8 flex-grow">
                    {sake.description ? (
                        <p className="line-clamp-3">{sake.description}</p>
                    ) : (
                        <p className="italic text-gray-400">説明文の解析結果に基づき、香りと味わいの構成が基準銘柄と極めて近いことから選出されました。</p>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-auto">
                    {sake.purchaseUrl && (
                        <a
                            href={sake.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1F1F1F] text-white text-[11px] font-bold tracking-widest hover:bg-[#333] transition-all transform hover:-translate-y-0.5"
                        >
                            RAKUTEN SHOP <ArrowRight size={12} />
                        </a>
                    )}
                    <Link 
                        href={`/nihonshu/${sake.oldId || sake.id}`}
                        className="text-[11px] font-bold text-gray-400 hover:text-[#1F1F1F] transition-colors tracking-widest uppercase flex items-center gap-2"
                    >
                        DETAIL VIEW <ArrowRight size={12} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function SparkleIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        </svg>
    );
}
