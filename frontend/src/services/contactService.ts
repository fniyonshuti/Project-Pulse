const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

/**
 * POST /api/contact/
 * Submit a contact form
 */
export const submitContact = async (contactData: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await fetch(`${API_URL}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to submit contact form';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use default message
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting contact:', error);
    throw error;
  }
};

/**
 * GET /api/contact/
 * Get contact submissions with pagination
 */
export const getContacts = async (offset: number = 0, limit: number = 10): Promise<ContactResponse[]> => {
  try {
    const response = await fetch(`${API_URL}/contact/?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

