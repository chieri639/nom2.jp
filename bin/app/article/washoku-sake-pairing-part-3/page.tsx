import React from 'react';
import Link from 'next/link';

export default function WashokuPairingPart3() {
    return (
        <article style={{ fontFamily: '"Noto Serif JP", "Mincho", serif', lineHeight: 1.8, color: '#2c2c2c', backgroundColor: '#faf9f5' }}>
            
            {/* Hero Section */}
            <header style={{ position: 'relative', height: '60vh', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="/images/washoku_pairing_hero_3.png" 
                        alt="春の和食と生酒のペアリング" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />
                </div>
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 24px', maxWidth: 800 }}>
                    <p style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', marginBottom: 16, color: '#e6c27a' }}>Washoku & Sake Pairing • Part 3</p>
                    <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, marginBottom: 24, lineHeight: 1.3, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                        【プロ直伝】和食ペアリングの極意<br />四季の「旬」と「テロワール」を味わう
                    </h1>
                </div>
            </header>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>
                <section style={{ marginBottom: 60 }}>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        「同調・補完」の基礎（第1回）、「旨味・温度」の理論（第2回）を経て、和食×日本酒ペアリング連載の最終回となる第3回へようこそ。
                    </p>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        最後に辿り着くのは、日本人のDNAに深く刻み込まれた<strong>「季節感（旬）」</strong>と、その土地の風土を味わう<strong>「テロワール（地産地消）」</strong>という世界です。計算を超えた、情緒的で最も贅沢なマリアージュをご紹介します。
                    </p>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Section: Seasonality */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        1. 春夏秋冬の「旬の食材」×「季節の日本酒」
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        和食の最大の魅力は、四季折々の「旬」の食材を取り入れることです。実は日本酒にも「旬」があります。冬に仕込まれ、季節の移ろいとともに変化していく日本酒の味わいは、その時々に採れる食材と完璧にリンクするようにできています。
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>
                        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderTop: '4px solid #f8a5c2' }}>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#2c3e50' }}>🌸 春：山菜 × しぼりたて生酒</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.6 }}>ふきのとうやタラの芽など、春の訪れを告げるほろ苦い山菜の天ぷらには、フレッシュで発泡感のある「しぼりたて生酒」や「うすにごり」を。生命力あふれる春の息吹を感じられます。</p>
                        </div>
                        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderTop: '4px solid #786fa6' }}>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#2c3e50' }}>🎐 夏：鮎の塩焼き × 夏酒（生貯蔵酒）</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.6 }}>香魚と呼ばれる鮎のほろ苦いワタと繊細な白身には、程よく酸味を立たせた清涼感のある「夏酒」をキリッと冷やして。川のせせらぎを思わせる軽快なペアリングです。</p>
                        </div>
                        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderTop: '4px solid #e15f41' }}>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#2c3e50' }}>🍂 秋：秋刀魚・キノコ × ひやおろし</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.6 }}>脂の乗った秋刀魚や出汁の出たキノコ料理には、ひと夏を越えて円熟味を増した「ひやおろし（秋あがり）」を。お互いの旨味が深まり落ち葉のような郷愁を誘います。</p>
                        </div>
                        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderTop: '4px solid #546de5' }}>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#2c3e50' }}>⛄ 冬：カニ・牡蠣 × しぼりたて新酒／熱燗</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.6 }}>旨味の塊である冬の味覚、カニや牡蠣。ピチピチの新酒でフレッシュに合わせるも良し、純米酒の熱燗を合わせて口の中で旨味を爆発させるも良し。ご馳走の季節です。</p>
                        </div>
                    </div>
                </section>

                {/* Section: Terroir */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        2. テロワール：「海の県の酒」と「山の県の酒」
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        ワインの世界でよく使われる「テロワール（風土・土地の個性）」。日本酒の世界でも<strong>「その土地の食材には、その土地の酒が一番合う」</strong>という絶対的な法則があります。
                    </p>

                    <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ marginBottom: 24 }}>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#2c3e50', borderBottom: '2px dotted #ccc', paddingBottom: 8 }}>🌊 海の県（富山・宮城・高知など）の日本酒</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.6 }}>
                                豊かな海産物に恵まれた地域の日本酒は、新鮮な魚介類の繊細な味を邪魔しないよう、「淡麗辛口」や「スッキリとした酸味」を持つ傾向があります。お刺身や焼き魚を食べる際は、海の県の地酒を選ぶとハズレがありません。
                            </p>
                        </div>
                        
                        <div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#2c3e50', borderBottom: '2px dotted #ccc', paddingBottom: 8 }}>⛰ 山の県（長野・岐阜・奈良など）の日本酒</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.6 }}>
                                山菜、キノコ、ジビエ、そして保存食（発酵食品や味噌・醤油文化）が発展した山の県の日本酒は、濃い味付けや独特の風味に負けないよう、「お米の旨味と甘味」がしっかり強い「濃醇旨口」の酒質になる傾向があります。煮物や味噌炒めには山の県のお酒が鉄板です。
                            </p>
                        </div>
                    </div>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Conclusion */}
                <section>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
                        日本酒と和食、その無限の可能性へ
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24, textAlign: 'center' }}>
                        全3回にわたって解説した「和食×日本酒ペアリング」。<br />
                        基本の『同調・補完』、魅惑の『旨味・温度』、そして情緒溢れる『旬・テロワール』。これらの方程式を頭の片隅に置きながら、最後はあなた自身の舌と感性で、自由にマリアージュを楽しんでください。
                    </p>

                    {/* Navigation back to index or previous parts */}
                    <div style={{ marginTop: 40, padding: 30, background: '#f8f9fa', borderRadius: 12, textAlign: 'center', border: '1px solid #e9ecef' }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#666' }}>和食×日本酒ペアリング連載 記事一覧</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                            <Link href="/article/washoku-sake-pairing-part-1" style={{ color: '#bfa758', textDecoration: 'none', fontWeight: 700 }}>
                                第1回：同調と補完の方程式
                            </Link>
                            <Link href="/article/washoku-sake-pairing-part-2" style={{ color: '#bfa758', textDecoration: 'none', fontWeight: 700 }}>
                                第2回：だしの旨味と温度の魔法
                            </Link>
                            <span style={{ color: '#333', fontWeight: 700 }}>
                                📍 第3回：四季の旬とテロワール（現在の記事）
                            </span>
                        </div>
                        <div style={{ marginTop: 32 }}>
                            <Link href="/article" style={{ display: 'inline-block', backgroundColor: '#1a1a1d', color: '#fff', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
                                記事一覧トップへ戻る
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    );
}
