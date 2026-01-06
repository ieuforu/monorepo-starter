import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  fullName: varchar('name', { length: 255 }).notNull(),
  age: int('age').notNull(),
})

export type UsersTable = typeof users
export type User = z.infer<typeof selectUserSchema>

export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
