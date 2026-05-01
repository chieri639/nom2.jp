import { NextResponse } from 'next/server';
import { getSakes } from '@/lib/microcms';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    
    // microCMS SDK supports free text search via 'q' parameter!
    const { contents } = await getSakes({ 
        q: q || undefined, 
        limit: 100 
    });
    
    return NextResponse.json(contents);
}
