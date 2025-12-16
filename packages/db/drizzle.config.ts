import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: ['./src/schema/users.ts', './src/schema/posts.ts'],
  out: './src/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
