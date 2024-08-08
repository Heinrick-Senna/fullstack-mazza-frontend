/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/signup',
        destination: '/login'
      }
    ];
  }
};

export default nextConfig;