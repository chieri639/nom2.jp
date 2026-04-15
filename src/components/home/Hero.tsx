'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative h-screen w-full bg-[#fdfdfd] overflow-hidden flex items-center">
            {/* The main hero background taking up right side */}
            <motion.div 
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute right-0 md:right-[5%] top-[15vh] w-full md:w-[60%] h-[60vh] md:h-[70vh] bg-gray-200 z-0 bg-cover bg-center"
                style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1200')"
                }}
            />

            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-10 flex">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-white/80 md:bg-white/90 backdrop-blur-sm p-6 sm:p-8 md:p-12 lg:p-16 mt-[20vh] shadow-2xl max-w-[220px] sm:max-w-[280px] md:max-w-none"
                >
                    <h1 
                        className="font-serif text-[#1F1F1F] flex gap-3 sm:gap-4 md:gap-8 justify-end"
                        style={{ 
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            lineHeight: 1.4,
                        }}
                    >
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[0.8em]">新しい</span>
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[0.8em]">日本酒との</span>
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[0.8em]">出会い。</span>
                    </h1>
                </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#5D5D5D] text-xs tracking-widest"
            >
                <span className="mb-2">SCROLL</span>
                <div className="w-px h-12 bg-gradient-to-b from-[#1F1F1F] to-transparent"></div>
            </motion.div>
        </section>
    );
}
