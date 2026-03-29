import React from 'react';
import Link from 'next/link';

export default function HokkaidoSakeGuide() {
    return (
        <article style={{ fontFamily: '"Noto Serif JP", "Mincho", serif', lineHeight: 1.8, color: '#2c2c2c', backgroundColor: '#faf9f5' }}>
            
            {/* Hero Section */}
            <header style={{ position: 'relative', height: '40vh', minHeight: 260, maxHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="/images/hokkaido_sake_hero.png" 
                        alt="北海道の美しい雪景色と日本酒" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />
                </div>
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 24px', maxWidth: 800 }}>
                    <p style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 700, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', marginBottom: 16, color: '#e6c27a' }}>LOCAL SAKE MAP: HOKKAIDO</p>
                    <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, marginBottom: 24, lineHeight: 1.4, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                        【2026年最新版】北海道の日本酒マップ！<br />全14酒蔵の特徴と代表銘柄を完全網羅
                    </h1>
                </div>
            </header>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>
                <section style={{ marginBottom: 60 }}>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        47都道府県の銘酒と酒蔵を網羅する「ローカル銘酒マップ」。第1弾の舞台は、広大な自然と圧倒的な食の宝庫である<strong>「北海道」</strong>です。
                    </p>
                    <p style={{ fontSize: 18, marginBottom: 24 }}>
                        かつて北海道の日本酒といえば、「寒い地域でお燗にして体を温めるための、昔ながらの淡麗辛口」というイメージが強かったかもしれません。<br />
                        しかし近年、北海道独自の酒造好適米（酒米）の品質向上や、若き醸造家たちの台頭により、北海道は<strong>全国随一の高品質なプレミアム日本酒の産地</strong>へと劇的な進化を遂げました。
                    </p>
                    <p style={{ fontSize: 18 }}>
                        本記事では、北海道内で本物の日本酒を醸す<strong>代表的な全14酒蔵</strong>をエリア別（上川・道央・その他エリア）に完全網羅。北海道旅行や出張の際のお土産選び、お取り寄せの参考にぜひご活用ください。
                    </p>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '40px 0' }} />

                {/* Region 1: Kamikawa / Asahikawa (The Center of Hokkaido Sake) */}
                <section style={{ marginBottom: 80 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        【上川・大雪エリア】名水と極寒が育む一大産地
                    </h2>
                    <p style={{ fontSize: 17, marginBottom: 40 }}>
                        大雪山系の豊かな伏流水と盆地特有の厳しい寒暖差を併せ持つ、北海道を代表する酒造りのメッカです。
                    </p>

                    {/* Brewery 1: Otokoyama */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>1. 男山（おとこやま）株式会社</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 旭川市 / 代表銘柄：男山</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            世界最大の酒類コンクールで長年金賞を受賞し続けるなど、「世界のOTOKOYAMA」として絶大な知名度を誇ります。特徴は雪の中を流れるような透明感のある「淡麗辛口」。魚介類との相性は無敵です。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 男山の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 2: Takasago */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>2. 高砂（たかさご）酒造</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 旭川市 / 代表銘柄：国士無双、農家の酒</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            1899年創業。「国士無双」という非常に有名で力強いブランドを擁します。大自然の荒々しさをも思わせるような超淡麗でキリッとした鋭い辛口が特徴で、毎日の晩酌で飲み飽きない本格派の食中酒です。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 高砂酒造（国士無双）の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 3: Godo Shusei */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>3. 合同酒精 旭川工場（大雪乃蔵）</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 旭川市 / 代表銘柄：大雪乃蔵</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            最新の醸造設備を備えながらも、北海道産米100％と長年培った確かな技術で高品質な酒造りを行っています。華やかな香りとふくらみのある味わいが特徴で、幅広い層から支持されています。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 合同酒精（大雪乃蔵）の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 4: Kamikawa Taisetsu */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>4. 上川大雪酒造</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 上川町（緑丘蔵・他） / 代表銘柄：上川大雪、神川、十勝、五稜</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            2017年に地方創生蔵として新設され、現在上川、帯広、函館の3拠点に蔵を構えます。手造りの小仕込みを徹底し、「飲まさる酒（ついつい飲んでしまう酒）」をコンセプトにしたフレッシュでジューシーな味わいで、現代の道産酒のトップランナーです。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 上川大雪酒造の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 5: Michizakura */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>5. 三千櫻（みちざくら）酒造</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 東川町 / 代表銘柄：三千櫻</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            140年以上の歴史を持つ岐阜県中津川市の老舗蔵が、2020年に豊かな水と環境を求めて北海道東川町へ「蔵ごと移住」したことで一躍話題に。北海道の水と米を使って醸す最新鋭のクリアな味わいが絶賛されています。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 三千櫻酒造の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>
                </section>

                <hr style={{ border: 'none', borderTop: '1px dotted #ccc', margin: '40px 0' }} />

                {/* Region 2: Doo Area */}
                <section style={{ marginBottom: 80 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        【道央・札幌・小樽エリア】歴史を紡ぐ開拓の魂
                    </h2>

                    {/* Brewery 6: Nippon Seishu */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>6. 日本清酒</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 札幌市中央区 / 代表銘柄：千歳鶴（ちとせづる）</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            1872年創業、札幌の発展と共に歩んできた北海道を代表する老舗。全国新酒鑑評会でも数多くの金賞を受賞し、豊平川の伏流水で仕込まれた滑らかで洗練された味わいが札幌市民に愛され続けています。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 日本清酒（千歳鶴）の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 7: Tanaka Shuzo */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>7. 田中酒造</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 小樽市 / 代表銘柄：宝川（たからがわ）</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            小樽で1899年から続く唯一の造り酒屋。北海道産米を100％使用することにこだわり、一年中常に新しい酒を醸造する「四季醸造」を行っている稀有な蔵です。搾りたてのフレッシュな生酒をいつでも楽しむことができます。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 田中酒造（宝川）の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 8: Kinteki */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>8. 金滴（きんてき）酒造</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 樺戸郡新十津川町 / 代表銘柄：金滴</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            1906年創業。北海道の穀倉地帯のど真ん中に位置し、新十津川町内産の酒造好適米「吟風」の使用率が非常に高いのが特徴です。昔ながらの手造りにこだわり、ふっくらとした米の旨味を感じさせる芳醇な酒を醸します。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 金滴酒造の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 9: Kobayashi Shuzo */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>9. 小林酒造</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 夕張郡栗山町 / 代表銘柄：北の錦（きたのにしき）</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            炭鉱の町として栄えた夕張エリアで「坑夫たちを労う酒」として発展。現在では道産米をいち早く酒造りに取り入れたパイオニアとしても知られます。重厚で力強い、どっしりとしたお米の旨味を感じられる男酒です。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 小林酒造（北の錦）の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 10: Niseko Shuzo */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>10. 二世古（にせこ）酒造</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 虻田郡倶知安町 / 代表銘柄：二世古</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            日本有数の豪雪地帯であり世界的リゾートであるニセコ（倶知安）エリアに位置。羊蹄山の雪解け水（特有の超軟水）を使用し、加水調整をしない「原酒」にこだわっています。ふくよかで柔らかな旨味が海外のスキーヤーからも人気です。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 二世古酒造の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>
                </section>

                <hr style={{ border: 'none', borderTop: '1px dotted #ccc', margin: '40px 0' }} />

                {/* Region 3: Other Areas (North, East, South) */}
                <section style={{ marginBottom: 80 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: '#1a1a1a', borderLeft: '4px solid #bfa758', paddingLeft: 16 }}>
                        【道北・道東・道南エリア】過酷な自然に寄り添う最果ての蔵
                    </h2>

                    {/* Brewery 11: Kokumare */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>11. 国稀（くにまれ）酒造</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 増毛郡増毛町 / 代表銘柄：國稀</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            日本最北の造り酒屋。かつてニシン漁で沸いた増毛町の歴史を今に伝え、観光客が絶えない人気の酒蔵です。暑寒別岳の伏流水を使ったお酒は、スッキリとした口当たりの中にコクがあり、エビやホタテの刺身に驚くほど合います。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 国稀酒造の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 12: Fukutsukasa */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>12. 福司（ふくつかさ）酒造</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 釧路市 / 代表銘柄：福司、海底力（そこぢから）</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            港町・釧路を代表する酒蔵であり、道東唯一の酒蔵。海底炭鉱の坑道で長期熟成させたという非常にロマンあふれるお酒も手がけており、極寒の地らしい力強さと、海鮮に寄り添うキレが道東の食文化を支えています。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 福司酒造の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 13: Usui Katsusaburo (Kita no Katsu) */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>13. 碓氷勝三郎（うすいかつさぶろう）商店</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 根室市 / 代表銘柄：北の勝（きたのかつ）</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            日本最東端である根室市にある蔵。生産量が限られており地元・根室での消費が圧倒的に多いため、その他の地域ではなかなかお目にかかれない「幻の生酒」のような存在です。濃厚でありながらサラッと飲める味わいです。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 碓氷勝三郎商店（北の勝）の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>

                    {/* Brewery 14: Hakodate Jozo (Goho) */}
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 12px' }}>14. 箱館醸蔵（はこだてじょうぞう）</h3>
                        <p style={{ fontSize: 14, color: '#666', marginBottom: 12, fontWeight: 700 }}>📍 北斗市 / 代表銘柄：郷宝（ごうほう）</p>
                        <p style={{ fontSize: 16, color: '#444', marginBottom: 20, lineHeight: 1.7 }}>
                            2021年に北斗市に新しく誕生したフレッシュな蔵元。「道南エリアの米と水」に強くこだわり、華やかな香りと綺麗な酸味が特徴のモダンな酒質で、全国の日本酒ファンから急速に注目を集めています。
                        </p>
                        <div style={{ background: '#f8f9fa', padding: '24px', textAlign: 'center', border: '1px dashed #ccc', borderRadius: 8 }}>
                            <p style={{ margin: 0, fontSize: 14, color: '#888' }}>[TODO: 箱館醸蔵（郷宝）の楽天アフィリエイトリンク挿入枠]</p>
                        </div>
                    </div>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '60px 0' }} />

                {/* Back to index link */}
                <div style={{ textAlign: 'center', marginTop: 80 }}>
                    <Link href="/article" style={{ display: 'inline-block', backgroundColor: '#1a1a1d', color: '#fff', padding: '16px 48px', borderRadius: 30, textDecoration: 'none', fontWeight: 700, fontSize: 15, transition: 'background-color 0.2s' }}>
                        全国の日本酒記事一覧へ
                    </Link>
                </div>
            </div>
        </article>
    );
}
