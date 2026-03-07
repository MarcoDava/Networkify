import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Network <span className="text-blue-400">Smarter</span>
        </h1>
        <p className="text-xl text-gray-400">
          Upload your LinkedIn connections. Find the warmest path to any company.
          Get an AI-crafted outreach message in seconds.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/upload" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition">
            Upload Connections →
          </Link>
          <Link href="/dashboard" className="border border-gray-600 hover:border-gray-400 px-6 py-3 rounded-lg font-medium transition">
            View Graph
          </Link>
        </div>
      </div>
    </main>
  )
}
