const API_BASE_URL = 'http://localhost:8080/api/gallery';

/**
 * Fetches all gallery images from the backend
 * @returns {Promise<Array>} Array of gallery images
 */
export const getGalleryImages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/images`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    // Return a default empty array if API fails
    return [
      {
        id: 1,
        url: '/images/gallery/default-1.jpg',
        caption: 'Team celebration after winning the regional championship',
        category: 'matches',
        date: '2023-05-15'
      },
      {
        id: 2,
        url: '/images/gallery/default-2.jpg',
        caption: 'Youth team training session',
        category: 'training',
        date: '2023-04-22'
      }
    ];
  }
};

/**
 * Uploads a new image to the gallery
 * @param {Object} imageData - Image file and metadata
 * @param {File} imageData.file - The image file
 * @param {string} imageData.caption - Image caption
 * @param {string} imageData.category - Image category
 * @returns {Promise<Object>} The uploaded image data
 */
export const uploadGalleryImage = async (imageData) => {
  const formData = new FormData();
  formData.append('file', imageData.file);
  formData.append('caption', imageData.caption);
  formData.append('category', imageData.category);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      // Note: Don't set Content-Type header when using FormData
      // The browser will set it automatically with the correct boundary
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Deletes an image from the gallery
 * @param {number} imageId - ID of the image to delete
 * @returns {Promise<Object>} Delete confirmation
 */
export const deleteGalleryImage = async (imageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Delete failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

/**
 * Gets images by category
 * @param {string} category - Category to filter by
 * @returns {Promise<Array>} Filtered array of images
 */
export const getImagesByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/images?category=${category}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${category} gallery images:`, error);
    return [];
  }
};

/**
 * Updates an existing gallery image
 * @param {number} imageId - ID of the image to update
 * @param {Object} updateData - New caption and/or category
 * @returns {Promise<Object>} Updated image data
 */
export const updateGalleryImage = async (imageId, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`Update failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating image:', error);
    throw error;
  }
};