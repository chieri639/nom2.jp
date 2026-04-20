'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function DelayedScripts() {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        // Fallback timeout just in case user does nothing but wait
        const timeoutId = setTimeout(() => {
            setShouldLoad(true);
        }, 3500);

        const handleInteraction = () => {
            setShouldLoad(true);
            // Remove listeners
            document.removeEventListener('scroll', handleInteraction);
            document.removeEventListener('mousemove', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
            clearTimeout(timeoutId);
        };

        document.addEventListener('scroll', handleInteraction, { once: true, passive: true });
        document.addEventListener('mousemove', handleInteraction, { once: true, passive: true });
        document.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
        document.addEventListener('keydown', handleInteraction, { once: true, passive: true });

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('scroll', handleInteraction);
            document.removeEventListener('mousemove', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };
    }, []);

    if (!shouldLoad) return null;

    return (
        <>
            {/* GTM & GA */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-KRD526KNEV"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-KRD526KNEV');
                `}
            </Script>
            
            {/* STORES.jp */}
            <Script id="storesjp-button-init" strategy="afterInteractive">
                {`(function(d,s,id){var st=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return;}var nst=d.createElement(s);nst.id=id;nst.src="//btn.stores.jp/button.js";nst.charset="UTF-8";st.parentNode.insertBefore(nst,st);})(document, "script", "storesjp-button");`}
            </Script>
        </>
    );
}
