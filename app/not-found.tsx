import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-emerald-50 flex items-center justify-center">
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm max-w-md w-full mx-4">
        <CardContent className="text-center py-12">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
            <p className="text-slate-500">The page you're looking for doesn't exist or has been moved.</p>
            <Link href="/">
              <Button className="mt-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
