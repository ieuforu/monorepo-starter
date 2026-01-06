import { trpcServer } from '@hono/trpc-server'
import { zValidator } from '@hono/zod-validator'
import { db, users } from '@repo/db'
import { insertUserSchema } from '@repo/validators'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { appRouter } from '../../../packages/api/src/root'
import { createTRPCContext } from '../../../packages/api/src/trpc'

const app = new Hono()

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  white: '\x1b[37m',
  dim: '\x1b[90m',
  bgBlue: '\x1b[44m\x1b[30m',
  bgGreen: '\x1b[42m\x1b[30m',
  bgYellow: '\x1b[43m\x1b[30m',
  bgRed: '\x1b[41m\x1b[30m',
  bgMagenta: '\x1b[45m\x1b[30m',
  cyan: '\x1b[36m',
}

const simpleLogger = (method: string, path: string, status: number, ms: number) => {
  const isTrpc = path.startsWith('/trpc/')
  const displayPath = isTrpc ? `⚡ ${path.replace('/trpc/', '')}` : path

  const mBg = method === 'GET' ? c.bgBlue : method === 'POST' ? c.bgGreen : c.bgMagenta
  const sBg = status >= 400 ? c.bgRed : c.bgGreen

  console.log(
    `${mBg} ${method.padEnd(4)} ${c.reset} ` +
      `${sBg} ${status} ${c.reset} ` +
      `${c.cyan}${displayPath.padEnd(35)}${c.reset} ` +
      `${c.dim}${ms}ms${c.reset}`,
  )
}

if (process.env.DATABASE_URL) {
  console.log(`\n${c.bgMagenta} DB ${c.reset} Connected to [web_dev]\n`)
}

app.use('*', cors({ origin: 'http://localhost:3000' }))

app.use('*', async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  simpleLogger(ctx.req.method, ctx.req.path, ctx.res.status, ms)
})

const routes = app.route(
  '/users',
  new Hono()
    .get('/', async (ctx) => ctx.json(await db.select().from(users)))
    .post('/', zValidator('json', insertUserSchema), async (ctx) => {
      try {
        const [res] = await db.insert(users).values(ctx.req.valid('json'))
        const [user] = await db.select().from(users).where(eq(users.id, res.insertId)).limit(1)
        return ctx.json({ success: true, data: user })
      } catch (e) {
        return ctx.json({ success: false, message: e }, 500)
      }
    }),
)

app.onError((err, ctx) => {
  console.error(`\n${c.bgRed} ERROR ${c.reset} ${err.message}`)
  return ctx.json({ error: err.message }, 500)
})

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: async (_opts, ctx) => {
      return await createTRPCContext({
        headers: ctx.req.raw.headers,
      })
    },
  }),
)

const port = 3001
console.log(`${c.bgGreen} DONE ${c.reset} Server running on port ${port}\n`)

export type AppType = typeof routes
export type { InferRequestType, InferResponseType } from 'hono'

export default {
  port,
  fetch: app.fetch,
}
