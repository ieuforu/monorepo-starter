import { Button, Card } from '@repo/ui'
import { formatDate } from '@repo/utils'

export default function Home() {
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
    </main>
  )
}
