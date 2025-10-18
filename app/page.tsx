import { cosmic, hasStatus } from '@/lib/cosmic'
import { AppSettings, CosmicSingleResponse } from '@/types'
import Link from 'next/link'
import { Sparkles, Wand2, History, CreditCard } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getAppSettings(): Promise<AppSettings | null> {
  try {
    const response: CosmicSingleResponse<AppSettings> = await cosmic.objects
      .findOne({
        type: 'app-settings',
        slug: 'youtube-seo-magic-settings'
      })
      .props(['id', 'title', 'metadata'])
      .depth(0)

    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching settings:', error)
    return null
  }
}

export default async function HomePage() {
  const settings = await getAppSettings()
  
  const welcomeMessage = settings?.metadata?.welcome_message || 
    "Namaste! 👋 Main aapka YouTube SEO Magic Assistant hoon.\nBas topic bataiye — main aapko 3-4 SEO-friendly titles, ek perfect description aur 10 tags dunga.\nAap apni language (Hindi/English/Hinglish), tone aur title length customize kar sakte hain."

  const themeColor = settings?.metadata?.theme_color || '#8b5cf6'
  const appStatus = settings?.metadata?.app_status !== false

  if (!appStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
        <div className="max-w-2xl w-full text-center card">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔧 Maintenance Mode
          </h1>
          <p className="text-gray-600">
            The app is currently under maintenance. Please check back soon!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 p-4">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header with Navigation */}
        <div className="flex justify-end gap-4 mb-8">
          <Link
            href="/history"
            className="btn-secondary"
          >
            <History className="w-4 h-4" />
            History
          </Link>
          <Link
            href="/pricing"
            className="btn-secondary"
          >
            <CreditCard className="w-4 h-4" />
            Pricing
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Wand2 className="w-12 h-12" style={{ color: themeColor }} />
            <Sparkles className="w-8 h-8" style={{ color: themeColor }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            YouTube SEO Magic
          </h1>
          <p className="text-xl text-gray-600">
            Titles, Description & Tags Generator
          </p>
        </div>

        {/* Welcome Card */}
        <div className="card max-w-3xl mx-auto mb-8">
          <div className="text-lg text-gray-700 whitespace-pre-line mb-8">
            {welcomeMessage}
          </div>

          <Link
            href="/generate"
            className="btn-primary w-full text-lg py-4"
            style={{ backgroundColor: themeColor }}
          >
            Start Now 🚀
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="card text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">SEO Optimized</h3>
            <p className="text-sm text-gray-600">
              4 unique titles, description, and 10 relevant tags
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="font-semibold text-gray-900 mb-2">Multi-Language</h3>
            <p className="text-sm text-gray-600">
              English, Hindi, and Hinglish support
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-sm text-gray-600">
              Generate complete SEO content in seconds
            </p>
          </div>
        </div>

        {/* Additional Features */}
        {(settings?.metadata?.enable_chapters || settings?.metadata?.enable_intro_script) && (
          <div className="max-w-3xl mx-auto mt-8">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Advanced Features</h3>
              <div className="space-y-2 text-gray-600">
                {settings.metadata.enable_chapters && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧭</span>
                    <span>Video chapter generation</span>
                  </div>
                )}
                {settings.metadata.enable_intro_script && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎙️</span>
                    <span>Camera-ready intro scripts</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}