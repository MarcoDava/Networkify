"use client"
import { useState } from "react"
import axios from "axios"
import ConnectionCard from "@/components/search/ConnectionCard"
import MessageModal from "@/components/messages/MessageModal"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [selectedContact, setSelectedContact] = useState<any>(null)

  const search = async () => {
    if (!query) return
    setLoading(true)
    const userId = localStorage.getItem("user_id") || ""
    const userName = localStorage.getItem("user_name") || ""
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/search/company`, {
        params: { company: query, user_id: userId, user_name: userName }
      })
      setResults(res.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Find Your Path</h1>
        <p className="text-gray-400 mt-1">Search a company to see who you know there and how to get in.</p>
      </div>

      <div className="flex gap-3">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && search()}
          placeholder="e.g. Google, Shopify, OpenAI..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button onClick={search} disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-40 transition">
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {results && (
        <div className="space-y-8">
          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Connections", value: results.total_connections },
              { label: "Direct (1st°)", value: results.first_degree_count },
              { label: "Recruiters Found", value: results.recruiters?.length || 0 },
            ].map(s => (
              <div key={s.label} className="bg-gray-900 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Recruiters */}
          {results.recruiters?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-yellow-400 mb-3">🎯 Recruiters at {results.company}</h2>
              <div className="space-y-3">
                {results.recruiters.map((c: any) => (
                  <ConnectionCard key={c.id} connection={c} onReach={() => setSelectedContact(c)} />
                ))}
              </div>
            </section>
          )}

          {/* Top connections */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Top Connections</h2>
            <div className="space-y-3">
              {results.top_connections.map((c: any) => (
                <ConnectionCard key={c.id} connection={c} onReach={() => setSelectedContact(c)} />
              ))}
            </div>
          </section>
        </div>
      )}

      {selectedContact && (
        <MessageModal
          contact={selectedContact}
          company={query}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  )
}
