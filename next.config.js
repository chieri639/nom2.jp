/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        // 画像最適化を有効化（unoptimized: true を削除）
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'thumbnail.image.rakuten.co.jp',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'nom2.jp',
                pathname: '/**',
            }
        ],
    },
    // キャッシュ戦略の最適化（1年間のキャッシュを指定）
    async headers() {
        return [
            {
                source: '/(images|fonts)/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    // STUDIOからの移行時にSEO資産（旧URLからの評価）を引き継ぐための301リダイレクト設定
    async redirects() {
        return [
            // 旧 /posts/* → /article/*
            {
                source: '/posts/:id',
                destination: '/article/:id',
                permanent: true,
            },
            // 旧 /brewery/brand/* → /brand/*
            {
                source: '/brewery/brand/:id',
                destination: '/brand/:id',
                permanent: true,
            },
            // 旧 /sake-reco → /similar（AIおすすめページ）
            {
                source: '/sake-reco',
                destination: '/similar',
                permanent: true,
            },
            // 旧 /recommend/* → /similar
            {
                source: '/recommend/:path*',
                destination: '/similar',
                permanent: true,
            },
            // 旧 /news/* → トップ
            {
                source: '/news/:path*',
                destination: '/',
                permanent: true,
            },
            // 旧 /event/* → トップ
            {
                source: '/event/:path*',
                destination: '/',
                permanent: true,
            },
            // 旧 /en → トップ（英語版なし）
            {
                source: '/en',
                destination: '/',
                permanent: true,
            },
            // 旧 /brewery/（空ID） → 酒蔵一覧
            {
                source: '/brewery/',
                destination: '/brewery',
                permanent: true,
            },
            // /brewery/(公式サイトなし) → 酒蔵一覧
            {
                source: '/brewery/:id',
                has: [{ type: 'query', key: 'id', value: '公式サイトなし' }],
                destination: '/brewery',
                permanent: true,
            },
            // リダイレクト.csv: 大文字IDの記事URL → 小文字の正規URL へ301
            { source: '/article/2R6bfvfo', destination: '/article/2r6bfvfo', permanent: true },
            { source: '/article/OuHuVCuy', destination: '/article/ouhuvcuy', permanent: true },
            { source: '/article/m-Dw1h1K', destination: '/article/m-dw1h1k', permanent: true },
            { source: '/article/l2IY5GPA', destination: '/article/l2iy5gpa', permanent: true },
            { source: '/article/NsmnVo9L', destination: '/article/nsmnvo9l', permanent: true },
            { source: '/article/zOVwGA55', destination: '/article/zovwga55', permanent: true },
            { source: '/article/tjXZfmhg', destination: '/article/tjxzfmhg', permanent: true },
            { source: '/article/Xqtesql-', destination: '/article/xqtesql-', permanent: true },
            { source: '/article/zBn9CcDu', destination: '/article/zbn9ccdu', permanent: true },
            { source: '/article/hVjhiFIg', destination: '/article/hvjhifig', permanent: true },
            { source: '/article/J8FDQjWc', destination: '/article/j8fdqjwc', permanent: true },
            { source: '/article/4nKbI2B6', destination: '/article/4nkbi2b6', permanent: true },
            { source: '/article/eG9e1cjp', destination: '/article/eg9e1cjp', permanent: true },
            { source: '/article/nByqilzM', destination: '/article/nbyqilzm', permanent: true },
            { source: '/article/zHscWODV', destination: '/article/zhscwodv', permanent: true },
            { source: '/article/hhpBxrJO', destination: '/article/hhpbxrjo', permanent: true },
        ];
    },
};

module.exports = nextConfig;

