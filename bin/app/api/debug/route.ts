import { NextResponse } from 'next/server';

export async function GET() {
  const SERVICE_ID = process.env.X_MICROCMS_SERVICE_ID;
  const API_KEY = process.env.X_MICROCMS_API_KEY;
  const url = `https://${SERVICE_ID}.microcms.io/api/v1/brewery?limit=1`;
  
  try {
    const res = await fetch(url, {
      headers: { 'X-MICROCMS-API-KEY': API_KEY! },
      cache: 'no-store',
    });
    
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ 
        status: res.status, 
        ok: false, 
        url,
        error: text 
      });
    }
    
    const data = await res.json();
    return NextResponse.json({ 
      ok: true, 
      url,
      data 
    });
  } catch (err) {
    return NextResponse.json({ 
      ok: false, 
      url,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined
    });
  }
}
