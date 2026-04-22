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
                        src="/images/logo_v2.png" 
                        alt="nom × nom" 
                        width={200}
                        height={80}
                        loading="lazy"
                        className="h-12 md:h-16 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" 
                        style={{ filter: 'brightness(0) invert(1)' }}
                    />

                </Link>
                
                {/* Social Links */}
                <div className="flex items-center gap-6">
                    <a 
                        href="https://www.instagram.com/nihonshu.nom_nom/" 
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
                    <Link href="#" className="hover:text-white transition-colors">運営情報</Link>
                    <Link href="#" className="hover:text-white transition-colors">利用規約</Link>
                    <Link href="#" className="hover:text-white transition-colors">プライバシーポリシー</Link>
                    <Link href="#" className="hover:text-white transition-colors">お問い合わせ</Link>
                </nav>
                
                <p className="text-[#A0A0A0] text-[10px] tracking-[0.2em] uppercase mt-4">
                    &copy; 2026 nom2.jp All rights reserved.
                </p>
            </div>
        </footer>
    );
}
