import { Button, Card } from '@repo/ui'
import { formatDate } from '@repo/utils'

export default function Home() {
  return (
    <main>
      <h1>Monorepo run success!</h1>
      <Card style={{ padding: '1rem', border: '1px solid #ccc', marginTop: '1rem' }}>
        <p>这是来自 @repo/ui 的 Card 组件</p>
        <Button>来自 @repo/ui 的 Button</Button>
      </Card>
    </main>
  )
}
