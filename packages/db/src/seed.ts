import { seed } from 'drizzle-seed'
import { db } from './client'
import * as schema from './schema'

async function main() {
  console.log('🌱 正在通过官方引擎进行极致 Seed...')

  await db.delete(schema.posts)
  await db.delete(schema.users)

  await seed(db, schema).refine((f) => ({
    users: {
      count: 50,
      columns: {
        fullName: f.fullName(),
        age: f.int({ minValue: 18, maxValue: 100 }),
      },
    },
    posts: {
      count: 100,
      columns: {
        content: f.loremIpsum({ sentencesCount: 1 }),
      },
    },
  }))

  console.log('🎉 官方 Seed 成功完成！')
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Seed 失败:', err)
  process.exit(1)
})
