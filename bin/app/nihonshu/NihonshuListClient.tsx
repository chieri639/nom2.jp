'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SAKE } from '@/lib/microcms';
import { Search, X, Wine, Filter } from 'lucide-react';

// ── 定数 ──────────────────────────────────────
const TYPES = ['純米大吟醸', '純米吟醸', '純米', '大吟醸', '吟醸', '生酒', '生原酒', 'スパークリング', 'にごり', 'ひやおろし'];

const TASTE_TAGS = ['辛口', '甘口', '超辛口'];

// 名前やdescriptionからキーワードを推定してタグを付与
function deriveTags(sake: SAKE): string[] {
  const tags: string[] = [];
  const text = `${sake.name} ${sake.description || ''}`;

  for (const t of TYPES) {
    if (text.includes(t)) tags.push(t);
  }
  for (const t of TASTE_TAGS) {
    if (text.includes(t)) tags.push(t);
  }
  return tags;
}

// ── メインコンポーネント ───────────────────────
export default function NihonshuListClient({ sakes }: { sakes: SAKE[] }) {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeTaste, setActiveTaste] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // フィルタリング
  const filtered = useMemo(() => {
    return sakes.filter((s) => {
      // 検索バー
      if (query) {
        const q = query.toLowerCase();
        const haystack = `${s.name} ${s.brewery || ''} ${s.description || ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      const tags = deriveTags(s);

      // 種類フィルター
      if (activeType && !tags.includes(activeType)) return false;

      // 味わいフィルター
      if (activeTaste && !tags.includes(activeTaste)) return false;

      return true;
    });
  }, [sakes, query, activeType, activeTaste]);

  const activeFilterCount = [activeType, activeTaste].filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8' }}>
      {/* ── ヘッダー ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '48px 24px 32px',
        color: 'white'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 4,
            letterSpacing: '-0.02em'
          }}>
            🍶 日本酒データベース
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
            {sakes.length}銘柄を掲載中
          </p>

          {/* ── 検索バー ── */}
          <div style={{
            position: 'relative',
            maxWidth: 600,
          }}>
            <Search size={18} style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              color: '#9ca3af', pointerEvents: 'none'
            }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="銘柄名・蔵元名で検索..."
              style={{
                width: '100%',
                padding: '14px 44px 14px 48px',
                borderRadius: 12,
                border: 'none',
                fontSize: 15,
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                color: 'white',
                outline: 'none',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
                  width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'white'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── フィルターセクション ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px 0' }}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 16px',
            background: showFilters ? '#1a1a2e' : 'white',
            color: showFilters ? 'white' : '#374151',
            border: '1px solid #e5e7eb',
            borderRadius: 8, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          <Filter size={14} />
          絞り込み
          {activeFilterCount > 0 && (
            <span style={{
              background: '#eab308', color: '#1a1a2e',
              borderRadius: '50%', width: 18, height: 18,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800
            }}>{activeFilterCount}</span>
          )}
        </button>

        {(activeType || activeTaste) && (
          <button
            onClick={() => { setActiveType(null); setActiveTaste(null); }}
            style={{
              marginLeft: 8, padding: '8px 14px',
              background: 'transparent', border: '1px solid #fca5a5',
              borderRadius: 8, fontSize: 13, color: '#dc2626',
              cursor: 'pointer', fontWeight: 600
            }}
          >
            フィルター解除
          </button>
        )}

        {showFilters && (
          <div style={{
            marginTop: 12, padding: 20, background: 'white',
            borderRadius: 12, border: '1px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}>
            {/* 種類 */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>種類</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveType(activeType === t ? null : t)}
                    style={{
                      padding: '6px 14px', borderRadius: 20,
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      border: activeType === t ? '2px solid #1a1a2e' : '1px solid #d1d5db',
                      background: activeType === t ? '#1a1a2e' : 'white',
                      color: activeType === t ? 'white' : '#374151',
                      transition: 'all 0.15s'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 味わい */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>味わい</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {TASTE_TAGS.map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveTaste(activeTaste === t ? null : t)}
                    style={{
                      padding: '6px 14px', borderRadius: 20,
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      border: activeTaste === t ? '2px solid #b45309' : '1px solid #d1d5db',
                      background: activeTaste === t ? '#b45309' : 'white',
                      color: activeTaste === t ? 'white' : '#374151',
                      transition: 'all 0.15s'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 結果件数 */}
        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 12, fontWeight: 500 }}>
          {filtered.length === sakes.length
            ? `全${sakes.length}件`
            : `${filtered.length}件 / ${sakes.length}件中`
          }
        </p>
      </div>

      {/* ── カードグリッド ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}>
          {filtered.map((sake) => {
            // descriptionからHTMLタグを除去してプレーンテキスト化
            const plainDesc = (sake.description || '')
              .replace(/<[^>]+>/g, ' ')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/\s+/g, ' ')
              .trim();

            // 名前から種類タグを推定
            const tags = deriveTags(sake);

            return (
              <Link href={`/nihonshu/${sake.id}`} key={sake.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {/* 画像 */}
                  <div style={{
                    height: 200, backgroundColor: '#f3f4f6', position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {sake.imageUrl ? (
                      <img
                        src={sake.imageUrl}
                        alt={sake.name}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        color: '#c4b5a0', background: 'linear-gradient(135deg, #f5f0e8 0%, #ede5d8 100%)'
                      }}>
                        <Wine size={36} strokeWidth={1.5} style={{ marginBottom: 8 }} />
                        <span style={{ fontSize: 12, fontWeight: 600 }}>No Image</span>
                      </div>
                    )}
                  </div>

                  {/* コンテンツ */}
                  <div style={{
                    padding: '16px 18px 18px',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* 蔵元名 */}
                    {sake.brewery && (
                      <p style={{
                        fontSize: 11,
                        color: '#8b7355',
                        fontWeight: 700,
                        marginBottom: 4,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em'
                      }}>
                        {sake.brewery}
                      </p>
                    )}

                    {/* 銘柄名 */}
                    <h2 style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: '#1f2937',
                      marginBottom: 8,
                      lineHeight: 1.45,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical' as any,
                      overflow: 'hidden',
                    }}>
                      {sake.name}
                    </h2>

                    {/* タグ */}
                    {tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                        {tags.slice(0, 3).map(tag => (
                          <span key={tag} style={{
                            fontSize: 10,
                            padding: '2px 8px',
                            borderRadius: 10,
                            background: '#f3f0e8',
                            color: '#8b7355',
                            fontWeight: 600,
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 説明文プレビュー */}
                    {plainDesc && (
                      <p style={{
                        fontSize: 12,
                        color: '#6b7280',
                        lineHeight: 1.6,
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as any,
                        overflow: 'hidden',
                        margin: 0,
                      }}>
                        {plainDesc}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '80px 24px', color: '#9ca3af'
          }}>
            <Wine size={48} strokeWidth={1} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p style={{ fontSize: 16, fontWeight: 600 }}>条件に一致する日本酒が見つかりません</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>検索条件を変更してお試しください</p>
          </div>
        )}
      </div>
    </div>
  );
}
