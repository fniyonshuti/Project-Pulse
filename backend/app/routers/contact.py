from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.contact import Contact
from app.schemas.contact_schema import ContactCreate, ContactResponse

router = APIRouter()


# -----------------------------
# CREATE CONTACT SUBMISSION
# -----------------------------
@router.post("/submit", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    """
    Submit a contact form message
    """
    try:
        new_contact = Contact(
            name=contact.name,
            email=contact.email,
            message=contact.message,
        )

        db.add(new_contact)
        db.commit()
        db.refresh(new_contact)

        # Log successful submission
        print(f"✅ Contact submission saved to database:")
        print(f"   ID: {new_contact.id}")
        print(f"   Name: {new_contact.name}")
        print(f"   Email: {new_contact.email}")
        print(f"   Created at: {new_contact.created_at}")

        return new_contact
    except Exception as e:
        db.rollback()
        print(f"❌ Error saving contact submission: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit contact form: {str(e)}"
        )


# -----------------------------
# GET ALL CONTACT SUBMISSIONS (Optional - for admin)
# -----------------------------
@router.get("/", response_model=list[ContactResponse])
def get_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get all contact submissions (paginated)
    """
    contacts = db.query(Contact).order_by(Contact.created_at.desc()).offset(skip).limit(limit).all()
    total_count = db.query(Contact).count()
    print(f"📊 Retrieved {len(contacts)} contact submissions (Total in DB: {total_count})")
    return contacts


# -----------------------------
# GET SINGLE CONTACT SUBMISSION
# -----------------------------
@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    """
    Get a specific contact submission by ID
    """
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact with id {contact_id} not found"
        )
    return contact

