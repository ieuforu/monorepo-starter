import { zValidator } from '@hono/zod-validator'
import { db, posts, users } from '@repo/db'
import { formatDate } from '@repo/utils'
import { insertUserSchema } from '@repo/validators'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

console.log(process.env.DATABASE_URL)
const routes = app
  .use(
    '*',
    cors({
      origin: 'http://localhost:3000',
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  .use('*', async (c, next) => {
    console.log(`[${c.req.method}] ${c.req.url}`)
    await next()
    console.log(`Status: ${c.res.status}`)
  })
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
    console.log('✅ Server 收到数据:', data)

    return c.json({
      success: true,
      message: 'Schema 自动同步测试成功！',
      received: data,
    })
  })

export type AppType = typeof routes
export type { InferRequestType, InferResponseType } from 'hono'

export default {
  port: 3001,
  fetch: app.fetch,
}
