const API_BASE_URL = 'http://localhost:8080/api';

export const getClubStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch club stats');
  }
  return await response.json();
};