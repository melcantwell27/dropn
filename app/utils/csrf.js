// utils/csrf.js

export const getCsrfToken = async () => {
    try {
      const response = await fetch('/api/csrf');
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {
      console.error('Error retrieving CSRF token:', error);
      return null;
    }
  };
  