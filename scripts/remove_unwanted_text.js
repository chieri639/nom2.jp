const fs = require('fs');
const path = require('path');

const filesToClean = [
    'import_shop.csv',
    'import_brand.csv',
    'import_brewery.csv',
    'import_article.csv',
    'import_sake.csv'
];

console.log("Starting text cleanup on CSVs...");

for (const file of filesToClean) {
    const filePath = path.join(__dirname, '..', 'src', 'data', file);
    if (!fs.existsSync(filePath)) continue;

    console.log(`Cleaning ${file}...`);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove unwanted text patterns natively across the entire CSV text
    const originalLength = content.length;
    content = content
        .replace(/読み込まれました/g, '')
        .replace(/【nom[ 　]*×[ 　]*nom】/g, '')
        .replace(/\{\{title\}\}/g, '');

    fs.writeFileSync(filePath, content, 'utf8');
    
    if (content.length !== originalLength) {
         console.log(`  -> Cleaned! Removed ${originalLength - content.length} unnecessary characters.`);
    } else {
         console.log(`  -> No unwanted tags found.`);
    }
}

console.log("\nAll CSVs have been quickly cleaned! You can now import them.");
