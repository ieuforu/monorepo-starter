import NextAuth from 'next-auth'
import { authConfig } from './config'

// biome-ignore lint/suspicious/noExplicitAny: NextAuth v5 type definitions are complex for manual destructuring
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig) as any
export { authConfig }
