document.getElementById("sync").addEventListener("click", async () => {
  const stored = await chrome.storage.local.get("pending_connections")
  const count = (stored.pending_connections || []).length
  document.getElementById("status").innerText = count > 0 ? `Syncing ${count} connections...` : "Nothing pending."
  chrome.runtime.sendMessage({ type: "FLUSH" })
})
