import { useState, useCallback } from 'react';
import type { Project } from '../types';
import type { FormData } from '../types';
import {
  fetchProjects,
  createProject,
  updateProjectStatus,
  deleteProject,
} from '../services/projectService';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load projects';
      setError(errorMsg);
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProject = useCallback(
    async (formData: Omit<FormData, 'id'>) => {
      try {
        setError(null);
        const newProject = await createProject(formData);
        setProjects((prev) => [...prev, newProject]);
        return newProject;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to create project';
        setError(errorMsg);
        throw err;
      }
    },
    []
  );

  const updateStatus = useCallback(async (projectId: string, status: Project['status']) => {
    try {
      setError(null);
      const updated = await updateProjectStatus(projectId, status);
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? updated : p))
      );
      return updated;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update project';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const removeProject = useCallback(async (projectId: string) => {
    try {
      setError(null);
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete project';
      setError(errorMsg);
      throw err;
    }
  }, []);

  return {
    projects,
    loading,
    error,
    loadProjects,
    addProject,
    updateStatus,
    removeProject,
  };
};