import React from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';
import type { Project } from '../types';
import type { ProjectStatus } from '../types';

interface ProjectCardProps {
  project: Project;
  onStatusChange: (status: ProjectStatus) => void;
  onDelete: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onStatusChange,
  onDelete,
}) => {
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'Not Started':
        return <AlertCircle className="w-5 h-5" />;
      case 'In Progress':
        return <Clock className="w-5 h-5" />;
      case 'Completed':
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-blue-600">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
          <p className="text-gray-600 mb-3">{project.description}</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {getStatusIcon(project.status)}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={project.status}
            onChange={(e) => onStatusChange(e.target.value as ProjectStatus)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};