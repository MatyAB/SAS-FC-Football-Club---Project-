const API_BASE_URL = process.env.REACT_APP_API_URL;

// Get all matches
export const getMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches`);
  if (!response.ok) throw new Error('Failed to fetch matches');
  return await response.json();
};

// Get upcoming matches
export const getUpcomingMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches?status=upcoming`);
  if (!response.ok) throw new Error('Failed to fetch upcoming matches');
  return await response.json();
};

// Get past matches
export const getPastMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches?status=past`);
  if (!response.ok) throw new Error('Failed to fetch past matches');
  return await response.json();
};

// Get single match
export const getMatch = async (id) => {
  const response = await fetch(`${API_BASE_URL}/matches/${id}`);
  if (!response.ok) throw new Error('Failed to fetch match');
  return await response.json();
};

// Create new match
export const createMatch = async (matchData) => {
  const response = await fetch(`${API_BASE_URL}/matches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: JSON.stringify(matchData)
  });
  if (!response.ok) throw new Error('Failed to create match');
  return await response.json();
};

// Update match
export const updateMatch = async (id, matchData) => {
  const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: JSON.stringify(matchData)
  });
  if (!response.ok) throw new Error('Failed to update match');
  return await response.json();
};

// Delete match
export const deleteMatch = async (id) => {
  const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete match');
  return await response.json();
};