'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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

const STEP_TOTAL = 5;

// Q1: 気分（style_tags に寄せる）
const MOOD_OPTIONS = [
    { label: '食事と合わせたい（食中酒）', tag: '食中酒' },
    { label: 'プレゼントにしたい', tag: 'プレゼント' },
    { label: '日本酒初心者向けがいい', tag: '初心者' },
    { label: '今っぽい/モダンな感じ', tag: 'モダン' },
    { label: '王道/クラシックが好き', tag: 'クラシック' },
] as const;

// Q2: 味の方向（taste_tags に寄せる）
const DIRECTION_OPTIONS = [
    { label: 'フルーティ', tag: 'フルーティ' },
    { label: 'すっきり', tag: 'すっきり' },
    { label: '辛口', tag: '辛口' },
    { label: '甘口', tag: '甘口' },
] as const;

// Q3: 質感（複数）
const BODY_OPTIONS = [
    { label: '旨味', tag: '旨味' },
    { label: 'コク', tag: 'コク' },
    { label: 'キレ', tag: 'キレ' },
    { label: '濃醇', tag: '濃醇' },
] as const;

// Q4: 温度（複数）
const TEMP_OPTIONS = [
    { label: '冷やして', key: 'cold' },
    { label: '常温', key: 'room' },
    { label: '燗', key: 'warm' },
] as const;

type ChatRole = 'bot' | 'user' | 'system';

type ChatMessage = {
    id: string;
    role: ChatRole;
    text: string;
};

