'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Props {
  defaultHref: string;
  defaultText: string;
}

export default function DynamicBackButton({ defaultHref, defaultText }: Props) {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ実行
    // 履歴があり、かつドメインが同じ（または詳細からの一覧戻りなど）場合に履歴バックを有効にする
    if (typeof window !== 'undefined' && window.history.length > 1 && document.referrer.includes(window.location.host)) {
      setCanGoBack(true);
    }
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    if (canGoBack) {
      e.preventDefault();
      window.history.back();
    }
  };

  return (
    <Link 
      href={defaultHref} 
      onClick={handleBack}
      className="inline-flex items-center text-xs text-gray-400 hover:text-[#8B7D6B] transition-colors tracking-[0.2em] uppercase font-bold"
    >
      <ArrowLeft size={14} className="mr-2" /> {canGoBack ? '戻る' : defaultText}
    </Link>
  );
}
