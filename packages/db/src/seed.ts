import { db } from './client'
import { users, posts } from './schema'
import { faker } from '@faker-js/faker'

function createFakeUsers(count: number = 50) {
  const fakeUsers = []
  for (let i = 0; i < count; i++) {
    fakeUsers.push({
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 70 }),
    })
  }
  return fakeUsers
}

function createFakePosts(count: number = 50) {
  const fakePosts = []
  for (let i = 0; i < count; i++) {
    fakePosts.push({
      content: faker.lorem.paragraph(),
    })
  }
  return fakePosts
}

async function main() {
  console.log('🌱 正在开始数据库 Seed 过程...')

  const fakeUsersData = createFakeUsers(50)
  const fakePostsData = createFakePosts(50)

  console.log('🔄 清空现有数据...')
  await db.delete(users)
  await db.delete(posts)

  try {
    console.log(`👤 正在插入 ${fakeUsersData.length} 条用户数据...`)
    const userResult = await db.insert(users).values(fakeUsersData)
    console.log(`✅ 用户插入完成。影响行数/ID信息:`, userResult)
  } catch (error) {
    console.error('❌ 插入用户数据失败:', error)
    process.exit(1)
  }

  try {
    console.log(`📝 正在插入 ${fakePostsData.length} 条帖子数据...`)
    const postResult = await db.insert(posts).values(fakePostsData)
    console.log(`✅ 帖子插入完成。影响行数/ID信息:`, postResult)
  } catch (error) {
    console.error('❌ 插入帖子数据失败:', error)
    process.exit(1)
  }

  console.log('🎉 数据库 Seed 成功完成！')
  process.exit(0)
}

main().catch((err) => {
  console.error('致命错误:', err)
  process.exit(1)
})
