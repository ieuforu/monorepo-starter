import type { auth } from '@repo/auth'
import { db } from '@repo/db'
import { initTRPC, TRPCError } from '@trpc/server'

export type TRPCContext = {
  db: typeof db
  session: Awaited<ReturnType<typeof auth>> | null
  headers: Headers
}

export const createTRPCContext = async (opts: { headers: Headers }): Promise<TRPCContext> => {
  try {
    // TODO: Enable auth when ready
    // const session = await auth()
    const session = null

    return { db, session, ...opts }
  } catch (e) {
    console.error('❌ Error in createTRPCContext:', e)
    throw e
  }
}
const t = initTRPC.context<TRPCContext>().create()

export const createTRPCRouter = t.router
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
export const createCallerFactory = t.createCallerFactory
