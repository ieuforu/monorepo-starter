/** @type {import('next').NextConfig} */
const nextConfig = {
  // 这是解决 monorepo 模块找不到的核心配置之一
  transpilePackages: [
    '@repo/ui',
    '@repo/db',
    '@repo/auth',
    '@repo/api',
    '@repo/utils',
    '@repo/validators',
  ],
}
export default nextConfig
