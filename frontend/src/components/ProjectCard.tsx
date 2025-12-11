import React from 'react';
import { Trash2 } from 'lucide-react';
import type { ProjectStatus, Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onStatusChange: (status: ProjectStatus) => void;
  onDelete: () => void;
  canEdit?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onStatusChange, onDelete, canEdit = false }) => {
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Not Started':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 border border-gray-200 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{project.description}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(project.status)}`}>
          {project.status}
        </span>

        {canEdit ? (
          <div className="flex items-center gap-2">
            <select
              value={project.status}
              onChange={(e) => onStatusChange(e.target.value as ProjectStatus)}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 transition"
              title="Delete project"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-xs text-gray-500 italic">
            View only
          </div>
        )}
      </div>
    </div>
  );
};
