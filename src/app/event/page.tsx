import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { scrapeAllEvents, type SakeEvent } from '@/lib/event-scraper';
import EventCard from '@/components/event/EventCard';
import { CalendarDays, Sparkles, Search } from 'lucide-react';

// 1時間ごとに再取得（ISR）
export const revalidate = 3600;

export const metadata: Metadata = {
  title: '日本酒イベント・フェア情報 | nom × nom',
  description: '全国の日本酒イベント、試飲会、蔵開き、酒フェスなどの最新情報をまとめてお届け。Peatix・PR TIMESから自動収集した日本酒関連イベント情報をチェック。',
  alternates: {
    canonical: 'https://nom2.jp/event',
  },
  openGraph: {
    title: '日本酒イベント・フェア情報 | nom × nom',
    description: '全国の日本酒イベント、試飲会、蔵開き、酒フェスなどの最新情報をまとめてお届け。',
    url: 'https://nom2.jp/event',
    type: 'website',
  },
};

export default async function EventPage() {
  let events: SakeEvent[] = [];

  try {
    events = await scrapeAllEvents();
  } catch (err) {
    console.error('Failed to fetch events:', err);
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <header className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B7D6B]/5 via-transparent to-transparent" />
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-[#8B7D6B]/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-48 h-48 bg-[#BA9156]/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#8B7D6B]/10 text-[#8B7D6B] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            <CalendarDays size={14} />
            SAKE EVENTS
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif-jp text-[#1F1F1F] leading-tight mb-6">
            日本酒イベント・フェア情報
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            全国の日本酒イベント、試飲会、蔵開き、酒フェスなどの最新情報を
            <br className="hidden md:block" />
            PeatixやPR TIMESから自動収集してお届けします。
          </p>
        </div>
      </header>

      {/* Stats Bar */}
      {events.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              📊 {events.length}件のイベント情報
            </span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              🔄 1時間ごとに自動更新
            </span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              📡 Peatix · PR TIMES から収集
            </span>
          </div>
        </div>
      )}

      {/* Event Grid */}
      <main className="max-w-6xl mx-auto px-6">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#8B7D6B]/10 rounded-full flex items-center justify-center">
              <CalendarDays size={32} className="text-[#8B7D6B]" />
            </div>
            <h2 className="text-xl font-bold text-[#1F1F1F] mb-3">
              イベント情報を取得中です
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              現在、日本酒関連のイベント情報を収集しています。
              しばらくしてからもう一度アクセスしてください。
            </p>
          </div>
        )}

        {/* Disclaimer & Source Attribution */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            ※ イベント情報は <a href="https://peatix.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Peatix</a> および{' '}
            <a href="https://prtimes.jp" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">PR TIMES</a> から自動収集しています。
            <br />
            最新の開催情報・詳細は各イベントの公式ページをご確認ください。
            情報の正確性を保証するものではありません。
          </p>
        </div>

        {/* Cross Navigation */}
        <div className="mt-16 pt-12 border-t border-gray-100 text-center">
          <h2 className="text-2xl font-serif-jp font-bold text-[#1F1F1F] mb-10">
            日本酒の世界をもっと探求する
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/nihonshu" className="group flex items-center gap-3 px-8 py-4 bg-[#1F1F1F] text-white rounded-full text-sm font-bold hover:bg-[#8B7D6B] transition-all shadow-lg hover:-translate-y-1">
              <Search size={18} /> 日本酒一覧を見る
            </Link>
            <Link href="/similar" className="group flex items-center gap-3 px-8 py-4 bg-[#8B7D6B] text-white rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-lg hover:-translate-y-1">
              <Sparkles size={18} /> AIにおすすめを聞く
            </Link>
            <Link href="/article" className="group flex items-center gap-3 px-8 py-4 bg-white text-[#1F1F1F] rounded-full text-sm font-bold hover:bg-gray-50 transition-all shadow-lg border border-gray-200 hover:-translate-y-1">
              <CalendarDays size={18} /> 記事を読む
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
