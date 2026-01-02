'use client'
import { Toaster } from '@repo/ui'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  )
}
