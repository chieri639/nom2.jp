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
                        ユネスコ無形文化遺産にも登録され、世界中で愛されている「和食」。そして、和食のお供として古くから日本の食卓に欠かせないのが「日本酒」です。
                    </p>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        なぜ和食と日本酒はこれほどまでに合うのでしょうか？それは、どちらも<strong>「お米」と「水」</strong>という全く同じDNAから作られているからです。<br />
                        ご飯とおかずが合うように、米から造られた日本酒が和食と合わないわけがありません。
                    </p>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        本連載では、いつもの和食をもっと美味しく楽しむためのペアリング術を全3回にわたって解説します。第1回となる今回は、初心者でも今すぐ実践できるペアリングの基本となる<strong>「2つの方程式」</strong>をご紹介します。
                    </p>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Formula 1: 同調 */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        方程式1：「同調」〜似たもの同士を合わせる〜
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        ペアリングの最も基本的な考え方が<strong>「同調」</strong>です。これは、料理と日本酒が持つ「香り」「味わいの濃さ（ボリューム感）」「重さ」などの特徴を同じベクトルで揃えるというアプローチです。
                    </p>
                    
                    <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: 32 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 24 }}>🐟</span> 実践例：お刺身（白身魚）× 爽快な辛口日本酒
                        </h3>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            例えば、ヒラメや鯛などの淡白な白身魚のお刺身。この繊細な味わいを楽しむには、香りが穏やかで、スッキリとしたキレのある「爽酒（本醸造や生酒などの辛口）」を合わせるのが正解です。
                        </p>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            逆に、脂の乗った大トロやブリのような濃厚な魚には、お酒側もお米の旨味がしっかりと感じられる「醇酒（純米酒や生酛造り）」をぶつけることで、味わいのボリュームが同調し、口の中で見事なマリアージュが完成します。
                        </p>
                        
                        {/* Recommendation Card */}
                        <div style={{ padding: 20, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e9ecef', marginTop: 24 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#bfa758', marginBottom: 8 }}>白身魚の「同調」におすすめの銘柄</div>
                            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>伯楽星（はくらくせい）特別純米</h4>
                            <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
                                究極の食中酒として名高い銘柄。料理の邪魔をしない控えめな香りと、スッと消えるキレの良さが、お刺身の繊細な風味を最大限に引き立てます。
                            </p>
                            <a href="https://hb.afl.rakuten.co.jp/hgc/..." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#bf0000', color: '#fff', padding: '10px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 14, fontFamily: '"Noto Sans JP", sans-serif' }}>
                                楽天市場でチェックする
                            </a>
                        </div>
                    </div>
                </section>

                {/* Formula 2: 補完 */}
                <section style={{ marginBottom: 60 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        方程式2：「補完」〜足りない要素を補い合う〜
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 24 }}>
                        もうひとつのアプローチが<strong>「補完」</strong>です。料理にない要素をお酒で足したり、逆に料理の強い要素（油分や生臭さなど）をお酒で洗い流したり（ウォッシュ効果）して、口の中のバランスを整えるテクニックです。
                    </p>

                    <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: 32 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 24 }}>🍤</span> 実践例：天ぷら × キレのある日本酒
                        </h3>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            サクサクに揚がった天ぷらは絶品ですが、食べ進めるとどうしても口の中に油分が蓄積して重く感じてきます。ここで活躍するのが「ウォッシュ効果」です。
                        </p>
                        <p style={{ fontSize: 16, marginBottom: 20 }}>
                            酸味やアルコール感、あるいは炭酸ガス（スパークリング日本酒）を含んだ日本酒を口に含むことで、油分がスッキリと洗い流され、次のひと口がまた新鮮な気持ちで美味しく食べられるようになります。これが「補完」の代表的な効果です。
                        </p>
                        
                        {/* Recommendation Card */}
                        <div style={{ padding: 20, background: '#f8f9fa', borderRadius: 8, border: '1px solid #e9ecef', marginTop: 24 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#bfa758', marginBottom: 8 }}>天ぷらの「補完（ウォッシュ）」におすすめの銘柄</div>
                            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>大七（だいしち）生酛 純米</h4>
                            <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
                                豊かな酸味としっかりとした旨味を持つ伝統的な生酛造り。温めて（お燗にして）飲むことで、油分を溶かしながら口の中を驚くほどスッキリと洗ってくれます。
                            </p>
                            <a href="https://hb.afl.rakuten.co.jp/hgc/..." target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#bf0000', color: '#fff', padding: '10px 24px', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 14, fontFamily: '"Noto Sans JP", sans-serif' }}>
                                楽天市場でチェックする
                            </a>
                        </div>
                    </div>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Conclusion & Next Links */}
                <section>
                    <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
                        基本を押さえて、あなただけのペアリングを
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 40, textAlign: 'center' }}>
                        まずは「似たもの同士を合わせる（同調）」「洗い流してリセットする（補完）」の2つを意識するだけで、毎日の和食が劇的に美味しくなります。ぜひ今夜の晩酌から試してみてください。
                    </p>

                    <div style={{ background: '#1a1a1d', color: '#fff', padding: 40, borderRadius: 16, textAlign: 'center' }}>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#e6c27a' }}>次回予告：さらに奥深いペアリングの世界へ</h3>
                        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
                            第2回では、和食の命である「だしの旨味」と、日本酒ならではの「温度変化（お燗）」が生み出す爆発的な相乗効果の理論に迫ります。
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
