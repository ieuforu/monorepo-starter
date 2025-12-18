/** @type {import('next').NextConfig} */
const nextConfig = {
  // 这是解决 monorepo 模块找不到的核心配置之一
  transpilePackages: [
    '@repo/api',
    '@repo/auth',
    '@repo/db',
    '@repo/ui',
    '@repo/utils',
    '@repo/validators',
  ],
}
export default nextConfig
