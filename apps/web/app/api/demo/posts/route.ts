export async function GET(request: Request) {
  const res = await fetch('http://localhost:3001/test/posts')
  const data = await res.json()
  return Response.json(data)
}
