import { posts } from './schema/posts'
import { users } from './schema/users'

export * from './schema/posts'
export * from './schema/users'

export { users, posts }

// 显式导出 Table 类型
export type UsersTable = typeof users
export type PostsTable = typeof posts

export { db } from './client'
