import type { FormData, FormErrors } from '../types/index';

export const validateProjectForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Project name is required';
  }

  if (formData.name.trim().length > 100) {
    errors.name = 'Project name must be less than 100 characters';
  }

  return errors;
};

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0;
};