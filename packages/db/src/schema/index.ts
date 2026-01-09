// AUTO-GENERATED
import type { z } from 'zod'
import * as postTable from './post'
import * as projectTable from './project'
import * as userTable from './user'

export const schema = {
  ...postTable,
  ...projectTable,
  ...userTable,
}

export type { Post } from './post'
export { insertPostSchema, posts, selectPostSchema } from './post'
export type NewPost = z.infer<typeof postTable.insertPostSchema>

export type { Project } from './project'
export { insertProjectSchema, projects, selectProjectSchema } from './project'
export type NewProject = z.infer<typeof projectTable.insertProjectSchema>

export type { User } from './user'
export { insertUserSchema, selectUserSchema, users } from './user'
export type NewUser = z.infer<typeof userTable.insertUserSchema>
