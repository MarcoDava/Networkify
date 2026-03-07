from pydantic import BaseModel
from typing import Optional

class Company(BaseModel):
    name: str
    domain: Optional[str] = None
    industry: Optional[str] = None
    size: Optional[str] = None
    connection_count: int = 0
