import Image from 'next/image';
import React from 'react';

export default function Hero() {
    return (
        <section className="relative h-screen w-full bg-[#fdfdfd] overflow-hidden flex items-center">
            {/* The main hero background taking up right side */}
            <div 
                className="anim-hero-bg absolute right-0 md:right-[5%] top-[15vh] w-full md:w-[60%] h-[60vh] md:h-[70vh] z-0 flex items-center justify-center"
            >
                <div className="relative w-full h-[80%] max-h-[500px]">
                    <Image 
                        src="/images/hero_logo_final.png"
                        alt="nom × nom 公式ロゴ"
                        fill
                        priority
                        fetchPriority="high"
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 60vw"
                    />
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-10 flex">
                <div 
                    className="anim-hero-text bg-white/80 md:bg-white/90 backdrop-blur-sm p-6 sm:p-8 md:p-12 lg:p-16 mt-[20vh] shadow-2xl max-w-[220px] sm:max-w-[280px] md:max-w-none"
                >
                    <h1 
                        className="font-serif text-[#1F1F1F] flex gap-3 sm:gap-4 md:gap-8 justify-center py-4"
                        style={{ 
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            lineHeight: 1.6,
                        }}
                    >
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[0.8em] whitespace-nowrap">新しい</span>
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[0.8em] whitespace-nowrap">日本酒との</span>
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[0.8em] whitespace-nowrap">出会い。</span>
                    </h1>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div 
                style={{ animationDelay: '1.5s', opacity: 0 }}
                className="anim-fade-in absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#5D5D5D] text-xs tracking-widest"
            >
                <span className="mb-2">SCROLL</span>
                <div className="w-px h-12 bg-gradient-to-b from-[#1F1F1F] to-transparent"></div>
            </div>
        </section>
    );
}
