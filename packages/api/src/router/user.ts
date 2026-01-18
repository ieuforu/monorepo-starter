import { insertUserSchema, users } from '@repo/db'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  current: publicProcedure.query(({ ctx }) => {
    return ctx.session?.user ?? null
  }),
  create: publicProcedure
    .input(insertUserSchema.pick({ fullName: true, age: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(users).values({
        fullName: input.fullName,
        age: input.age,
      })
      return { success: true }
    }),
})
