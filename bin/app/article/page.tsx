import React from 'react';
import Link from 'next/link';
import { getArticles } from '@/lib/microcms';

export const revalidate = 0;

export default async function ArticleIndexPage() {
    const { contents: articles } = await getArticles({ limit: 100 });

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
                {articles.map((article) => (
                    <Link href={`/article/${article.id}`} key={article.id} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        }}>
                            <div style={{ width: '100%', aspectRatio: '16/10', position: 'relative', overflow: 'hidden', backgroundColor: '#eee' }}>
                                <span style={{ position: 'absolute', top: 16, left: 16, background: '#bfa758', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, letterSpacing: 1, textTransform: 'uppercase', zIndex: 10 }}>
                                    特集記事
                                </span>
                                {article.imageUrl ? (
                                    <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>No Image</div>
                                )}
                            </div>

                            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', lineHeight: 1.4, marginBottom: 12 }}>
                                    {article.title}
                                </h2>
                                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6, marginBottom: 20, flexGrow: 1 }}>
                                    {(article.content || '')
                                        .replace(/<[^>]+>/g, '')
                                        .replace(/\n+/g, ' ')
                                        .substring(0, 60)}...
                                </p>
                                <div style={{ display: 'inline-block', color: '#bfa758', fontWeight: 700, fontSize: 14, alignSelf: 'flex-start' }}>
                                    記事を読む →
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
            
            {articles.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>記事がまだありません。</div>
            )}
        </div>
    );
}
