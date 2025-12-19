'use client'

import React from 'react'
import { Button, Card, CardTitle, Skeleton, Separator } from '@repo/ui'
// 注意：如果 User 类型里没有 fullName，这里暂时用 any 或者修改你的 validator

export default function Home() {
  const [exampleData, setExampleData] = React.useState<any[] | null>(null)
  const [loading, setLoading] = React.useState(false)

  const handleRequest = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/demo/users')
      const data = await res.json()
      setExampleData(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 px-6 py-12 text-zinc-900 dark:text-zinc-50">
      <div className="mx-auto max-w-5xl">
        {/* Header: 极简主义设计 */}
        <header className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">
              Terminal <span className="text-zinc-400">Data</span>
            </h1>
            <p className="font-mono text-sm text-zinc-500 uppercase tracking-widest">
              Monorepo / Shadcn / Tailwind v4
            </p>
          </div>
          <Button
            onClick={handleRequest}
            disabled={loading}
            className="h-14 px-10 rounded-none border-2 border-zinc-900 bg-zinc-900 font-bold uppercase tracking-tighter hover:bg-white hover:text-zinc-900 transition-all dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
          >
            {loading ? 'FETCHING...' : 'SYNC DATABASE'}
          </Button>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-none bg-zinc-100" />
            ))}
          </div>
        ) : exampleData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-zinc-200 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-800">
            {exampleData.map((user) => (
              <Card
                key={user.id}
                className="rounded-none border-none bg-white p-6 transition-colors hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-tight">
                      Entry #{user.id.toString().padStart(3, '0')}
                    </p>
                    <CardTitle className="text-2xl font-bold tracking-tighter">
                      {user.fullName}
                    </CardTitle>
                  </div>
                  <div className="h-8 w-8 bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center">
                    <span className="text-white dark:text-zinc-900 font-bold text-xs">
                      {user.fullName.charAt(0)}
                    </span>
                  </div>
                </div>

                <Separator className="my-4 bg-zinc-100 dark:bg-zinc-800" />

                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex flex-col">
                    <span className="text-zinc-400 uppercase">Metric Value</span>
                    <span className={user.age > 0 ? 'text-blue-600' : 'text-red-600'}>
                      {user.age.toLocaleString()}
                    </span>
                  </div>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-bold uppercase text-[10px] tracking-widest"
                  >
                    Details →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="border-4 border-double border-zinc-200 p-20 text-center dark:border-zinc-800">
            <p className="font-mono text-zinc-400 animate-pulse">SYSTEM_IDLE: AWAITING_COMMAND</p>
          </div>
        )}
      </div>
    </main>
  )
}
