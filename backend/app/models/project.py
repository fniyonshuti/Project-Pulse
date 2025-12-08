from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func
from app.db.database import Base
import enum

# ----------------------------
# Enum
# ----------------------------

class ProjectStatus(str, enum.Enum):
    NOT_STARTED = "Not Started"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"


# ----------------------------
# Project Model
# ----------------------------

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(String, nullable=True)
    status = Column(
        SQLEnum(ProjectStatus),
        default=ProjectStatus.NOT_STARTED,
        nullable=False
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Project(id={self.id}, name='{self.name}', status='{self.status}')>"
