import { seed } from 'drizzle-seed'
import { db } from './client'
import * as schema from './schema'

async function main() {
  console.log('🌱 正在通过官方引擎进行极致 Seed...')

  // 1. 先清空旧数据（防止主键冲突）
  // 这里的 schema.posts 指向的就是你 export const posts
  await db.delete(schema.posts)
  await db.delete(schema.users)

  // 2. 运行自动化填充
  await seed(db, schema).refine((f) => ({
    users: {
      // 必须是 users (匹配变量名)
      count: 50,
      columns: {
        fullName: f.fullName(), // 必须是 fullName (匹配变量名)
        age: f.int({ minValue: 18, maxValue: 100 }), // 自动生成 18-100 的整数
      },
    },
    posts: {
      // 必须是 posts
      count: 100,
      columns: {
        content: f.loremIpsum({ sentencesCount: 1 }), // 生成一句随机内容
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
