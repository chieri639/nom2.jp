import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#1F1F1F] text-white py-16 text-center text-sm">
            <div className="container mx-auto px-6 flex flex-col items-center gap-6">
                <Link href="/" className="text-3xl font-bold tracking-widest font-serif">
                    nom<span className="text-[#5D5D5D] mx-1">×</span>nom
                </Link>
                
                <div className="flex flex-wrap justify-center gap-6 text-[#A0A0A0] mt-4">
                    <Link href="#" className="hover:text-white transition-colors">運営情報</Link>
                    <Link href="#" className="hover:text-white transition-colors">利用規約</Link>
                    <Link href="#" className="hover:text-white transition-colors">プライバシーポリシー</Link>
                    <Link href="#" className="hover:text-white transition-colors">お問い合わせ</Link>
                </div>
                
                <p className="text-[#5D5D5D] mt-8 tracking-wider">
                    &copy; 2026 nom2.jp All rights reserved.
                </p>
            </div>
        </footer>
    );
}
