import { auth } from '@repo/auth'
import { db } from '@repo/db'
import { initTRPC, TRPCError } from '@trpc/server'

export interface TRPCContext {
  db: typeof db
  session: Awaited<ReturnType<typeof auth>> | null
  headers: Headers
}

export const createTRPCContext = async (opts: { headers: Headers }): Promise<TRPCContext> => {
  const session = await auth()
  return { db, session, ...opts }
}

const t = initTRPC.context<TRPCContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  })
})
