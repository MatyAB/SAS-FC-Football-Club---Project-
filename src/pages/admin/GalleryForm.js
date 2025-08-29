import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadGalleryImage } from '../../services/galleryService';

const galleryCategories = ['matches', 'training', 'events', 'others'];

export const GalleryForm = () => {
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [tabImages, setTabImages] = useState([]); // multiple images
  const [thumbnailImage, setThumbnailImage] = useState(null); // single image
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTabImagesChange = (e) => {
    setTabImages(Array.from(e.target.files));
  };

  const handleThumbnailChange = (e) => {
    setThumbnailImage(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption || !category || tabImages.length === 0 || !thumbnailImage) {
      setError('Please fill in all fields and upload images.');
      return;
    }

    setError('');

    try {
      // Upload tab images
      for (const file of tabImages) {
        await uploadGalleryImage({
          file: file,
          caption: caption,
          category: category,
        });
      }

      // Upload thumbnail
      await uploadGalleryImage({
        file: thumbnailImage,
        caption: caption,
        category: category,
      });

      navigate('/admin/gallery');
    } catch (err) {
      setError('Upload failed: ' + err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Gallery Images</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="block mb-2">
          Caption <span className="text-red-600">*</span>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-2">
          Category <span className="text-red-600">*</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select category</option>
            {galleryCategories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          Tab Images (multiple) <span className="text-red-600">*</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleTabImagesChange}
            className="w-full"
            required
          />
        </label>

        <label className="block mb-4">
          Thumbnail Image (single) <span className="text-red-600">*</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-sas-green-700 hover:bg-sas-green-800 text-white px-4 py-2 rounded"
        >
          Upload Gallery Images
        </button>
      </form>
    </div>
  );
};
