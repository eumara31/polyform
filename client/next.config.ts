import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true}
};

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*).(jpg|jpeg|png|css|js|woff2|woff|ttf|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
