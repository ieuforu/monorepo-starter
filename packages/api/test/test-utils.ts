import { db } from '@repo/db'
import { appRouter } from '../src/root'
import { createCallerFactory, type TRPCContext } from '../src/trpc'

const createCaller = createCallerFactory(appRouter)

export const createMockCaller = (session: TRPCContext['session'] = null) => {
  return createCaller({
    db,
    session,
    headers: new Headers(),
  })
}
