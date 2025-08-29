const API_BASE_URL = "http://localhost:8080/api";

// Get all teams
export const getTeams = async () => {
  const response = await fetch(`${API_BASE_URL}/teams`);
  if (!response.ok) throw new Error('Failed to fetch teams');
  return await response.json();
};

// Get single team by ID
export const getTeam = async (id) => {
  const response = await fetch(`${API_BASE_URL}/teams/${id}`);
  if (!response.ok) throw new Error('Failed to fetch team');
  return await response.json();
};

// Create a new team (admin)
// export const createTeam = async (teamData) => {
//   const token = localStorage.getItem('adminToken');
//   const response = await fetch(`${API_BASE_URL}/teams`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify(teamData)
//   });
//   if (!response.ok) throw new Error('Failed to create team');
//   return await response.json();
// };

export const createTeam = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/teams`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to create team');
  return await response.json();
};




// Update a team (admin) - multipart/form-data to support optional logo update
export const updateTeam = async (id, formData) => {
  const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
    },
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to update team');
  return await response.json();
};

// Delete a team (admin)
export const deleteTeam = async (id) => {
  const token = localStorage.getItem('adminToken');
  const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete team');
  return await response.json();
};