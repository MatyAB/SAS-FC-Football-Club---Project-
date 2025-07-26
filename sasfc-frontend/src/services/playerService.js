const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getTeamPlayers = async (category) => {
  const response = await fetch(`${API_BASE_URL}/players?category=${category}`);
  if (!response.ok) throw new Error('Failed to fetch players');
  return await response.json();
};

export const getPlayerDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/players/${id}`);
  if (!response.ok) throw new Error('Failed to fetch player details');
  return await response.json();
};

export const getTopScorers = async () => {
  const response = await fetch(`${API_BASE_URL}/players/top-scorers`);
  if (!response.ok) throw new Error('Failed to fetch top scorers');
  return await response.json();
};

// Add these new functions for admin
export const getPlayers = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/players`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch players');
  return await response.json();
};

export const deletePlayer = async (id) => {
  const response = await fetch(`${API_BASE_URL}/admin/players/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete player');
  return await response.json();
};