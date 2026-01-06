import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const posts = mysqlTable('posts', {
  id: serial('id').primaryKey(),
  content: varchar('content', { length: 255 }),
})

export type PostsTable = typeof posts

export const insertPostSchema = createInsertSchema(posts)
export const selectPostSchema = createSelectSchema(posts)

export type Post = z.infer<typeof selectPostSchema>
