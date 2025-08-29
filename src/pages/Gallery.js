import { useEffect, useState } from 'react';
import { GalleryCard } from '../components/common/GalleryCard'; // Import the new card component
import { getGalleries } from '../services/galleryService';

export const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await getGalleries();
        setGalleries(data);
      } catch (error) {
        console.error('Error fetching galleries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  // Filter galleries by category
  const filteredGalleries = activeCategory === 'ALL' 
    ? galleries 
    : galleries.filter(gallery => (gallery.category || '').toUpperCase() === activeCategory);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#339c0c] font-bold mb-3 tracking-wider uppercase text-sm">
            Visual Archives
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Club Galleries
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Relive our greatest moments through the lens
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['ALL', 'MATCHES', 'TRAINING', 'EVENTS', 'HISTORY'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-[#339c0c] text-white shadow-md'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.charAt(0) + category.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index} 
                className="bg-gray-800 rounded-2xl aspect-[4/3] animate-pulse"
              />
            ))}
          </div>
        ) : filteredGalleries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGalleries.map((gallery) => (
              <GalleryCard 
                key={gallery.id} 
                gallery={gallery} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className="text-gray-400 mb-3">No galleries found</div>
            <p className="text-gray-500 max-w-md mx-auto">
              {activeCategory === 'ALL' 
                ? 'Check back later for updates' 
                : `No ${activeCategory.toLowerCase()} galleries available`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};