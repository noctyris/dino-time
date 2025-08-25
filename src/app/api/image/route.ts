// app/api/image/route.ts
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url || !url.startsWith('https://')) {
    return new Response('Invalid URL', { status: 400 })
  }

  try {
    const imgRes = await fetch(url)
    if (!imgRes.ok) throw new Error('Image not found')

    const contentType = imgRes.headers.get('content-type') || 'image/png'
    const imgBuffer = await imgRes.arrayBuffer()

    return new Response(imgBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // 1 jour
      },
    })
  } catch {
    return new Response('Error fetching image', { status: 500 })
  }
}

