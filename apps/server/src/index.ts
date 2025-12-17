import { Hono } from 'hono'
import { formatDate } from '@repo/utils'
import { db, posts } from '@repo/db'
import { users } from '@repo/db'

const app = new Hono()

app.use('*', async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
  console.log(`Status: ${c.res.status}`)
})

app.get('/', (c) => {
  return c.json({
    message: 'Hello from Hono API!',
    date: formatDate(new Date()),
  })
})

app.get('test/users', async (c) => {
  const data = await db.select().from(users)
  return c.json(data)
})

app.get('/test/posts', async (c) => {
  const data = db.select().from(posts)
})

export default {
  port: 3001,
  fetch: app.fetch,
}
