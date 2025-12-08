from fastapi import Response
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User, UserRole
from app.schemas.user_schema import UserRegister, UserLogin, UserResponse
from app.security.auth_utils import hash_password, verify_password, create_access_token
from app.dependencies.roles import require_role
# from app.security.oauth2 import oauth2_scheme

router = APIRouter(prefix="/auth", tags=["Authentication"])


# -----------------------------
# REGISTER USER
# -----------------------------
@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserRegister, db: Session = Depends(get_db)):
    print(f"Register request: username={user.username}, email={user.email}, role={user.role}")

    # Validate role exists in Enum
    try:
        role_enum = UserRole(user.role.lower())
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid role '{user.role}'. Allowed roles: {[r.value for r in UserRole]}"
        )

    # Check email
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Check username
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    # Hash password
    hashed_pwd = hash_password(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pwd,
        role=role_enum,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# -----------------------------
# LOGIN USER
# -----------------------------
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Create JWT token
    token = create_access_token({
        "user_id": db_user.id,
        "role": db_user.role.value
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "username": db_user.username,
            "email": db_user.email,
            "role": db_user.role.value
        }
    }
#update user
@router.put("/users/{user_id}", dependencies=[Depends(require_role("admin"))], response_model=UserResponse)
def update_user(user_id: int, user_update: UserRegister, db: Session = Depends(get_db)):
    """
    Update an existing user's information
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )

    # Validate role exists in Enum
    try:
        role_enum = UserRole(user_update.role.lower())
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid role '{user_update.role}'. Allowed roles: {[r.value for r in UserRole]}"
        )

    # Check email uniqueness
    if db.query(User).filter(User.email == user_update.email, User.id != user_id).first():
        raise HTTPException(status_code=400, detail="Email already registered by another user")

    # Check username uniqueness
    if db.query(User).filter(User.username == user_update.username, User.id != user_id).first():
        raise HTTPException(status_code=400, detail="Username already taken by another user")

    # Update fields
    db_user.username = user_update.username
    db_user.email = user_update.email
    db_user.hashed_password = hash_password(user_update.password)
    db_user.role = role_enum

    db.commit()
    db.refresh(db_user)

    return db_user
#get all users
@router.get("/users/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    """
    Get all users
    """
    users = db.query(User).all()
    return users

#getsingle user
@router.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Get a specific user by ID
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )
    return db_user  

#delete user
@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Delete an existing user
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )

    db.delete(db_user)
    db.commit()
    #user deleted successfully
    print(f"User with id {user_id} deleted successfully")

    return Response(status_code=status.HTTP_204_NO_CONTENT)
