import Image from 'next/image';

export default function Header() {
    return (
        <header className="fixed w-full top-0 left-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center">
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
            <button className="md:hidden text-[#1F1F1F]" aria-label="メニューを開く">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
        </header>
    );
}
