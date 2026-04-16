'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchAllSakesAction } from '@/app/actions/sake';
import { SakeData, scoreByKeywords } from '@/lib/sake-logic';

type ChatRole = 'bot' | 'user';

type ChatMessage = {
    id: string;
    role: ChatRole;
    text: string;
};

const TEMP_OPTIONS_MAP: Record<string, string> = { cold: '冷やして', room: '常温', warm: '燗' };
const STEP_TOTAL = 5;

const MOOD_OPTIONS = [
    { label: '食事と合わせたい（食中酒）', tag: '食中酒' },
    { label: 'プレゼントにしたい', tag: 'プレゼント' },
    { label: '日本酒初心者向けがいい', tag: '初心者' },
    { label: '今っぽい/モダンな感じ', tag: 'モダン' },
    { label: '王道/クラシックが好き', tag: 'クラシック' },
];

const DIRECTION_OPTIONS = [
    { label: 'フルーティー', tag: 'フルーティー' },
    { label: 'すっきり', tag: 'すっきり' },
    { label: '辛口', tag: '辛口' },
    { label: '甘口', tag: '甘口' },
];

const BODY_OPTIONS = [
    { label: '旨味', tag: '旨味' },
    { label: 'コク', tag: 'コク' },
    { label: 'キレ', tag: 'キレ' },
    { label: '濃醇', tag: '濃醇' },
];

const TEMP_OPTIONS = [
    { label: '冷やして', key: 'cold' },
    { label: '常温', key: 'room' },
    { label: '燗', key: 'warm' },
];

