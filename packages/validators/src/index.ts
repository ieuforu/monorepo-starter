import { users } from '@repo/db'
import type { InferSelectModel } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const userSchema = createSelectSchema(users)

export const insertUserSchema = z.object({
  fullName: z.string().min(2, '名字太短啦'),
  age: z.number().min(0).max(150).optional(),
})

export type User = InferSelectModel<typeof users>
export type InsertUser = z.infer<typeof insertUserSchema>
