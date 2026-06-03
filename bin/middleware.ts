import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // 確実にトップページへ転送したい旧URLのプレフィックス群
  const redirectPrefixes = ['/news', '/event', '/posts', '/brewery/brand'];

  if (redirectPrefixes.some(prefix => path.startsWith(prefix))) {
    url.pathname = '/';
    return NextResponse.redirect(url, 301); // 301 Permanent Redirect
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/news/:path*', 
    '/event/:path*', 
    '/posts/:path*', 
    '/brewery/brand/:path*'
  ],
};
