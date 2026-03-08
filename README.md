# Networkify

<img width="944" height="753" alt="Screenshot 2026-03-08 041726" src="https://github.com/user-attachments/assets/d4cbffee-d349-49f4-985f-ec394d99cd0f" />

**Networkify** is a networking-powered job discovery platform that helps people find opportunities through their professional network instead of blindly applying to jobs. Unlike LinkedIn, which simply lists connections, Networkify transforms professional network data into an interactive graph that visualizes how people and companies are connected. This allows users to instantly see who they know at a company and identify the **strongest referral path** through first, second or third-degree connections to reach the right person.

---

## The Problem

Many Canadians struggle with the current job search process:

- Job seekers often send **dozens or hundreds of applications with little response**
- Many listings online are **ghost jobs that are not actively hiring**
- People frequently **do not realize they already know someone at a company**
- Networking outreach is usually **unstructured and ineffective**

As a result, job seekers spend significant time applying to roles without leveraging the **most powerful hiring mechanism: referrals**.

---

## Solution

Networkify converts professional connection data into a **visual relationship graph** that reveals hidden networking opportunities. By analyzing the structure of the network, the platform identifies the **most strategic path to a referral**, helping users connect with the right people instead of relying on cold applications.

---

## Key Features

### 🔗 Referral Path Engine
- Finds the strongest path to employees or recruiters at a target company  
- Supports **first second and third-degree connections**

### 🧠 Network Graph Visualization
- Interactive graph that visually maps relationships between people and companies, linked with basic profiles  
- Makes professional networks easier to explore and understand

### 🌍 Multi-Network Expansion
- Upload multiple connection datasets to expand and connect networks  
- Reveals hidden opportunities across different professional graphs

### ☕ AI Coffee Chat Assistant
- Generates personalized networking and introduction messages, ready to send through email

---

## Tech Stack

### Frontend
- Next.js  
- React  
- Tailwind CSS  

### Backend
- Python  
- FastAPI  

### Database
- Neo4j (Graph database for **People → Company** relationships)

### AI
- Gemini API

---

## Demo

**Link:**  
[Insert Demo Link Here]

---

## Sponsor Integrations

- **Google Antigravity**  
  The project was developed using Google's Antigravity IDE, which accelerated development by providing an integrated AI-powered coding environment for rapid prototyping and iteration.

- **Auth0**  
  Handles authentication and identity management, allowing users to securely log in and maintain protected profiles while ensuring sensitive data remains safe.

- **Gemini API**  
  Powers the AI Coffee Chat Assistant, generating personalized networking and introduction messages with a single click.

- **Tailscale**  
  Used for secure deployment and networking between services, ensuring safe and reliable communication across the application's infrastructure.
---

## Quick Start

```bash
# 1. Start Neo4j Database
docker-compose up -d neo4j

# 2. Start Python Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# 3. Start Next.js Frontend
cd frontend
npm install
npm run dev
