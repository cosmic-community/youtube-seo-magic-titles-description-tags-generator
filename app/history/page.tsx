'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2, Eye, Calendar } from 'lucide-react'

interface HistoryItem {
  id: string
  topic: string
  language: string
  tone: string
  titleLength: string
  generated_data: any
  timestamp: number
}

export default function HistoryPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    setMounted(true)
    loadHistory()
  }, [])

  const loadHistory = () => {
    const stored = localStorage.getItem('generation_history')
    if (stored) {
      const parsed = JSON.parse(stored)
      setHistory(parsed.sort((a: HistoryItem, b: HistoryItem) => b.timestamp - a.timestamp))
    }
  }

  const handleView = (item: HistoryItem) => {
    // Restore this generation to results page
    localStorage.setItem('generated_content', JSON.stringify({ generated_data: item.generated_data }))
    localStorage.setItem('topic_form_data', JSON.stringify({
      topic: item.topic,
      language: item.language,
      tone: item.tone,
      titleLength: item.titleLength,
      keywords: ''
    }))
    router.push('/results')
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this generation?')) {
      const updated = history.filter(item => item.id !== id)
      setHistory(updated)
      localStorage.setItem('generation_history', JSON.stringify(updated))
    }
  }

  const handleClearAll = () => {
    if (confirm('Clear entire history? This cannot be undone.')) {
      setHistory([])
      localStorage.removeItem('generation_history')
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-4">
      <div className="max-w-5xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Generation History
              </h1>
              <p className="text-gray-600">
                {history.length} generation{history.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="btn-secondary text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No History Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Your generated content will appear here
            </p>
            <Link href="/generate" className="btn-primary inline-flex">
              Generate Your First Content
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.topic}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                        🌍 {item.language}
                      </span>
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded">
                        🎭 {item.tone}
                      </span>
                      <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">
                        📏 {item.titleLength}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.timestamp)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(item)}
                      className="btn-primary"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn-secondary text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}