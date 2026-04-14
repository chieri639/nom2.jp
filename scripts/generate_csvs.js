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

function cleanText(text) {
    if (!text || typeof text !== 'string') return text;
    return text
        .replace(/【nom[ 　]*×[ 　]*nom】/gi, '')
        .replace(/読み込まれました/g, '')
        .replace(/\(C\)2024 にほんしゅのむのむ　nom × nom/g, '')
        .replace(/^MENU\n/gm, '')
        .replace(/^HOME\n/gm, '')
        .replace(/^FOLLOW US\n/gm, '')
        .replace(/^商品一覧\n/gm, '')
        .replace(/^・\nBREWERY LIST\n・\n/gm, '')
        .replace(/^[ \t]+|[ \t]+$/gm, '') // trim spaces
        .replace(/\n{3,}/g, '\n\n') // remove excessive newlines
        .trim();
}

function processSake() {
    const data = JSON.parse(fs.readFileSync('src/data/extracted_sake.json', 'utf8'));
    const rows = data.map(item => ({
        id: (item.id || `sake-${Math.random().toString(36).substring(2, 10)}`).toLowerCase(),
        name: cleanText(item.name || ''),
        brewery: cleanText(item.brewery || ''),
        price: item.price || 0,
        description: cleanText(item.description || ''),
        imageUrl: item.image || '',
        oldId: item.id || ''
    }));
    fs.writeFileSync('src/data/import_sake.csv', jsToCSV(rows, ['id', 'name', 'brewery', 'price', 'description', 'imageUrl', 'oldId']));
    console.log(`Saved src/data/import_sake.csv (${rows.length} items)`);
}

function processArticles() {
    const data = JSON.parse(fs.readFileSync('src/data/extracted_articles.json', 'utf8'));
    const rows = data.map(item => ({
        id: (item.id || `article-${Math.random().toString(36).substring(2, 10)}`).toLowerCase(),
        title: cleanText(item.title || ''),
        category: cleanText(item.category || ''),
        content: cleanText(item.content || ''),
        imageUrl: item.image || '',
        oldId: item.id || ''
    }));
    fs.writeFileSync('src/data/import_article.csv', jsToCSV(rows, ['id', 'title', 'category', 'content', 'imageUrl', 'oldId']));
    console.log(`Saved src/data/import_article.csv (${rows.length} items)`);
}

function processBreweries() {
    const data = JSON.parse(fs.readFileSync('src/data/extracted_breweries.json', 'utf8'));
    const rows = data.map((item, i) => ({
        id: (item.id || `brewery-${i}`).toLowerCase(),
        name: cleanText(item.name || ''),
        content: cleanText(item.content || ''),
        imageUrl: item.image || '',
        oldId: item.id || ''
    }));
    fs.writeFileSync('src/data/import_brewery.csv', jsToCSV(rows, ['id', 'name', 'content', 'imageUrl', 'oldId']));
    console.log(`Saved src/data/import_brewery.csv (${rows.length} items)`);
}

function processBrands() {
    const data = JSON.parse(fs.readFileSync('src/data/extracted_brands.json', 'utf8'));
    const rows = data.map((item, i) => ({
        id: (item.id || `brand-${i}`).toLowerCase(),
        name: cleanText(item.name || ''),
        content: cleanText(item.content || ''),
        imageUrl: item.image || '',
        oldId: item.id || ''
    }));
    fs.writeFileSync('src/data/import_brand.csv', jsToCSV(rows, ['id', 'name', 'content', 'imageUrl', 'oldId']));
    console.log(`Saved src/data/import_brand.csv (${rows.length} items)`);
}

function processShops() {
    const data = JSON.parse(fs.readFileSync('src/data/extracted_shops.json', 'utf8'));
    const rows = data.map((item, i) => ({
        id: (item.id || `shop-${i}`).toLowerCase(),
        name: cleanText(item.name || ''),
        content: cleanText(item.content || ''),
        imageUrl: item.image || '',
        oldId: item.id || ''
    }));
    fs.writeFileSync('src/data/import_shop.csv', jsToCSV(rows, ['id', 'name', 'content', 'imageUrl', 'oldId']));
    console.log(`Saved src/data/import_shop.csv (${rows.length} items)`);
}

processSake();
processArticles();
processBreweries();
processBrands();
processShops();
console.log('All CSV files generated with lowercase ID columns!');
