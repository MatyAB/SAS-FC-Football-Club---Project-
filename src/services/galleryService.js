const API_BASE_URL = 'http://localhost:8080/api';

// Fetch all gallery images
export const getGalleries = async () => {
  const response = await fetch(`${API_BASE_URL}/gallery`);
  if (!response.ok) throw new Error('Failed to fetch gallery');
  return await response.json();
};

// Fetch single gallery image by ID
export const getGalleryById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/gallery/images/${id}`);
  if (!response.ok) throw new Error('Failed to fetch gallery item');
  return await response.json();
};

// Alias for all images (admin usage)
export const getGalleryImages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
};

// Upload image(s)
export const uploadGalleryImage = async (imageData) => {
  const formData = new FormData();
  if (!imageData.file) {
    throw new Error('No file provided for upload.');
  }
  formData.append('files', imageData.file);
  formData.append('caption', imageData.caption);
  formData.append('category', imageData.category);
  if (imageData.uploaderId) {
    formData.append('uploaderId', imageData.uploaderId);
  }

  const response = await fetch(`${API_BASE_URL}/gallery/upload-multiple`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status: ${response.status}`);
  }

  return await response.json();
};

// Delete an image
export const deleteGalleryImage = async (imageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/images/${imageId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Delete failed with status: ${response.status}`);
    }

    // Backend returns 204 No Content, so don't try to parse JSON
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// Get images by category (client-side filter against enums from backend)
export const getImagesByCategory = async (category) => {
  try {
    const all = await getGalleryImages();
    const normalized = (category || '').toString().toUpperCase();
    if (!normalized || normalized === 'ALL') return all;
    return all.filter(img => (img.category || '').toString().toUpperCase() === normalized);
  } catch (error) {
    console.error(`Error fetching ${category} gallery images:`, error);
    return [];
  }
};

// Update an image (caption/category) using form data per controller's @RequestParam
export const updateGalleryImage = async (imageId, updateData) => {
  const form = new FormData();
  if (updateData.caption != null) form.append('caption', updateData.caption);
  if (updateData.category != null) form.append('category', updateData.category);

  const response = await fetch(`${API_BASE_URL}/gallery/images/${imageId}`, {
    method: 'PUT',
    body: form,
  });

  if (!response.ok) {
    throw new Error(`Update failed with status: ${response.status}`);
  }

  return await response.json();
};

// Replace an image file
export const replaceGalleryImage = async (imageId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/gallery/images/${imageId}/replace-file`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`File replacement failed with status: ${response.status}`);
  }

  return await response.json();
};
