/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['media.giphy.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**.giphy.com',
    //     pathname: '/**'
    //   }
    // ]
  }
}

module.exports = nextConfig
