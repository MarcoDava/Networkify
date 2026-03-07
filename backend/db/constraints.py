"""Run once to set up Neo4j schema constraints and indexes."""
from db.neo4j_client import db

CONSTRAINTS = [
    "CREATE CONSTRAINT person_id IF NOT EXISTS FOR (p:Person) REQUIRE p.id IS UNIQUE",
    "CREATE CONSTRAINT company_name IF NOT EXISTS FOR (c:Company) REQUIRE c.name IS UNIQUE",
    "CREATE INDEX person_name IF NOT EXISTS FOR (p:Person) ON (p.name)",
    "CREATE INDEX person_title IF NOT EXISTS FOR (p:Person) ON (p.title)",
]

def setup_schema():
    for constraint in CONSTRAINTS:
        db.run(constraint)
    print("Schema ready.")

if __name__ == "__main__":
    setup_schema()
