import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // パスに大文字が含まれている場合、小文字に変換して301リダイレクト
  // クエリパラメータはそのまま維持される（nextUrl.cloneにより自動的に保持）
  if (path !== path.toLowerCase()) {
    url.pathname = path.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 静的アセット・Next.js内部パス・APIルートを除外した全パスにマッチ
    '/((?!_next/static|_next/image|favicon\\.ico|icon\\.png|images|fonts|api).*)',
  ],
};
