/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.ENV_MEDIA_ROOT_PATH,
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
