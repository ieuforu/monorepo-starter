import { definePackageConfig } from '@repo/tsdown-config'

export default definePackageConfig({
  entry: ['./src/index.ts', './src/client.ts', './src/schema/index.ts'],
  external: ['drizzle-orm', 'mysql2'],
})
