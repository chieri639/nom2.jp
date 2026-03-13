'use client';

import React from 'react';
import Link from 'next/link';

export default function SakeMeasurementsOneGo() {
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
                    Sake Basics & Etiquette
                </div>
                <h1 style={{
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#000',
                    margin: '0 0 24px 0'
                }}>
                    How Much is "1 Go" of Sake?<br/><span style={{ fontSize: '0.7em', color: '#666', fontWeight: 600 }}>The Ultimate Guide to Measurements & Alcohol Content</span>
                </h1>
                <p style={{ fontSize: 18, color: '#666', lineHeight: 1.6, maxWidth: 640, margin: '0 auto' }}>
                    When enjoying Japanese sake, have you ever wondered what exactly "1 Go" (一合) means? Understanding this ancient measurement is key to knowing how much you are drinking, your alcohol intake, and how to enjoy sake responsibly and healthily.
                </p>
            </div>

            <div style={{ fontSize: 18, lineHeight: 1.8, color: '#333' }}>
                {/* Introduction */}
                <div style={{ background: '#f8f9fa', padding: '24px 32px', borderRadius: 16, marginBottom: 48, border: '1px solid #eaeaea' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px 0', color: '#111' }}>What you will learn in this article:</h3>
                    <ul style={{ margin: 0, paddingLeft: 20, color: '#555', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>The exact volume of 1 Go (approx. 180ml) and how many <i>Ochoko</i> cups it equals.</li>
                        <li>How to calculate the pure alcohol content in 1 Go (and how it compares to beer).</li>
                        <li>The estimated level of intoxication and calories in 1 Go of sake.</li>
                        <li>The health impacts of drinking 2 Go, guidelines for women, and how long it takes for the alcohol to leave your system.</li>
                    </ul>
                </div>

                {/* Chapter 1 */}
                <section style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                        1. The Characteristics and Volume of "1 Go"
                    </h2>
                    
                    <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#273c75' }}>How many milliliters is 1 Go?</h3>
                    <p style={{ marginBottom: 24 }}>
                        The volume of 1 Go (pronounced "ichi-gou") is exactly <strong>180ml</strong> (about 6 oz). This unit is based on the traditional Japanese measurement system known as <i>Shakkanho</i>. One Go is roughly equivalent to a standard glass cup, and many "One-Cup" style sake products sold in stores use this exact 180ml volume. 
                    </p>
                    <p style={{ marginBottom: 32 }}>
                        As a related term, a standard large sake bottle is called an <i>Issho-bin</i> (一升瓶). "One Sho" (一升) is equal to 10 Go, which calculates to exactly 1,800ml (1.8 liters).
                    </p>

                    <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#273c75' }}>How many "Ochoko" cups make 1 Go?</h3>
                    <p style={{ marginBottom: 24 }}>
                        If you are drinking 1 Go of sake using a traditional small cup called an <i>Ochoko</i>, it usually equates to about <strong>4 to 5 cups</strong>. 
                    </p>
                    <p style={{ marginBottom: 24 }}>
                        A standard Ochoko holds between 36ml and 45ml. Therefore:
                    </p>
                    <ul style={{ marginBottom: 24, paddingLeft: 20 }}>
                        <li>Using a <strong>36ml</strong> Ochoko = Approx. 5 cups.</li>
                        <li>Using a <strong>45ml</strong> Ochoko = Approx. 4 cups.</li>
                    </ul>
                    <div style={{ marginBottom: 32, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        <img src="/images/traditional_ochoko_cup.png" alt="Traditional Japanese Ochoko cup and Tokkuri carafe" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                    <p style={{ marginBottom: 24 }}>
                        Because cup sizes can vary greatly at Izakayas (Japanese pubs), using a <i>Tokkuri</i> (sake carafe) that precisely holds 1 Go is the best way to accurately track your intake.
                    </p>
                </section>

                {/* Chapter 2 */}
                <section style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                        2. Calculating Alcohol Content
                    </h2>

                    <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#b33939' }}>The Formula for Pure Alcohol</h3>
                    <p style={{ marginBottom: 16 }}>
                        You can calculate the exact amount of pure alcohol in 1 Go (180ml) using the following formula:
                    </p>
                    <div style={{ background: '#fdf7f7', padding: '20px', borderRadius: 8, fontFamily: 'monospace', fontSize: 16, color: '#b33939', marginBottom: 24, textAlign: 'center' }}>
                        <strong>Volume (ml) × ABV (%) ÷ 100 × 0.8 (Alcohol Specific Gravity)</strong>
                    </div>
                    <p style={{ marginBottom: 16 }}>
                        For example, if you drink 1 Go of sake with a 15% Alcohol By Volume (ABV):<br/>
                        <code style={{ background: '#eaeaea', padding: '2px 6px', borderRadius: 4 }}>180ml × 15 ÷ 100 × 0.8 = 21.6g</code>
                    </p>
                    <p style={{ marginBottom: 32 }}>
                        This means 1 Go of standard sake contains approximately <strong>21.6 grams of pure alcohol</strong>.
                    </p>

                    <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#b33939' }}>How does it compare to Beer?</h3>
                    <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        <img src="/images/beer_and_sake_glass.png" alt="A glass of beer next to a sake cup" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#fff', border: '1px solid #eaeaea', padding: '24px', borderRadius: 16, marginBottom: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                        <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #eaeaea' }}>
                            <div style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 8 }}>1 Go of Sake</div>
                            <div style={{ fontSize: 16, color: '#666' }}>(180ml at 15% ABV)</div>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#273c75', marginTop: 12 }}>= 21.6g Alcohol</div>
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#bbb' }}>VS</div>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: 8 }}>1 Medium Beer</div>
                            <div style={{ fontSize: 16, color: '#666' }}>(500ml at 5% ABV)</div>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#e1b12c', marginTop: 12 }}>= 20.0g Alcohol</div>
                        </div>
                    </div>
                    <p style={{ marginBottom: 24 }}>
                        The pure alcohol content in 1 Go of sake is almost exactly equivalent to one medium-sized bottle (500ml) of beer. While beer has a lower ABV (around 5%), the larger volume consumed ultimately matches the alcohol intake of the smaller, stronger sake.
                    </p>
                </section>

                {/* Chapter 3 */}
                <section style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                        3. Intoxication, Calories & Digestion
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: 40 }}>
                        <div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#111' }}>How drunk will you get?</h3>
                            <p style={{ fontSize: 16, color: '#555' }}>
                                The Japanese Ministry of Health, Labour and Welfare defines a "moderate and responsible" daily drinking limit as roughly 20g of pure alcohol per day. Because 1 Go contains 21.6g, it perfectly represents one standard daily unit. For most people, this results in a pleasant, mildly tipsy state (horo-yoi). However, if you have low alcohol tolerance or drink on an empty stomach, intoxication will hit much faster.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#111' }}>How many calories are in 1 Go?</h3>
                            <div style={{ marginBottom: 16, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                <img src="/images/sake_and_rice_bowl.png" alt="Sake and a bowl of white rice" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                            <p style={{ fontSize: 16, color: '#555' }}>
                                One Go (180ml) of standard sake contains about <strong>184 kcal</strong>. For comparison, a standard bowl of white rice (150g) is about 234 kcal, and a slice of bread (60g) is about 149 kcal. While sake is made from rice and may seem high in calories, it is relatively difficult to gain weight from sake alone as long as you stick to this moderate amount and pair it with low-carb, healthy appetizers.
                            </p>
                        </div>
                    </div>

                    <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#d35400' }}>Processing Time: 1 Go vs 2 Go</h3>
                    <div style={{ background: '#f5f6fa', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
                        <ul style={{ margin: 0, paddingLeft: 20, color: '#333' }}>
                            <li style={{ marginBottom: 16 }}>
                                <strong>Drinking 1 Go (180ml):</strong> It generally takes the human body about <strong>3 to 4 hours</strong> for the alcohol to completely leave the system. A healthy liver process about 7g of alcohol per hour (for a 60kg person).
                            </li>
                            <li>
                                <strong>Drinking 2 Go (360ml):</strong> With 43.2g of pure alcohol, it will take roughly <strong>6 to 8 hours</strong> to process. This significantly exceeds the recommended daily limit and greatly increases the risk of a deep intoxication, hangovers, and disrupted sleep. 
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Chapter 4 */}
                <section style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: '#111', paddingBottom: 12, borderBottom: '2px solid #111' }}>
                        4. Guidelines for Women & The "Yawaragi-Mizu" Rule
                    </h2>
                    <p style={{ marginBottom: 24 }}>
                        Women generally have a lower alcohol tolerance and a smaller body mass index compared to men, meaning the physical impact of alcohol is stronger. Consuming 2 Go of sake (43.2g of pure alcohol) wildly exceeds the healthy limit for women, increasing the risk of severe hangovers, headaches, and nausea the next day. <strong>For women, sticking strictly to "1 Go" is highly recommended.</strong>
                    </p>

                    <div style={{ background: '#111', color: '#fff', padding: '32px', borderRadius: 16, textAlign: 'center' }}>
                        <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 16px 0', color: '#fff' }}>The Golden Rule: "Yawaragi-mizu"</h3>
                        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, opacity: 0.9 }}>
                            To enjoy sake healthily and avoid hangovers, you must drink <strong>Yawaragi-mizu (和らぎ水)</strong>—which simply means drinking water alongside your sake. Alternating between sips of sake and glasses of water keeps you hydrated, slows down alcohol absorption, and resets your palate so you can better appreciate the aroma and flavor of the sake and your meal.
                        </p>
                    </div>
                </section>

                {/* Conclusion */}
                <section style={{ marginBottom: 40 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#111' }}>Summary: Sip Smart, Enjoy More</h2>
                    <ul style={{ paddingLeft: 24, color: '#444', lineHeight: 1.8, fontSize: 16 }}>
                        <li><strong>1 Go = 180ml</strong> (Based on the traditional Shakkanho system).</li>
                        <li>It equals roughly <strong>4 to 5 Ochoko</strong> cups, depending on the cup size.</li>
                        <li>1 Go of 15% ABV sake contains <strong>21.6g of pure alcohol</strong>, the same as one 500ml beer.</li>
                        <li>1 Go contains roughly <strong>184 calories</strong>, which is less than a bowl of rice.</li>
                        <li>It takes <strong>3 to 4 hours</strong> to process 1 Go, and 6 to 8 hours to process 2 Go.</li>
                        <li><strong>1 Go is the ideal, healthy limit</strong> approved by health guidelines.</li>
                        <li>Always drink <strong>water (Yawaragi-mizu)</strong> alongside your sake for the best experience.</li>
                    </ul>
                </section>

                {/* Navigation Back */}
                <div style={{ marginTop: 60, borderTop: '1px solid #eaeaea', paddingTop: 40, textAlign: 'center' }}>
                    <Link href="/article/sushi-sake-pairing-guide" style={{ display: 'inline-block', padding: '12px 32px', background: '#fff', border: '2px solid #111', color: '#111', textDecoration: 'none', borderRadius: 30, fontSize: 16, fontWeight: 600, transition: 'background 0.2s' }}>
                        Explore the Sushi & Sake Pairing Guide →
                    </Link>
                </div>

            </div>
        </article>
    );
}
