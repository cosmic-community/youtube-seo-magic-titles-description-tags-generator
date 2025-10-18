import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { generateSEOContent } from '@/lib/openai'
import { getUserSession, incrementGenerationCount, canGenerateMore } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, language, tone, titleLength, keywords } = body

    if (!topic || !language || !tone || !titleLength) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get settings for free tier limit
    const settingsResponse = await cosmic.objects.findOne({
      type: 'app-settings',
      slug: 'youtube-seo-magic-settings'
    }).props(['metadata'])

    const freeLimit = settingsResponse.object.metadata.free_tier_limit || 5

    // Check usage limits
    const session = getUserSession()
    if (!canGenerateMore(freeLimit)) {
      return NextResponse.json(
        { 
          error: `Daily limit reached (${freeLimit} topics/day). Please upgrade for unlimited access.`,
          limitReached: true 
        },
        { status: 429 }
      )
    }

    // Generate SEO content using OpenAI
    const generatedData = await generateSEOContent(
      topic,
      language,
      tone,
      titleLength,
      keywords
    )

    // Map language/tone/titleLength to select-dropdown format
    const languageMap: Record<string, { key: string; value: string }> = {
      'English': { key: 'en', value: 'English' },
      'Hindi': { key: 'hi', value: 'Hindi' },
      'Hinglish': { key: 'hinglish', value: 'Hinglish' },
    }

    const toneMap: Record<string, { key: string; value: string }> = {
      'Casual': { key: 'casual', value: 'Casual' },
      'Professional': { key: 'professional', value: 'Professional' },
      'Funny': { key: 'funny', value: 'Funny' },
      'Motivational': { key: 'motivational', value: 'Motivational' },
    }

    const titleLengthMap: Record<string, { key: string; value: string }> = {
      'Short ≤50': { key: 'short', value: 'Short ≤50' },
      'Medium 50–80': { key: 'medium', value: 'Medium 50–80' },
      'Long ≤90': { key: 'long', value: 'Long ≤90' },
    }

    // Save to Cosmic
    await cosmic.objects.insertOne({
      type: 'topics',
      title: topic,
      metadata: {
        topic,
        language: languageMap[language],
        tone: toneMap[tone],
        title_length: titleLengthMap[titleLength],
        target_keywords: keywords || '',
        generated_data: generatedData,
        user_id: session.userId,
      }
    })

    // Increment usage count
    incrementGenerationCount()

    return NextResponse.json({
      generated_data: generatedData,
      usage: {
        count: session.topicsGeneratedToday + 1,
        limit: freeLimit
      }
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}