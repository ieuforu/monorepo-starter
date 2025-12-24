import type { UserConfig } from 'tsdown'

const isProd = process.env.NODE_ENV === 'production'

export const baseConfig: UserConfig = {
  format: ['esm'],
  dts: true,
  clean: true,
  minify: isProd,
  outDir: 'dist',
  target: 'es2022',
  define: isProd
    ? {
        'console.log': '(() => {})',
      }
    : {},
}

export const definePackageConfig = (options: UserConfig = {}): UserConfig => {
  return {
    ...baseConfig,
    ...options,
  }
}
