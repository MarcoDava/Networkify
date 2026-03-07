"""
Scores each connection by how warm/relevant they are for a specific target.
Higher score = better person to reach out to.
"""
from models.person import Person, UserProfile

RECRUITER_KEYWORDS = ["recruiter", "talent", "hiring", "hr", "people ops", "talent partner", "talent acquisition"]

def score_connection(user: UserProfile, candidate: dict, target_company: str) -> float:
    score = 0.0
    title = (candidate.get("title") or "").lower()
    company = (candidate.get("company") or "").lower()

    # 1. At target company right now (+0.40)
    if target_company.lower() in company:
        score += 0.40

    # 2. Is a recruiter at that company (+0.30 bonus on top)
    if any(kw in title for kw in RECRUITER_KEYWORDS):
        score += 0.30

    # 3. Shared previous companies with user (+0.10 each, max 0.20)
    past = [c.lower() for c in user.companies]
    if any(c in company for c in past):
        score += min(0.20, 0.10 * sum(1 for c in past if c in company))

    # 4. Shared schools (+0.10 each, max 0.10)
    schools = [s.lower() for s in user.schools]
    candidate_school = (candidate.get("school") or "").lower()
    if any(s in candidate_school for s in schools):
        score += 0.10

    # 5. 1st degree > 2nd degree (+0.10 bonus for direct)
    if candidate.get("degree", 2) == 1:
        score += 0.10

    return round(min(score, 1.0), 3)

def rank_connections(user: UserProfile, candidates: list[dict], target_company: str) -> list[dict]:
    for c in candidates:
        c["relevance_score"] = score_connection(user, c, target_company)
        c["is_recruiter"] = any(kw in (c.get("title") or "").lower() for kw in RECRUITER_KEYWORDS)
    return sorted(candidates, key=lambda x: x["relevance_score"], reverse=True)
