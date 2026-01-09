// AUTO-GENERATED

import { postRouter } from './router/post'
import { projectRouter } from './router/project'
import { userRouter } from './router/user'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  post: postRouter,
  project: projectRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
