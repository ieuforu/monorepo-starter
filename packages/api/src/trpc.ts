import { initTRPC, TRPCError } from '@trpc/server'
import { auth } from '@repo/auth'
import { db } from '@repo/db'

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth()
  return { db, session, ...opts }
}

const t = initTRPC.context<typeof createTRPCContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return next({ ctx: { ...ctx, session: ctx.session } })
})
