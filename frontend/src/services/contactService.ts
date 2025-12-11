/**
 * Contact Service
 * Handles all contact form API interactions
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

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
 * POST /api/contact/submit
 * Submit a contact form message
 */
export const submitContact = async (
  contactData: ContactFormData
): Promise<ContactResponse> => {
  try {
    const response = await fetch(`${API_URL}/contact/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to submit contact form");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

/**
 * GET /api/contact/
 * Get all contact submissions (for admin)
 */
export const getContacts = async (
  skip: number = 0,
  limit: number = 100
): Promise<ContactResponse[]> => {
  try {
    const response = await fetch(
      `${API_URL}/contact/?skip=${skip}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch contacts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

/**
 * GET /api/contact/{contact_id}
 * Get a specific contact submission
 */
export const getContact = async (
  contactId: number
): Promise<ContactResponse> => {
  try {
    const response = await fetch(`${API_URL}/contact/${contactId}`);
    if (!response.ok) throw new Error("Failed to fetch contact");
    return await response.json();
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
};

