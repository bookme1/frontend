/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "platform.elibri.com.ua",
        port: "",
      },
    ],
  },
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
