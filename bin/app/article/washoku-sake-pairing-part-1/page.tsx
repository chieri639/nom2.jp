import React from 'react';
import Link from 'next/link';

export default function WashokuPairingPart1() {
    return (
        <article style={{ fontFamily: '"Noto Serif JP", "Mincho", serif', lineHeight: 1.8, color: '#2c2c2c', backgroundColor: '#faf9f5' }}>
            
            {/* Hero Section */}
            <header style={{ position: 'relative', height: '60vh', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="/images/washoku_pairing_hero_1.png" 
                        alt="和食と日本酒のペアリング" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />
                </div>
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 24px', maxWidth: 800 }}>
                    <p style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', marginBottom: 16, color: '#e6c27a' }}>Washoku & Sake Pairing • Part 1</p>
                    <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, marginBottom: 24, lineHeight: 1.3, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                        【プロ直伝】和食と日本酒ペアリングの基本<br />相性を抜群にする「2つの方程式」
                    </h1>
                </div>
            </header>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>
                {/* Intro */}
                <section style={{ marginBottom: 60 }}>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        2013年にユネスコ無形文化遺産に登録され、いまや世界中で健康を意識する美食家たちから熱狂的な支持を集めている「和食」。そして、その和食の歴史とともに歩み、古くから日本の食卓に欠かせない最高の伴侶として君臨し続けているのが「日本酒」です。
                    </p>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        ワインとフランス料理が合うように、なぜ和食と日本酒はこれほどまでに引き立て合うのでしょうか？<br />
                        その最大の理由は、両者が<strong>「お米」と「水」</strong>という全く共通のDNAから作られていることにあります。私たちが普段「白いご飯とおかず」を一緒に食べて美味しいと感じるのと同じように、米から造られた液体である日本酒が和食と合わないわけがありません。
                    </p>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        しかし、「日本酒なら和食なんでも合う」わけではありません。お酒のタイプ（辛口、甘口、フルーティー、濃厚など）と料理の特徴を理論的に掛け合わせることで、その美味しさは何倍にも膨れ上がります。<br />
                        本連載では、いつもの和食をもっと感動的に楽しむためのペアリング術を全3回にわたって徹底解説。第1回となる今回は、プロも実践するペアリングの基礎理論<strong>「同調」と「補完」</strong>という2つの方程式をご紹介します。
                    </p>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Formula 1: 同調 */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        方程式1：「同調」〜似たもの同士を合わせる〜
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        ペアリングの世界で最もポピュラーかつ失敗が少ない王道のアプローチが<strong>「同調（シンクロナイズ）」</strong>です。これは、料理と日本酒が持つ要素（香り、味わいの濃さ、甘味、酸味、色の濃さなど）のベクトルを同じ方向に揃えるテクニックです。
                    </p>
                    <p style={{ fontSize: 17, marginBottom: 32 }}>
                        最もわかりやすい目安は「色と重さ」です。淡い色の料理（白身魚、塩焼き）には淡麗な（スッキリとした色の薄い）お酒を。濃い色の料理（すき焼き、ブリの照り焼き）には、熟成感のある濃厚な（色の濃い）お酒を合わせるのが鉄則です。
                    </p>
                    
                    <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: 32 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 24 }}>🐟</span> 実践例1：お刺身（白身・赤身）の同調
                        </h3>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            <strong>【白身魚（ヒラメ・鯛・イカ）】</strong><br />
                            昆布締めなどの繊細な旨味や、淡白な味わいを楽しむには、香りが穏やかで、余韻が短くスッと消えるキレの良さを持つ「爽酒（本醸造や生酒などの辛口）」が正解です。お酒が主張しすぎず、魚本来の甘味をそっと押し上げてくれます。
                        </p>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            <strong>【赤身魚・青魚（マグロ・ブリ・カツオ）】</strong><br />
                            脂がたっぷり乗った濃厚な味わいや、血合いの持つ鉄分には、お酒側もお米の旨味がどっしりと感じられる「醇酒（純米酒や生酛造り）」をぶつけます。味わいのボリューム感（重さ）が同調し、口の中で力強いマリアージュが完成します。
                        </p>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            <strong>【甘辛いタレ（すき焼き・豚の角煮）】</strong><br />
                            醤油と砂糖が作り出す濃厚な甘辛さには、古酒（熟成酒）や貴醸酒（きじょうしゅ）などのカラメルのような香りとコクを持つお酒を合わせることで、驚くほどの同調体験が得られます。
                        </p>
                        
                        {/* Recommendation Card */}
                        <div style={{ padding: 24, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e9ecef', marginTop: 32 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#bfa758', marginBottom: 8 }}>「同調」で白身魚の繊細さを極限まで引き立てる名酒</div>
                            <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>伯楽星（はくらくせい）特別純米</h4>
                            <p style={{ fontSize: 15, color: '#555', marginBottom: 20, lineHeight: 1.7 }}>
                                宮城県・新澤醸造店が醸す、「究極の食中酒」をコンセプトにした代名詞的銘柄。あえて香りを控えめにし、米の旨味を感じさせながらも、まるで水のようにスッと切れて消えていくシャープな後味が特徴。ヒラメの薄造りに少しの塩と柑橘を絞り、キリッと冷やした伯楽星を合わせれば、これ以上ない至福の時間が訪れます。
                            </p>
                            <a href="https://hb.afl.rakuten.co.jp/hgc/..." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#bf0000', color: '#fff', padding: '12px 28px', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 15, fontFamily: '"Noto Sans JP", sans-serif', transition: 'opacity 0.2s' }}>
                                楽天市場でチェックする
                            </a>
                        </div>
                    </div>
                </section>

                {/* Formula 2: 補完 */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        方程式2：「補完」〜足りない要素を補い合う・洗い流す〜
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        もうひとつの高度なアプローチが<strong>「補完（コントラスト・マスキング・ウォッシュ）」</strong>です。料理にない要素をお酒側の個性で足したり、逆に料理が持つネガティブな要素（過度な油分や生臭さなど）をお酒で洗い流したりして、口の中の味覚バランスを整えるテクニックです。
                    </p>

                    <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: 32 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 24 }}>🍤</span> 実践例2：天ぷら × キレのある日本酒（ウォッシュ効果）
                        </h3>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            サクサクに揚がった極上の天ぷら。しかし、何品も食べ進めるとどうしても口の中に油分が蓄積して重くもたれてきます。ここで圧倒的な効力を発揮するのが、日本酒の持つ<strong>「ウォッシュ効果（洗い流し）」</strong>です。
                        </p>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            酸味や高いアルコール度数、あるいは炭酸ガス（スパークリング日本酒）を含んだ日本酒を口に含むことで、舌の上に残った脂のコーティングが化学的に分解・洗浄されます。油分がスッキリと洗い流されることで口内がリセットされ、「次のひと口が、まるでコース1品目かのように新鮮な気持ちで美味しく食べられる」ようになります。これが居酒屋で「揚げ物×ビール」「揚げ物×ハイボール」が合う理由と同じメカニズムです。
                        </p>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            <strong>【魚介の生臭さを消す（マスキング効果）】</strong><br />
                            また、青魚特有の青臭さや、貝類の生臭さ（トリメチルアミンなど）が気になるときは、フルーティーで華やかな香りを持つ「薫酒（大吟醸など）」を合わせるのが効果的です。お酒の華やかな香りが魚の臭いを包み込み（マスキング）、美味しい風味だけを抽出してくれます。
                        </p>
                        
                        {/* Recommendation Card */}
                        <div style={{ padding: 24, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e9ecef', marginTop: 32 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#bfa758', marginBottom: 8 }}>「補完（ウォッシュ効果）」で揚げ物を無限に楽しむ</div>
                            <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>大七（だいしち）生酛 純米</h4>
                            <p style={{ fontSize: 15, color: '#555', marginBottom: 20, lineHeight: 1.7 }}>
                                福島県・大七酒造が誇る、江戸時代から続く世界最高峰の超伝統的製法「生酛（きもと）造り」の決定版。乳酸菌由来の豊かな酸味と、どっしりとしたお米の旨味を持っています。このお酒を「ぬる燗（40度前後）」に温めて天ぷらと合わせると、温かいアルコールと酸味が天ぷらの油を瞬時に溶かし切り、驚くほど口内をさっぱりと洗い上げてくれます。
                            </p>
                            <a href="https://hb.afl.rakuten.co.jp/hgc/..." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#bf0000', color: '#fff', padding: '12px 28px', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 15, fontFamily: '"Noto Sans JP", sans-serif', transition: 'opacity 0.2s' }}>
                                楽天市場でチェックする
                            </a>
                        </div>
                    </div>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Conclusion & Next Links */}
                <section>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
                        基本を押さえて、毎晩の食卓をレストランに変える
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 40, textAlign: 'center' }}>
                        難しい専門知識がなくても、「似たもの同士を合わせる（同調）」「洗い流してリセットする（補完）」の2つのアプローチを意識するだけで、いつもの食卓が料亭のような格別な空間に変わります。ぜひ今夜の晩酌から、目の前の料理の特徴をよく観察して、最適なお酒を選んでみてください。
                    </p>

                    <div style={{ background: '#1a1a1d', color: '#fff', padding: 40, borderRadius: 16, textAlign: 'center' }}>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#e6c27a' }}>次回予告：さらに奥深いペアリングの世界へ</h3>
                        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
                            第2回では、和食の命である<strong>「だしの旨味」</strong>と、日本酒ならではの<strong>「温度変化（お燗）」</strong>が生み出す爆発的な相乗効果の理論に迫ります。なぜ熱燗はおでんに合うのか？その科学的理由が明らかになります。
                        </p>
                        <Link 
                            href="/article/washoku-sake-pairing-part-2" 
                            style={{ 
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: '#fff', color: '#1a1a1d', padding: '14px 32px', 
                                borderRadius: 30, textDecoration: 'none', fontWeight: 700, fontSize: 16,
                                transition: 'opacity 0.2s', fontFamily: '"Noto Sans JP", sans-serif'
                            }}
                        >
                            第2回：だしの旨味と温度の魔法へ進む →
                        </Link>
                    </div>
                </section>
            </div>
        </article>
    );
}
