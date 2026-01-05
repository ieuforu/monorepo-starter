import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from './schema'

/**
 * 将连接存储在全局对象上，防止 HMR 导致连接数溢出
 */
const globalForDb = globalThis as unknown as {
  conn: mysql.Pool | undefined
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const connection =
  globalForDb.conn ??
  mysql.createPool({
    uri: process.env.DATABASE_URL,
    connectionLimit: 10,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForDb.conn = connection
}

export const db = drizzle(connection, { schema, mode: 'default' })
