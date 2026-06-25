'use client';

import React, { useState, useMemo } from 'react';
import type { SakeEvent } from '@/lib/event-scraper';
import EventCard from './EventCard';
import { CalendarDays } from 'lucide-react';

type EventListProps = {
  initialEvents: SakeEvent[];
};

export default function EventList({ initialEvents }: EventListProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // イベントデータを月ごとに分類し、選択可能な月リストを生成する
  const months = useMemo(() => {
    const monthsSet = new Set<string>();
    initialEvents.forEach(event => {
      if (event.date) {
        // YYYY-MM-DD 形式から YYYY年MM月 を取得
        const match = event.date.match(/^(\d{4})-(\d{2})/);
        if (match) {
          monthsSet.add(`${match[1]}-${match[2]}`);
        }
      }
    });

    // 昇順にソート
    return Array.from(monthsSet).sort();
  }, [initialEvents]);

  // 月の表示用フォーマット (例: "2026-07" -> "26年7月")
  const formatMonthLabel = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-');
    return `${year.slice(2)}年${parseInt(month, 10)}月`;
  };

  // 選択された月でイベントをフィルタリング
  const filteredEvents = useMemo(() => {
    if (selectedMonth === 'all') return initialEvents;
    return initialEvents.filter(event => {
      if (!event.date) return false;
      return event.date.startsWith(selectedMonth);
    });
  }, [initialEvents, selectedMonth]);

  return (
    <div>
      {/* Monthly Tabs */}
      <div className="mb-10 overflow-x-auto scrollbar-thin">
        <div className="flex gap-2 min-w-max pb-3 border-b border-gray-100">
          <button
            onClick={() => setSelectedMonth('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-[1.02] ${
              selectedMonth === 'all'
                ? 'bg-[#8B7D6B] text-white shadow-md shadow-[#8B7D6B]/20'
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 shadow-sm'
            }`}
          >
            すべて ({initialEvents.length})
          </button>
          {months.map(monthStr => {
            const count = initialEvents.filter(e => e.date?.startsWith(monthStr)).length;
            return (
              <button
                key={monthStr}
                onClick={() => setSelectedMonth(monthStr)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-[1.02] ${
                  selectedMonth === monthStr
                    ? 'bg-[#8B7D6B] text-white shadow-md shadow-[#8B7D6B]/20'
                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100 shadow-sm'
                }`}
              >
                {formatMonthLabel(monthStr)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Label */}
      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm text-gray-500 font-medium">
          表示中: <span className="text-[#8B7D6B] font-bold">{filteredEvents.length}</span>件
        </p>
      </div>

      {/* Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
            <CalendarDays size={28} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            対象のイベントが見つかりません
          </h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            選択された月には日本酒イベントが登録されていません。
          </p>
        </div>
      )}
    </div>
  );
}
