import React from 'react';
import Link from 'next/link';

export default function TokyoSakeIzakayaGuidePart2Page() {
    return (
        <article style={{ maxWidth: 800, margin: '0 auto', padding: '0', fontFamily: '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            
            {/* Hero Section */}
            <div style={{ padding: '60px 32px 40px', textAlign: 'center', background: 'linear-gradient(135deg, #111 0%, #333 100%)', color: '#fff', borderRadius: '0 0 32px 32px', marginBottom: 60 }}>
                <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: 24, fontSize: 14, fontWeight: 600, letterSpacing: 1, marginBottom: 20 }}>TOKYO IZAKAYA GUIDE</span>
                <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 24, letterSpacing: '-0.02em' }}>
                    <span style={{ display: 'block', color: '#bfa758', fontSize: '0.6em', marginBottom: 12 }}>Part 2: Pairing, Cost-Performance & Pros</span>
                    5 Best Sake Izakayas in Tokyo: Curated by a Master Sommelier
                </h1>
                <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                    Continuing our highly requested guide, we explore a hidden kappo, an insanely cost-effective specialty shop, an incredibly accessible spot inside a major train station, and an international bar where the master curates your perfect cup.
                </p>
            </div>

            <div style={{ padding: '0 32px' }}>
                
                {/* Intro */}
                <p style={{ fontSize: 18, lineHeight: 1.8, color: '#444', marginBottom: 60 }}>
                    Welcome to Part 2 of our guide to the best Japanese sake spots in Tokyo. Whether you're looking for an unforgettable pairing experience, incredible cost-performance, or expert guidance, Tokyo has something for every sake lover. Let's dive into these 5 newly selected gems!
                    <br/><br/>
                    <Link href="/article/tokyo-sake-izakaya-guide-part-1" style={{ color: '#0066cc', textDecoration: 'underline' }}>Read Part 1: Top 5 Sake Izakayas (Classics & Styling)</Link>
                </p>

                {/* Section 1: Food & Sake Pairing Excellence */}
                <div style={{ textAlign: 'center', margin: '80px 0 40px' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: '#bfa758', textTransform: 'uppercase' }}>Theme 1</span>
                    <h2 style={{ fontSize: 32, fontWeight: 800, color: '#111', marginTop: 8 }}>Food & Sake Pairing Excellence</h2>
                </div>

                <div style={{ fontSize: 18, lineHeight: 1.8, color: '#333' }}>
                    <p style={{ marginBottom: 40, textAlign: 'center', color: '#666' }}>To truly enjoy Japanese sake, you must care about the food paired with it. Here are refined spots where you can enjoy modern sake with authentic Japanese cuisine and fresh seafood.</p>

                    {/* 1. SAKE and */}
                    <section style={{ marginBottom: 80 }}>
                        <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                            1. Kappo Kakuuchi SAKE and (Shinjuku Gyoenmae)
                        </h3>
                        <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/izakaya_sakeand.png" alt="Delicate plate and sake glass" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <p style={{ marginBottom: 24 }}>
                            Tucked away in the back alleys of Shinjuku Gyoenmae, this casual <em>kappo</em> (traditional Japanese cooking) restaurant functions as a beautiful hidden retreat.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            Renowned for its meticulously prepared, delicious Japanese cuisine, it also boasts an extensive collection of modern-style sake. If you want to enjoy authentic food and drinks without the stiffness of formal dining, this is the perfect spot for a mature date or a quiet evening with a small group.
                        </p>
                        
                        {/* Info Box */}
                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111', textTransform: 'uppercase', letterSpacing: 1 }}>Basic Information</h4>
                            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Address</dt><dd style={{ margin: 0, color: '#111' }}>Rene Flats Shinjuku Gyoenmae 1F, 1-32-12 Shinjuku, Shinjuku-ku, Tokyo</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Access</dt><dd style={{ margin: 0, color: '#111' }}>4 min walk from Shinjuku Gyoenmae Sta. (Exit 2) [Marunouchi Line]</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Hours</dt><dd style={{ margin: 0, color: '#111' }}>17:30–23:00 (Irregular holidays)</dd></div>
                                <div style={{ display: 'flex' }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Tabelog</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1304/A130402/13293061/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>View on Tabelog</a></dd></div>
                            </dl>
                        </div>
                    </section>

                    {/* 2. Uraya */}
                    <section style={{ marginBottom: 80 }}>
                        <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                            2. Jizake Yuraku Uraya (Ikebukuro)
                        </h3>
                        <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/izakaya_uraya.png" alt="Fresh sashimi and sake" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <p style={{ marginBottom: 24 }}>
                            Managed by the famous Jizake Doraku Group (who also run Maishin from our Part 1 guide), this Ikebukuro establishment offers a reliable, exceptional sake lineup.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            In addition to their fantastic selection of rice wine, you can indulge in outstandingly fresh seafood dishes. It’s a calm space that makes you forget the hustle and bustle of Ikebukuro, allowing you to thoroughly enjoy delicious local sake and tasty appetizers to your heart's content!
                        </p>
                        
                        {/* Info Box */}
                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111', textTransform: 'uppercase', letterSpacing: 1 }}>Basic Information</h4>
                            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Address</dt><dd style={{ margin: 0, color: '#111' }}>Ikebukuro Coast Bldg B1F, 2-27-6 Minami-Ikebukuro, Toshima-ku, Tokyo</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Access</dt><dd style={{ margin: 0, color: '#111' }}>5 min walk from Ikebukuro Sta. (Seibu Exit)</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Hours</dt><dd style={{ margin: 0, color: '#111' }}>Mon-Fri: 17:00–23:00 / Sat: 16:00–23:00 (Closed Sundays)</dd></div>
                                <div style={{ display: 'flex' }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Tabelog</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1305/A130501/13125957/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>View on Tabelog</a></dd></div>
                            </dl>
                        </div>
                    </section>
                </div>

                {/* Section 2: Best Cost-Performance & Accessibility */}
                <div style={{ textAlign: 'center', margin: '80px 0 40px' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: '#bfa758', textTransform: 'uppercase' }}>Theme 2</span>
                    <h2 style={{ fontSize: 32, fontWeight: 800, color: '#111', marginTop: 8 }}>Cost-Performance & Easy Access</h2>
                </div>

                <div style={{ fontSize: 18, lineHeight: 1.8, color: '#333' }}>
                    <p style={{ marginBottom: 40, textAlign: 'center', color: '#666' }}>Perfect for those who want to "try many varieties affordably" or "grab a quick drink while waiting for the bullet train," offering unbeatable convenience and value.</p>

                    {/* 3. Suisui */}
                    <section style={{ marginBottom: 80 }}>
                        <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                            3. Junmaishu Senmon Suisui (Nihonbashi)
                        </h3>
                        <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/izakaya_suisui.png" alt="Sake bottles and tasting glasses" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <p style={{ marginBottom: 24 }}>
                            A specialty store with an extraordinary dedication strictly to <em>Junmai-shu</em> (pure rice sake—sake made only with rice, water, and koji without added alcohol).
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            Astonishingly, they stock <strong>over 100 varieties of Junmai sake gathered from all 47 prefectures in Japan</strong>, allowing for an epic tasting comparison. Not only is the selection vast, but the pricing is incredibly reasonable, offering unmatched cost-performance. It's a fantastic spot to easily explore the profound world of sake.
                        </p>
                        
                        {/* Info Box */}
                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111', textTransform: 'uppercase', letterSpacing: 1 }}>Basic Information</h4>
                            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Address</dt><dd style={{ margin: 0, color: '#111' }}>Tanpei Nihonbashi Bldg B1F, 3-7-10 Nihonbashi, Chuo-ku, Tokyo</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Access</dt><dd style={{ margin: 0, color: '#111' }}>3 min walk from Nihonbashi Sta. (Exit B1) / 7 min from Tokyo Sta.</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Hours</dt><dd style={{ margin: 0, color: '#111' }}>Mon-Fri: 17:30–22:30 / Sat: 17:00–22:00 (Closed Sundays/Holidays)</dd></div>
                                <div style={{ display: 'flex' }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Tabelog</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1302/A130202/13169597/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>View on Tabelog</a></dd></div>
                            </dl>
                        </div>
                    </section>

                    {/* 4. Nurukan Sato */}
                    <section style={{ marginBottom: 80 }}>
                        <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                            4. Nurukan Sato Gotenyama Saryo (Shinagawa)
                        </h3>
                        <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/izakaya_nurukan.png" alt="Sake bar inside a station" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <p style={{ marginBottom: 24 }}>
                            Believe it or not, this premium spot is located <strong>inside the ticket gates</strong> of Shinagawa Station (Ecute Shinagawa)!
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            Tucked away in the back, it serves as a well-kept secret for those in the know. Despite being inside a train station, it features a remarkably rich lineup including 3-type tasting flights, and you might even cross paths with ultra-rare luxury brands like "Juyondai." It is absolutely perfect for a quick premium drink before hopping on the bullet train or after a business meeting.
                        </p>
                        
                        {/* Info Box */}
                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111', textTransform: 'uppercase', letterSpacing: 1 }}>Basic Information</h4>
                            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Address</dt><dd style={{ margin: 0, color: '#111' }}>Ecute Shinagawa 2F, 3-26-27 Takanawa, Minato-ku, Tokyo</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Access</dt><dd style={{ margin: 0, color: '#111' }}>Inside Central Ticket Gates at JR Shinagawa Sta.</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Hours</dt><dd style={{ margin: 0, color: '#111' }}>Mon-Fri: 11:00–22:00 / Sat-Sun-Hol: 11:00–21:00</dd></div>
                                <div style={{ display: 'flex' }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Tabelog</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1314/A131403/13174982/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>View on Tabelog</a></dd></div>
                            </dl>
                        </div>
                    </section>
                </div>

                {/* Section 3: Professional Guidance */}
                <div style={{ textAlign: 'center', margin: '80px 0 40px' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: '#bfa758', textTransform: 'uppercase' }}>Theme 3</span>
                    <h2 style={{ fontSize: 32, fontWeight: 800, color: '#111', marginTop: 8 }}>Pro-Guided Ultimate Experiences</h2>
                </div>

                <div style={{ fontSize: 18, lineHeight: 1.8, color: '#333' }}>
                    <p style={{ marginBottom: 40, textAlign: 'center', color: '#666' }}>"I don't know what to drink" or "I want to discover new flavors"—if this sounds like you, head directly to an establishment with a knowledgeable professional.</p>

                    {/* 5. Chill Labo Akasaka */}
                    <section style={{ marginBottom: 80 }}>
                        <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                            5. Chill Labo Akasaka (Akasaka)
                        </h3>
                        <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/izakaya_chilllabo.png" alt="Bartender pouring warm sake" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <p style={{ marginBottom: 24 }}>
                            A lovely Japanese sake bar where the manager possesses an incredibly deep knowledge of sake. They feature an especially abundant lineup of <em>Kanzake</em> (warm sake).
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            By simply telling them "I want to drink something like this," they will propose the absolute best cup for that day, carefully considering even the optimal serving temperature. With fluent English speaking staff, it attracts many international guests, creating a sophisticated yet perfectly "chill" atmosphere where tourists feel completely at home.
                        </p>

                        {/* Info Box */}
                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111', textTransform: 'uppercase', letterSpacing: 1 }}>Basic Information</h4>
                            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Address</dt><dd style={{ margin: 0, color: '#111' }}>2F, 4-3-27 Akasaka, Minato-ku, Tokyo</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Access</dt><dd style={{ margin: 0, color: '#111' }}>5 min from Akasaka Sta. / 3 min from Akasaka-mitsuke Sta.</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Hours</dt><dd style={{ margin: 0, color: '#111' }}>Mon-Fri: 17:00–23:00 / Sat: 15:00–22:00 (Closed Sundays)</dd></div>
                                <div style={{ display: 'flex' }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Tabelog</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1308/A130801/13261005/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>View on Tabelog</a></dd></div>
                            </dl>
                        </div>
                    </section>
                </div>

                {/* Conclusion */}
                <section style={{ background: '#f8f9fa', padding: '32px', borderRadius: 16, border: '1px solid #eaeaea', marginBottom: 60 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#111' }}>Summary: Your Tokyo Sake Adventure (Part 2)</h2>
                    <ul style={{ paddingLeft: 24, margin: 0, color: '#444', lineHeight: 1.8, fontSize: 16 }}>
                        <li><strong>SAKE and</strong> serves exquisite casual kappo cuisine with modern sake in Shinjuku.</li>
                        <li><strong>Uraya</strong> provides the reliable Jizake group quality paired with fresh Ikebukuro seafood.</li>
                        <li><strong>Suisui</strong> operates as a haven of 100+ Junmai sakes offering unmatched cost-performance.</li>
                        <li><strong>Nurukan Sato</strong> offers a surprisingly premium sake experience conveniently inside Shinagawa Station.</li>
                        <li><strong>Chill Labo Akasaka</strong> is curated by an English-fluent manager who acts as your personal sake concierge.</li>
                    </ul>

                    <div style={{ marginTop: 24, padding: '16px', background: '#fff', borderRadius: 8, border: '1px solid #ddd', textAlign: 'center' }}>
                        <Link href="/article/tokyo-sake-izakaya-guide-part-3" style={{ fontSize: 18, fontWeight: 700, color: '#d91515', textDecoration: 'none' }}>
                            Next up: Read Part 3 (Ultimate Sake & Sushi Pairing Destinations) →
                        </Link>
                    </div>
                </section>

            </div>
        </article>
    );
}
