import React from 'react';
import Link from 'next/link';
import { getBrands } from '@/lib/microcms';

export const revalidate = 0;

export default async function BrandIndexPage() {
    const { contents: brands } = await getBrands({ limit: 100 });

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 40, borderBottom: '2px solid #bfa758', paddingBottom: 16, color: '#111827' }}>
                特約銘柄一覧
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {brands.map((brand) => (
                    <Link href={`/brand/${brand.id}`} key={brand.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '1rem', 
                            overflow: 'hidden', 
                            background: '#fff', 
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                        }}>
                            <div style={{ height: '200px', backgroundColor: '#f3f4f6', position: 'relative' }}>
                                {brand.imageUrl ? (
                                    <img src={brand.imageUrl} alt={brand.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>No Image</div>
                                )}
                            </div>
                            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <span style={{ display: 'inline-block', alignSelf: 'flex-start', padding: '0.25rem 0.75rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    銘柄
                                </span>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2937', marginBottom: '0.75rem', lineHeight: 1.4 }}>{brand.name}</h2>
                                <div style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.6, flexGrow: 1, whiteSpace: 'pre-line' }}>
                                    {(brand.content || '')
                                        .replace(/<[^>]+>/g, '\n')
                                        .replace(/&amp;/g, '&')
                                        .replace(/&lt;/g, '<')
                                        .replace(/&gt;/g, '>')
                                        .replace(/\n+/g, '\n')
                                        .trim()
                                        .substring(0, 80)}
                                    {(brand.content || '').length > 80 ? '...' : ''}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            {brands.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>銘柄データがまだありません。</div>
            )}
        </div>
    );
}
