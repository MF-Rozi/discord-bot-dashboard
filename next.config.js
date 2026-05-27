/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BOT_CLIENT_ID: process.env.BOT_CLIENT_ID,
  },
  async redirects() {
    return [
      { source: '/auth', destination: '/auth/signin', permanent: false },
      { source: '/user', destination: '/user/home', permanent: false },
      { source: '/', destination: '/user/home', permanent: false },
    ];
  },
  i18n: {
    locales: ['en', 'cn'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
