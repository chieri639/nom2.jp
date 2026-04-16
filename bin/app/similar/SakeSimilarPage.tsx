'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { fetchAllSakesAction } from '@/app/actions/sake';
import { SakeData, calculateSimilarity } from '@/lib/sake-logic';

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
        return <div style={{ color: '#fff', padding: 40, textAlign: 'center' }}>読み込み中...</div>;
    }

    return (
        <div style={{ color: '#fff' }}>
            {!baseSake ? (
                <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>基準となる日本酒を選んでください</h2>
                    <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 16 }}>銘柄名や酒蔵名で検索できます</p>

                    <div style={{ marginBottom: 20 }}>
                        <input
                            type="text"
                            placeholder="例: 浦霞, 獺祭, 新政..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: 12,
                                background: '#222',
                                border: '1px solid #444',
                                color: '#fff',
                                fontSize: 15,
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gap: 10, maxHeight: 500, overflowY: 'auto', paddingRight: 4 }}>
                        {filteredSakes.map(s => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    setBaseSake(s);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                style={sakeSelectBtn}
                            >
                                <div style={{ fontWeight: 700 }}>{s.name}</div>
                                <div style={{ fontSize: 11, opacity: 0.6 }}>{s.brewery}</div>
                            </button>
                        ))}
                        {filteredSakes.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.5 }}>一致する銘柄が見つかりませんでした</div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="anim-fade-in">
                    <button
                        onClick={() => setBaseSake(null)}
                        style={{ background: 'none', border: 'none', color: '#888', marginBottom: 16, cursor: 'pointer', fontSize: 13 }}
                    >
                        ← 選び直す
                    </button>

                    <div style={{ marginBottom: 24 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3 }}>
                            「{baseSake.name}」<br />
                            <span style={{ fontSize: 18, opacity: 0.9 }}>が好きな方におすすめの日本酒</span>
                        </h2>
                        <p style={{ opacity: 0.75, marginTop: 12, fontSize: 14, lineHeight: 1.6 }}>
                            AI診断システムが最新の銘柄データベース（全{allSakes.length}件）を分析し、<br />
                            味わいの傾向から最適な銘柄を選びました。
                        </p>
                    </div>

                    <div>
                        {similarSakes.map((s, idx) => (
                            <SakeItemCard key={s.id} sake={s} rank={idx + 1} />
                        ))}
                    </div>

                    {similarSakes.length === 0 && (
                        <div style={{ padding: 40, textAlign: 'center', opacity: 0.5 }}>
                            似ているお酒が見つかりませんでした。<br/>
                            説明文のキーワードから判定しています。
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function SakeItemCard({ sake, rank }: { sake: SimilarSake; rank: number }) {
    return (
        <section style={{
            background: '#fff',
            color: '#111',
            borderRadius: 20,
            padding: 20,
            marginBottom: 16,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
            <div style={{ display: 'flex', gap: 14 }}>
                {/* 画像 */}
                <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: 14,
                    flexShrink: 0,
                    background: '#f5f5f5',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                  {sake.imageUrl ? (
                      <img
                          src={sake.imageUrl}
                          alt={sake.name}
                          style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                          }}
                      />
                  ) : (
                    <span style={{ fontSize: 10, opacity: 0.3 }}>No Image</span>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.2 }}>
                        <Link href={`/nihonshu/${sake.oldId || sake.id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline">
                            {rank}. {sake.name}
                        </Link>
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4, marginBottom: 12 }}>
                        {sake.brewery}
                    </div>

                    <div style={{ fontSize: 13, marginBottom: 12, background: '#fcfcfc', padding: '10px 12px', borderRadius: 12, border: '1px solid #f0f0f0' }}>
                        <div style={{ fontWeight: 800, fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>似ているポイント</div>
                        <ul style={{ paddingLeft: 16, margin: 0, color: '#444' }}>
                            {sake.similarPoints.map((p, i) => (
                                <li key={i} style={{ marginBottom: 2 }}>{p}</li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                        <div style={{ fontWeight: 800, fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>このお酒について</div>
                        <div style={{ color: '#222', fontSize: 12, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {sake.description || '芳醇な味わいとともに、作り手のこだわりが感じられる一本です。'}
                        </div>
                    </div>

                    {sake.purchaseUrl && (
                        <a
                            href={sake.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                padding: '10px 18px',
                                borderRadius: 999,
                                background: '#111',
                                color: '#fff',
                                fontSize: 12,
                                fontWeight: 700,
                                textDecoration: 'none',
                            }}
                        >
                            楽天で購入する
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}

const sakeSelectBtn: React.CSSProperties = {
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: 12,
    padding: '12px 16px',
    color: '#fff',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 4
};
