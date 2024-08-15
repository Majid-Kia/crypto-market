/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.bitpin.ir",
        pathname: "/media/market/currency/**",
      },
      {
        protocol: "https",
        hostname: "cdn.bitpin.org",
        pathname: "/media/market/currency/**",
      },
    ],
  },
};

export default nextConfig;
//https://cdn.bitpin.ir/media/market/currency/1697373576.svg
