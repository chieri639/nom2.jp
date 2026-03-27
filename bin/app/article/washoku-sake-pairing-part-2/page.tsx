import React from 'react';
import Link from 'next/link';

export default function WashokuPairingPart2() {
    return (
        <article style={{ fontFamily: '"Noto Serif JP", "Mincho", serif', lineHeight: 1.8, color: '#2c2c2c', backgroundColor: '#faf9f5' }}>
            
            {/* Hero Section */}
            <header style={{ position: 'relative', height: '60vh', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="/images/washoku_pairing_hero_2.png" 
                        alt="和食のおでんと熱燗のペアリング" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)' }} />
                </div>
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 24px', maxWidth: 800 }}>
                    <p style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', marginBottom: 16, color: '#e6c27a' }}>Washoku & Sake Pairing • Part 2</p>
                    <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, marginBottom: 24, lineHeight: 1.3, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                        【プロ直伝】和食ペアリングの真髄<br />だしの旨味と温度が織りなす魔法
                    </h1>
                </div>
            </header>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>
                <section style={{ marginBottom: 60 }}>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        前回の第1回では、「同調」と「補完」というペアリングの基礎方程式をお伝えしました。今回はそこから一歩踏み込み、和食のペアリングにおいて最も感動的な体験を生み出す<strong>「だしの旨味」</strong>と<strong>「温度」</strong>について掘り下げていきます。
                    </p>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        和食の根幹である「だし」。そして、世界のお酒の中でも極めて珍しい「幅広い温度で楽しめる（お燗）」という日本酒の特性。この2つが出会ったとき、口の中には言葉を失うほどのマリアージュが広がります。
                    </p>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Section: Umami Synergy */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        1. 和食の「だし」× 日本酒の「アミノ酸」が生む旨味の相乗効果
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        昆布や鰹節から丁寧に取られた「だし」には、グルタミン酸やイノシン酸といった「旨味成分」がたっぷりと含まれています。一方、お米由来の日本酒、特に純米酒には、豊富な「アミノ酸（旨味成分）」が含まれています。
                    </p>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        実は、人間の舌は異なる種類の旨味成分が合わさったとき、<strong>旨味を単体よりも数倍から数十倍も強く感じる（旨味の相乗効果）</strong>という科学的なメカニズムを持っています。和食のだしと日本酒は、まさにこの相乗効果を引き起こす最強のパートナーなのです。
                    </p>

                    <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: 32 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 24 }}>🍲</span> 煮物（ぶり大根・肉じゃが）× ふくよかな純米酒
                        </h3>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            醤油やだしの旨味がしっかり染み込んだ煮物には、同じくお米の旨味とふくよかさを持つ純米酒や生酛（きもと）系の日本酒を合わせます。口の中でだしと日本酒が混ざり合い、圧倒的な多幸感をもたらします。
                        </p>
                        
                        <div style={{ padding: 20, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e9ecef', marginTop: 24 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#bfa758', marginBottom: 8 }}>だしの旨味との相乗効果を狙うなら</div>
                            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>黒龍（こくりゅう）大吟醸</h4>
                            <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
                                絹のように滑らかで上品な旨味が特徴。上質なお出汁の風味を一切邪魔せず、和食の奥深さを優しく引き上げてくれる至高の食中酒です。
                            </p>
                            <a href="https://hb.afl.rakuten.co.jp/hgc/..." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#bf0000', color: '#fff', padding: '10px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 14, fontFamily: '"Noto Sans JP", sans-serif' }}>
                                楽天市場でチェックする
                            </a>
                        </div>
                    </div>
                </section>

                {/* Section: Temperature */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        2. ペアリングの次元を変える「温度の魔法」
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        料理の温度と、お酒の温度を合わせる。これもまた、和食のペアリングにおいて極めて有効なテクニックです。日本酒は5℃の雪冷えから、50℃の熱燗まで、温度によって全く異なる表情を見せてくれます。
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginBottom: 32 }}>
                        <div style={{ background: '#f0f4f8', padding: 24, borderRadius: 12 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#2c3e50' }}>❄️ 冷酒（5〜10℃）</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.6 }}>冷奴や酢の物、カルパッチョ風の冷菜など、冷たい和食にはキリッと冷やした吟醸酒がベスト。爽やかな香りと酸味が具材を心地よく引き締めます。</p>
                        </div>
                        <div style={{ background: '#fcf3e8', padding: 24, borderRadius: 12 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#2c3e50' }}>🌡 常温〜ぬる燗（20〜40℃）</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.6 }}>焼き魚や煮魚、おひたし等、温かい家庭的な和食に最適。人間の体温に近いため、お米の甘味と旨味が最も自然に口の中に浸透します。</p>
                        </div>
                        <div style={{ background: '#ffeef0', padding: 24, borderRadius: 12 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#2c3e50' }}>🔥 熱燗（45〜50℃）</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.6 }}>熱々のおでんや鍋料理、脂の乗った焼き鳥に。熱で揮発した香気成分と、キレのある後味が、脂っこさを一瞬で洗い流してくれます。</p>
                        </div>
                    </div>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Next Links */}
                <section>
                    <div style={{ background: '#1a1a1d', color: '#fff', padding: 40, borderRadius: 16, textAlign: 'center' }}>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#e6c27a' }}>最終回：四季の「旬」と「テロワール」を味わう</h3>
                        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
                            基礎、理論ときて、最後は感性の世界へ。日本の美でもある春夏秋冬の「旬の食材」と、その土地ならではの「地酒」を合わせる究極のペアリングについて解説します。
                        </p>
                        <Link 
                            href="/article/washoku-sake-pairing-part-3" 
                            style={{ 
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: '#fff', color: '#1a1a1d', padding: '14px 32px', 
                                borderRadius: 30, textDecoration: 'none', fontWeight: 700, fontSize: 16,
                                transition: 'opacity 0.2s', fontFamily: '"Noto Sans JP", sans-serif'
                            }}
                        >
                            第3回：四季とテロワールのペアリングへ進む →
                        </Link>
                        <div style={{ marginTop: 24 }}>
                            <Link href="/article/washoku-sake-pairing-part-1" style={{ color: '#888', textDecoration: 'underline', fontSize: 14 }}>
                                ← 第1回：同調と補完の基本に戻る
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    );
}
