import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useProjects } from '../hooks/useProjects';
import type { Project, FormData } from '../types';

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  loadProjects: () => Promise<void>;
  addProject: (formData: Omit<FormData, 'id'>) => Promise<Project>;
  updateStatus: (projectId: string, status: Project['status']) => Promise<Project>;
  removeProject: (projectId: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    projects,
    loading,
    error,
    loadProjects,
    addProject,
    updateStatus,
    removeProject,
  } = useProjects();

  const value: ProjectContextType = {
    projects,
    loading,
    error,
    loadProjects,
    addProject,
    updateStatus,
    removeProject,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within ProjectProvider');
  }
  return context;
};