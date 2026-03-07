import type { Metadata } from "next"
import Link from "next/link"
import { Waypoints, Upload, LayoutDashboard } from "lucide-react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pathfinder | Find Your Warmest Path to Any Company",
  description: "Upload your LinkedIn connections and discover hidden referral paths, rank contacts, and craft outreach messages with AI.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen relative">
        <div className="fixed inset-0 bg-dark-bg -z-30" />
        <div className="fixed inset-0 bg-grid-pattern opacity-40 -z-20" />
        <div className="fixed inset-0 bg-gradient-mesh -z-10" />

        <nav className="sticky top-0 z-50 border-b border-dark-glassBorder bg-dark-bg/60 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center shadow-glow">
                <Waypoints className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Pathfinder
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <Link 
                href="/upload" 
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white hover:bg-dark-elevated px-4 py-2 rounded-lg transition-all"
              >
                <Upload className="w-4 h-4" />
                Upload
              </Link>
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white hover:bg-dark-elevated px-4 py-2 rounded-lg transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="w-px h-6 bg-dark-glassBorder mx-2" />
              <button className="btn-primary text-sm px-4 py-2">
                Sign In
              </button>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="border-t border-dark-glassBorder mt-auto py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
            <p>Built for HackCanada 2026</p>
            <div className="flex items-center gap-4">
              <span className="badge bg-brand-500/10 text-brand-400 border border-brand-500/20">Neo4j</span>
              <span className="badge bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">Gemini</span>
              <span className="badge bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">FastAPI</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
