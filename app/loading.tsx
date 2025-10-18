export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <div className="text-center">
        <div className="animate-spin text-6xl mb-4">⏳</div>
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  )
}