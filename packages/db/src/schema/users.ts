import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  fullName: varchar('name', { length: 255 }).notNull(),
  age: int('age').notNull(),
})
