function collectConnectionsFromPage() {
  const cards = document.querySelectorAll(".mn-connection-card, .discover-entity-type-card")
  const connections = []
  cards.forEach(card => {
    const name = card.querySelector(".mn-connection-card__name, .discover-person-card__name")?.innerText?.trim()
    const title = card.querySelector(".mn-connection-card__occupation, .discover-person-card__occupation")?.innerText?.trim()
    const profileLink = card.querySelector("a[href*='/in/']")?.href
    if (name) connections.push({ name, title: title || "", profileUrl: profileLink || "", degree: 2, source: "extension" })
  })
  return connections
}

function collectProfilePage() {
  const name = document.querySelector("h1.text-heading-xlarge")?.innerText?.trim()
  const title = document.querySelector(".text-body-medium.break-words")?.innerText?.trim()
  if (!name) return null
  return { name, title, profileUrl: window.location.href, degree: 2, source: "extension" }
}

const isProfilePage = window.location.href.includes("/in/")
const data = isProfilePage ? collectProfilePage() : collectConnectionsFromPage()
if (data) chrome.runtime.sendMessage({ type: "CONNECTIONS_FOUND", data })
