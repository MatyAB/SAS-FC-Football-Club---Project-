const API_BASE_URL = 'http://localhost:8080/api';

// Fetch all sponsors
export const getSponsors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sponsors`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return [];
  }
};

// Fetch single sponsor by ID
export const getSponsorById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sponsors/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sponsor:', error);
    throw error;
  }
};

// Get sponsors by category
export const getSponsorsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sponsors/category/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sponsors by category:', error);
    return [];
  }
};

// Create new sponsor with logo upload
export const createSponsor = async (sponsorData) => {
  try {
    const formData = new FormData();
    formData.append('name', sponsorData.name);
    formData.append('description', sponsorData.description);
    formData.append('slogan', sponsorData.slogan);
    formData.append('website', sponsorData.website);
    formData.append('category', sponsorData.category);
    
    if (sponsorData.logo) {
      formData.append('logo', sponsorData.logo);
    }

    const response = await fetch(`${API_BASE_URL}/sponsors`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Create failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating sponsor:', error);
    throw error;
  }
};

// Update sponsor
export const updateSponsor = async (id, sponsorData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sponsors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sponsorData),
    });

    if (!response.ok) {
      throw new Error(`Update failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating sponsor:', error);
    throw error;
  }
};

// Update sponsor with logo
export const updateSponsorWithLogo = async (id, sponsorData) => {
  try {
    const formData = new FormData();
    formData.append('name', sponsorData.name);
    formData.append('description', sponsorData.description);
    formData.append('slogan', sponsorData.slogan);
    formData.append('website', sponsorData.website);
    formData.append('category', sponsorData.category);
    
    if (sponsorData.logo) {
      formData.append('logo', sponsorData.logo);
    }

    const response = await fetch(`${API_BASE_URL}/sponsors/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Update failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating sponsor:', error);
    throw error;
  }
};

// Delete sponsor
export const deleteSponsor = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sponsors/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Delete failed with status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    throw error;
  }
};

// Helper function to resolve image URLs
export const resolveSponsorLogoUrl = (url) => {
  if (!url) return '/images/sponsor-default.png';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `http://localhost:8080${url}`;
  return url;
};
