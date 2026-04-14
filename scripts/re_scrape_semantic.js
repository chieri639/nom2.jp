const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

function jsToCSV(data, fields) {
    if (data.length === 0) return '';
    const header = fields.join(',') + '\n';
    const rows = data.map(item => {
        return fields.map(field => {
            let val = item[field] === undefined ? '' : String(item[field]);
            if (val.includes(',') || val.includes('"') || val.includes('\n')) {
                val = `"${val.replace(/"/g, '""')}"`;
            }
            return val;
        }).join(',');
    }).join('\n');
    return header + rows;
}

async function scrapeSemanticHtmlForFiles() {
    console.log("Starting Semantic HTML extraction...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    const categories = [
        { file: 'extracted_shops.json', type: 'shop', fields: ['id', 'name', 'content', 'imageUrl', 'oldId'] },
        { file: 'extracted_brands.json', type: 'brand', fields: ['id', 'name', 'content', 'imageUrl', 'oldId'] },
        { file: 'extracted_breweries.json', type: 'brewery', fields: ['id', 'name', 'content', 'imageUrl', 'oldId'] },
        { file: 'extracted_articles.json', type: 'article', fields: ['id', 'title', 'category', 'content', 'imageUrl', 'oldId'] },
        { file: 'extracted_sake.json', type: 'sake', fields: ['id', 'name', 'brewery', 'price', 'description', 'imageUrl', 'oldId'] }
    ];

    for (const cat of categories) {
        const filePath = path.join(__dirname, '..', 'src', 'data', cat.file);
        if (!fs.existsSync(filePath)) continue;

        console.log(`\n--- Processing ${cat.type} ---`);
        let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const outData = [];

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const url = item.url || `https://nom2.jp/${cat.type === 'sake' ? 'nihonshu' : cat.type}/${item.id}`;
            if (url.includes('/search') || url.includes('/category')) continue;

            console.log(`[${i+1}/${data.length}] Scraping: ${url}`);
            
            let htmlContent = '';
            try {
                await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
                await new Promise(r => setTimeout(r, 1000));
                
                htmlContent = await page.evaluate(() => {
                    function processNode(node) {
                        if (!node) return '';
                        if (node.nodeType === Node.TEXT_NODE) {
                            const text = node.textContent;
                            // Only return text if it's not totally empty
                            return text.trim() === '' ? text : text.replace(/読み込まれました/g, '').replace(/【nom[ 　]*×[ 　]*nom】/g, '');
                        }
                        if (node.nodeType !== Node.ELEMENT_NODE) return '';

                        const tag = node.tagName.toLowerCase();
                        
                        // Skip scripts, styles, and site navigation areas completely
                        if (['script', 'style', 'nav', 'header', 'footer', 'noscript', 'svg'].includes(tag)) return '';

                        // Format specific semantic tags elegantly
                        if (['h1','h2','h3','p'].includes(tag)) {
                            const inner = Array.from(node.childNodes).map(processNode).join('').trim();
                            if (inner && inner !== '・' && inner !== 'HOME' && !inner.includes('MENU LIST')) {
                                return `\n<${tag} style="margin-bottom: 1.5em; line-height: 1.8;">${inner}</${tag}>\n`;
                            }
                            return '';
                        }
                        
                        if (tag === 'br') return '<br/>';
                        
                        if (['ul', 'ol', 'table'].includes(tag)) {
                            // Strip problematic studio design classes and absolute styles from tables/lists
                            let cleanHtml = node.innerHTML.replace(/style="[^"]*"/g, '').replace(/class="[^"]*"/g, '');
                            return `\n<${tag} style="margin-bottom: 1.5em; width: 100%; border-collapse: collapse;">${cleanHtml}</${tag}>\n`;
                        }

                        if (tag === 'img') {
                            if (node.src && !node.src.includes('logo')) {
                                return `\n<img src="${node.src}" alt="${node.alt || '画像'}" style="max-width:100%; height:auto; margin-bottom: 1.5em; border-radius: 8px; display: block;" />\n`;
                            }
                            return '';
                        }
                        
                        if (tag === 'iframe') {
                            return `\n<iframe src="${node.src}" style="width:100%; height:400px; max-width:600px; border:none; margin-bottom:1.5em;" scrolling="no"></iframe>\n`;
                        }
                        
                        if (tag === 'a') {
                            const inner = Array.from(node.childNodes).map(processNode).join('').trim();
                            if (inner && !inner.includes('MENU LIST') && inner !== 'HOME' && !inner.includes('BREWERY LIST')) {
                                return `<a href="${node.href}" target="_blank" style="color:#2563eb; text-decoration:underline;">${inner}</a>`;
                            }
                            return '';
                        }

                        // For divs, spans, sections: just extract their children linearly
                        const children = Array.from(node.childNodes).map(processNode).join('');
                        return children;
                    }

                    // Look for the main container or fall back to body
                    let container = document.getElementById('app') || document.body;
                    let raw = processNode(container);
                    return raw.replace(/\n\s*\n/g, '\n').trim();
                });
                
            } catch (e) {
                console.log(`  Failed to fetch HTML for ${url}: ${e.message}`);
            }

            // Fallback if semantic extraction yields empty string
            if (!htmlContent || htmlContent.length < 10) {
                 htmlContent = item.content || item.description || '';
            }

            // Ensure ID is lowercase!
            let idLower = (item.id || `${cat.type}-${Math.random().toString(36).substring(2, 10)}`).toLowerCase();

            const row = {
                id: idLower,
                oldId: item.id || '',
                imageUrl: item.image || item.imageUrl || '',
            };

            if (cat.type === 'sake') {
                row.name = item.name || '';
                row.brewery = item.brewery || '';
                row.price = item.price || 0;
                row.description = htmlContent;
            } else if (cat.type === 'article') {
                row.title = item.title || item.name || '';
                row.category = item.category || 'nihonshu';
                row.content = htmlContent;
            } else {
                row.name = item.name || '';
                row.content = htmlContent;
            }

            outData.push(row);
        }

        const csvPath = path.join(__dirname, '..', 'src', 'data', `import_${cat.type}.csv`);
        fs.writeFileSync(csvPath, jsToCSV(outData, cat.fields), 'utf8');
        console.log(`Saved ${outData.length} safely parsed records to ${csvPath}`);
    }

    await browser.close();
    console.log('\nAll categories finished flawless semantic extraction!');
}

scrapeSemanticHtmlForFiles().catch(console.error);
