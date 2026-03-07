from pydantic import BaseModel
from typing import Optional

class Person(BaseModel):
    id: str
    name: str
    title: Optional[str] = None
    company: Optional[str] = None
    email: Optional[str] = None
    profile_url: Optional[str] = None
    connected_on: Optional[str] = None
    degree: int = 1                     # 1 = direct connection, 2 = friend-of-friend
    is_recruiter: bool = False
    relevance_score: float = 0.0
    enriched: bool = False

class UserProfile(BaseModel):
    name: str
    title: Optional[str] = None
    companies: list[str] = []           # All past + current companies
    schools: list[str] = []             # Education
    skills: list[str] = []
