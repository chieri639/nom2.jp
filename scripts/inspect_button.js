const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    await page.goto('https://nom2.jp/nihonshu', { waitUntil: 'networkidle2' });
    
    // Auto-scroll
    await page.evaluate(async () => {
        window.scrollBy(0, document.body.scrollHeight);
    });
    
    await new Promise(r => setTimeout(r, 2000));
    
    const htmls = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('a, button, div'));
        return els.filter(e => {
            const t = e.innerText ? e.innerText.toLowerCase() : '';
            return t.includes('read') || t.includes('もっと') || t.includes('load');
        }).map(e => e.outerHTML);
    });
    
    console.log('Button HTMLs:', htmls);

    await browser.close();
})();
