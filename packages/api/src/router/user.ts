import { createTRPCRouter, publicProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  current: publicProcedure.query(({ ctx }) => {
    return ctx.session?.user ?? null
  }),
})
