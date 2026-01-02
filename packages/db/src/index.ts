import type { z } from 'zod'
import type { insertPostSchema, insertUserSchema } from './schema'

export { db } from './client'
export * from './schema'

export type NewUser = z.infer<typeof insertUserSchema>
export type NewPost = z.infer<typeof insertPostSchema>
