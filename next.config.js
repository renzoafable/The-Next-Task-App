/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/incomplete',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
