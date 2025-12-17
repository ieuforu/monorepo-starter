export async function GET() {
  const res = await fetch('http://127.0.0.1:3001/test/users', {
    cache: 'no-store',
  })

  if (!res.ok) {
    return Response.json({ error: 'Backend failed' }, { status: res.status })
  }

  const data = await res.json()
  return Response.json(data)
}
