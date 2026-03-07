interface Props {
  connection: {
    name: string
    title?: string
    company?: string
    degree: number
    relevance_score: number
    is_recruiter?: boolean
    bridge?: { name: string }
  }
  onReach: () => void
}

export default function ConnectionCard({ connection: c, onReach }: Props) {
  const scoreColor = c.relevance_score > 0.7 ? "text-green-400" : c.relevance_score > 0.4 ? "text-yellow-400" : "text-gray-400"
  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-4 flex items-center justify-between transition">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{c.name}</span>
          {c.is_recruiter && <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">Recruiter</span>}
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{c.degree}°</span>
        </div>
        <p className="text-sm text-gray-400">{c.title} {c.company ? `· ${c.company}` : ""}</p>
        {c.degree === 2 && c.bridge && <p className="text-xs text-gray-600">Via {c.bridge.name}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className={`text-sm font-semibold ${scoreColor}`}>{Math.round(c.relevance_score * 100)}%</div>
          <div className="text-xs text-gray-600">match</div>
        </div>
        <button onClick={onReach} className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition">
          Reach Out
        </button>
      </div>
    </div>
  )
}
