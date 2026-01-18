import { db, users } from '@repo/db'
import { describe, expect, it } from 'vitest'

describe('MySQL Integration Test', () => {
  it('应该能够成功插入数据', async () => {
    const testName = 'Isolation-Test'
    await db.insert(users).values({
      fullName: testName,
      age: 30,
    })

    const result = await db.select().from(users)
    expect(result.length).toBe(1)
  })
})
