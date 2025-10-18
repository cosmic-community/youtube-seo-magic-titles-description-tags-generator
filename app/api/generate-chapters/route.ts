import { NextRequest, NextResponse } from 'next/server'
import { generateChapters } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, language } = body

    if (!topic || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const chapters = await generateChapters(topic, language)

    return NextResponse.json({ chapters })
  } catch (error) {
    console.error('Chapter generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate chapters' },
      { status: 500 }
    )
  }
}