import { definePackageConfig } from '@repo/tsdown-config'

export default definePackageConfig({
  entry: ['./src/index.ts'],
  dts: {
    resolve: true,
  },
  external: ['@repo/db', 'drizzle-orm', 'drizzle-zod', 'zod'],
})
