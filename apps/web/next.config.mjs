import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const pkgPath = join(__dirname, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))

const transpilePackages = Object.keys({
  ...pkg.dependencies,
  ...pkg.devDependencies,
}).filter((key) => key.startsWith('@repo/'))

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error'],
          }
        : false,
  },
}
export default nextConfig
