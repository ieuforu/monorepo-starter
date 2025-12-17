import { seed } from 'drizzle-seed'
import { db } from './client'
import * as schema from './schema'

async function main() {
  console.log('🌱 正在通过官方引擎进行极致 Seed...')

  // 1. 这一行代码会自动根据你的 Schema 填充数据
  // 它会自动识别 users 表里的 name, email 等字段并填充对应类型的假数据
  await seed(db, schema).refine((f) => ({
    user: {
      count: 50,
      columns: {
        name: f.fullName(),
        email: f.email(),
      },
    },
    // 如果你有 posts 表
    post: {
      count: 100,
    },
  }))

  console.log('🎉 官方 Seed 成功完成！')
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Seed 失败:', err)
  process.exit(1)
})