function uid(prefix = 'm') {
    return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`;
}

export default function SakeChatRecoPage() {
    const [items, setItems] = useState<SakeData[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Chat states
    const [step, setStep] = useState<number>(1);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [typing, setTyping] = useState(false);
    const [styleTags, setStyleTags] = useState<string[]>([]);
    const [tasteTags, setTasteTags] = useState<string[]>([]);
    const [tempKeys, setTempKeys] = useState<string[]>([]);
    const [freeText, setFreeText] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);

    // Responsive check
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Load Data
    const load = async () => {
        setLoadingData(true);
        setError(null);
        try {
            const sakes = await fetchAllSakesAction();
            setItems(sakes);
        } catch (e: any) {
            setError(e?.message ?? 'Failed to fetch');
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => { load(); }, []);

    // Initial Messages
    useEffect(() => {
        reset();
    }, []);

    const botSay = async (text: string) => {
        setTyping(true);
        await new Promise(r => setTimeout(r, 600));
        setMessages(prev => [...prev, { id: uid(), role: 'bot', text }]);
        setTyping(false);
    };

    const userSay = (text: string) => setMessages(prev => [...prev, { id: uid(), role: 'user', text }]);

    const nextQuestion = async (nextStep: number) => {
        setStep(nextStep);
        if (nextStep === 2) await botSay('Q2：味の方向はどれが近い？（1つ選ぶ）');
        else if (nextStep === 3) await botSay('Q3：質感の好みは？（複数OK）');
        else if (nextStep === 4) await botSay('Q4：飲み方（温度）は？（複数OK）');
        else if (nextStep === 5) await botSay('Q5：最後に、苦手なタイプや合わせたい料理、予算など自由にどうぞ（任意）');
    };

    const handleSkip = async (ns: number) => {
        userSay('（スキップ）');
        await nextQuestion(ns);
    };

    const submit = async () => {
        userSay(freeText.trim() ? freeText.trim() : '（特になし）');
        await botSay('承知しました！最新の320銘柄から、あなたへのおすすめをまとめます。');
        setSubmitted(true);
    };

    const reset = () => {
        setMessages([
            { id: uid(), role: 'bot', text: '日本酒AIです。5つの質問で、あなたにぴったりの銘柄をご提案します🍶' },
            { id: uid(), role: 'bot', text: 'Q1：今日はどんなシーンで楽しみたいですか？' }
        ]);
        setStep(1); setStyleTags([]); setTasteTags([]); setTempKeys([]); setFreeText(''); setSubmitted(false);
    };

    // Filter Logic
    const filtered = useMemo(() => {
        if (!submitted) return [];
        
        // ユーザーの回答を集約
        const keywords = [...styleTags, ...tasteTags, ...freeText.split(/[ ,、。　]/)].filter(Boolean);
        
        return items
            .map(s => ({
                ...s,
                score: scoreByKeywords(keywords, s)
            }))
            .filter(s => s.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 20);
    }, [submitted, items, styleTags, tasteTags, freeText]);

    const summaryLine = useMemo(() => {
        const parts: string[] = [];
        if (styleTags.length) parts.push(`シーン：${styleTags.join('/')}`);
        const direction = tasteTags.filter(t => DIRECTION_OPTIONS.some(o => o.tag === t));
        const body = tasteTags.filter(t => BODY_OPTIONS.some(o => o.tag === t));
        if (direction.length) parts.push(`味：${direction.join('/')}`);
        if (body.length) parts.push(`質感：${body.join('/')}`);
        if (tempKeys.length) parts.push(`温度：${tempKeys.map(k => TEMP_OPTIONS_MAP[k]).join('/')}`);
        if (freeText.trim()) parts.push(`その他：${freeText.trim()}`);
        return parts.join(' | ');
    }, [styleTags, tasteTags, tempKeys, freeText]);

    return (
        <div
            className="sake-reco-grid no-horizontal-pan"
            style={{
                color: '#fff',
                height: isMobile ? 'auto' : 'min(820px, calc(100svh - 160px))',
                minHeight: isMobile ? 800 : 'unset',
                overflowX: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            {/* Left/Top: Chat Panel */}
            <ChatPanel
                messages={messages}
                typing={typing}
                step={step}
                submitted={submitted}
                summaryLine={summaryLine}
                freeText={freeText}
                setFreeText={setFreeText}
                onReset={reset}
                onNextStep={nextQuestion}
                onSkip={handleSkip}
                onSubmit={submit}
                // Options
                pickMood={(tag: string, label: string) => {
                    userSay(label);
                    setStyleTags([tag]);
                    nextQuestion(2);
                }}
                pickDirection={(tag: string, label: string) => {
                    userSay(label);
                    setTasteTags([tag]);
                    nextQuestion(3);
                }}
                confirmBody={() => {
                    const chosen = tasteTags.filter(t => BODY_OPTIONS.some(o => o.tag === t));
                    userSay(chosen.length ? `質感：${chosen.join(' / ')}` : '質感：指定なし');
                    nextQuestion(4);
                }}
                confirmTemp={() => {
                    userSay(tempKeys.length ? `温度：${tempKeys.map(k => TEMP_OPTIONS_MAP[k]).join(' / ')}` : '温度：指定なし');
                    nextQuestion(5);
                }}
                tasteTags={tasteTags}
                setTasteTags={setTasteTags}
                tempKeys={tempKeys}
                setTempKeys={setTempKeys}
                isMobile={isMobile}
            />

            {/* Right/Bottom: Results Panel */}
            <ResultsPanel
                submitted={submitted}
                loading={loadingData}
                items={filtered}
                error={error}
                onReset={reset}
            />
        </div>
    );
}

// ----- Subcomponents -----

function ChatPanel(props: any) {
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [props.messages, props.typing]);

    return (
        <div style={{
            background: '#111',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            minHeight: 500,
            overflow: 'hidden',
        }}>
            <div style={{ padding: '12px 14px 4px', fontSize: 12, opacity: 0.6, display: 'flex', justifyContent: 'space-between' }}>
                <span>AI診断チャット</span>
                <button onClick={props.onReset} style={{ background: 'none', border: 'none', color: '#888', textDecoration: 'underline', fontSize: 11, cursor: 'pointer' }}>リセット</button>
            </div>

            <div ref={scrollRef} style={{
                padding: 12,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
            }}>
                {props.messages.map((m: any) => (
                    <div key={m.id} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                        <div style={{
                            maxWidth: '88%',
                            padding: '10px 14px',
                            borderRadius: 18,
                            fontSize: 14,
                            lineHeight: 1.5,
                            background: m.role === 'user' ? '#fff' : '#262626',
                            color: m.role === 'user' ? '#111' : '#fff',
                            borderTopRightRadius: m.role === 'user' ? 4 : 18,
                            borderTopLeftRadius: m.role === 'user' ? 18 : 4,
                            wordBreak: 'break-word',
                        }}>
                            {m.text}
                        </div>
                    </div>
                ))}
                {props.typing && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
                        <div style={{ padding: '8px 12px', borderRadius: 16, background: '#262626', opacity: 0.6, fontSize: 12 }}>入力中…</div>
                    </div>
                )}
                {props.submitted && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
                        <div style={{ maxWidth: '90%', padding: '12px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 12 }}>
                            <div style={{ fontWeight: 700, marginBottom: 4, color: '#22c55e' }}>✅ 診断完了</div>
                            <div style={{ opacity: 0.8 }}>{props.summaryLine}</div>
                        </div>
                    </div>
                )}
            </div>

            <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', background: '#151515' }}>
                {!props.submitted ? (
                    <div>
                        {props.step === 1 && (
                            <OptionList options={MOOD_OPTIONS.map(o => ({ ...o, onClick: () => props.pickMood(o.tag, o.label) }))} onSkip={() => props.onSkip(2)} />
                        )}
                        {props.step === 2 && (
                            <OptionList options={DIRECTION_OPTIONS.map(o => ({ ...o, onClick: () => props.pickDirection(o.tag, o.label) }))} onSkip={() => props.onSkip(3)} />
                        )}
                        {props.step === 3 && (
                            <MultiSelect options={BODY_OPTIONS} values={props.tasteTags} onToggle={(t: string) => props.setTasteTags((prev: string[]) => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])} onNext={() => props.confirmBody()} onSkip={() => props.onSkip(4)} />
                        )}
                        {props.step === 4 && (
                            <MultiSelect options={TEMP_OPTIONS} values={props.tempKeys} field="key" onToggle={(k: string) => props.setTempKeys((prev: string[]) => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k])} onNext={() => props.confirmTemp()} onSkip={() => props.onSkip(5)} />
                        )}
                        {props.step === 5 && (
                            <div>
                                <textarea
                                    value={props.freeText}
                                    onChange={(e) => props.setFreeText(e.target.value)}
                                    placeholder="自由に入力（任意）"
                                    style={{ width: '100%', height: 60, borderRadius: 12, background: '#000', color: '#fff', border: '1px solid #333', padding: 10, fontSize: 14, outline: 'none', marginBottom: 8 }}
                                />
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={props.onSubmit} style={{ flex: 1, padding: 10, borderRadius: 12, background: '#22c55e', color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer' }}>送信する</button>
                                    <button onClick={props.onReset} style={{ padding: 10, borderRadius: 12, background: '#333', color: '#ccc', border: 'none', cursor: 'pointer' }}>やり直す</button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={props.onReset} style={{ width: '100%', padding: 12, borderRadius: 12, background: '#333', color: '#fff', border: '1px solid #444', fontWeight: 600, cursor: 'pointer' }}>もう一度診断する</button>
                    </div>
                )}
            </div>
        </div>
    );
}

function ResultsPanel({ submitted, loading, items, error, onReset }: any) {
    return (
        <div style={{
            background: '#0a0a0a',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            overflow: 'hidden',
        }}>
            <div style={{ padding: '12px 14px 4px', fontSize: 13, fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>おすすめ日本酒</span>
                <span style={{ fontSize: 11, opacity: 0.5, fontWeight: 400 }}>{submitted ? `${items.length}件ヒット` : '-'}</span>
            </div>

            <div style={{
                padding: 12,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
            }}>
                {!submitted ? (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4, fontSize: 13, textAlign: 'center', minHeight: 200 }}>
                        診断が完了すると<br />ここにリストが表示されます
                    </div>
                ) : loading ? (
                    <div style={{ display: 'grid', gap: 12 }}>
                        {[1, 2, 3].map(i => <div key={i} style={{ height: 120, borderRadius: 14, background: '#1a1a1a' }} />)}
                    </div>
                ) : error ? (
                    <div style={{ padding: 20, color: '#f87171', fontSize: 13 }}>エラーが発生しました: {error}</div>
                ) : items.length === 0 ? (
                    <div style={{ padding: 40, textAlign: 'center', opacity: 0.6 }}>
                        該当ありませんでした。<br />条件を変えてみてください。
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: 12 }}>
                        {items.map((s: any) => <SakeCard key={s.id} item={s} />)}
                        <div style={{ padding: '20px 0', textAlign: 'center', opacity: 0.3, fontSize: 11 }}>END.</div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ----- UI Parts -----

function OptionList({ options, onSkip }: any) {
    return (
        <div style={{ display: 'grid', gap: 8 }}>
            {options.map((o: any, i: number) => (
                <button key={i} onClick={o.onClick} style={chipBtn}>{o.label}</button>
            ))}
            <button onClick={onSkip} style={{ background: 'none', border: 'none', color: '#777', padding: 8, fontSize: 12 }}>スキップ</button>
        </div>
    );
}

function MultiSelect({ options, values, onToggle, onNext, onSkip, field = 'tag' }: any) {
    return (
        <div>
            <div style={{ display: 'grid', gap: 8 }}>
                {options.map((o: any, i: number) => {
                    const active = values.includes(o[field]);
                    return <button key={i} onClick={() => onToggle(o[field])} style={{ ...chipBtn, ...(active ? { background: '#333', border: '1px solid #555' } : {}) }}>{o.label}</button>;
                })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                <button onClick={onSkip} style={{ background: 'none', border: 'none', color: '#777', fontSize: 12 }}>スキップ</button>
                <button onClick={onNext} style={{ padding: '8px 16px', borderRadius: 10, background: '#fff', color: '#000', border: 'none', fontWeight: 700 }}>次へ</button>
            </div>
        </div>
    );
}

function SakeCard({ item }: { item: SakeData }) {
    return (
        <div style={{ background: '#fff', borderRadius: 14, padding: 12, color: '#111', display: 'grid', gridTemplateColumns: '80px 1fr', gap: 12 }}>
            <div style={{ width: 80, height: 80, borderRadius: 10, background: '#f5f5f5', overflow: 'hidden' }}>
                {item.imageUrl ? (
                    <img src={item.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2, fontSize: 10 }}>No Image</div>
                )}
            </div>
            <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>
                    <Link href={`/nihonshu/${item.oldId || item.id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline">
                        {item.name}
                    </Link>
                </div>
                <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
                    {item.brewery}
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.4, color: '#444', marginTop: 8, background: '#f9f9f9', padding: '8px', borderRadius: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description || '共通点が多く、あなたにぴったりの一本です。'}
                </div>
                <div style={{ marginTop: 10 }}>
                    {item.purchaseUrl && (
                        <a href={item.purchaseUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 8, background: '#111', color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>購入する</a>
                    )}
                </div>
            </div>
        </div>
    );
}

const chipBtn: React.CSSProperties = {
    padding: '10px 12px',
    borderRadius: 12,
    background: '#222',
    border: '1px solid #333',
    color: '#fff',
    fontSize: 13,
    textAlign: 'left',
    cursor: 'pointer',
    width: '100%',
};
