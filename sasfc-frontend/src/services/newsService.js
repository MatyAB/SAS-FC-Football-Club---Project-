const API_BASE_URL = process.env.REACT_APP_API_URL;

// Get all news articles
export const getNews = async () => {
  const response = await fetch(`${API_BASE_URL}/news`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return await response.json();
};

// Alias for getNews (used in components)
export const getLatestNews = getNews;

// Get single news item
export const getNewsItem = async (id) => {
  const response = await fetch(`${API_BASE_URL}/news/${id}`);
  if (!response.ok) throw new Error('Failed to fetch news item');
  return await response.json();
};

// Create new news article
export const createNews = async (newsData) => {
  const response = await fetch(`${API_BASE_URL}/news`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: JSON.stringify(newsData)
  });
  if (!response.ok) throw new Error('Failed to create news');
  return await response.json();
};

// Update news article
export const updateNews = async (id, newsData) => {
  const response = await fetch(`${API_BASE_URL}/news/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: JSON.stringify(newsData)
  });
  if (!response.ok) throw new Error('Failed to update news');
  return await response.json();
};

// Delete news article
export const deleteNews = async (id) => {
  const response = await fetch(`${API_BASE_URL}/news/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete news');
  return await response.json();
};