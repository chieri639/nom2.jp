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
                        前回の第1回では、「同調」と「補完」というペアリングの基礎方程式をお伝えしました。今回はそこから一歩踏み込み、和食のペアリングにおいて最も感動的で、かつ日本固有の食文化の結晶とも言える<strong>「だしの旨味」</strong>と<strong>「温度」</strong>について、科学的かつ実践的に掘り下げていきます。
                    </p>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        和食の根幹であり、ユネスコ無形文化遺産登録の鍵ともなった「だし」。そして、世界中の醸造酒の中でも極めて珍しい「幅広い温度帯で楽しめる（お燗）」という日本酒の特異な性質。この2つが出会ったとき、口の中には言葉を失うほどのマリアージュが広がります。
                    </p>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Section: Umami Synergy */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        1. 科学が証明する「旨味の相乗効果」の爆発
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        「Umami（旨味）」という言葉が世界共通語になっている通り、和食の出汁（だし）は旨味成分の宝庫です。代表的なものとして、昆布が持つ「グルタミン酸」、鰹節が持つ「イノシン酸」があります。<br />
                        一方、お米から複雑な発酵工程を経て造られる日本酒、特に純米酒や生酛系の日本酒には、豊富で多種多様な「アミノ酸（旨味成分）」と「コハク酸（貝類に似た旨味）」が含まれています。
                    </p>
                    <p style={{ fontSize: 17, marginBottom: 32 }}>
                        実は、人間の舌には驚くべき知覚メカニズムが備わっています。異なる系統の旨味成分（例えばアミノ酸系と核酸系）が口の中で合わさったとき、<strong>旨味の強さを単体の「1+1=2」ではなく、「1+1=7」や「1+1=8」として爆発的に強く感じる（旨味の相乗効果）</strong>のです。昆布と鰹を合わせた出汁が圧倒的に美味しいのはこのためであり、ここに更に日本酒のアミノ酸を注ぎ込むことで、旨味のビッグバンとも呼べる究極の調和が生まれます。
                    </p>

                    <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: 32 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 24 }}>🍲</span> 実践：煮物・おでん × ふくよかな純米酒（生酛/山廃）
                        </h3>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            醤油とたっぷりの出汁が染み込んだ「ブリ大根」や「豚の角煮」「おでん」といった煮込み料理には、必ずお米の旨味とコクが強い純米系の日本酒を合わせます。特に、野生の乳酸菌を取り入れて造る「生酛（きもと）」や「山廃（やまはい）」と呼ばれる造り方の日本酒は、アミノ酸の含有量が多く、濃厚な和食の出汁に絶対に負けないパワフルな旨味を持っています。
                        </p>
                        
                        <div style={{ padding: 24, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e9ecef', marginTop: 24 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#bfa758', marginBottom: 8 }}>「だし」の旨味と共鳴する究極の食中酒</div>
                            <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>黒龍（こくりゅう）大吟醸</h4>
                            <p style={{ fontSize: 15, color: '#555', marginBottom: 20, lineHeight: 1.7 }}>
                                福井県・黒龍酒造が誇る大吟醸。大吟醸でありながら香りは穏やかで、特筆すべきは絹のような滑らかさと透明感のある上品な旨味です。上質なお出汁（一番出汁のお椀や、茶碗蒸しなど）の風味を一切邪魔せず、和食の持つ奥深い旨味の余韻を優しく、そして長く引き延ばしてくれます。<br />
                                ※濃い味付けのおでん等の場合は、よりどっしりとした『天狗舞 山廃純米』等を選ぶのも素晴らしい選択です。
                            </p>
                            <a href="https://hb.afl.rakuten.co.jp/hgc/..." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#bf0000', color: '#fff', padding: '12px 28px', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 15, fontFamily: '"Noto Sans JP", sans-serif', transition: 'opacity 0.2s' }}>
                                楽天市場でチェックする
                            </a>
                        </div>
                    </div>
                </section>

                {/* Section: Temperature */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        2. ペアリングの次元を変える日本酒固有の「温度の魔法」
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        料理の温度と、お酒の温度を合わせる。とてもシンプルな法則ですが、これは和食のペアリングにおいてマジックのような効果を発揮します。<br />
                        世界中の数ある醸造酒（ワインやビールなど）の中で、5℃から50℃以上まで、これほど幅広い温度帯で飲まれ、それぞれの温度に「雪冷え」「花冷え」「日向燗」「熱燗」といった美しい呼称（温度の名称）がついているお酒は日本酒をおいて他にありません。同じ銘柄の日本酒でも、温度を変えるだけで香りの広がり方や甘味の感じ方が劇的に変化します。
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 24, marginBottom: 32 }}>
                        <div style={{ background: '#f0f4f8', padding: 24, borderRadius: 12, borderLeft: '6px solid #82ccdd' }}>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#2c3e50' }}>❄️ 冷酒（5〜10℃：雪冷え・花冷え）</h3>
                            <p style={{ fontSize: 16, lineHeight: 1.7 }}>
                                温度を下げると、お酒の持つ甘味やアルコール感が引っこみ、代わりに酸味が際立って舌をキュッと引き締める感覚が強くなります。冷奴や酢の物、カルパッチョ風の冷菜など、冷たい和食の温度に合わせることで、口の中がダレることなく清涼感あふれるペアリングが楽しめます。
                            </p>
                        </div>
                        <div style={{ background: '#fcf3e8', padding: 24, borderRadius: 12, borderLeft: '6px solid #e1b12c' }}>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#2c3e50' }}>🌡 常温〜ぬる燗（20〜40℃：冷や・人肌燗・ぬる燗）</h3>
                            <p style={{ fontSize: 16, lineHeight: 1.7 }}>
                                実は人間の味覚は人間の体温に近い35℃〜40℃（人肌燗〜ぬる燗）のときに、最もアミノ酸の「旨味」と「甘味」を豊かに感じ取るようにできています。焼き魚、ブリの照り焼き、おひたしなど、温かくて家庭的な和食に合わせると、お米の甘味と旨味が最も自然に、優しく口の中に浸透していきます。
                            </p>
                        </div>
                        <div style={{ background: '#ffeef0', padding: 24, borderRadius: 12, borderLeft: '6px solid #eb2f06' }}>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#2c3e50' }}>🔥 上燗〜熱燗（45〜50℃：上燗・熱燗）</h3>
                            <p style={{ fontSize: 16, lineHeight: 1.7 }}>
                                温度を上げると、旨味が凝縮すると同時にアルコールの揮発が早くなり、後味が鋭く「キレる（スパッと消える）」ようになります。熱々のおでん、冬の鍋料理、脂の乗った焼き鳥などに熱燗を合わせると、熱で溶けた食材の脂っこさを熱燗のキレが一瞬で洗い流す「究極のウォッシュ効果」を生み出し、無限に食べ続けられるような感覚に陥ります。
                            </p>
                        </div>
                    </div>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Next Links */}
                <section>
                    <div style={{ background: '#1a1a1d', color: '#fff', padding: 40, borderRadius: 16, textAlign: 'center' }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#e6c27a' }}>最終回予告：四季の「旬」と「テロワール」を味わう</h3>
                        <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 32, opacity: 0.9 }}>
                            第1回の「基礎」、第2回の「理論」ときて、最後は理屈を超えた「感性」の世界へ。<br />
                            日本の美意識でもある春夏秋冬の「旬の食材」と、その土地ならではの風土が生んだ「地酒」を合わせる、最も粋で情緒的な究極のペアリング手法について解説します。
                        </p>
                        <Link 
                            href="/article/washoku-sake-pairing-part-3" 
                            style={{ 
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: '#fff', color: '#1a1a1d', padding: '16px 36px', 
                                borderRadius: 30, textDecoration: 'none', fontWeight: 700, fontSize: 16,
                                transition: 'opacity 0.2s', fontFamily: '"Noto Sans JP", sans-serif'
                            }}
                        >
                            第3回：四季とテロワールのペアリングへ進む →
                        </Link>
                        <div style={{ marginTop: 24 }}>
                            <Link href="/article/washoku-sake-pairing-part-1" style={{ color: '#888', textDecoration: 'underline', fontSize: 15 }}>
                                ← 第1回：同調と補完の基本に戻る
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </article>
    );
}
