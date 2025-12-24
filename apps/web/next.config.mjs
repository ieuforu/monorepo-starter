/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@repo/api',
    '@repo/auth',
    '@repo/db',
    '@repo/ui',
    '@repo/utils',
    '@repo/validators',
  ],
  compiler:{
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  }
}
export default nextConfig
