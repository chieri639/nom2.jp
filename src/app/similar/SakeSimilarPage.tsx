'use client';

import { useEffect, useState, useMemo } from 'react';

type Sake = {
    id: string;
    name: string;
    brewery: string;
    prefecture: string;
    taste_tags: string[];
    style_tags: string[];
    serve_temp: string[];
    reason?: string; // recommend_reason
    rakuten: {
        image_url?: string;
        affiliate_url?: string;
    };
};

type SimilarSake = Sake & {
    similarityScore: number;
    similarPoints: string[];
};

const API_URL = 'https://script.google.com/macros/s/AKfycbw3C6mroyk4Sr46I8qD86b_QYDjQKzDGDhdMtSWYNw66eWPOZIfUYDKHu-R0f8xnNL-/exec';

export default function SakeSimilarPage() {
    const [allSakes, setAllSakes] = useState<Sake[]>([]);
    const [baseSake, setBaseSake] = useState<Sake | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                if (data.ok) setAllSakes(data.items);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const similarSakes = useMemo(() => {
        if (!baseSake) return [];
        return allSakes
            .filter(s => s.id !== baseSake.id)
            .map(s => {
                const { score, similarPoints } = calcSimilarity(baseSake, s);
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
                    <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>基準となる日本酒を選んでください</h2>
                    <div style={{ display: 'grid', gap: 10 }}>
                        {allSakes.map(s => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    setBaseSake(s);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                style={sakeSelectBtn}
                            >
                                <div style={{ fontWeight: 700 }}>{s.name}</div>
                                <div style={{ fontSize: 11, opacity: 0.6 }}>{s.brewery} / {s.prefecture}</div>
                            </button>
                        ))}
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
                            AIが味わいデータをもとに分析し、<br />
                            nom2.jp編集部の基準で選びました。
                        </p>
                    </div>

                    <div>
                        {similarSakes.map((s, idx) => (
                            <SakeItemCard key={s.id} sake={s} rank={idx + 1} />
                        ))}
                    </div>

                    {similarSakes.length === 0 && (
                        <div style={{ padding: 40, textAlign: 'center', opacity: 0.5 }}>
                            似ているお酒が見つかりませんでした。
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
                {/* 画像（補助） */}
                {sake.rakuten.image_url && (
                    <img
                        src={sake.rakuten.image_url}
                        alt={sake.name}
                        style={{
                            width: 80,
                            height: 80,
                            objectFit: 'cover',
                            borderRadius: 14,
                            flexShrink: 0,
                            background: '#f5f5f5'
                        }}
                    />
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.2 }}>
                        {rank}. {sake.name}
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4, marginBottom: 12 }}>
                        {sake.brewery} / {sake.prefecture}
                    </div>

                    <div style={{ fontSize: 13, marginBottom: 12, background: '#fcfcfc', padding: '10px 12px', borderRadius: 12, border: '1px solid #f0f0f0' }}>
                        <div style={{ fontWeight: 800, fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>似ているポイント</div>
                        <ul style={{ paddingLeft: 16, margin: 0, color: '#444' }}>
                            {sake.similarPoints.map(p => (
                                <li key={p} style={{ marginBottom: 2 }}>{p}</li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                        <div style={{ fontWeight: 800, fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>おすすめ理由</div>
                        <div style={{ color: '#222' }}>{sake.reason || '共通点が多く、同じような満足感を得られる一本です。'}</div>
                    </div>

                    {sake.rakuten.affiliate_url && (
                        <a
                            href={sake.rakuten.affiliate_url}
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

function calcSimilarity(base: Sake, target: Sake): {
    score: number;
    similarPoints: string[];
} {
    const tasteMatch = base.taste_tags.filter(t =>
        target.taste_tags.includes(t)
    );
    const styleMatch = base.style_tags.filter(t =>
        target.style_tags.includes(t)
    );
    const tempMatch = base.serve_temp.filter(t =>
        target.serve_temp.includes(t)
    );

    const score =
        tasteMatch.length * 2 +
        styleMatch.length * 1.5 +
        tempMatch.length * 1;

    const similarPoints = [
        ...tasteMatch.map(t => `味わいが「${t}」`),
        ...styleMatch.map(t => `スタイルが「${t}」`),
        ...tempMatch.map(t => `「${t}」で楽しめる`),
    ].slice(0, 3); // 読みやすさ優先

    return { score, similarPoints };
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
