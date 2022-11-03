/* eslint-disable no-unused-vars */
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = {
  images: {
    domains: ["dev-api-mubmusic.crdps.xyz"],
  },
  i18n: {
    locales: ["eng", "US"],
    defaultLocale: "eng",
  },
  trailingSlash: true,
};
