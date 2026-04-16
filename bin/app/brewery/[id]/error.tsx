'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 予期せぬエラーをロギング（Sentry等があればここに記述）
    console.error('Brewery Detail Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-xl font-bold text-[#1F1F1F] mb-4 font-serif-jp">
          情報の取得中に問題が発生しました
        </h2>
        
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          通信が一時的に不安定か、microCMSの制限に達した可能性があります。時間を置いてもう一度お試しください。
        </p>

        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full bg-[#8B7D6B] text-white py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
          >
            ページを再読み込みする
          </button>
          
          <Link
            href="/brewery"
            className="block w-full border border-gray-200 text-gray-500 py-3 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            酒蔵一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
