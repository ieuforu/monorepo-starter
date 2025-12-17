'use client'
import { Button, Card } from '@repo/ui'
import { formatDate } from '@repo/utils'
import React from 'react'

export default function Home() {
  const [exampleData, setExampleData] = React.useState<any>(null)
  const handleRequest = async () => {
    const res = await fetch('/api/demo/users')
    const data = await res.json()
    setExampleData(data)
  }
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-primary">Monorepo 运行成功!</h1>
      <p className="mt-2 text-muted-foreground">今天是: {formatDate(new Date())}</p>
      <Card className="mt-6 rounded-lg border border-border bg-secondary p-6">
        <p className="text-secondary-foreground">这是来自 @repo/ui 的 Card 组件</p>
        <Button className="mt-4 rounded-md bg-accent px-4 py-2 text-accent-foreground">
          来自 @repo/ui 的 Button
        </Button>
      </Card>
      <div>
        <h2 className="mt-8 text-2xl font-semibold text-primary">API 示例</h2>
        {exampleData && (
          <pre className="mt-4 rounded-md bg-muted p-4 text-sm">
            {JSON.stringify(exampleData, null, 2)}
          </pre>
        )}
        <Button
          className="mt-4 rounded-md bg-accent px-4 py-2 text-accent-foreground"
          onClick={handleRequest}
        >
          调用 /api/demo/users
        </Button>
      </div>
    </main>
  )
}
