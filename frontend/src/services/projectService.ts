import type { Project, FormData } from '../types/index';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * GET /api/projects/
 * Get all projects
 */
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(`${API_URL}/projects/`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * POST /api/projects/
 * Create a new project
 */
export const createProject = async (
  projectData: Omit<FormData, 'id'>
): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/projects/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to create project');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * GET /api/projects/stats
 * Get project statistics
 */
export const getProjectStats = async () => {
  try {
    const response = await fetch(`${API_URL}/projects/stats`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

/**
 * GET /api/projects/{project_id}
 * Get a single project
 */
export const getProject = async (projectId: string): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch project');
    return await response.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

/**
 * PUT /api/projects/{project_id}
 * Update entire project
 */
export const updateProject = async (
  projectId: string,
  projectData: Omit<FormData, 'id'>
): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to update project');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

/**
 * DELETE /api/projects/{project_id}
 * Delete a project
 */
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to delete project');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

/**
 * PATCH /api/projects/{project_id}/status
 * Update project status only
 */
export const updateProjectStatus = async (
  projectId: string,
  status: Project['status']
): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/projects/${projectId}/status?status=${encodeURIComponent(status)}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to update project status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating project status:', error);
    throw error;
  }
};