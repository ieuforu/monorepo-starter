import { zValidator } from '@hono/zod-validator'
import { db, users } from '@repo/db'
import { insertUserSchema } from '@repo/validators'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

console.log(process.env.DATABASE_URL)

app.use('*', cors({ origin: 'http://localhost:3000' }))
app.use('*', async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
  console.log(`Status: ${c.res.status}`)
})

const routes = app.route(
  '/users',
  new Hono()
    .get('/', async (c) => c.json(await db.select().from(users)))
    .post('/', zValidator('json', insertUserSchema), async (c) => {
      try {
        const [res] = await db.insert(users).values(c.req.valid('json'))
        const [user] = await db.select().from(users).where(eq(users.id, res.insertId)).limit(1)
        return c.json({ success: true, data: user })
      } catch (e) {
        return c.json({ success: false, message: e }, 500)
      }
    }),
)

export type AppType = typeof routes
export type { InferRequestType, InferResponseType } from 'hono'

export default {
  port: 3001,
  fetch: app.fetch,
}
