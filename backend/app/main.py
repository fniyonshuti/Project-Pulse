from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, Base
from app.routers import projects
from app.routers import users
from app.routers import contact
# Import models to ensure tables are created
from app.models.project import Project
from app.models.user import User
from app.models.contact import Contact
# from app.Middleware.auth import AuthMiddleware
# from fastapi.security import OAuth2PasswordBearer

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Project Pulse API",
    description="A simple project management dashboard API",
    version="1.0.0"
)
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Add authentication middleware
# app.add_middleware(AuthMiddleware)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Project Pulse API",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

