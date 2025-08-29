import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getGalleryImages,
  deleteGalleryImage,
  getImagesByCategory,
} from '../../services/galleryService';

const categories = ['ALL', 'MATCHES', 'TRAINING', 'EVENTS', 'HISTORY'];

const resolveImageUrl = (url) => {
  if (!url) return '/images/gallery-default.jpg';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `http://localhost:8080${url}`;
  return url;
};

export const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await getImagesByCategory(filter);
        setGallery(data);
        setError('');
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        setError('Failed to load gallery');
        setGallery([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [filter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteGalleryImage(id);
        setGallery(gallery.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting gallery item:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gallery Management</h1>
        <div className="flex gap-3 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0) + cat.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <Link
            to="/admin/gallery/new"
            className="bg-sas-green-600 hover:bg-sas-green-700 text-white px-4 py-2 rounded-full shadow"
          >
            Add Photo
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">{error}</div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : gallery.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No gallery items found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map(item => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl shadow border border-gray-200 overflow-hidden"
            >
              <div className="relative h-56">
                <img
                  src={resolveImageUrl(item.thumbnailUrl || item.url)}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/admin/gallery/edit/${item.id}`}
                    className="px-3 py-1 text-xs rounded-full bg-white/90 hover:bg-white text-gray-800 shadow"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 text-xs rounded-full bg-red-600 hover:bg-red-700 text-white shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-900 font-medium line-clamp-1">{item.caption || 'Untitled'}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 border text-gray-700">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</p>
                <p className="text-xs text-gray-400">By {item.uploaderName || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};