import { mysqlTable, serial, varchar, int } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('posts', {
  id: serial('id').primaryKey(),
})
