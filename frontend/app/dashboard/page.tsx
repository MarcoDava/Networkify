"use client"
import { useState } from "react"
import { Search, Waypoints, Building2, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const stats = [
    { label: "Total Connections", value: "847", change: "+12 this week" },
    { label: "Companies Mapped", value: "156", change: "Across your network" },
    { label: "Potential Paths", value: "2.4k", change: "2nd degree reach" },
  ]

  const topCompanies = [
    { name: "Google", count: 12, color: "bg-blue-500", textColor: "text-blue-400" },
    { name: "Microsoft", count: 8, color: "bg-brand-500", textColor: "text-brand-400" },
    { name: "Stripe", count: 5, color: "bg-purple-500", textColor: "text-purple-400" },
    { name: "Meta", count: 4, color: "bg-accent-cyan", textColor: "text-accent-cyan" },
    { name: "Amazon", count: 3, color: "bg-accent-amber", textColor: "text-accent-amber" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Network</h1>
          <p className="text-zinc-400">Discover paths to any company in your graph</p>
        </div>

        <div className="w-full lg:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search a company (e.g. Google)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery) {
                window.location.href = `/search?q=${searchQuery}`
              }
            }}
            className="input-field pl-12 pr-24"
          />
          {searchQuery && (
            <Link
              href={`/search?q=${searchQuery}`}
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary text-sm px-4 py-2"
            >
              Search
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6">
            <p className="text-sm text-zinc-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-zinc-500">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 min-h-[480px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Waypoints className="w-5 h-5 text-brand-400" />
              Network Graph
            </h2>
            <span className="badge bg-brand-500/10 text-brand-400 border border-brand-500/20">
              Neo4j Powered
            </span>
          </div>

          <div className="flex-1 bg-dark-bg/50 rounded-xl border border-dark-glassBorder flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full border border-dark-glassBorder" />
                <div className="absolute inset-8 rounded-full border border-dark-glassBorder" />
                <div className="absolute inset-16 rounded-full border border-dark-glassBorder" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center shadow-glow animate-pulse-slow">
                  <span className="text-white font-bold text-sm">You</span>
                </div>
                
                {[
                  { top: "10%", left: "50%", color: "bg-blue-500" },
                  { top: "30%", left: "85%", color: "bg-purple-500" },
                  { top: "70%", left: "80%", color: "bg-accent-cyan" },
                  { top: "85%", left: "45%", color: "bg-accent-emerald" },
                  { top: "65%", left: "15%", color: "bg-accent-amber" },
                  { top: "25%", left: "20%", color: "bg-accent-rose" },
                ].map((node, i) => (
                  <div
                    key={i}
                    className={`absolute w-4 h-4 rounded-full ${node.color} shadow-lg animate-float`}
                    style={{ 
                      top: node.top, 
                      left: node.left, 
                      transform: "translate(-50%, -50%)",
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
              <p className="text-sm text-zinc-500 bg-dark-bg/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                Interactive visualization coming soon
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent-emerald" />
              Top Opportunities
            </h2>
            <p className="text-sm text-zinc-500 mb-5">Companies with your strongest connections</p>

            <div className="space-y-3">
              {topCompanies.map((company, i) => (
                <Link
                  key={i}
                  href={`/search?q=${company.name}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-dark-bg/50 border border-dark-glassBorder hover:border-zinc-600 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${company.color}/10 flex items-center justify-center`}>
                      <Building2 className={`w-4 h-4 ${company.textColor}`} />
                    </div>
                    <span className="font-medium text-zinc-200 group-hover:text-white transition-colors">
                      {company.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                      <Users className="w-3.5 h-3.5" />
                      <span>{company.count}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-brand-400 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <Sparkles className="w-5 h-5 text-accent-amber" />
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
            </div>
            
            <div className="space-y-2 relative z-10">
              <Link
                href="/upload"
                className="btn-secondary w-full text-sm py-2.5"
              >
                Upload More Connections
              </Link>
              <Link
                href="/search?q=Google"
                className="btn-primary w-full text-sm py-2.5"
              >
                Find Path to Google
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
