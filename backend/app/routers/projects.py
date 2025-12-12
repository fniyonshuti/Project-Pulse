# from backend.app.auth import my_middleware
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.schemas import ProjectCreate, ProjectUpdate, ProjectResponse, ProjectStats
from app.controllers import crud
# from app.auth import my_middleware  
router = APIRouter(
    # dependencies=[Depends(my_middleware)]   
)

@router.get("/", response_model=List[ProjectResponse])
def get_all_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get all projects with optional pagination
    """
    projects = crud.get_projects(db, skip=skip, limit=limit)
    return projects

@router.get("/stats", response_model=ProjectStats)
def get_stats(db: Session = Depends(get_db)):
    """
    Get project statistics
    """
    stats = crud.get_project_stats(db)
    return stats

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """
    Get a specific project by ID
    """
    project = crud.get_project(db, project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found"
        )
    return project

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    """
    Create a new project
    """
    return crud.create_project(db, project)

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    """
    Update an existing project
    """
    updated_project = crud.update_project(db, project_id, project)
    if not updated_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found"
        )
    return updated_project

@router.patch("/{project_id}/status", response_model=ProjectResponse)
def update_project_status(
    project_id: int, 
    status: str = Query(..., description="New project status"),
    db: Session = Depends(get_db)
):
    """
    Update only the status of a project
    """
    from app.models.project import ProjectStatus
    
    try:
        project_status = ProjectStatus(status)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {[s.value for s in ProjectStatus]}"
        )
    
    project_update = ProjectUpdate(status=project_status)
    updated_project = crud.update_project(db, project_id, project_update)
    
    if not updated_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found"
        )
    return updated_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """
    Delete a project
    """
    success = crud.delete_project(db, project_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with id {project_id} not found"
        )
    return None