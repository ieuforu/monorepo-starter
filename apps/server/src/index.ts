import { zValidator } from '@hono/zod-validator'
import { db, posts, users } from '@repo/db'
import { formatDate } from '@repo/utils'
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

const routes = app
  .get('/', (c) => {
    return c.json({
      message: 'Hello from Hono API!',
      date: formatDate(new Date()),
    })
  })

  .get('test/users', async (c) => {
    const data = await db.select().from(users)
    return c.json(data)
  })

  .get('/test/posts', async (c) => {
    const data = db.select().from(posts)
    return c.json(data)
  })

  .post('/users', zValidator('json', insertUserSchema), async (c) => {
    const data = c.req.valid('json')

    try {
      const [result] = await db.insert(users).values(data)

      const newId = result.insertId

      const [insertedUser] = await db.select().from(users).where(eq(users.id, newId)).limit(1)

      return c.json({
        success: true,
        message: 'Data saved to MySQL',
        data: insertedUser,
      })
    } catch (error) {
      console.error('❌ Database Error:', error)
      return c.json({ success: false, message: 'Insert failed' }, 500)
    }
  })

export type AppType = typeof routes
export type { InferRequestType, InferResponseType } from 'hono'

export default {
  port: 3001,
  fetch: app.fetch,
}
