from fastapi import APIRouter, Query, Depends
from typing import Any, Dict
from services.graph.path_finder import find_paths_to_company
from services.scoring.relevance import rank_connections
from models.person import UserProfile
from api.routes.auth import get_current_user

router = APIRouter()


@router.get("/company")
def search_company(
    company: str = Query(...),
    user_companies: str = Query(""),  # comma-separated
    user_schools: str = Query(""),  # comma-separated
    current_user: dict = Depends(get_current_user),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
):
    """
    Search for connections at a specific company.
    User is authenticated via JWT - user_id extracted from token.
    """
    user_id = current_user["id"]
    user_name = current_user["name"] or current_user["email"].split("@")[0]

    user_profile = UserProfile(
        name=user_name,
        companies=[c.strip() for c in user_companies.split(",") if c.strip()],
        schools=[s.strip() for s in user_schools.split(",") if s.strip()],
    )

    paths = find_paths_to_company(user_id, company)

    candidates: list[Dict[str, Any]] = []

    # 1st degree
    for r in paths["first_degree"]:
        p: Dict[str, Any] = dict(r["p"])
        c = dict(r["c"])
        p["degree"] = 1
        p["company"] = c.get("name")
        candidates.append(p)

    # 2nd degree (single bridge)
    for r in paths["second_degree"]:
        p: Dict[str, Any] = dict(r["p"])
        c = dict(r["c"])
        p["degree"] = 2
        p["company"] = c.get("name")
        p["bridge"] = dict(r["bridge"])
        candidates.append(p)

    # 3rd degree (two bridges)
    for r in paths.get("third_degree", []):
        p: Dict[str, Any] = dict(r["p"])
        c = dict(r["c"])
        p["degree"] = 3
        p["company"] = c.get("name")
        p["bridge"] = dict(r["bridge1"])
        p["bridge2"] = dict(r["bridge2"])
        candidates.append(p)

    ranked = rank_connections(user_profile, candidates, company)
    start = (page - 1) * page_size
    end = start + page_size
    paginated_results = ranked[start:end]

    return {
        "company": company,
        "total_connections": len(ranked),
        "first_degree_count": len(paths["first_degree"]),
        "second_degree_count": len(paths["second_degree"]),
        "third_degree_count": len(paths.get("third_degree", [])),
        "recruiters": [c for c in ranked if c.get("is_recruiter")],
        "top_connections": paginated_results,
        "page": page,
        "page_size": page_size,
    }
