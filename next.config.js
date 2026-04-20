/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
        return [];
    },
};

module.exports = nextConfig;
