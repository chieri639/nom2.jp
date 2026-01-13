'use client';

import { useEffect, useMemo, useState } from 'react';

type SakeItem = {
    id: string;
    name: string;
    brewery?: string;
    prefecture?: string;
    style_tags: string[];
    taste_tags: string[];
    serve_temp: string[];
    reason?: string;
    rakuten: {
        affiliate_url?: string;
        image_url?: string;
        item_url?: string;
        item_code?: string;
    };
    updated_at?: string;
};

type ApiResponse = {
    ok: boolean;
    count: number;
    items: SakeItem[];
};

const API_URL =
    'https://script.google.com/macros/s/AKfycbw3C6mroyk4Sr46I8qD86b_QYDjQKzDGDhdMtSWYNw66eWPOZIfUYDKHu-R0f8xnNL-/exec';

const TEMP_OPTIONS_MAP: Record<string, string> = {
    cold: '冷やして',
    room: '常温',
    warm: '燗',
};

const TEMP_OPTIONS = [
    { key: 'cold', label: '冷やして' },
    { key: 'room', label: '常温' },
    { key: 'warm', label: '燗' },
] as const;

const SUGGESTED_TAGS = ['辛口', '甘口', 'フルーティ', 'すっきり', '初心者', 'プレゼント'];

export default function SakeRecoPage() {
    const [items, setItems] = useState<SakeItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // preferences (簡易)
    const [tempPref, setTempPref] = useState<string>(''); // cold/room/warm
    const [tagQuery, setTagQuery] = useState<string>(''); // "フルーティ,辛口" など

    const tagTokens = useMemo(() => {
        return tagQuery
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
    }, [tagQuery]);

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_URL, { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = (await res.json()) as ApiResponse;
            if (!data.ok) throw new Error('API returned ok=false');
            setItems(data.items || []);
        } catch (e: any) {
            setError(e?.message ?? 'Failed to fetch');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const filtered = useMemo(() => {
        let result = [...items];

        // 1. 温度フィルタ (必須一致)
        if (tempPref) {
            result = result.filter(s => s.serve_temp?.includes(tempPref));
        }

        // 2. タグフィルタ (どれか1つでも一致すればOK、なければ除外)
        if (tagTokens.length) {
            result = result.filter(s => {
                const all = new Set([...(s.style_tags || []), ...(s.taste_tags || [])]);
                return tagTokens.some(t => all.has(t));
            });
        }

        // 3. スコアリング (ソート用)
        const scoreOne = (s: SakeItem) => {
            let score = 0;
            // タグ一致数が多いほど上位へ
            if (tagTokens.length) {
                const all = new Set([...(s.style_tags || []), ...(s.taste_tags || [])]);
                for (const t of tagTokens) {
                    if (all.has(t)) score += 1;
                }
            }
            // 画像/リンクが揃ってるものを少し優先
            if (s.rakuten?.affiliate_url) score += 1;
            if (s.rakuten?.image_url) score += 1;
            return score;
        };

        return result
            .map(s => ({ s, score: scoreOne(s) }))
            .sort((a, b) => b.score - a.score)
            .map(x => x.s);
    }, [items, tempPref, tagTokens]);

    const addTag = (tag: string) => {
        if (!tagQuery) {
            setTagQuery(tag);
        } else {
            const current = tagQuery.split(',').map(s => s.trim()).filter(Boolean);
            if (!current.includes(tag)) {
                setTagQuery([...current, tag].join(', '));
            }
        }
    };

    return (
        <div style={{
            height: '100%',
            minHeight: 800,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 960,
            width: '100%', // FIX: Revert 100vw to avoid scrollbar width issue
            margin: '0 auto',
            padding: 16,
            overflowX: 'hidden', // Stop horizontal scroll
            fontFamily: 'system-ui, -apple-system',
            color: '#ffffff',
            boxSizing: 'border-box',
        }}>
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 20,
                paddingBottom: 8,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.92), rgba(0,0,0,0.75) 60%, rgba(0,0,0,0))',
                backdropFilter: 'blur(6px)',
            }}>
                <header style={{ marginBottom: 8, padding: '0 4px' }}>
                    <h1 style={{ fontSize: 18, margin: 0, fontWeight: 700 }}>nom2.jp "AI Ver"によるおすすめ日本酒</h1>
                    <p style={{ margin: '4px 0 0', fontSize: 11, opacity: 0.9 }}>
                        nom2.jpおすすめの日本酒を検索＆購入できます
                    </p>
                </header>

                <section
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr)', // Fix grid overflow
                        gap: 10,
                        background: '#f6f6f6',
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 0,
                        color: '#333',
                        // Fix for horizontal scroll (white box moving)
                        width: '100%',
                        maxWidth: '100%',
                        overflowX: 'hidden',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ fontSize: 11, opacity: 0.75, fontWeight: 600, minWidth: 28 }}>温度</div>
                        <div style={{
                            display: 'flex',
                            gap: 6,
                            // Scroll horizontally instead of wrap
                            flexWrap: 'nowrap',
                            overflowX: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            paddingBottom: 0, // minimal padding
                            scrollbarWidth: 'none', // hide scrollbar if preferred
                            flex: 1, // FIX: Take available space
                            minWidth: 0, // FIX: Allow shrinking below content size
                        }}>
                            <button
                                onClick={() => setTempPref('')}
                                style={pillStyle(tempPref === '')}
                            >
                                指定なし
                            </button>
                            {TEMP_OPTIONS.map(o => (
                                <button
                                    key={o.key}
                                    onClick={() => setTempPref(o.key)}
                                    style={pillStyle(tempPref === o.key)}
                                >
                                    {o.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <div style={{ fontSize: 11, opacity: 0.75, fontWeight: 600, flexShrink: 0 }}>好みタグ</div>
                            <div style={{ display: 'flex', gap: 4, overflowX: 'auto', scrollbarWidth: 'none', flex: 1, minWidth: 0 }}>
                                {SUGGESTED_TAGS.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => addTag(t)}
                                        style={{
                                            fontSize: 10,
                                            padding: '2px 8px',
                                            borderRadius: 999,
                                            background: '#e0e0e0',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#333',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0,
                                        }}
                                    >
                                        + {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <input
                                value={tagQuery}
                                onChange={e => setTagQuery(e.target.value)}
                                placeholder="例：フルーティ, すっきり"
                                style={{
                                    flex: 1,
                                    minWidth: 0, // Ensure shrink
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    borderRadius: 8,
                                    border: '1px solid #ddd',
                                    padding: '6px 10px',
                                    fontSize: 16, // FIX: Prevent iOS zoom
                                    outline: 'none',
                                    background: '#fff',
                                }}
                            />
                        </div>
                    </div>
                    {/* loading indicator moved to absolute or inside button logic if needed, usually fine hidden or next to items count. kept separate for simplicity? 
                        Actually, let's keep the items count simple. 
                    */}
                    <div style={{ fontSize: 11, opacity: 0.7, textAlign: 'right', marginTop: -4 }}>
                        {loading ? '読み込み中…' : `表示 ${filtered.length} 件`}
                    </div>
                </section >
            </div>

            {
                error && (
                    <div style={{ background: '#fff0f0', border: '1px solid #ffd0d0', padding: 12, borderRadius: 12, marginBottom: 12, color: '#d32f2f' }}>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>読み込みに失敗しました</div>
                        <div style={{ fontSize: 13, opacity: 0.85 }}>{error}</div>
                        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
                            ※ iframe / ログイン状態で挙動が変わる場合があります。再読み込みをお試しください。
                        </div>
                    </div>
                )
            }

            <main style={{
                flex: 1,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr)', // Ensure grid children don't overflow
                gap: 12,
                color: '#333',
                paddingBottom: 24,
            }}>
                {loading && !items.length ? (
                    <SkeletonList />
                ) : filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#fff', opacity: 0.7 }}>
                        該当する日本酒がありませんでした。条件を変更してお試しください。
                    </div>
                ) : (
                    filtered.map(s => <SakeCard key={s.id} item={s} />)
                )}
            </main>

            <footer style={{ marginTop: 24, fontSize: 11, opacity: 0.5, textAlign: 'center' }}>
                データ提供：SakeMaster / 楽天アフィリンク
            </footer>
        </div >
    );
}

function SakeCard({ item }: { item: SakeItem }) {
    const img = item.rakuten?.image_url;
    const buy = item.rakuten?.affiliate_url || item.rakuten?.item_url;

    return (
        <article style={{ background: '#fff', border: '1px solid #eee', borderRadius: 14, padding: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 12 }}>
                <div
                    style={{
                        width: 92,
                        height: 92,
                        borderRadius: 12,
                        background: '#f2f2f2',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ fontSize: 11, opacity: 0.6 }}>No Image</span>
                    )}
                </div>

                <div>
                    <div style={{ fontWeight: 700, lineHeight: 1.2 }}>{item.name}</div>
                    {(item.brewery || item.prefecture) && (
                        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
                            {item.brewery}
                            {item.prefecture && <span style={{ marginLeft: 6 }}>({item.prefecture})</span>}
                        </div>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                        {(item.style_tags || []).slice(0, 4).map(t => (
                            <span key={`st-${t}`} style={tagStyle}>{t}</span>
                        ))}
                        {(item.taste_tags || []).slice(0, 4).map(t => (
                            <span key={`tt-${t}`} style={tagStyle}>{t}</span>
                        ))}
                        {(item.serve_temp || []).slice(0, 3).map(t => (
                            <span key={`tp-${t}`} style={tagStyle}>{TEMP_OPTIONS_MAP[t] || t}</span>
                        ))}
                    </div>

                    {item.reason && <p style={{ margin: '8px 0 0', fontSize: 13, lineHeight: 1.45 }}>{item.reason}</p>}

                    <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <a
                            href={buy || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                ...primaryBtnStyle,
                                display: 'inline-block',
                                textDecoration: 'none',
                                pointerEvents: buy ? 'auto' : 'none',
                                opacity: buy ? 1 : 0.5,
                            }}
                        >
                            購入する
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}

function SkeletonList() {
    return (
        <>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 14, padding: 12, height: 120 }} />
            ))}
        </>
    );
}

const tagStyle: React.CSSProperties = {
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 999,
    background: '#f3f3f3',
    border: '1px solid #e9e9e9',
    color: '#333',
};

function pillStyle(active: boolean): React.CSSProperties {
    return {
        padding: '8px 10px',
        borderRadius: 999,
        border: '1px solid #ddd',
        background: active ? '#111' : '#fff',
        color: active ? '#fff' : '#111',
        fontSize: 13,
        cursor: 'pointer',
        flex: '0 0 auto',       // Ensure no shrink
        whiteSpace: 'nowrap',   // Ensure no wrap
    };
}

const primaryBtnStyle: React.CSSProperties = {
    padding: '10px 16px',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg, #111, #333)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
};
