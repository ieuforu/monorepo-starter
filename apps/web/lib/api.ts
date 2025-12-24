import { hc } from '@repo/api'
import type { AppType } from '@repo/server'

export const client = hc<AppType>('http://localhost:3001')
