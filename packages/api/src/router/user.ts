import { insertUserSchema, users } from '@repo/db'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  current: publicProcedure.query(({ ctx }) => {
    return ctx.session?.user ?? null
  }),
  create: publicProcedure
    .input(insertUserSchema.pick({ fullName: true, age: true }))
    .mutation(async ({ ctx, input }) => {
      const [result] = await ctx.db.insert(users).values({
        fullName: input.fullName,
        age: input.age,
      })

      if (!result.insertId) {
        throw new Error('Failed to insert user: No ID returned')
      }

      return {
        id: result.insertId,
        ...input,
        success: true,
      }
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(users)
  }),
})
