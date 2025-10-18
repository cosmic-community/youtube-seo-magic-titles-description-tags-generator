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
    let freeLimit = 5
    try {
      const settingsResponse = await cosmic.objects.findOne({
        type: 'app-settings',
        slug: 'youtube-seo-magic-settings'
      }).props(['metadata'])

      freeLimit = settingsResponse.object.metadata.free_tier_limit || 5
    } catch (error) {
      console.error('Error fetching settings:', error)
      // Continue with default limit
    }

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
    let generatedData
    try {
      generatedData = await generateSEOContent(
        topic,
        language,
        tone,
        titleLength,
        keywords
      )
    } catch (error) {
      console.error('OpenAI generation error:', error)
      return NextResponse.json(
        { error: 'Failed to generate content. Please check your OpenAI API key configuration.' },
        { status: 500 }
      )
    }

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
      'Extra Short 20-50': { key: 'extra-short', value: 'Extra Short 20-50' },
      'Short ≤50': { key: 'short', value: 'Short ≤50' },
      'Medium 50–80': { key: 'medium', value: 'Medium 50–80' },
      'Long ≤90': { key: 'long', value: 'Long ≤90' },
    }

    // Save to Cosmic CMS
    try {
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
    } catch (error) {
      console.error('Cosmic save error:', error)
      // Continue even if save fails - user still gets the generated content
    }

    // Save to local history
    if (typeof window !== 'undefined') {
      const historyItem = {
        id: `gen_${Date.now()}`,
        topic,
        language,
        tone,
        titleLength,
        generated_data: generatedData,
        timestamp: Date.now()
      }
      
      const stored = localStorage.getItem('generation_history')
      const history = stored ? JSON.parse(stored) : []
      history.unshift(historyItem)
      
      // Keep only last 50 items
      if (history.length > 50) {
        history.splice(50)
      }
      
      localStorage.setItem('generation_history', JSON.stringify(history))
    }

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
      { error: 'Failed to generate content. Please try again or contact support if the problem persists.' },
      { status: 500 }
    )
  }
}