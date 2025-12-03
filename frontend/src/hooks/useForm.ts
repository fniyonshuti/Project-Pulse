import { useState, useCallback } from 'react';
import type { FormData, FormErrors } from '../types';
import { validateProjectForm, isFormValid } from '../utils/validation';

const initialFormData: FormData = {
  name: '',
  description: '',
  status: 'Not Started',
};

export const useForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
      // Clear error when user starts typing
      const errKey = field as unknown as keyof FormErrors;
      if (errors[errKey]) {
        setErrors(prev => ({
          ...prev,
          [errKey]: undefined,
        }));
      }
    },
    [errors]
  );

  const validate = useCallback((): boolean => {
    const newErrors = validateProjectForm(formData);
    setErrors(newErrors);
    return isFormValid(newErrors);
  }, [formData]);

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    handleChange,
    validate,
    reset,
    setFormData,
  };
};