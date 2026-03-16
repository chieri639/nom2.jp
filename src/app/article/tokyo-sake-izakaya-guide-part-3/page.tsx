import React from 'react';
import Link from 'next/link';

export default function TokyoSakeIzakayaGuidePart3Page() {
    return (
        <article style={{ maxWidth: 800, margin: '0 auto', padding: '0', fontFamily: '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            
            {/* Hero Section */}
            <div style={{ padding: '60px 32px 40px', textAlign: 'center', background: 'linear-gradient(135deg, #2b1133 0%, #111 100%)', color: '#fff', borderRadius: '0 0 32px 32px', marginBottom: 60 }}>
                <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: 24, fontSize: 14, fontWeight: 600, letterSpacing: 1, marginBottom: 20 }}>TOKYO IZAKAYA GUIDE</span>
                <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 24, letterSpacing: '-0.02em' }}>
                    <span style={{ display: 'block', color: '#bfa758', fontSize: '0.6em', marginBottom: 12 }}>Part 3: Ultimate Pairing & Premium Secrets</span>
                    5 Best Sake Izakayas in Tokyo: Curated by a Master Sommelier
                </h1>
                <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                    Elevate your sake experience with "Pairing"—where food and alcohol bring out each other's hidden charm. From Michelin-style courses to exclusive members-only hideaways, discover the pinnacle of Tokyo's sake scene.
                </p>
            </div>

            <div style={{ padding: '0 32px' }}>
                
                {/* Intro */}
                <p style={{ fontSize: 18, lineHeight: 1.8, color: '#444', marginBottom: 60 }}>
                    Welcome to the grand finale of our Tokyo Sake Guide. Finding the perfect synergy between a delicate dish and the right sip of sake is an enchanting, blissful experience. In this final installment, we highlight 5 extraordinary spots: from pairing innovators and introduction-only secret bars to a neon-lit casual spot where you can craft your own combinations!
                    <br/><br/>
                    <Link href="/article/tokyo-sake-izakaya-guide-part-2" style={{ color: '#0066cc', textDecoration: 'underline' }}>Read Part 2: Cost-Performance & Pro-Guided Spots</Link>
                </p>

                {/* Section 1: Ultimate Pairing Experience */}
                <div style={{ textAlign: 'center', margin: '80px 0 40px' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: '#bfa758', textTransform: 'uppercase' }}>Theme 1</span>
                    <h2 style={{ fontSize: 32, fontWeight: 800, color: '#111', marginTop: 8 }}>Pro-Led Ultimate Pairing Experiences</h2>
                </div>

                <div style={{ fontSize: 18, lineHeight: 1.8, color: '#333' }}>
                    <p style={{ marginBottom: 40, textAlign: 'center', color: '#666' }}>"Which sake goes with which dish?" Surrender yourself to the professionals who meticulously calculate these equations to offer a sublime pairing experience.</p>

                    {/* 1. EUREKA! */}
                    <section style={{ marginBottom: 80 }}>
                        <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                            1. EUREKA! (Nishiazabu/Hiroo)
                        </h3>
                        <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/izakaya_eureka.png" alt="EUREKA! Sake Pairing" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <p style={{ marginBottom: 24 }}>
                            Owned by Marie Chiba, a leading pioneer of sake pairing in Japan, this is an absolute must-visit spot for sake lovers (selected as one of the elite "Top 100 Izakayas").
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            The staff will pair the absolute perfect sake with their gorgeous, highly creative catalog of dishes, including their famous signature *Oeuf Mayonnaise* (egg mayo). The chic, mature, and highly international atmosphere means you might just cross paths with a once-in-a-lifetime special bottle.
                        </p>
                        
                        {/* Info Box */}
                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111', textTransform: 'uppercase', letterSpacing: 1 }}>Basic Information</h4>
                            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Address</dt><dd style={{ margin: 0, color: '#111' }}>Azabu Empire Mansion 2F, 4-11-28 Nishiazabu, Minato-ku, Tokyo</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Access</dt><dd style={{ margin: 0, color: '#111' }}>10 min walk from Hiroo Sta.</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Hours</dt><dd style={{ margin: 0, color: '#111' }}>Tue-Sat: 18:00–23:30 / Sun-Hol: 15:00–23:00 (Closed Mondays)</dd></div>
                                <div style={{ display: 'flex' }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Tabelog</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1307/A130701/13278959/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>View on Tabelog</a></dd></div>
                            </dl>
                        </div>
                    </section>

                    {/* 2. CAMOS */}
                    <section style={{ marginBottom: 80 }}>
                        <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                            2. Sake Pairing CAMOS (Jimbocho)
                        </h3>
                        <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/izakaya_camos.png" alt="Sake paired with seasonal dish" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <p style={{ marginBottom: 24 }}>
                            Having recently relocated from Akasaka to Jimbocho, this increasingly popular warm and at-home hidden bar is beautifully managed by its <em>okami</em> (proprietress).
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            To preserve the pure, original taste of the sake, it is strictly managed at exactly minus 5 degrees. You can enjoy a course-style pairing menu featuring delicate seasonal Japanese dishes. It is a fantastic spot to lose yourself in the marriage of meticulous Japanese cooking and pristine sake, completely free of any stiff formality.
                        </p>
                        
                        {/* Info Box */}
                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111', textTransform: 'uppercase', letterSpacing: 1 }}>Basic Information</h4>
                            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Address</dt><dd style={{ margin: 0, color: '#111' }}>Nishikanda Inose Bldg 1F, 2-4-12 Nishikanda, Chiyoda-ku, Tokyo</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Access</dt><dd style={{ margin: 0, color: '#111' }}>5 min walk from Jimbocho Sta. (Exit A2)</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Hours</dt><dd style={{ margin: 0, color: '#111' }}>18:00–22:30 (Closed Sat/Sun/Holidays)</dd></div>
                                <div style={{ display: 'flex' }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Tabelog</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1310/A131003/13306781/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>View on Tabelog</a></dd></div>
                            </dl>
                        </div>
                    </section>
                </div>

                {/* Section 2: Speciality & Premium Secrets */}
                <div style={{ textAlign: 'center', margin: '80px 0 40px' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: '#bfa758', textTransform: 'uppercase' }}>Theme 2</span>
                    <h2 style={{ fontSize: 32, fontWeight: 800, color: '#111', marginTop: 8 }}>Special Premium Establishments</h2>
                </div>

                <div style={{ fontSize: 18, lineHeight: 1.8, color: '#333' }}>
                    <p style={{ marginBottom: 40, textAlign: 'center', color: '#666' }}>Perfect for romantic dates or crucial dinners, these locations offer an unparalleled sense of "specialness" through their exclusive concepts and elegant spaces.</p>

                    {/* 3. Tsubaki */}
                    <section style={{ marginBottom: 80 }}>
                        <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                            3. Nihonshu Tsubaki Sake BAR (Jujo)
                        </h3>
                        <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/izakaya_tsubaki.png" alt="Luxurious Hassun platter and sake" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <p style={{ marginBottom: 24 }}>
                            This is the prestigious sister venue to "Sakelab Tokyo" (introduced in Part 1), designed as a highly exclusive, <strong>introduction-only (members-only)</strong> hidden bar known only to a lucky few.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            You cannot enter without a referral from Sakelab or an existing member, elevating its secretive appeal. The culinary quality is outrageously high, featuring time-consuming gorgeous <em>Hassun</em> platters perfectly mapped out with a continuous stream of exquisite sake pairings.
                        </p>
                        
                        {/* Info Box */}
                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111', textTransform: 'uppercase', letterSpacing: 1 }}>Basic Information</h4>
                            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Address</dt><dd style={{ margin: 0, color: '#111' }}>South Jujo, 1-11-10 Kamijujo, Kita-ku, Tokyo</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Access</dt><dd style={{ margin: 0, color: '#111' }}>Right outside JR Jujo Sta. (South Exit)</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Hours</dt><dd style={{ margin: 0, color: '#111' }}>Mon/Wed/Fri: 18–23:30 | Sat: 15–23:30 | Sun/Hol: 15–22</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Rules</dt><dd style={{ margin: 0, color: '#111', fontWeight: 'bold' }}>Exclusively Introduction Only</dd></div>
                                <div style={{ display: 'flex' }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Tabelog</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1323/A132304/13206153/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>View on Tabelog</a></dd></div>
                            </dl>
                        </div>
                    </section>

                    {/* 4. Platinum Fish */}
                    <section style={{ marginBottom: 80 }}>
                        <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                            4. Platinum Fish KAPPO (Shimbashi)
                        </h3>
                        <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/izakaya_platinumfish.png" alt="Upscale Sushi Kappo" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <p style={{ marginBottom: 24 }}>
                            A serene, traditional Japanese space that will make you entirely forget you are in Shimbashi, famously known as Tokyo's chaotic haven for salarymen.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            At the elegant plain wood counter, you can leisurely savor authentic kappo cuisine and high-grade sushi tied perfectly with sake. The hospitable proprietress presents creative ideas, such as the "Omotenashi Highball" (a sweeter sake mixed with soda). Highly recommended for adults who want to relax and elegantly enjoy traditional pairings.
                        </p>
                        
                        {/* Info Box */}
                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111', textTransform: 'uppercase', letterSpacing: 1 }}>Basic Information</h4>
                            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Address</dt><dd style={{ margin: 0, color: '#111' }}>Takamatsu Bldg 2F, 3-2-12 Shimbashi, Minato-ku, Tokyo</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Access</dt><dd style={{ margin: 0, color: '#111' }}>5 min walk from JR Shimbashi Sta. (Karasumori Exit)</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Hours</dt><dd style={{ margin: 0, color: '#111' }}>Lunch 12:00–13:30 / Dinner 17:00–23:00 (Closed Sun/Hol)</dd></div>
                                <div style={{ display: 'flex' }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Tabelog</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1301/A130103/13275872/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>View on Tabelog</a></dd></div>
                            </dl>
                        </div>
                    </section>
                </div>

                {/* Section 3: Casual Pairing */}
                <div style={{ textAlign: 'center', margin: '80px 0 40px' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: '#bfa758', textTransform: 'uppercase' }}>Theme 3</span>
                    <h2 style={{ fontSize: 32, fontWeight: 800, color: '#111', marginTop: 8 }}>Find Your Own Mix: Casual Testing</h2>
                </div>

                <div style={{ fontSize: 18, lineHeight: 1.8, color: '#333' }}>
                    <p style={{ marginBottom: 40, textAlign: 'center', color: '#666' }}>"I don't want to overthink it; I just want to experiment!" If this is you, we highly recommend this modern, neon-lit tavern style where you are in total control.</p>

                    {/* 5. Ponshu Hall */}
                    <section style={{ marginBottom: 80 }}>
                        <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                            5. Ponshu Hall (Kiyosumi Shirakawa)
                        </h3>
                        <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src="/images/izakaya_ponshuhall.png" alt="Neon lights and Fugu Oden" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                        <p style={{ marginBottom: 24 }}>
                            Just a 1-minute walk from Kiyosumi Shirakawa station, this highly photogenic casual pub features trendy neon signs practically practically begging to be posted on Instagram.
                        </p>
                        <p style={{ marginBottom: 24 }}>
                            Their absolute must-try specialty is <strong>"Fugu Dashi Oden"</strong>, comfort food simmered in rich blowfish fin broth. Armed with these amazing snacks, you can utilize the self-serve all-you-can-drink sake system (120 minutes for highly affordable 3,300 JPY) to casually and freely hunt for your own perfect pairing combination. It offers both standing spots and private rooms for top-tier versatility!
                        </p>

                        {/* Info Box */}
                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111', textTransform: 'uppercase', letterSpacing: 1 }}>Basic Information</h4>
                            <dl style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Address</dt><dd style={{ margin: 0, color: '#111' }}>RINNOVA3 2F, 3-9-12 Kiyosumi, Koto-ku, Tokyo</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Access</dt><dd style={{ margin: 0, color: '#111' }}>1 min walk from Kiyosumi Shirakawa Sta.</dd></div>
                                <div style={{ display: 'flex', marginBottom: 12, borderBottom: '1px dashed #eee', paddingBottom: 12 }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Hours</dt><dd style={{ margin: 0, color: '#111' }}>Mon/Wed/Thu 18:00–00:00 | Fri/Sat 18:00–02:00 | Sun/Hol 14:00–22:00 (Closed Tuesdays)</dd></div>
                                <div style={{ display: 'flex' }}><dt style={{ width: 100, fontWeight: 600, color: '#666', flexShrink: 0 }}>Tabelog</dt><dd style={{ margin: 0 }}><a href="https://tabelog.com/tokyo/A1313/A131303/13309957/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'underline' }}>View on Tabelog</a></dd></div>
                            </dl>
                        </div>
                    </section>
                </div>

                {/* Conclusion */}
                <section style={{ background: '#f8f9fa', padding: '32px', borderRadius: 16, border: '1px solid #eaeaea', marginBottom: 60 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#111' }}>Summary: Your Tokyo Sake Adventure (Part 3)</h2>
                    <ul style={{ paddingLeft: 24, margin: 0, color: '#444', lineHeight: 1.8, fontSize: 16 }}>
                        <li><strong>EUREKA!</strong> pairs the city's finest Michelin-style food with the mastermind of Japan's sake pairing scene.</li>
                        <li><strong>CAMOS</strong> offers an intimate, at-home course pairing haven hiding in Jimbocho.</li>
                        <li><strong>Tsubaki</strong> acts as the ultimate exclusive VIP experience entirely restricted to introductions.</li>
                        <li><strong>Platinum Fish KAPPO</strong> perfectly marries Shimbashi sushi with creative Omotenashi sake.</li>
                        <li><strong>Ponshu Hall</strong> lets you casually play with your own pairings via Fugu Oden and self-serve taps.</li>
                    </ul>
                </section>

                {/* Interlinking Links for the whole series */}
                <div style={{ padding: '24px', background: '#ffe4e1', borderRadius: 8, marginBottom: 60, textAlign: 'center' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 12 }}>Check out the rest of the Guide:</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
                        <Link href="/article/tokyo-sake-izakaya-guide-part-1" style={{ color: '#0055aa', textDecoration: 'underline', fontWeight: 600 }}>← Read Part 1 (Classics)</Link>
                        <Link href="/article/tokyo-sake-izakaya-guide-part-2" style={{ color: '#0055aa', textDecoration: 'underline', fontWeight: 600 }}>← Read Part 2 (Cost & Pros)</Link>
                    </div>
                </div>

            </div>
        </article>
    );
}
