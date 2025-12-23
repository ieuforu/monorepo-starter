import { definePackageConfig } from '@repo/tsdown-config'

export default definePackageConfig({
  entry: ['./src/index.ts', './src/root.ts'],
  external: ['@trpc/server'],
})
