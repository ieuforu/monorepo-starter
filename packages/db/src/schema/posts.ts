import { mysqlTable, serial, varchar, int } from 'drizzle-orm/mysql-core'

export const posts = mysqlTable('posts', {
  id: serial('id').primaryKey(),
  content: varchar('content', { length: 255 }),
})
