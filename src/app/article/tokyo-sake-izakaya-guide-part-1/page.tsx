'use client';

import React from 'react';
import Link from 'next/link';

export default function TokyoSakeIzakayaGuidePart1() {
    return (
        <article style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px', boxSizing: 'border-box' }}>
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
                <div style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: 999,
                    background: '#f0f0f0',
                    color: '#555',
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 24,
                    letterSpacing: 1,
                    textTransform: 'uppercase'
                }}>
                    City Guide & Recommendations
                </div>
                <h1 style={{
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#000',
                    margin: '0 0 24px 0'
                }}>
                    5 Best Sake Izakayas in Tokyo<br/><span style={{ fontSize: '0.6em', color: '#666', fontWeight: 600 }}>Curated by a Master Sommelier (Part 1)</span>
                </h1>
                <p style={{ fontSize: 18, color: '#666', lineHeight: 1.6, maxWidth: 640, margin: '0 auto', marginBottom: 24 }}>
                    From hidden, stylish dining spots to interactive tasting bars, Tokyo’s sake scene is evolving. If you are searching for the perfect place to enjoy Japanese sake—whether for a date, a solo adventure, or an unforgettable tasting experience—we have hand-picked five of the best izakayas in the city.
                </p>
                <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: 16, border: '1px solid #eaeaea', textAlign: 'left', display: 'inline-block', maxWidth: '100%' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 12px 0', color: '#111' }}>What to expect in this guide:</h3>
                    <ul style={{ margin: 0, paddingLeft: 20, color: '#555', fontSize: 15, lineHeight: 1.6 }}>
                        <li>Stylish, foreigner-friendly bars with a premium relaxing atmosphere</li>
                        <li>Unique interactive experiences (like making your own warm sake or coin-operated tasting)</li>
                        <li>Hidden gems curated by professional sake sommeliers (Kikisake-shi)</li>
                        <li>Shops featuring 100+ premium local sake varieties from across Japan</li>
                    </ul>
                </div>
            </div>

            <div style={{ fontSize: 18, lineHeight: 1.8, color: '#333' }}>
                
                {/* 1. SakanaYakio 2 */}
                <section style={{ marginBottom: 80 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                        1. SakanaYakio 2 (Shimbashi)
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: 24 }}>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/uoyakio_1.jpg" alt="SakanaYakio 2 Sake" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/uoyakio_2.jpg" alt="Drinks and Snacks at SakanaYakio 2" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                    </div>
                    <p style={{ marginBottom: 24 }}>
                        Known as an "izakaya truly meant for sake lovers," SakanaYakio 2 constantly stocks <strong>over 100 varieties of Japanese sake</strong> carefully selected from all 47 prefectures in Japan. They pride themselves on incredibly fresh seafood transported directly from the famous Toyosu Market.
                    </p>
                    <p style={{ marginBottom: 24 }}>
                        A must-try absolute favorite among regulars is their Seared Fatty Mackerel (Aburi O-Toro Shime-Saba). The interior mainly consists of counter seating, making it an incredibly welcoming and highly recommended spot for solo travelers who want to enjoy sake in an unpretentious, relaxed atmosphere.
                    </p>

                    <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 700, color: '#111', borderBottom: '1px solid #eee', paddingBottom: 12 }}>Basic Information</h4>
                        <dl style={{ margin: 0, fontSize: 15 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Location</dt><dd style={{ margin: 0 }}>Seiko Bldg B1F, 3-15-8 Shimbashi, Minato-ku, Tokyo</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Access</dt><dd style={{ margin: 0 }}>3-minute walk from JR Shimbashi Station</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Hours</dt><dd style={{ margin: 0 }}>Mon-Thu 16:00-24:00 / Fri 16:00-1:00 / Sat 16:00-23:00</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}><dt style={{ fontWeight: 600, color: '#666' }}>Links</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1301/A130103/13224176/" target="_blank" rel="noopener noreferrer" style={{ color: '#0984e3', textDecoration: 'none' }}>Tabelog Page</a></dd></div>
                        </dl>
                    </div>
                </section>

                {/* 2. Sakelab Tokyo */}
                <section style={{ marginBottom: 80 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                        2. Sakelab Tokyo (Jujo)
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: 24 }}>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/sakelab_1.jpg" alt="Sakelab Tokyo Exterior" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/sakelab_2.jpg" alt="Sake Bottle" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/sakelab_3.jpg" alt="Various Sake Bottles" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/sakelab_4.jpg" alt="Sake Menu" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                    </div>
                    <p style={{ marginBottom: 24 }}>
                        Tucked quietly in a residential neighborhood of Jujo, Sakelab Tokyo is a highly popular shop establishing a modern "sake bar" style. With over 30 varieties of local sake available to order by the single glass, it is perfect for tasting and comparing different profiles to find your favorite.
                    </p>
                    <p style={{ marginBottom: 24 }}>
                        They stock seasonal limited editions and highly unique artisan brands, satisfying everyone from beginners to seasoned sake geeks. The interior is stylish and casual, while the food is expertly crafted—making it ideal for dates or casual group dining. Prices are also very reasonable, averaging 6,000–7,000 JPY.
                    </p>

                    <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 700, color: '#111', borderBottom: '1px solid #eee', paddingBottom: 12 }}>Basic Information</h4>
                        <dl style={{ margin: 0, fontSize: 15 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Location</dt><dd style={{ margin: 0 }}>Dai3 Hokusei Bldg B1F, 1-1-7 Jujonakahara, Kita-ku, Tokyo</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Access</dt><dd style={{ margin: 0 }}>3-minute walk from JR Jujo Station (North Exit)</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Hours</dt><dd style={{ margin: 0 }}>Mon,Wed,Thu 18:00-23:30 / Fri 18:00-23:30 / Sat,Sun,Holiday 15:00-</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}><dt style={{ fontWeight: 600, color: '#666' }}>Links</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1323/A132304/13184787/" target="_blank" rel="noopener noreferrer" style={{ color: '#0984e3', textDecoration: 'none' }}>Tabelog Page</a></dd></div>
                        </dl>
                    </div>
                </section>

                {/* 3. Kemuri */}
                <section style={{ marginBottom: 80 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                        3. Sumibiyakitori Kemuri (Monzen-nakacho)
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: 24 }}>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/kemuri_1.jpg" alt="Kemuri Hot Pot" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/kemuri_2.jpg" alt="Kemuri Sake Warmers" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/kemuri_3.jpg" alt="Stairs to Kemuri" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/kemuri_4.jpg" alt="Daishichi Sake" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                    </div>
                    <p style={{ marginBottom: 24 }}>
                        If you want the ultimate all-you-can-drink Japanese sake experience, look no further than "Kemuri". This hidden gem offers a staggering <strong>120+ varieties of sake</strong> on their all-you-can-drink menu.
                    </p>
                    <p style={{ marginBottom: 24 }}>
                        The standout feature is their interactive counter where <strong>you can make your own Kanzake (warm sake)</strong>. Exploring how different temperatures drastically alter the profile of the sake is a magical experience. Paired with their signature charcoal-grilled Yakitori and chicken hot pot within private rooms, it is the perfect spot for a moody, adult-oriented night out.
                    </p>

                    <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 700, color: '#111', borderBottom: '1px solid #eee', paddingBottom: 12 }}>Basic Information</h4>
                        <dl style={{ margin: 0, fontSize: 15 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Location</dt><dd style={{ margin: 0 }}>NIC Heim Tomioka 1F, 1-25-4 Tomioka, Koto-ku, Tokyo</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Access</dt><dd style={{ margin: 0 }}>1-minute walk from Monzen-nakacho Station (Exit 2)</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Hours</dt><dd style={{ margin: 0 }}>Weekdays 17:00-23:00 / Weekends & Holidays 15:00-23:00 (Closed Sundays)</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}><dt style={{ fontWeight: 600, color: '#666' }}>Links</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1313/A131303/13212945/" target="_blank" rel="noopener noreferrer" style={{ color: '#0984e3', textDecoration: 'none' }}>Tabelog Page</a></dd></div>
                        </dl>
                    </div>
                </section>

                {/* 4. Maishin */}
                <section style={{ marginBottom: 80 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                        4. Maishin (Shibuya)
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: 24 }}>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/beishin_1.jpg" alt="Maishin Sake" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/beishin_2.jpg" alt="Aramasa No.6 Sake" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/beishin_3.jpg" alt="Denshu Sake" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/beishin_4.jpg" alt="Maishin Signboard" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                    </div>
                    <p style={{ marginBottom: 24 }}>
                        Stepping into Maishin feels like escaping Tokyo. It is a quiet, modern Japanese dining space that you would scarcely believe is located right beside the bustling streets of Shibuya. 
                    </p>
                    <p style={{ marginBottom: 24 }}>
                        Look for the large "Specialty Local Sake" (地酒専門) sign. Inside, you can find a massive curation of nearly 200 sakes, ranging from standard classics to rare sparkling and long-aged varieties. Their food focuses on Japanese fundamentals pairing beautifully with rice wine ("Rice and Heart"). It seamlessly combines atmosphere, taste, and incredible drinks into one elegant destination.
                    </p>

                    <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 700, color: '#111', borderBottom: '1px solid #eee', paddingBottom: 12 }}>Basic Information</h4>
                        <dl style={{ margin: 0, fontSize: 15 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Location</dt><dd style={{ margin: 0 }}>Matsubara Bldg B1F, 2-25-13 Dogenzaka, Shibuya-ku, Tokyo</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Access</dt><dd style={{ margin: 0 }}>5-minute walk from Shibuya Station</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Hours</dt><dd style={{ margin: 0 }}>Mon-Fri 17:00-23:00 / Sat 16:00-23:00 / Sun 16:00-22:00</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}><dt style={{ fontWeight: 600, color: '#666' }}>Links</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1303/A130301/13282207/" target="_blank" rel="noopener noreferrer" style={{ color: '#0984e3', textDecoration: 'none' }}>Tabelog Page</a></dd></div>
                        </dl>
                    </div>
                </section>

                {/* 5. SAKEICE BAR! */}
                <section style={{ marginBottom: 80 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                        5. SAKEICE BAR! (Tokyo Station)
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: 24 }}>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/sakeice_1.jpg" alt="SAKEICE BAR Exterior" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/sakeice_2.jpg" alt="SAKE HUNDRED and Ice Cream" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/sakeice_3.jpg" alt="Sake Bottles" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/sakeice_4.jpg" alt="SAKEICE Front Views" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '4/3' }} />
                        </div>
                    </div>
                    <p style={{ marginBottom: 24 }}>
                        Directly connected to Tokyo Station inside YANMAR TOKYO (1F), this is a completely unique, highly interactive tasting experience. The bar operates on a fun <strong>coin-operated system</strong>, allowing you to sample a vast assortment of regional sakes in tiny increments—the absolute best way to discover what type of sake you love without committing to a full glass.
                    </p>
                    <p style={{ marginBottom: 24 }}>
                        They focus heavily on sparkling, sweet fruit, and liqueur-style sake. As the name suggests, right next door you can enjoy "Sake Ice Cream," making it an incredible stop during a day of sightseeing.
                    </p>

                    <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 700, color: '#111', borderBottom: '1px solid #eee', paddingBottom: 12 }}>Basic Information</h4>
                        <dl style={{ margin: 0, fontSize: 15 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Location</dt><dd style={{ margin: 0 }}>YANMAR TOKYO 1F, 2-1-1 Yaesu, Chuo-ku, Tokyo</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Access</dt><dd style={{ margin: 0 }}>1-minute walk from Tokyo Station (Yaesu Exit)</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', marginBottom: 8 }}><dt style={{ fontWeight: 600, color: '#666' }}>Hours</dt><dd style={{ margin: 0 }}>11:00-22:00 (Irregular holidays)</dd></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}><dt style={{ fontWeight: 600, color: '#666' }}>Links</dt><dd style={{ margin: 0 }}><a href="https://www.instagram.com/sakeice_japan/" target="_blank" rel="noopener noreferrer" style={{ color: '#0984e3', textDecoration: 'none' }}>Instagram Page</a></dd></div>
                        </dl>
                    </div>
                </section>

                {/* Conclusion */}
                <section style={{ background: '#f8f9fa', padding: '32px', borderRadius: 16, border: '1px solid #eaeaea', marginBottom: 60 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#111' }}>Summary: Your Tokyo Sake Adventure</h2>
                    <ul style={{ paddingLeft: 24, margin: 0, color: '#444', lineHeight: 1.8, fontSize: 16 }}>
                        <li><strong>SakanaYakio 2</strong> provides 100+ types of sake matched perfectly with fresh seafood.</li>
                        <li><strong>Sakelab Tokyo</strong> offers a modern, stylish glass-bar system prioritizing variety.</li>
                        <li><strong>Kemuri</strong> delivers 120 all-you-can-drink varieties and DIY hot sake in cozy private rooms.</li>
                        <li><strong>Maishin</strong> is Shibuya's hidden upscale oasis featuring sparkling and aged sake.</li>
                        <li><strong>SAKEICE BAR!</strong> lets you trial sake playfully via coin machines, complete with alcoholic ice cream.</li>
                    </ul>
                </section>

                {/* Navigation Back */}
                <div style={{ textAlign: 'center' }}>
                    <Link href="/" style={{ display: 'inline-block', padding: '12px 32px', background: '#fff', border: '2px solid #111', color: '#111', textDecoration: 'none', borderRadius: 30, fontSize: 16, fontWeight: 600, transition: 'background 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        Return to Dashboard
                    </Link>
                </div>

            </div>
        </article>
    );
}
