'use client';

import React from 'react';
import Link from 'next/link';
import type { SakeEvent } from '@/lib/event-scraper';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

type EventCardProps = {
  event: SakeEvent;
};

const sourceBadge = {
  peatix: { label: 'Peatix', color: 'bg-orange-100 text-orange-700 border border-orange-200' },
  prtimes: { label: 'PR TIMES', color: 'bg-blue-100 text-blue-700 border border-blue-200' },
  saketimes: { label: 'SAKE TIMES', color: 'bg-emerald-100 text-emerald-800 border border-emerald-200' },
  nihonshucalendar: { label: '日本酒カレンダー', color: 'bg-purple-100 text-purple-700 border border-purple-200' },
};

export default function EventCard({ event }: EventCardProps) {
  const badge = sourceBadge[event.source] || { label: 'Event', color: 'bg-gray-100 text-gray-700' };

  return (
    <a
      href={event.eventUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] bg-gradient-to-br from-[#8B7D6B]/10 to-[#8B7D6B]/5 overflow-hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#8B7D6B]/30">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        )}

        {/* Source Badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[15px] font-bold text-[#1F1F1F] leading-snug mb-3 line-clamp-2 group-hover:text-[#8B7D6B] transition-colors">
          {event.title}
        </h3>

        {/* Date */}
        {event.dateLabel && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1.5">
            <Calendar size={14} className="text-[#8B7D6B] flex-shrink-0" />
            <span>{event.dateLabel}</span>
          </div>
        )}

        {/* Location */}
        {event.location && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1.5">
            <MapPin size={14} className="text-[#8B7D6B] flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        )}

        {/* Organizer */}
        {event.organizer && (
          <p className="text-xs text-gray-400 mt-2 truncate">
            主催: {event.organizer}
          </p>
        )}

        {/* Description */}
        {event.description && (
          <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        )}

        {/* CTA */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#8B7D6B] group-hover:text-[#6B5D4B] transition-colors">
          <span>詳細を見る</span>
          <ExternalLink size={12} />
        </div>
      </div>
    </a>
  );
}
