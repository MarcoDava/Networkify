from fastapi import APIRouter, Query
from db.neo4j_client import db
from services.graph.builder import make_id

router = APIRouter()

@router.get("/overview")
def get_graph_overview(user_id: str = Query(...)):
    """Returns the full graph for the network visualizer."""
    nodes = db.run("""
        MATCH (p:Person) WHERE p.id = $user_id OR EXISTS((p)-[:KNOWS]-(:Person {id: $user_id}))
        RETURN p LIMIT 200
    """, user_id=user_id)

    companies = db.run("""
        MATCH (:Person {id: $user_id})-[:KNOWS]->(p:Person)-[:WORKS_AT]->(c:Company)
        RETURN DISTINCT c
    """, user_id=user_id)

    return {"nodes": nodes, "companies": companies}

@router.get("/company/{company_name}")
def get_company_subgraph(company_name: str, user_id: str = Query(...)):
    """Returns the subgraph relevant to a specific company search."""
    result = db.run("""
        MATCH (u:Person {id: $user_id})-[:KNOWS]->(p:Person)-[:WORKS_AT]->(c:Company)
        WHERE toLower(c.name) CONTAINS toLower($company)
        RETURN u, p, c
        UNION
        MATCH (u:Person {id: $user_id})-[:KNOWS]->(bridge:Person)-[:KNOWS]->(p:Person)-[:WORKS_AT]->(c:Company)
        WHERE toLower(c.name) CONTAINS toLower($company)
        RETURN u, bridge as p, c
    """, user_id=user_id, company=company_name)
    return result
