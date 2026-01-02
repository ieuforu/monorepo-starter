import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { posts } from './posts'
import { users } from './users'

export { users, posts }
export * from './posts'
export * from './users'

export type UsersTable = typeof users
export type PostsTable = typeof posts
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
export const insertPostSchema = createInsertSchema(posts)
export const selectPostSchema = createSelectSchema(posts)

export type User = z.infer<typeof selectUserSchema>
export type Post = z.infer<typeof selectPostSchema>
