import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle, Loader } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ProjectForm } from './ProjectForm';
import { useProjectContext } from '../context/ProjectContext';
import { useForm } from '../hooks/useForm';
import type { ProjectStatus } from '../types';
import { getProjectStats } from '../services/projectService';

interface Stats {
  total: number;
  completed: number;
  in_progress: number;
  not_started: number;
}

export const Dashboard: React.FC = () => {
  const { projects, error, loading, addProject, updateStatus, removeProject, loadProjects } =
    useProjectContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const { formData, errors, handleChange, validate, reset } = useForm();

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Load stats on mount and when projects change
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
      await addProject({
        name: formData.name,
        description: formData.description,
        status: formData.status,
      });
      reset();
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (projectId: string, newStatus: ProjectStatus) => {
    try {
      await updateStatus(projectId, newStatus);
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await removeProject(projectId);
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back!</h1>
        
        {/* Stats Grid */}
        {statsLoading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader className="w-5 h-5 animate-spin" />
            <span>Loading statistics...</span>
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Total Projects</p>
              <p className="text-3xl font-bold text-gray-600">{projects.length}</p>
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
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

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-8 flex items-center gap-2">
          <Loader className="w-5 h-5 flex-shrink-0 animate-spin" />
          Loading projects...
        </div>
      )}

      {/* Add Project Button */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        disabled={isLoading}
        className="mb-8 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition"
      >
        <Plus className="w-5 h-5" /> Add New Project
      </button>

      {/* Add Project Form */}
      {showAddForm && (
        <ProjectForm
          formData={formData}
          errors={errors}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowAddForm(false);
            reset();
          }}
          onChange={handleChange}
          isLoading={isLoading}
        />
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 && !loading ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg">No projects yet. Create one to get started!</p>
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onStatusChange={(status) => handleStatusChange(project.id, status)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};