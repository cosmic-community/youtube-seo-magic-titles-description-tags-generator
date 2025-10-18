import { NextRequest, NextResponse } from 'next/server'
import { regenerateTitles } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, language, tone, titleLength } = body

    if (!topic || !language || !tone || !titleLength) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const titles = await regenerateTitles(topic, language, tone, titleLength)

    return NextResponse.json({ titles })
  } catch (error) {
    console.error('Title regeneration error:', error)
    return NextResponse.json(
      { error: 'Failed to regenerate titles' },
      { status: 500 }
    )
  }
}