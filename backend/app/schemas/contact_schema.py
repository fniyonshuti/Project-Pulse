from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200, description="Contact name")
    email: EmailStr = Field(..., description="Contact email address")
    message: str = Field(..., min_length=1, max_length=5000, description="Contact message")


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

