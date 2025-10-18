'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, ChevronUp, Copy, Download, RefreshCw } from 'lucide-react'
import { GeneratedContent } from '@/types'

export default function ResultsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [content, setContent] = useState<GeneratedContent | null>(null)
  const [formData, setFormData] = useState<any>(null)
  const [showJSON, setShowJSON] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Load generated content
    const savedContent = localStorage.getItem('generated_content')
    const savedFormData = localStorage.getItem('topic_form_data')
    
    if (!savedContent) {
      router.push('/generate')
      return
    }

    setContent(JSON.parse(savedContent))
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }
  }, [router])

  const handleCopyJSON = () => {
    if (!content) return
    
    navigator.clipboard.writeText(JSON.stringify(content, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadJSON = () => {
    if (!content) return
    
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `youtube-seo-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleAction = async (action: string) => {
    setSelectedAction(action)
    setIsLoading(true)

    try {
      if (action === 'regenerate-titles') {
        const response = await fetch('/api/regenerate-titles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        
        if (!response.ok) throw new Error('Failed to regenerate titles')
        
        const data = await response.json()
        const updatedContent = { ...content!, titles: data.titles }
        setContent(updatedContent)
        localStorage.setItem('generated_content', JSON.stringify(updatedContent))
      } else if (action === 'regenerate-all') {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        
        if (!response.ok) throw new Error('Failed to regenerate content')
        
        const data = await response.json()
        setContent(data.generated_data)
        localStorage.setItem('generated_content', JSON.stringify(data.generated_data))
      } else if (action === 'generate-chapters') {
        const response = await fetch('/api/generate-chapters', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        
        if (!response.ok) throw new Error('Failed to generate chapters')
        
        const data = await response.json()
        const updatedContent = { ...content!, chapters: data.chapters }
        setContent(updatedContent)
        localStorage.setItem('generated_content', JSON.stringify(updatedContent))
      } else if (action === 'generate-intro') {
        const response = await fetch('/api/generate-intro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        
        if (!response.ok) throw new Error('Failed to generate intro')
        
        const data = await response.json()
        const updatedContent = { ...content!, script_intro: data.script_intro }
        setContent(updatedContent)
        localStorage.setItem('generated_content', JSON.stringify(updatedContent))
      } else if (action === 'edit-preferences') {
        router.push('/generate')
        return
      }
    } catch (error) {
      console.error('Action error:', error)
      alert('Failed to complete action. Please try again.')
    } finally {
      setIsLoading(false)
      setSelectedAction(null)
    }
  }

  if (!mounted || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/generate" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Form
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Generated SEO Content
          </h1>
          <p className="text-gray-600">
            Your YouTube video optimization is ready!
          </p>
        </div>

        {/* Generated Content Display */}
        <div className="space-y-6 mb-8">
          {/* Titles */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📝 Video Titles
            </h2>
            <div className="space-y-3">
              {content.titles.map((title, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-700">{title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📄 Video Description
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-line text-gray-700">
              {content.description}
            </div>
          </div>

          {/* Tags */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🏷️ Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-primary-light bg-opacity-20 text-primary-dark rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              #️⃣ Hashtags
            </h2>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-primary-dark font-medium">
              {content.hashtags}
            </div>
          </div>

          {/* Chapters (if available) */}
          {content.chapters && content.chapters.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                🧭 Video Chapters
              </h2>
              <div className="space-y-2">
                {content.chapters.map((chapter, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="font-mono text-primary">{chapter.time}</span>
                    <span className="text-gray-700">{chapter.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Intro Script (if available) */}
          {content.script_intro && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                🎙️ Intro Script
              </h2>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-line text-gray-700">
                {content.script_intro}
              </div>
            </div>
          )}
        </div>

        {/* JSON Output (Collapsible) */}
        <div className="card mb-8">
          <button
            onClick={() => setShowJSON(!showJSON)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              📦 OUTPUT_V1_JSON
            </h2>
            {showJSON ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {showJSON && (
            <div className="mt-4">
              <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(content, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Action Menu */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What would you like to do next?
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            <button
              onClick={() => handleAction('regenerate-titles')}
              disabled={isLoading}
              className="btn-secondary justify-start"
            >
              {selectedAction === 'regenerate-titles' && isLoading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <span>🔁</span>
              )}
              Regenerate only Titles
            </button>
            
            <button
              onClick={() => handleAction('regenerate-all')}
              disabled={isLoading}
              className="btn-secondary justify-start"
            >
              {selectedAction === 'regenerate-all' && isLoading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <span>♻️</span>
              )}
              Regenerate Full Set
            </button>
            
            <button
              onClick={() => handleAction('edit-preferences')}
              disabled={isLoading}
              className="btn-secondary justify-start"
            >
              <span>✏️</span>
              Change Preferences
            </button>
            
            {!content.chapters && (
              <button
                onClick={() => handleAction('generate-chapters')}
                disabled={isLoading}
                className="btn-secondary justify-start"
              >
                {selectedAction === 'generate-chapters' && isLoading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <span>🧭</span>
                )}
                Generate Chapters
              </button>
            )}
            
            {!content.script_intro && (
              <button
                onClick={() => handleAction('generate-intro')}
                disabled={isLoading}
                className="btn-secondary justify-start"
              >
                {selectedAction === 'generate-intro' && isLoading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <span>🎙️</span>
                )}
                Generate Intro Script
              </button>
            )}
          </div>
        </div>

        {/* Export Section */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📦 Export Your Content
          </h2>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <p className="text-sm font-medium text-blue-900 mb-2">💡 SEO Tips:</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✅ Keep title under 70 characters</li>
              <li>✅ Place keywords early in description</li>
              <li>✅ Mix broad + long-tail tags</li>
              <li>✅ Add CTA in first 2 lines</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopyJSON}
              className="btn-secondary flex-1"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy All JSON'}
            </button>
            
            <button
              onClick={handleDownloadJSON}
              className="btn-secondary flex-1"
            >
              <Download className="w-4 h-4" />
              Download JSON
            </button>
            
            <Link
              href="/generate"
              className="btn-primary flex-1"
            >
              <RefreshCw className="w-4 h-4" />
              New Topic
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}