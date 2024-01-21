/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Link",
            value: "/favicon.ico",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
