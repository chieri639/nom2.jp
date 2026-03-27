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
                        「同調・補完」の基礎（第1回）、「旨味・温度」の科学的理論（第2回）を経て、和食×日本酒ペアリング連載の最終回となる第3回へようこそ。
                    </p>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        これまで紹介してきた方程式は、世界中のどのような料理に対しても当てはめることができる普遍的なルールでした。しかし今回ご紹介するのは、日本独自の風土によって培われた<strong>「季節感（旬）」</strong>と、その土地の歴史を丸ごと味わう<strong>「テロワール（地産地消）」</strong>という世界です。
                    </p>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        理屈や計算を超え、日本人のDNAに深く刻み込まれた「情緒」で味わう、最も贅沢で粋な究極のペアリング手法をご紹介します。
                    </p>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Section: Seasonality */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        1. 春夏秋冬の「旬の食材」×「季節の限定酒」が織りなす奇跡
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        和食の最大の魅力は、日本ならではのはっきりとした四季の移ろいと、自然の恵みである「旬」の食材を大切にしていることです。実は日本酒の酒造りも、気温が下がる冬から春先にかけて行われる「寒造り（かんづくり）」を中心とした一年周期のサイクルで動いており、明確な「旬」が存在します。
                    </p>
                    <p style={{ fontSize: 17, marginBottom: 32 }}>
                        冬に仕込まれ、季節を追うごとに変化・熟成していく日本酒の味わいは、面白いほどに「その時々に野山や海から採れる旬の食材」と完璧にリンクするようにできています。
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 32, marginBottom: 32 }}>
                        <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 6px 24px rgba(0,0,0,0.06)', borderTop: '5px solid #ffa1c5' }}>
                            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 28 }}>🌸</span> 春：山菜の生命力 ×「しぼりたて生酒・うすにごり」
                            </h3>
                            <p style={{ fontSize: 16, lineHeight: 1.8 }}>
                                雪解けとともに芽吹く、ふきのとう、タラの芽、こごみ等の山菜たち。冬の間に眠っていた体を起こすような、山菜特有の「エグ味」や「ほろ苦さ」には、火入れ処理を行っていない（酵母が生きている）ピチピチとした<strong>「しぼりたて生酒」や「春のうすにごり（微発泡）」</strong>を合わせます。若々しくフレッシュな酸味と微炭酸が、天ぷらの油と山菜の苦味を心地よく包み込み、生命力の爆発を感じさせます。
                            </p>
                        </div>
                        
                        <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 6px 24px rgba(0,0,0,0.06)', borderTop: '5px solid #6ed1e2' }}>
                            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 28 }}>🎐</span> 夏：鮎やハモの涼感 ×「夏酒（生貯蔵酒）」
                            </h3>
                            <p style={{ fontSize: 16, lineHeight: 1.8 }}>
                                蒸し暑い日本の夏を乗り切るための、鮎の塩焼きや、骨切りされたハモの湯引き、夏野菜（トマトや茄子）やそうめんなど、涼しげで淡白な食事には<strong>「夏酒（なつざけ）」</strong>を。アルコール度数を少し低めにして軽快に仕上げたり、リンゴ酸を多く出して白ワインのような爽やかな酸味を持たせた夏酒をキリッと冷やせば、清流のせせらぎを思わせる究極の涼感ペアリングが完成します。
                            </p>
                        </div>
                        
                        <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 6px 24px rgba(0,0,0,0.06)', borderTop: '5px solid #d35400' }}>
                            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 28 }}>🍂</span> 秋：秋刀魚・キノコ ×「ひやおろし（秋あがり）」
                            </h3>
                            <p style={{ fontSize: 16, lineHeight: 1.8 }}>
                                脂が乗った秋刀魚（サンマ）の塩焼きや、出汁がたっぷりと出た松茸などのキノコ料理。この「食欲の秋・実りの秋」の濃厚な旨味には、春先に一度だけ火入れ（加熱殺菌）を行い、ひと夏をひんやりとした蔵の中で越して円熟味を増した<strong>「ひやおろし（秋あがり）」</strong>がマストです。角が取れて落ち着いた香りと、深みを増したお米の旨味が、秋の豊潤な味覚と完璧に同調します。
                            </p>
                        </div>
                        
                        <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 6px 24px rgba(0,0,0,0.06)', borderTop: '5px solid #34495e' }}>
                            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 28 }}>⛄</span> 冬：カニ・牡蠣・フグ ×「新酒／にごり酒／熱燗」
                            </h3>
                            <p style={{ fontSize: 16, lineHeight: 1.8 }}>
                                旨味と脂の塊である冬の味覚。カニ、牡蠣（カキ）、フグ、そしてアンコウなどの鍋料理の圧倒的なエネルギーには、酒造りが本格化して第一陣として蔵から出される力強い<strong>「しぼりたて新酒」</strong>や、米の澱をたっぷりと含んだクリーミーな<strong>「にごり酒」</strong>を。あるいは、しっかりとした純米酒の<strong>「熱燗（あつかん）」</strong>を合わせることで、体の芯から温まる冬ならではのご馳走ペアリングとなります。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section: Terroir */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        2. テロワールの法則：「海の県の酒」と「山の県の酒」
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        ワインの世界で頻繁に語られる「テロワール（風土・土地の個性）」。実は日本酒の世界にも、歴史に基づいた絶対的なペアリングの法則があります。<br />
                        現代のように冷蔵流通網が発達していなかった数百年前、人々は「自分たちの土地で採れた食材」を、「自分たちの土地で造られた地酒」と共に毎日消費していました。何代にもわたって合わせられ続けた結果、お酒の味が自然と<strong>「その土地の代表的な料理に一番合う味」へと進化・最適化</strong>していったのです。
                    </p>

                    <div style={{ background: '#fff', padding: 36, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ marginBottom: 36 }}>
                            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0984e3', borderBottom: '2px dotted #cee5f5', paddingBottom: 12 }}>
                                🌊 海の県（新潟・富山・宮城・高知など）の日本酒の特徴
                            </h3>
                            <p style={{ fontSize: 16, lineHeight: 1.8 }}>
                                豊かな漁場を持ち、日常的に「新鮮な海産物・白身魚のお刺身」を食べてきた地域の日本酒は、繊細な魚介の風味を決して邪魔しないように、香りが穏やかで、余韻がスパッと美しくキレる<strong>「淡麗辛口（たんれい・からくち）」</strong>の酒質へと進化しました。<br />
                                ですから、「お刺身や焼き魚」など海の幸をメインに食べるときは、とりあえず新潟や高知などの「海のエリアの地酒」をメニューから選んでおけば、大きな失敗は絶対に起きません。
                            </p>
                        </div>
                        
                        <div>
                            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#27ae60', borderBottom: '2px dotted #d1efdb', paddingBottom: 12 }}>
                                ⛰ 山の県（長野・岐阜・奈良・福島会津など）の日本酒の特徴
                            </h3>
                            <p style={{ fontSize: 16, lineHeight: 1.8 }}>
                                一方で、海から遠く新鮮な魚が手に入りにくかった内陸の地域では、山菜、キノコ、猪や鯉・鮎、そして冬を越すための様々な保存食（発酵食品、独自の味噌・醤油文化）が発展しました。<br />
                                これらの「塩気が強く、味付けの濃い郷土料理」に負けないように、山のエリアの日本酒は、お米の甘味と強い旨味がどっしりと主張する<strong>「濃醇旨口（のうじゅん・うまくち）」</strong>の酒質へと進化しました。豚の角煮、味噌煮込み、照らし焼きなど、味が濃くて甘辛い山の幸には、山の県のお酒（長野の酒など）を合わせるのが大正解です。
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
                        これにて、全3回にわたる「和食×日本酒ペアリング」の徹底解説は終了です。<br />
                        第1回の「同調・補完」の基本、第2回の「旨味・温度」による爆発的効果、そして今回の「旬・テロワール」。これらの方程式を頭の片隅に置きつつも、正解はひとつではありません。<br />
                        最後はあなた自身の舌と感性で、自由で驚きに満ちたマリアージュを、素晴らしいレストランやご家庭の食卓で楽しんでください。
                    </p>

                    {/* Navigation back to index or previous parts */}
                    <div style={{ marginTop: 40, padding: 32, background: '#f8f9fa', borderRadius: 12, textAlign: 'center', border: '1px solid #e9ecef' }}>
                        <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: '#2c3e50', letterSpacing: 1 }}>和食×日本酒ペアリング連載（全3回）記事一覧</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                            <Link href="/article/washoku-sake-pairing-part-1" style={{ fontSize: 16, color: '#bfa758', textDecoration: 'none', fontWeight: 700, padding: '8px 16px', borderRadius: 8, transition: 'background-color 0.2s', ':hover': { backgroundColor: '#fff' } } as React.CSSProperties}>
                                📖 第1回：同調と補完の方程式
                            </Link>
                            <Link href="/article/washoku-sake-pairing-part-2" style={{ fontSize: 16, color: '#bfa758', textDecoration: 'none', fontWeight: 700, padding: '8px 16px', borderRadius: 8, transition: 'background-color 0.2s', ':hover': { backgroundColor: '#fff' } } as React.CSSProperties}>
                                📖 第2回：だしの旨味と温度の魔法
                            </Link>
                            <span style={{ fontSize: 16, color: '#333', fontWeight: 700, padding: '8px 16px', backgroundColor: '#e2e8f0', borderRadius: 8 }}>
                                📍 第3回：四季の旬とテロワール（現在の記事）
                            </span>
                        </div>
                        <div style={{ marginTop: 40 }}>
                            <Link href="/article" style={{ display: 'inline-block', backgroundColor: '#1a1a1d', color: '#fff', padding: '14px 40px', borderRadius: 30, textDecoration: 'none', fontWeight: 700, fontSize: 15, transition: 'background-color 0.2s' }}>
                                記事一覧（トップ）へ戻る
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    );
}
