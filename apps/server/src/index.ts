import { Hono } from 'hono'
import { formatDate } from '@repo/utils'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    message: 'Hello from Hono API!',
    date: formatDate(new Date()),
  })
})

export default {
  port: 3001,
  fetch: app.fetch,
}
