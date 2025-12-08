from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.project import Project, ProjectStatus
from app.schemas.schemas import ProjectCreate, ProjectUpdate
from typing import List, Optional

def get_project(db: Session, project_id: int) -> Optional[Project]:
    """Get a single project by ID"""
    return db.query(Project).filter(Project.id == project_id).first()

def get_projects(db: Session, skip: int = 0, limit: int = 100) -> List[Project]:
    """Get all projects with pagination"""
    return db.query(Project).offset(skip).limit(limit).all()

def create_project(db: Session, project: ProjectCreate) -> Project:
    """Create a new project"""
    db_project = Project(
        name=project.name,
        description=project.description,
        status=project.status
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def update_project(db: Session, project_id: int, project: ProjectUpdate) -> Optional[Project]:
    """Update an existing project"""
    db_project = get_project(db, project_id)
    if not db_project:
        return None
    
    update_data = project.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_project, field, value)
    
    db.commit()
    db.refresh(db_project)
    return db_project

def delete_project(db: Session, project_id: int) -> bool:
    """Delete a project"""
    db_project = get_project(db, project_id)
    if not db_project:
        return False
    
    db.delete(db_project)
    db.commit()
    return True

def get_project_stats(db: Session) -> dict:
    """Get project statistics"""
    total = db.query(func.count(Project.id)).scalar()
    not_started = db.query(func.count(Project.id)).filter(
        Project.status == ProjectStatus.NOT_STARTED
    ).scalar()
    in_progress = db.query(func.count(Project.id)).filter(
        Project.status == ProjectStatus.IN_PROGRESS
    ).scalar()
    completed = db.query(func.count(Project.id)).filter(
        Project.status == ProjectStatus.COMPLETED
    ).scalar()
    
    return {
        "total_projects": total,
        "not_started": not_started,
        "in_progress": in_progress,
        "completed": completed
    }