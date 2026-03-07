# LinkedIn PathFinder

Network smarter. Upload your LinkedIn connections, search a company, and find the warmest path in.

## Stack
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Python, FastAPI, Pandas
- **Database**: Neo4j (graph database)
- **AI**: OpenAI GPT-4
- **Enrichment**: Scrapfly (on-demand profile enrichment)
- **Extension**: Chrome Extension (2nd-degree traversal)

## Quick Start

```bash
# 1. Start Neo4j
docker-compose up -d neo4j

# 2. Start backend
cd backend && pip install -r requirements.txt && uvicorn main:app --reload

# 3. Start frontend
cd frontend && npm install && npm run dev

# 4. Load extension
# Chrome → Extensions → Load unpacked → select /extension
```

## How It Works

1. Export your LinkedIn connections CSV (LinkedIn → Settings → Data Privacy → Get a copy of your data)
2. Upload the CSV — app builds a graph of you, your connections, and their companies
3. Search a target company like "Google"
4. App finds all paths through your network, scores them by relevance, and drafts an outreach message

# HackCanada2026