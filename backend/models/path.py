from pydantic import BaseModel
from typing import Optional
from models.person import Person

class PathNode(BaseModel):
    person: Person
    relationship: str                   # "KNOWS", "WORKED_AT", "STUDIED_AT"

class NetworkPath(BaseModel):
    target_company: str
    nodes: list[PathNode]
    score: float
    path_length: int
    recommended_contact: Person
    outreach_message: Optional[str] = None
