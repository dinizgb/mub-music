/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-api-mubmusic.crdps.xyz",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "prd-api-mubmusic.crdps.xyz",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wp.mubmusic.com",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
