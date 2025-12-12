from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Contact name")
    email: EmailStr = Field(..., description="Contact email")
    message: str = Field(..., min_length=1, max_length=2000, description="Contact message")


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

