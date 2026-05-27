/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Vercelの無料枠上限に達したため、今月は最適化を完全に無効化して元の画像を直接配信する
        unoptimized: true,
        formats: ['image/webp'],
        deviceSizes: [640, 828, 1200, 1920],
        // fillプロパティ使用時はimageSizesは不要なので削除
        // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // 変換済み画像を1年間CDNにキャッシュ → 同じ画像は二度変換されない
        minimumCacheTTL: 60 * 60 * 24 * 365,
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
        ];
    },
};

module.exports = nextConfig;

