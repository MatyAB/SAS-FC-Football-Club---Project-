const API_BASE_URL = "http://localhost:8080/api";

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
  const response = await fetch(`${API_BASE_URL}/players`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch players');
  return await response.json();
};

// Helper function to handle API errors
const handleApiError = async (response) => {
  let errorData;
  try {
    errorData = await response.json();
  } catch (e) {
    // If response is not JSON, use text
    errorData = { message: await response.text() };
  }
  throw new Error(errorData.message || `API request failed with status ${response.status}`);
};

// Create new player
export const createPlayer = async (playerData, imageFile, image2File, image3File) => {
  const formData = new FormData();
  
  // Create a Blob for the player data with application/json content type
  const playerBlob = new Blob([JSON.stringify(playerData)], { type: 'application/json' });
  formData.append('player', playerBlob);

  // Append image files
  if (imageFile) {
    formData.append('image', imageFile);
  }
  if (image2File) {
    formData.append('image2', image2File);
  }
  if (image3File) {
    formData.append('image3', image3File);
  }

  const response = await fetch(`${API_BASE_URL}/players`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      // Content-Type is automatically set to multipart/form-data by FormData,
      // and the 'player' part will have its Content-Type set to 'application/json' due to the Blob type.
      // Do NOT manually set 'Content-Type': 'multipart/form-data' here.
    },
    body: formData
  });
  
  if (!response.ok) {
    await handleApiError(response);
  }
  return await response.json();
};

// Update player
export const updatePlayer = async (id, playerData, imageFile, image2File, image3File) => {
  const formData = new FormData();
  
  // Create a Blob for the player data with application/json content type
  const playerBlob = new Blob([JSON.stringify(playerData)], { type: 'application/json' });
  formData.append('player', playerBlob);

  // Append image files
  if (imageFile) {
    formData.append('image', imageFile);
  }
  if (image2File) {
    formData.append('image2', image2File);
  }
  if (image3File) {
    formData.append('image3', image3File);
  }

  const response = await fetch(`${API_BASE_URL}/players/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      // Content-Type is automatically set to multipart/form-data by FormData,
      // and the 'player' part will have its Content-Type set to 'application/json' due to the Blob type.
      // Do NOT manually set 'Content-Type': 'multipart/form-data' here.
    },
    body: formData
  });
  
  if (!response.ok) {
    await handleApiError(response);
  }
  return await response.json();
};


export const deletePlayer = async (id) => {
  const response = await fetch(`${API_BASE_URL}/players/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete player');
  // return await response.json();
   const text = await response.text();
  return text ? JSON.parse(text) : null;
};
