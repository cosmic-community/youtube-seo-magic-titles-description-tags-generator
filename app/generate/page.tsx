'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type LanguageOption = 'English' | 'Hindi' | 'Hinglish'
type ToneOption = 'Casual' | 'Professional' | 'Funny' | 'Motivational'
type TitleLengthOption = 'Short ≤50' | 'Medium 50–80' | 'Long ≤90'

export default function GeneratePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  // Form state
  const [topic, setTopic] = useState('')
  const [language, setLanguage] = useState<LanguageOption>('English')
  const [tone, setTone] = useState<ToneOption>('Casual')
  const [titleLength, setTitleLength] = useState<TitleLengthOption>('Short ≤50')
  const [keywords, setKeywords] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    
    // Restore form data if available
    const savedData = localStorage.getItem('topic_form_data')
    if (savedData) {
      const data = JSON.parse(savedData)
      setTopic(data.topic || '')
      setLanguage(data.language || 'English')
      setTone(data.tone || 'Casual')
      setTitleLength(data.titleLength || 'Short ≤50')
      setKeywords(data.keywords || '')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!topic.trim()) {
      setError('Please enter a video topic')
      return
    }

    // Save form data
    const formData = {
      topic: topic.trim(),
      language,
      tone,
      titleLength,
      keywords: keywords.trim(),
    }

    localStorage.setItem('topic_form_data', JSON.stringify(formData))
    setIsLoading(true)

    try {
      // Generate content
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate content')
      }

      const data = await response.json()
      
      // Store generated data and redirect to results
      localStorage.setItem('generated_content', JSON.stringify(data))
      router.push('/results')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content')
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-4">
      <div className="max-w-3xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Generate SEO Content
          </h1>
          <p className="text-gray-600">
            Enter your video details and preferences
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card">
          {/* Topic Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Video Topic *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your video topic (e.g., How to bake chocolate cake)"
              className="input-field"
              required
            />
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageOption)}
              className="select-field"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Hinglish">Hinglish</option>
            </select>
          </div>

          {/* Tone Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3">
              Tone
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['Casual', 'Professional', 'Funny', 'Motivational'] as ToneOption[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`tone-button ${tone === t ? 'tone-button-active' : ''}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Title Length */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Title Length
            </label>
            <select
              value={titleLength}
              onChange={(e) => setTitleLength(e.target.value as TitleLengthOption)}
              className="select-field"
            >
              <option value="Short ≤50">Short ≤50 characters</option>
              <option value="Medium 50–80">Medium 50–80 characters</option>
              <option value="Long ≤90">Long ≤90 characters</option>
            </select>
          </div>

          {/* Keywords */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              Target Keywords (Optional)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter comma-separated keywords or leave blank"
              className="input-field"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full text-lg py-4"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Generating...
              </>
            ) : (
              <>
                Generate SEO Content 🔮
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}