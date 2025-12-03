export type ProjectStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
}

export interface FormErrors {
  name?: string;
}

export interface FormData {
  name: string;
  description: string;
  status: ProjectStatus;
}