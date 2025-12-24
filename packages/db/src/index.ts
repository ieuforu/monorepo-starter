import { posts } from './schema/posts'
import { users } from './schema/users'

export * from './schema/posts'
export * from './schema/users'

export { users, posts }

export type UsersTable = typeof users
export type PostsTable = typeof posts

export { db } from './client'
