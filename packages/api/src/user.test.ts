import { db, users } from '@repo/db'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { createMockCaller } from '../test/test-utils'

describe('User Router Integration', () => {
  it('应该能通过 tRPC 写入数据库', async () => {
    const caller = createMockCaller(null)
    const testName = `Integration-Test-${Date.now()}`

    await caller.user.create({ fullName: testName, age: 28 })

    const [dbUser] = await db.select().from(users).where(eq(users.fullName, testName))

    expect(dbUser).toBeDefined()
    expect(dbUser?.fullName).toBe(testName)
    expect(dbUser?.age).toBe(28)
  })
})
