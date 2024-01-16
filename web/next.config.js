/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "localhost", "api-movie-app.atirnayab.com"],
  },
  i18n,
};

module.exports = nextConfig;
