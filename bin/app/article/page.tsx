'use client';

import React from 'react';
import Link from 'next/link';

// Array of article metadata based on previously built pages
const articles = [
  {
    title: "The Ultimate Guide to Sake Measurements: What is \"1 Go\"?",
    summary: "Confused by sake servings in Japan? Learn about traditional measurements like \"1 Go\", smart drinking tips, and comparing sake calories to beer.",
    path: "/article/sake-measurements-one-go",
    image: "/images/izakaya_uraya_real.jpg", // Using an appealing sake image as placeholder thumbnail
    category: "Guide",
    tagColor: "#e67e22"
  },
  {
    title: "Tokyo Sake Izakaya Guide Part 1: Top 5 Spots",
    summary: "Discover Tokyo's best sake izakayas curated by a Master Sommelier. From casual craft sake spots to Michelin-level sushi experiences.",
    path: "/article/tokyo-sake-izakaya-guide-part-1",
    image: "/images/izakaya_uoyakio.png",
    category: "Izakaya Guide",
    tagColor: "#8e44ad"
  },
  {
    title: "Tokyo Sake Izakaya Guide Part 2: Cost & Pro-Guided",
    summary: "Looking for incredible sake on a budget? Explore 5 spots offering amazing cost-performance and English-speaking sake professionals.",
    path: "/article/tokyo-sake-izakaya-guide-part-2",
    image: "/images/izakaya_suisui_real.jpg",
    category: "Izakaya Guide",
    tagColor: "#8e44ad"
  },
  {
    title: "Tokyo Sake Izakaya Guide Part 3: Ultimate Pairing",
    summary: "The pinnacle of Tokyo's sake scene. Find introduction-only premium VIP bars and casual neon-lit tasting spots where you control the pairing.",
    path: "/article/tokyo-sake-izakaya-guide-part-3",
    image: "/images/izakaya_platinumfish_real.jpg",
    category: "Izakaya Guide",
    tagColor: "#8e44ad"
  },
  {
    title: "Sushi & Sake Pairing Guide (Part 1: Basics)",
    summary: "Unlock the secrets of Edomae sushi. Learn the fundamental differences between Akazu (Red Vinegar) and Shirozu (White Vinegar) sushi rice.",
    path: "/article/sushi-sake-pairing-guide",
    image: "/images/akazu_infographic.png",
    category: "Pairing",
    tagColor: "#c0392b"
  },
  {
    title: "Sushi & Sake Pairing Guide (Part 2: Science)",
    summary: "Dive deep into the science behind pairing. Discover how the 'Wash Effect', umami synergy, and terroir elevate your sushi dining experience.",
    path: "/article/sushi-sake-pairing-guide-part-2",
    image: "/images/part2_wash_effect.png", // Using one of the generated infographics
    category: "Pairing",
    tagColor: "#c0392b"
  },
  {
    title: "Sushi & Sake Pairing Guide (Part 3: Progression)",
    summary: "Master the art of the multi-course Omakase. Learn exactly which sakes to order from delicate white fish starters to rich, fatty tuna pieces.",
    path: "/article/sushi-sake-pairing-guide-part-3",
    image: "/images/page_top.png", // Using the hero image from part 1
    category: "Pairing",
    tagColor: "#c0392b"
  }
];

export default function ArticleIndexPage() {
    return (
        <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', paddingBottom: 80, fontFamily: '"Noto Sans JP", -apple-system, sans-serif' }}>
            
            {/* Hero Banner */}
            <header style={{ 
                background: 'linear-gradient(135deg, #1A1A1D 0%, #2b1A33 100%)', 
                color: '#fff', 
                padding: '80px 32px 60px', 
                textAlign: 'center',
                marginBottom: 60
            }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                        Discover Sake & Tokyo
                    </h1>
                    <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto' }}>
                        Curated English guides for enthusiasts. From the fundamentals of <em>Edomae</em> sushi pairing to Tokyo's best hidden <em>Izakayas</em>.
                    </p>
                </div>
            </header>

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
                        // Simulating a hover effect using generic inline standard styles
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-6px)';
                            e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)';
                        }}
                        >
                            {/* Thumbnail Area */}
                            <div style={{ width: '100%', aspectRatio: '16/10', position: 'relative', overflow: 'hidden', backgroundColor: '#eee' }}>
                                {/* Displaying the tag over the image */}
                                <span style={{
                                    position: 'absolute',
                                    top: 16,
                                    left: 16,
                                    background: article.tagColor,
                                    color: '#fff',
                                    fontSize: 12,
                                    fontWeight: 700,
                                    padding: '4px 12px',
                                    borderRadius: 100,
                                    letterSpacing: 1,
                                    textTransform: 'uppercase',
                                    zIndex: 10
                                }}>
                                    {article.category}
                                </span>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={article.image} 
                                    alt={article.title} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    onError={(e) => {
                                        // Fallback if image path is not found (since some infographics were highly varied in naming)
                                        e.currentTarget.src = "/images/izakaya_sakelab.png"; 
                                    }}
                                />
                            </div>

                            {/* Content Area */}
                            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', lineHeight: 1.4, marginBottom: 12 }}>
                                    {article.title}
                                </h2>
                                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6, marginBottom: 20, flexGrow: 1 }}>
                                    {article.summary}
                                </p>
                                <div style={{ 
                                    display: 'inline-block', 
                                    color: '#bfa758', 
                                    fontWeight: 700, 
                                    fontSize: 14, 
                                    borderBottom: '2px solid transparent', // Ready for hover underline effect if needed
                                    alignSelf: 'flex-start'
                                }}>
                                    Read Guide →
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* Bottom Call to Action if needed */}
            <div style={{ textAlign: 'center', marginTop: 80, padding: '0 32px' }}>
                <p style={{ color: '#888', fontSize: 14 }}>More comprehensive sake guides coming soon.</p>
            </div>
            
        </div>
    );
}
