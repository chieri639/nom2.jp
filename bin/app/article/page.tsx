'use client';

import React from 'react';
import Link from 'next/link';

// Array of article metadata for Japanese content
const articles = [
  {
    title: "【2026年最新】北海道の日本酒マップ！全14酒蔵を徹底紹介",
    summary: "かつての辛口一辺倒から、全国随一のプレミアム産地へと進化した北海道。道内の代表的な全14酒蔵の特徴をプロが徹底解説。",
    path: "/article/japan/hokkaido",
    image: "/images/hokkaido_sake_hero.png",
    category: "Regional Guide",
    tagColor: "#3498db"
  },
  {
    title: "おりがらみ日本酒とは？にごり酒との違いを徹底解説",
    summary: "おりがらみの魅力から、にごり酒との明確な違い、一番美味しい飲み方までを日本酒のプロが徹底解説します。",
    path: "/article/origarami-sake-guide",
    image: "/images/origarami_sake_hero_2.png",
    category: "Sake Guide",
    tagColor: "#e67e22"
  },
  {
    title: "和食と日本酒ペアリングの基本（同調と補完）",
    summary: "ユネスコ無形文化遺産の和食をもっと美味しく。お刺身や天ぷらに合わせる日本酒選びの基本「2つの方程式」をプロが解説します。",
    path: "/article/washoku-sake-pairing-part-1",
    image: "/images/washoku_pairing_hero_1.png",
    category: "和食 Pairing",
    tagColor: "#27ae60"
  },
  {
    title: "和食ペアリングの真髄（だしの旨味と温度）",
    summary: "和食の要である「だしの旨味」と、日本酒特有の「お燗（温度変化）」がもたらす爆発的な旨味の相乗効果について解説します。",
    path: "/article/washoku-sake-pairing-part-2",
    image: "/images/washoku_pairing_hero_2.png",
    category: "和食 Pairing",
    tagColor: "#27ae60"
  },
  {
    title: "四季の「旬」と「テロワール」を味わう（応用編）",
    summary: "春夏秋冬の旬の和食と季節の日本酒。そして「海の幸には海の酒」といった地産地消のテロワールの世界をご紹介します。",
    path: "/article/washoku-sake-pairing-part-3",
    image: "/images/washoku_pairing_hero_3.png",
    category: "和食 Pairing",
    tagColor: "#27ae60"
  }
];

export default function ArticleIndexPage() {
    return (
        <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', paddingBottom: 80, fontFamily: '"Noto Sans JP", -apple-system, sans-serif' }}>
            
            {/* Hero Banner (Japanese) */}
            <header style={{ 
                background: 'linear-gradient(135deg, #1A1A1D 0%, #2b1A33 100%)', 
                color: '#fff', 
                padding: '80px 32px 60px', 
                textAlign: 'center',
                marginBottom: 60
            }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                        日本酒をもっと深く、もっと美味しく。
                    </h1>
                    <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 640, margin: '0 auto' }}>
                        和食とのペアリング理論や、おすすめの飲み方など、充実した日本酒ライフを送るための特集記事をお届けします。
                    </p>
                </div>
            </header>

            {/* Language Switch CTA */}
            <div style={{ maxWidth: 1200, margin: '0 auto 40px', padding: '0 32px', textAlign: 'right' }}>
                <Link href="/en/article" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f0f2f5', color: '#1a1a1d', padding: '10px 20px', borderRadius: 24, textDecoration: 'none', fontWeight: 700, fontSize: 14, transition: 'background-color 0.2s' }}>
                    <span style={{ fontSize: 18, marginRight: 8 }}>🇬🇧</span> English Guides for Travelers →
                </Link>
            </div>

            {/* Grid Container */}
            <div style={{ 
                maxWidth: 1200, 
                margin: '0 auto', 
                padding: '0 32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 40
            }}>
                {articles.map((article, index) => (
                    <Link href={article.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <article style={{ 
                            background: '#fff', 
                            borderRadius: 16, 
                            overflow: 'hidden', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.06)', 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-6px)';
                            e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)';
                        }}
                        >
                            <div style={{ width: '100%', aspectRatio: '16/10', position: 'relative', overflow: 'hidden', backgroundColor: '#eee' }}>
                                <span style={{ position: 'absolute', top: 16, left: 16, background: article.tagColor, color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, letterSpacing: 1, textTransform: 'uppercase', zIndex: 10 }}>
                                    {article.category}
                                </span>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = "/images/origarami_sake_hero_2.png"; }} />
                            </div>

                            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', lineHeight: 1.4, marginBottom: 12 }}>
                                    {article.title}
                                </h2>
                                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6, marginBottom: 20, flexGrow: 1 }}>
                                    {article.summary}
                                </p>
                                <div style={{ display: 'inline-block', color: '#bfa758', fontWeight: 700, fontSize: 14, alignSelf: 'flex-start' }}>
                                    記事を読む →
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
            
        </div>
    );
}
