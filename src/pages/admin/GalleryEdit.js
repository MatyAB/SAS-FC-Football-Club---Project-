import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGalleryById, updateGalleryImage, getImagesByCategory, replaceGalleryImage, deleteGalleryImage, uploadGalleryImage } from '../../services/galleryService';

const categories = ['MATCHES', 'TRAINING', 'EVENTS', 'HISTORY'];

const resolveImageUrl = (url) => {
  if (!url) return '/images/gallery-default.jpg';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `http://localhost:8080${url}`;
  return url;
};

export const GalleryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImageData, setNewImageData] = useState({
    caption: '',
    category: 'MATCHES',
    file: null
  });

  useEffect(() => {
    const load = async () => {
      try {
        const item = await getGalleryById(id);
        const category = (item.category || '').toUpperCase();
        const allInCategory = await getImagesByCategory(category);
        
        // Filter by same caption
        const targetCaption = item.caption || '';
        let subset = allInCategory.filter(p => (p.caption || '') === targetCaption);
        if (subset.length === 0) subset = [item]; // fallback to just the clicked item
        
        // Sort by createdAt desc
        subset.sort((a, b) => {
          const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tb - ta;
        });

        setImages(subset.map(img => ({
          ...img,
          url: resolveImageUrl(img.url),
          thumbnailUrl: resolveImageUrl(img.thumbnailUrl || img.url),
          editing: false
        })));
        
        // Pre-fill new image data with current caption/category
        setNewImageData(prev => ({
          ...prev,
          caption: targetCaption,
          category: category
        }));
      } catch (e) {
        setError('Failed to load images');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const updateImage = async (imageId, updates) => {
    try {
      await updateGalleryImage(imageId, updates);
      setImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, ...updates } : img
      ));
      setEditingId(null);
      setError('');
    } catch (e) {
      setError('Failed to update image');
    }
  };

  const handleFileChange = async (imageId, file) => {
    if (!file) return;
    
    try {
      const updatedImage = await replaceGalleryImage(imageId, file);
      setImages(prev => prev.map(img => 
        img.id === imageId ? {
          ...img,
          url: resolveImageUrl(updatedImage.url),
          thumbnailUrl: resolveImageUrl(updatedImage.thumbnailUrl || updatedImage.url)
        } : img
      ));
      setError('');
    } catch (e) {
      setError('Failed to replace image file');
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      console.log('Deleting image with ID:', imageId, 'Type:', typeof imageId);
      await deleteGalleryImage(imageId);
      setImages(prev => prev.filter(img => img.id !== imageId));
      setError('');
    } catch (e) {
      console.error('Delete error:', e);
      setError('Failed to delete image: ' + e.message);
    }
  };

  const handleAddNewImage = async (e) => {
    e.preventDefault();
    
    if (!newImageData.caption.trim() || !newImageData.category || !newImageData.file) {
      setError('Please fill in all required fields and select an image file.');
      return;
    }

    try {
      await uploadGalleryImage({
        file: newImageData.file,
        caption: newImageData.caption.trim(),
        category: newImageData.category
      });
      
      // Reload the images to include the new one
      const item = await getGalleryById(id);
      const category = (item.category || '').toUpperCase();
      const allInCategory = await getImagesByCategory(category);
      const targetCaption = item.caption || '';
      let subset = allInCategory.filter(p => (p.caption || '') === targetCaption);
      if (subset.length === 0) subset = [item];
      
      subset.sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tb - ta;
      });

      setImages(subset.map(img => ({
        ...img,
        url: resolveImageUrl(img.url),
        thumbnailUrl: resolveImageUrl(img.thumbnailUrl || img.url),
        editing: false
      })));
      
      setShowAddForm(false);
      setNewImageData({ caption: '', category: 'MATCHES', file: null });
      setError('');
    } catch (e) {
      setError('Failed to add new image: ' + e.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Gallery Images</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {showAddForm ? 'Cancel Add' : 'Add New Image'}
          </button>
          <button 
            onClick={() => navigate('/admin/gallery')} 
            className="border px-4 py-2 rounded"
          >
            Back to Gallery
          </button>
        </div>
      </div>
      
      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">{error}</div>}

      {/* Add New Image Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Add New Image to Gallery</h3>
          <form onSubmit={handleAddNewImage} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Caption <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={newImageData.caption}
                  onChange={(e) => setNewImageData(prev => ({ ...prev, caption: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sas-green-500"
                  placeholder="Enter image caption"
                  required
                />
              </label>
              
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </span>
                <select
                  value={newImageData.category}
                  onChange={(e) => setNewImageData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sas-green-500"
                  required
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </label>
            </div>
            
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Image File <span className="text-red-500">*</span>
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImageData(prev => ({ ...prev, file: e.target.files[0] }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sas-green-500"
                required
              />
            </label>
            
            <div className="flex gap-2">
              <button 
                type="submit" 
                className="bg-sas-green-600 hover:bg-sas-green-700 text-white px-4 py-2 rounded"
              >
                Upload Image
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="border border-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={image.id} className="bg-white rounded-xl shadow border overflow-hidden">
            {/* Image Preview */}
            <div className="aspect-video overflow-hidden">
              <img 
                src={image.thumbnailUrl} 
                alt={image.caption || `Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Edit Form */}
            <div className="p-4">
              {editingId === image.id ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const caption = formData.get('caption').trim();
                  const category = formData.get('category');
                  
                  if (!caption) {
                    setError('Caption is required');
                    return;
                  }
                  
                  updateImage(image.id, {
                    caption: caption,
                    category: category
                  });
                }}>
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700 mb-1">
                        Caption <span className="text-red-500">*</span>
                      </span>
                      <input
                        name="caption"
                        defaultValue={image.caption || ''}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sas-green-500"
                        placeholder="Enter caption"
                        required
                      />
                    </label>
                    
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </span>
                      <select
                        name="category"
                        defaultValue={image.category || 'MATCHES'}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sas-green-500"
                        required
                      >
                        {categories.map(c => (
                          <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>
                        ))}
                      </select>
                    </label>
                    
                    <label className="block">
                      <span className="text-sm font-medium text-gray-700 mb-1">Replace Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(image.id, e.target.files[0])}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sas-green-500"
                      />
                    </label>
                    
                    <div className="flex gap-2">
                      <button type="submit" className="bg-sas-green-600 hover:bg-sas-green-700 text-white px-3 py-1 rounded text-sm">
                        Save
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setEditingId(null)}
                        className="border px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <p className="font-medium text-sm">{image.caption || 'No caption'}</p>
                  <p className="text-xs text-gray-500">Category: {image.category}</p>
                  <p className="text-xs text-gray-500">
                    {image.createdAt ? new Date(image.createdAt).toLocaleString() : ''}
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingId(image.id)}
                      className="flex-1 bg-sas-green-600 hover:bg-sas-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(image.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
