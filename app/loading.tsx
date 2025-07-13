export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-emerald-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full animate-pulse mx-auto"></div>
        <p className="text-slate-600">Loading wallet information...</p>
      </div>
    </div>
  )
}
