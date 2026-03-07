"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [userName, setUserName] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [result, setResult] = useState<any>(null)

  const handleUpload = async () => {
    if (!file || !userName) return
    setStatus("loading")
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload/csv?user_name=${encodeURIComponent(userName)}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      setResult(res.data)
      setStatus("done")
      localStorage.setItem("user_id", res.data.user_id)
      localStorage.setItem("user_name", userName)
    } catch (e) {
      setStatus("error")
    }
  }

  return (
    <div className="max-w-xl mx-auto py-24 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Upload Your Connections</h1>
        <p className="text-gray-400 mt-2">
          Export your CSV from LinkedIn → Settings → Data Privacy → Get a copy of your data
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Your name (as on LinkedIn)"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />

        <label className="block border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-xl p-10 text-center cursor-pointer transition">
          <input type="file" accept=".csv" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
          {file ? (
            <p className="text-blue-400 font-medium">{file.name}</p>
          ) : (
            <p className="text-gray-500">Drop your Connections.csv here or click to browse</p>
          )}
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || !userName || status === "loading"}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white py-3 rounded-lg font-medium transition"
        >
          {status === "loading" ? "Building graph..." : "Build My Network Graph"}
        </button>
      </div>

      {status === "done" && result && (
        <div className="bg-green-900/30 border border-green-700 rounded-xl p-6 space-y-3">
          <h2 className="font-semibold text-green-400">Graph built successfully!</h2>
          <p className="text-gray-300">{result.message}</p>
          <div className="flex gap-4 pt-2">
            <button onClick={() => router.push("/search")} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition">
              Search a Company →
            </button>
            <button onClick={() => router.push("/dashboard")} className="border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-lg text-sm transition">
              View Graph
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
