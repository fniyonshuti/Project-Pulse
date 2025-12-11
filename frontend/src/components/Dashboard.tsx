import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle, Loader, Edit2, LogOut } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ProjectForm } from './ProjectForm';
import { useProjectContext } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { getProjectStats, updateProject } from '../services/projectService';
import type { Page } from '../pages';

interface Stats {
  total: number;
  completed: number;
  in_progress: number;
  not_started: number;
}

interface DashboardProps {
  onNavigate?: (page: Page) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { projects, error, loading, addProject, updateStatus, removeProject, loadProjects } =
    useProjectContext();
  const { isAdmin, user, logout } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const { formData, errors, handleChange, validate, reset, setFormData } = useForm();

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Load stats
  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const data = await getProjectStats();
        setStats(data);
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, [projects]);

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      if (editingProjectId) {
        // Update existing project
        await updateProject(editingProjectId, {
          name: formData.name,
          description: formData.description,
          status: formData.status,
        });
        setEditingProjectId(null);
        await loadProjects(); // Refresh projects list
      } else {
        // Add new project
        await addProject({
          name: formData.name,
          description: formData.description,
          status: formData.status,
        });
        setShowAddForm(false);
      }
      reset();
    } catch (err) {
      console.error('Error submitting project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (project: any) => {
    setEditingProjectId(project.id);
    setFormData({
      name: project.name,
      description: project.description || '',
      status: project.status,
    });
    setShowAddForm(false); // Close add form if open
    // Scroll to the project being edited after a short delay
    setTimeout(() => {
      const element = document.getElementById(`project-${project.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    reset();
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    reset();
  };

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back{user ? `, ${user.username}` : ''}!
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
        {isAdmin && (
          <p className="text-sm text-blue-600 font-medium mb-4">
             Admin Mode: You have full access to edit and manage projects
          </p>
        )}
        {!isAdmin && (
          <p className="text-sm text-gray-600 mb-4">
            View-only mode: Only admins can edit projects
          </p>
        )}

        {/* Stats */}
        {statsLoading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader className="w-5 h-5 animate-spin" /> Loading statistics...
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Total Projects</p>
              <p className="text-3xl font-bold text-fuchsia-500">{projects.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.in_progress}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Not Started</p>
              <p className="text-3xl font-bold text-gray-600">{stats.not_started}</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-8 flex items-center gap-2">
          <Loader className="w-5 h-5 flex-shrink-0 animate-spin" /> Loading projects...
        </div>
      )}

      {/* Add Project Button - Only visible to admins */}
      {isAdmin && (
        <button
          onClick={() => {
            reset();
            setShowAddForm(!showAddForm);
            setEditingProjectId(null);
          }}
          disabled={isLoading}
          className="mb-8 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" /> Add New Project
        </button>
      )}

      {/* Add Project Form - Only shown at top when adding */}
      {showAddForm && !editingProjectId && (
        <div className="mb-8">
          <ProjectForm
            formData={formData}
            errors={errors}
            onSubmit={handleSubmit}
            onCancel={handleCancelAdd}
            onChange={handleChange}
            isLoading={isLoading}
            isEdit={false}
          />
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 && !loading ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg">No projects yet. Create one to get started!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} id={`project-${project.id}`}>
              <div className="relative">
                <ProjectCard
                  project={project}
                  onStatusChange={(status) => updateStatus(project.id, status)}
                  onDelete={() => removeProject(project.id)}
                  canEdit={isAdmin}
                />
                {isAdmin && !editingProjectId && (
                  <button
                    onClick={() => handleEditClick(project)}
                    className="absolute top-2 right-2 bg-yellow-400 hover:bg-yellow-500 text-white p-1 rounded-md shadow-md transition hover:scale-110 z-10"
                    title="Edit project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Inline Edit Form - Shows right below the project being edited */}
              {editingProjectId === project.id && (
                <div className="mt-4 animate-fade-in">
                  <ProjectForm
                    formData={formData}
                    errors={errors}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelEdit}
                    onChange={handleChange}
                    isLoading={isLoading}
                    isEdit={true}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
