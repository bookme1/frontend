/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        formats: ['image/webp'],
        domains: ['platform.elibri.com.ua'],
    },
    async headers() {
        return [
            {
                source: '/favicon.ico',
                headers: [
                    {
                        key: 'Link',
                        value: '/favicon.ico',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
