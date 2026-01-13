'use client';

import { useEffect } from 'react';
import SakeRecoPage from './sake-reco/SakeRecoPage';

export default function Home() {
    useEffect(() => {
        let startX = 0;
        let startY = 0;

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            const dx = Math.abs(e.touches[0].clientX - startX);
            const dy = Math.abs(e.touches[0].clientY - startY);
            if (dx > dy + 2) e.preventDefault();
        };

        document.addEventListener('touchstart', onTouchStart, { passive: true });
        document.addEventListener('touchmove', onTouchMove, { passive: false });

        return () => {
            document.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchmove', onTouchMove as any);
        };
    }, []);

    return <SakeRecoPage />;
}
