import type { Options } from 'tsdown'

export const baseConfig: Options = {
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: false,
  minify: false,
  outDir: 'dist',
  target: 'es2022',
}

export const definePackageConfig = (options: Options = {}): Options => {
  return {
    ...baseConfig,
    ...options,
  }
}
