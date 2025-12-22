import { users } from '@repo/db'
import type { InferSelectModel } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

// 1. 运行时校验 (确保 Hono 不会报 "expected a Zod schema")
export const userSchema = createSelectSchema(users)

export const insertUserSchema = z.object({
  fullName: z.string().min(2, '名字太短啦'),
  age: z.number().min(0).max(150).optional(),
})

// 2. 静态类型推导 (直接从数据库表结构拿类型，100% 准确且不报 TS 错误)
export type User = InferSelectModel<typeof users>
export type InsertUser = z.infer<typeof insertUserSchema>
