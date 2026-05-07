import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#1f1f1f] text-white py-20 border-t border-white/5">
            <div className="container mx-auto px-6 flex flex-col items-center gap-10">
                {/* Logo & Brand */}
                <Link href="/" className="flex flex-col items-center gap-4 group">
                    <Image 
                        src="/images/icon.png" 
                        alt="nom × nom" 
                        width={80}
                        height={80}
                        loading="lazy"
                        className="h-16 w-16 object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
                        style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
                    />
                </Link>
                
                {/* Social Links */}
                <div className="flex items-center gap-6">
                    <a 
                        href="https://www.instagram.com/nihonshu.nomnom/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#C0C0C0] hover:text-[#BA9156] transition-all duration-300 transform hover:scale-110"
                        aria-label="Instagram"
                    >
                        <Instagram size={24} strokeWidth={1.5} />
                    </a>
                </div>

                {/* Navigation */}
                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[#BABABA] text-sm tracking-widest">
                    <Link href="/about" className="hover:text-white transition-colors">のむのむとは？</Link>
                    <Link href="/tokusho" className="hover:text-white transition-colors">特定商取引法に基づく表記</Link>
                    <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー・免責事項</Link>
                    <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
                </nav>

                {/* 飲酒警告文 */}
                <div className="w-full max-w-2xl border border-white/10 rounded-lg px-6 py-4 text-center">
                    <p className="text-[#C0A060] text-sm font-medium tracking-wide leading-relaxed">
                        🍶 20歳未満の飲酒は法律で禁止されています。お酒は20歳になってから。
                    </p>
                </div>
                
                <p className="text-[#A0A0A0] text-[10px] tracking-[0.2em] uppercase mt-4">
                    &copy; 2026 nom2.jp All rights reserved.
                </p>
            </div>
        </footer>
    );
}

