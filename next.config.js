/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true, // Render等での静的書き出しやImageタグ制約回避のため
    },
    // STUDIOからの移行時にSEO資産（旧URLからの評価）を引き継ぐための301リダイレクト設定
    async redirects() {
        return [
            /* 
             * 【設定例】
             * STUDIOの旧記事URLが /blog/how-to-drink
             * 新しいNext.jsのURLが /article/how-to-drink
             * の場合、以下のように記述するとSEOの評価が100%引き継がれます。
            {
                source: '/blog/how-to-drink',
                destination: '/article/how-to-drink',
                permanent: true, // true = HTTP 301 (SEOパワー引き継ぎ)
            },
            */
        ];
    },
};

module.exports = nextConfig;
