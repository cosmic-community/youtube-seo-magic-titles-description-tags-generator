import { NextRequest, NextResponse } from 'next/server'
import { generateIntroScript } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, language, tone } = body

    if (!topic || !language || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const script_intro = await generateIntroScript(topic, language, tone)

    return NextResponse.json({ script_intro })
  } catch (error) {
    console.error('Intro generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate intro script' },
      { status: 500 }
    )
  }
}