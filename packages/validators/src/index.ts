import { insertUserSchema as baseInsertUserSchema } from '@repo/db/schema'
import { z } from 'zod'

export const insertUserSchema = baseInsertUserSchema
  .extend({
    fullName: z.string().min(2, '名字太短啦'),
  })
  .pick({
    fullName: true,
    age: true,
  })

export type InsertUser = z.infer<typeof insertUserSchema>

export type { User } from '@repo/db/schema'
