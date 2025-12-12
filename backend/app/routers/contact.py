from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.contact import Contact
from app.schemas.contact_schema import ContactCreate, ContactResponse

router = APIRouter()


@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    """
    Create a new contact submission
    """
    db_contact = Contact(
        name=contact.name,
        email=contact.email,
        message=contact.message
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact


@router.get("/", response_model=List[ContactResponse])
def get_contacts(
    offset: int = Query(0, ge=0, description="Number of contacts to skip"),
    limit: int = Query(10, ge=1, le=100, description="Maximum number of contacts to return"),
    db: Session = Depends(get_db)
):
    """
    Get all contact submissions with pagination
    """
    contacts = db.query(Contact).order_by(Contact.created_at.desc()).offset(offset).limit(limit).all()
    return contacts


@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    """
    Get a specific contact by ID
    """
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact with id {contact_id} not found"
        )
    return contact

