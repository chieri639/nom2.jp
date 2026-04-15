import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleDetail } from '@/lib/microcms';

export const revalidate = 0;

export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  try {
    const article = await getArticleDetail(params.id);

    if (!article) {
      notFound();
    }

    return (
      <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh', paddingBottom: 80, fontFamily: '"Noto Sans JP", -apple-system, sans-serif' }}>
        
        {/* Article Header (Hero) */}
        <header style={{ 
            background: 'linear-gradient(135deg, #1A1A1D 0%, #2b1A33 100%)', 
            color: '#fff', 
            padding: '80px 32px 60px', 
            textAlign: 'center',
            marginBottom: 60
        }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#bfa758', color: '#fff', padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 20 }}>
                    特集記事
                </span>
                <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.02em', lineHeight: 1.4 }}>
                    {article.title}
                </h1>
            </div>
            {article.imageUrl && (
              <div style={{ maxWidth: 900, margin: '40px auto 0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', aspectRatio: '16/9' }}>
                  <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
        </header>

        {/* Article Body */}
        <main style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Link href="/article" style={{ display: 'inline-flex', alignItems: 'center', color: '#6b7280', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
              ← 記事一覧に戻る
            </Link>

            <article 
              className="rich-text" 
              style={{ fontSize: 17, lineHeight: 1.9, color: '#333' }} 
              dangerouslySetInnerHTML={{ __html: article.content || '' }} 
            />

            {/* Read More / Next Actions */}
            <div style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid #eee', textAlign: 'center' }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>日本酒を探す</h3>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/nihonshu" style={{ padding: '14px 32px', backgroundColor: '#1A1A1D', color: 'white', borderRadius: 100, fontWeight: 700, textDecoration: 'none' }}>
                  日本酒一覧を見る
                </Link>
                <Link href="/similar" style={{ padding: '14px 32px', backgroundColor: '#bfa758', color: 'white', borderRadius: 100, fontWeight: 700, textDecoration: 'none' }}>
                  AIにおすすめを聞く
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('詳細取得エラー:', error);
    notFound();
  }
}
