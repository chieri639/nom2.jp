'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import Pickup from '@/components/home/Pickup';
import Category from '@/components/home/Category';
import TasteSearch from '@/components/home/TasteSearch';
import FeaturedSakes from '@/components/home/FeaturedSakes';
import Footer from '@/components/layout/Footer';

export default function HomeClient({ articles, sakes }: { articles: any[], sakes: any[] }) {
    return (
        <div className="bg-[#FDFDFD] min-h-screen text-[#1F1F1F] font-sans selection:bg-[#BA9156] selection:text-white">
            <Header />
            
            <main>
                <Hero />
                <Pickup articles={articles} />
                <Category />
                <TasteSearch />
                {/* We pass the real sakes data to FeaturedSakes, or it falls back to Mock if empty */}
                <FeaturedSakes sakes={sakes} />
            </main>

            <Footer />
        </div>
    );
}