function uid(prefix = 'm') {
    return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`;
}

export default function SakeChatRecoPage() {
    const [items, setItems] = useState<SakeItem[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // chat state
    const [step, setStep] = useState<number>(1);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [typing, setTyping] = useState(false);

    // answers (structured)
    const [styleTags, setStyleTags] = useState<string[]>([]);
    const [tasteTags, setTasteTags] = useState<string[]>([]);
    const [tempKeys, setTempKeys] = useState<string[]>([]);
    const [freeText, setFreeText] = useState<string>('');

    // results
    const [submitted, setSubmitted] = useState(false);

    const bottomRef = useRef<HTMLDivElement | null>(null);
    const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });

    // ----- Load dataset -----
    async function load() {
        setLoadingData(true);
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
            setLoadingData(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    // ----- Boot messages -----
    useEffect(() => {
        // initialize chat once
        setMessages([
            { id: uid(), role: 'bot', text: '日本酒AIです。5つの質問で、好みに合う銘柄を提案します🍶' },
            { id: uid(), role: 'bot', text: 'Q1：今日はどんなシーン？（近いものを選んでください）' },
        ]);
        setStep(1);
        setSubmitted(false);
    }, []);

    // auto scroll
    useEffect(() => {
        scrollToBottom();
    }, [messages, typing, submitted]);

    // ----- iOS iframe: prevent horizontal pan (page-level) -----
    useEffect(() => {
        let startX = 0;
        let startY = 0;

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            const dx = Math.abs(e.touches[0].clientX - startX);
            const dy = Math.abs(e.touches[0].clientY - startY);
            if (dx > dy + 2) e.preventDefault();
        };

        document.addEventListener('touchstart', onTouchStart, { passive: true });
        document.addEventListener('touchmove', onTouchMove, { passive: false });

        return () => {
            document.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchmove', onTouchMove as any);
        };
    }, []);

    // ----- Helpers to add bot messages with typing -----
    const botSay = async (text: string) => {
        setTyping(true);
        await new Promise(r => setTimeout(r, 400));
        setMessages(prev => [...prev, { id: uid(), role: 'bot', text }]);
        setTyping(false);
    };

    const userSay = (text: string) => {
        setMessages(prev => [...prev, { id: uid(), role: 'user', text }]);
    };

    const nextQuestion = async (nextStep: number) => {
        if (nextStep === 2) {
            await botSay('Q2：味の方向はどれが近い？（1つ選ぶ）');
        } else if (nextStep === 3) {
            await botSay('Q3：質感の好みは？（複数OK）');
        } else if (nextStep === 4) {
            await botSay('Q4：飲み方（温度）は？（複数OK）');
        } else if (nextStep === 5) {
            await botSay('Q5：最後に。苦手なタイプ・合わせたい料理・予算など自由にどうぞ（任意）');
        }
        setStep(nextStep);
    };

    // ----- Answer handlers -----
    const pickMood = async (tag: string) => {
        setStyleTags([tag]);
        userSay(MOOD_OPTIONS.find(o => o.tag === tag)?.label ?? tag);
        await nextQuestion(2);
    };

    const pickDirection = async (tag: string) => {
        setTasteTags(prev => {
            // keep only one direction among direction options
            const directionSet = new Set<string>(DIRECTION_OPTIONS.map(o => o.tag));
            const kept = prev.filter(t => !directionSet.has(t));
            return [...kept, tag];
        });
        userSay(DIRECTION_OPTIONS.find(o => o.tag === tag)?.label ?? tag);
        await nextQuestion(3);
    };

    const toggleBody = (tag: string) => {
        setTasteTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
    };

    const confirmBody = async () => {
        const chosen = tasteTags.filter(t => BODY_OPTIONS.some(o => o.tag === t));
        userSay(chosen.length ? `質感：${chosen.join(' / ')}` : '質感：指定なし');
        await nextQuestion(4);
    };

    const toggleTemp = (key: string) => {
        setTempKeys(prev => (prev.includes(key) ? prev.filter(t => t !== key) : [...prev, key]));
    };

    const confirmTemp = async () => {
        userSay(tempKeys.length ? `温度：${tempKeys.map(k => TEMP_OPTIONS_MAP[k] ?? k).join(' / ')}` : '温度：指定なし');
        await nextQuestion(5);
    };

    const submit = async () => {
        userSay(freeText.trim() ? freeText.trim() : '（自由入力なし）');
        await botSay('了解！条件をまとめて、おすすめを出します…');
        setSubmitted(true);
    };

    const reset = () => {
        setStyleTags([]);
        setTasteTags([]);
        setTempKeys([]);
        setFreeText('');
        setSubmitted(false);
        setStep(1);
        setMessages([
            { id: uid(), role: 'bot', text: '日本酒AIです。5つの質問で、好みに合う銘柄を提案します🍶' },
            { id: uid(), role: 'bot', text: 'Q1：今日はどんなシーン？（近いものを選んでください）' },
        ]);
    };

    // ----- Filtering / scoring (reuse your logic, slightly extended) -----
    const filtered = useMemo(() => {
        if (!submitted) return [];

        let result = [...items];

        // temp filter: if any temp selected, must match at least one
        if (tempKeys.length) {
            result = result.filter(s => (s.serve_temp || []).some(t => tempKeys.includes(t)));
        }

        // tag filter: match any chosen taste/style tag (if any exists)
        const tokens = [...styleTags, ...tasteTags].filter(Boolean);
        if (tokens.length) {
            result = result.filter(s => {
                const all = new Set([...(s.style_tags || []), ...(s.taste_tags || [])]);
                return tokens.some(t => all.has(t));
            });
        }

        const scoreOne = (s: SakeItem) => {
            let score = 0;
            const all = new Set([...(s.style_tags || []), ...(s.taste_tags || [])]);

            // tag matches
            for (const t of tokens) if (all.has(t)) score += 2;

            // temp match
            if (tempKeys.length) {
                for (const k of tempKeys) if ((s.serve_temp || []).includes(k)) score += 1;
            }

            // link/image completeness
            if (s.rakuten?.affiliate_url) score += 1;
            if (s.rakuten?.image_url) score += 1;

            // free text hint (lightweight): if user wrote something, try to match keywords against name/brewery/prefecture
            const ft = freeText.trim();
            if (ft) {
                const hay = `${s.name} ${s.brewery ?? ''} ${s.prefecture ?? ''}`.toLowerCase();
                const needles = ft
                    .split(/[,\s　]+/)
                    .map(x => x.trim().toLowerCase())
                    .filter(x => x.length >= 2);
                for (const n of needles) if (hay.includes(n)) score += 1;
            }

            return score;
        };

        return result
            .map(s => ({ s, score: scoreOne(s) }))
            .sort((a, b) => b.score - a.score)
            .map(x => x.s)
            .slice(0, 20); // show top 20
    }, [submitted, items, styleTags, tasteTags, tempKeys, freeText]);

    const summaryLine = useMemo(() => {
        if (!submitted) return '';
        const parts: string[] = [];
        if (styleTags.length) parts.push(`シーン：${styleTags.join(' / ')}`);
        const directionChosen = tasteTags.filter(t => DIRECTION_OPTIONS.some(o => o.tag === t));
        const bodyChosen = tasteTags.filter(t => BODY_OPTIONS.some(o => o.tag === t));
        if (directionChosen.length) parts.push(`方向：${directionChosen.join(' / ')}`);
        if (bodyChosen.length) parts.push(`質感：${bodyChosen.join(' / ')}`);
        if (tempKeys.length) parts.push(`温度：${tempKeys.map(k => TEMP_OPTIONS_MAP[k] ?? k).join(' / ')}`);
        return parts.join('｜');
    }, [submitted, styleTags, tasteTags, tempKeys]);

    return (
        <div
            style={{
                minHeight: 800,
                width: '100%',
                maxWidth: 'min(960px, 100%)',
                margin: '0 auto',
                padding: 14,
                boxSizing: 'border-box',
                color: '#fff',
                overflowX: 'hidden',
                fontFamily: 'system-ui, -apple-system',
            }}
        >
            <header style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, opacity: 0.75 }}>nom2.jp AI</div>
                <h1 style={{ fontSize: 18, margin: 0, fontWeight: 800 }}>おすすめ日本酒レコメンド</h1>
                <div style={{ fontSize: 11, opacity: 0.75, marginTop: 4 }}>
                    5つの質問に答えるだけで、あなた向けを提案します
                </div>
            </header>

            {/* Chat */}
            <div
                style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 16,
                    padding: 12,
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        maxHeight: 520,
                        overflowY: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        paddingRight: 4,
                    }}
                >
                    {messages.map(m => (
                        <ChatBubble key={m.id} role={m.role} text={m.text} />
                    ))}

                    {typing && <ChatBubble role="bot" text="…" typing />}

                    {/* results inserted as bot message */}
                    {submitted && (
                        <>
                            <ChatBubble role="bot" text={`条件まとめ：${summaryLine || '指定なし'}`} />
                            {error ? (
                                <div style={{ marginTop: 10 }}>
                                    <div style={errorBoxStyle}>
                                        <div style={{ fontWeight: 700, marginBottom: 4 }}>読み込みに失敗しました</div>
                                        <div style={{ fontSize: 12, opacity: 0.9 }}>{error}</div>
                                    </div>
                                </div>
                            ) : loadingData ? (
                                <div style={{ marginTop: 10 }}>
                                    <SkeletonList />
                                </div>
                            ) : filtered.length === 0 ? (
                                <ChatBubble role="bot" text="該当が見つかりませんでした。条件を少しゆるめて試してみてください。" />
                            ) : (
                                <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
                                    {filtered.map(s => (
                                        <SakeCard key={s.id} item={s} />
                                    ))}
                                </div>
                            )}
                            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <button onClick={reset} style={secondaryBtn}>
                                    もう一度診断する
                                </button>
                                <button onClick={load} style={secondaryBtn}>
                                    データ更新
                                </button>
                            </div>
                        </>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input area (changes by step) */}
                {!submitted && (
                    <div style={{ marginTop: 12 }}>
                        {/* Step UI */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <div style={{ fontSize: 11, opacity: 0.75 }}>Step {step}/{STEP_TOTAL}</div>
                            <button onClick={reset} style={linkBtn}>
                                リセット
                            </button>
                        </div>

                        {step === 1 && (
                            <OptionGrid>
                                {MOOD_OPTIONS.map(o => (
                                    <button key={o.tag} onClick={() => pickMood(o.tag)} style={chipBtn}>
                                        {o.label}
                                    </button>
                                ))}
                            </OptionGrid>
                        )}

                        {step === 2 && (
                            <OptionGrid>
                                {DIRECTION_OPTIONS.map(o => (
                                    <button key={o.tag} onClick={() => pickDirection(o.tag)} style={chipBtn}>
                                        {o.label}
                                    </button>
                                ))}
                            </OptionGrid>
                        )}

                        {step === 3 && (
                            <>
                                <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 8 }}>複数選べます</div>
                                <OptionGrid>
                                    {BODY_OPTIONS.map(o => {
                                        const active = tasteTags.includes(o.tag);
                                        return (
                                            <button
                                                key={o.tag}
                                                onClick={() => toggleBody(o.tag)}
                                                style={{ ...chipBtn, ...(active ? chipBtnActive : {}) }}
                                            >
                                                {o.label}
                                            </button>
                                        );
                                    })}
                                </OptionGrid>
                                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                                    <button onClick={confirmBody} style={primaryBtn}>
                                        次へ
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 4 && (
                            <>
                                <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 8 }}>複数選べます</div>
                                <OptionGrid>
                                    {TEMP_OPTIONS.map(o => {
                                        const active = tempKeys.includes(o.key);
                                        return (
                                            <button
                                                key={o.key}
                                                onClick={() => toggleTemp(o.key)}
                                                style={{ ...chipBtn, ...(active ? chipBtnActive : {}) }}
                                            >
                                                {o.label}
                                            </button>
                                        );
                                    })}
                                </OptionGrid>
                                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                                    <button onClick={confirmTemp} style={primaryBtn}>
                                        次へ
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 5 && (
                            <>
                                <textarea
                                    value={freeText}
                                    onChange={e => setFreeText(e.target.value)}
                                    placeholder="例：お寿司に合わせたい、辛口は苦手、予算は3,000円くらい…など"
                                    style={textArea}
                                />
                                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                                    <button
                                        onClick={() => {
                                            // allow submit even if empty
                                            submit();
                                        }}
                                        style={primaryBtn}
                                        disabled={loadingData}
                                        title={loadingData ? 'データ読み込み中です' : '送信しておすすめを見る'}
                                    >
                                        {loadingData ? '読み込み中…' : '送信しておすすめを見る'}
                                    </button>

                                    <button
                                        onClick={() => {
                                            // allow skipping free text
                                            setFreeText('');
                                            submit();
                                        }}
                                        style={secondaryBtn}
                                        disabled={loadingData}
                                    >
                                        スキップ
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <footer style={{ marginTop: 12, fontSize: 11, opacity: 0.55, textAlign: 'center' }}>
                データ提供：SakeMaster / 楽天アフィリンク
            </footer>
        </div>
    );
}

function ChatBubble({ role, text, typing }: { role: ChatRole; text: string; typing?: boolean }) {
    const isUser = role === 'user';
    return (
        <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
            <div
                style={{
                    maxWidth: '92%',
                    padding: '10px 12px',
                    borderRadius: 14,
                    background: isUser ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontSize: 13,
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'anywhere',
                }}
            >
                {typing ? <span style={{ opacity: 0.85 }}>typing…</span> : text}
            </div>
        </div>
    );
}

function OptionGrid({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr)',
                gap: 8,
            }}
        >
            {children}
        </div>
    );
}

function SakeCard({ item }: { item: SakeItem }) {
    const img = item.rakuten?.image_url;
    const buy = item.rakuten?.affiliate_url || item.rakuten?.item_url;

    return (
        <article style={{ background: '#fff', border: '1px solid #eee', borderRadius: 14, padding: 12, color: '#333' }}>
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
                        flex: '0 0 auto',
                    }}
                >
                    {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ fontSize: 11, opacity: 0.6 }}>No Image</span>
                    )}
                </div>

                <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, lineHeight: 1.2 }}>{item.name}</div>
                    {(item.brewery || item.prefecture) && (
                        <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
                            {item.brewery}
                            {item.prefecture && <span style={{ marginLeft: 6 }}>({item.prefecture})</span>}
                        </div>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                        {(item.style_tags || []).slice(0, 3).map(t => (
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
                                ...primaryBtn,
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

// styles
const tagStyle: React.CSSProperties = {
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 999,
    background: '#f3f3f3',
    border: '1px solid #e9e9e9',
    color: '#333',
};

const chipBtn: React.CSSProperties = {
    textAlign: 'left',
    padding: '10px 12px',
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.06)',
    color: '#fff',
    fontSize: 13,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

const chipBtnActive: React.CSSProperties = {
    background: 'rgba(255,255,255,0.18)',
    border: '1px solid rgba(255,255,255,0.25)',
};

const primaryBtn: React.CSSProperties = {
    padding: '10px 14px',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg, #111, #333)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
};

const secondaryBtn: React.CSSProperties = {
    padding: '10px 14px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
};

const linkBtn: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    cursor: 'pointer',
    textDecoration: 'underline',
};

const textArea: React.CSSProperties = {
    width: '100%',
    minHeight: 84,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.16)',
    background: 'rgba(0,0,0,0.25)',
    color: '#fff',
    padding: '10px 12px',
    fontSize: 16, // iOS zoom防止
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'vertical',
};

const errorBoxStyle: React.CSSProperties = {
    background: '#fff0f0',
    border: '1px solid #ffd0d0',
    padding: 12,
    borderRadius: 12,
    color: '#d32f2f',
};
