// import { users } from '@repo/db/schema'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const projectRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    return [
      { id: 1, name: 'Turborepo Master', stars: 100 },
      { id: 2, name: 'Rust Codegen', stars: 999 },
    ]
    // return await ctx.db.select().from(users)
  }),
})
