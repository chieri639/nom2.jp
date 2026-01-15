/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // Optional: Only needed if you use next/image component, but safe to include
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
