'use client'

import { Toaster } from '@repo/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import type React from 'react'
import { useState } from 'react'
import { trpc } from '../lib/trpc'

export function Providers({ children }: { children: React.ReactNode }) {
  // 1. 初始化 React Query 客户端（负责缓存和生命周期）
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000, // 数据 5 秒内被认为是新鲜的
          },
        },
      }),
  )

  // 2. 初始化 tRPC 客户端（负责定义如何连接到后端）
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // ⚠️ 确保这个端口号和你的 apps/server 保持一致
          url: 'http://localhost:3001/trpc',
        }),
      ],
    }),
  )

  return (
    // 3. 层层包裹：tRPC 必须在最外层，因为它要给 React Query 提供链接
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-center" />
      </QueryClientProvider>
    </trpc.Provider>
  )
}
