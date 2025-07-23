const API_BASE_URL = process.env.REACT_APP_API_URL;

export const uploadMedia = async (file, entityType) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('entityType', entityType);

  const response = await fetch(`${API_BASE_URL}/media/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: formData
  });

  if (!response.ok) throw new Error('Upload failed');
  return await response.json();
};

export const getMediaUrl = (path) => {
  return `${API_BASE_URL}${path}`; // Spring Boot serves from /media
};