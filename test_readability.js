const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://nom2.jp/shop/tabibar', { waitUntil: 'networkidle2' });
    
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/Readability.js/0.4.4/Readability.min.js' }); // or we can bundle it
    // Note: Readability is often available as https://unpkg.com/@mozilla/readability/Readability.js
    
    const html = await page.evaluate(async () => {
        // Fetch raw readability because addScriptTag might fail if unpkg is blocked
        const src = await fetch('https://unpkg.com/@mozilla/readability/Readability.js').then(r => r.text());
        eval(src); // Load Readability object locally
        
        let article = new Readability(document.cloneNode(true)).parse();
        return article ? article.content : "FAILED";
    });
    
    console.log("Readability result:", html.substring(0, 500));
    await browser.close();
})();
