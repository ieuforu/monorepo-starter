import { execSync } from 'node:child_process'
import { db } from '@repo/db'
import * as schema from '@repo/db/schema'
import { sql } from 'drizzle-orm'
import { beforeAll, beforeEach } from 'vitest'

beforeAll(() => {
  if (process.env.VITEST_WORKER_ID === '1') {
    console.log('--- 🛡️  Syncing Test Database (Master Sync) ---')
    try {
      execSync('pnpm --filter @repo/db db:push', { stdio: 'pipe' })
    } catch (e) {
      console.error('❌ Schema sync failed:', e)
      process.exit(1)
    }
  }
})

beforeEach(async () => {
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`)

  const tables = Object.values(schema).filter((s: any) => s?.constructor?.name === 'MySqlTable')

  await Promise.all(
    tables.map((table) => {
      const tableName = (table as any)[Symbol.for('drizzle:Name')]
      if (tableName) {
        return db.execute(sql.raw(`TRUNCATE TABLE \`${tableName}\``))
      }
      return Promise.resolve()
    }),
  )

  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`)
})
