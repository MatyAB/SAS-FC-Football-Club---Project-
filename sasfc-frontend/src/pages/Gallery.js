import { useEffect, useState } from 'react';
import { getGalleryImages } from '../services/galleryService';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGalleryImages();
        setImages(data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gallery</h1>
      
      {loading ? (
        <div className="text-center py-8">Loading gallery...</div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition">
              <img 
                src={image.url} 
                alt={image.caption || 'Gallery image'} 
                className="w-full h-48 object-cover hover:scale-105 transition-transform"
              />
              {image.caption && (
                <p className="p-2 text-sm text-center">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8">No images available in gallery</p>
      )}
    </div>
  );
};