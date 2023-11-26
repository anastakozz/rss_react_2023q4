/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["page.tsx", "api.ts"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.myshows.me",
        port: "",
        pathname: "/shows/**",
      },
    ],
  },
};

module.exports = nextConfig;