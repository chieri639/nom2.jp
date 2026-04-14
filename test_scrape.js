const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://nom2.jp/shop/tabibar', { waitUntil: 'networkidle2' });
    const html = await page.evaluate(() => {
        return document.body.innerHTML;
    });
    console.log("Length:", html.length);
    await browser.close();
})();
