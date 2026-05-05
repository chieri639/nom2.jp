"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
        <header className="fixed w-full top-0 left-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
                <Image 
                    src="/images/logo_v4.png" 
                    alt="nom × nom" 
                    width={140}
                    height={28}
                    className="h-6 md:h-7 w-auto" 
                    priority
                />
            </Link>
            
            <nav className="hidden md:block">
                <ul className="flex items-center gap-8 text-[#5D5D5D] text-sm tracking-widest font-medium uppercase">
                    <li><Link href="/article" className="hover:text-black transition-colors">Articles</Link></li>
                    <li><Link href="/brewery" className="hover:text-black transition-colors">Breweries</Link></li>
                    <li><Link href="/shop" className="hover:text-black transition-colors">Shop</Link></li>
                    <li><Link href="/brand" className="hover:text-black transition-colors">Brand</Link></li>
                    <li><Link href="/similar" className="hover:text-[#BA9156] transition-colors font-bold flex items-center gap-1"><span className="text-lg leading-none">✨</span> AI Search</Link></li>
                    <li><Link href="/en" className="hover:text-black transition-colors">EN</Link></li>
                </ul>
            </nav>
            
            {/* Mobile menu button */}
            <button 
                className="md:hidden text-[#1F1F1F] z-[60]" 
                aria-label="メニューを開閉する"
                onClick={toggleMenu}
            >
                {isMenuOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                )}
            </button>

        </header>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
            <div className="fixed inset-0 bg-white z-[45] flex flex-col pt-24 px-8 md:hidden">
                <nav>
                    <ul className="flex flex-col gap-6 text-[#1F1F1F] text-lg tracking-widest font-medium uppercase">
                        <li><Link href="/article" onClick={closeMenu}>Articles</Link></li>
                        <li><Link href="/brewery" onClick={closeMenu}>Breweries</Link></li>
                        <li><Link href="/shop" onClick={closeMenu}>Shop</Link></li>
                        <li><Link href="/brand" onClick={closeMenu}>Brand</Link></li>
                        <li><Link href="/similar" onClick={closeMenu} className="text-[#BA9156] font-bold flex items-center gap-2"><span className="text-xl">✨</span> AI Search</Link></li>
                        <li className="pt-4 border-t border-gray-200 mt-2"><Link href="/en" onClick={closeMenu}>EN</Link></li>
                    </ul>
                </nav>
            </div>
        )}
        </>
    );
}
