const API_BASE_URL = "http://localhost:8080/api";

// Get all matches
export const getMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/matches`);
  if (!response.ok) throw new Error('Failed to fetch matches');
  return await response.json();
};

// Get upcoming matches (client-side filter)
export const getUpcomingMatches = async () => {
  const all = await getMatches();
  const now = new Date();
  return all
    .filter(m => (m.status === 'SCHEDULED') && m.matchDateTime && !isNaN(new Date(m.matchDateTime)))
    .filter(m => new Date(m.matchDateTime) > now)
    .sort((a, b) => new Date(a.matchDateTime) - new Date(b.matchDateTime));
};

// Get past matches (client-side filter)
export const getPastMatches = async () => {
  const all = await getMatches();
  const now = new Date();
  return all
    .filter(m => (m.status === 'COMPLETED') && m.matchDateTime && !isNaN(new Date(m.matchDateTime)))
    .filter(m => new Date(m.matchDateTime) <= now)
    .sort((a, b) => new Date(b.matchDateTime) - new Date(a.matchDateTime));
};

// Get single match
export const getMatch = async (id) => {
  const response = await fetch(`${API_BASE_URL}/matches/${id}`);
  if (!response.ok) throw new Error('Failed to fetch match');
  return await response.json();
};

// Create new match using JSON (backend expects @RequestBody)
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

// Update match using JSON
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
  // Backend returns 204 No Content; avoid parsing JSON
  return true;
};
