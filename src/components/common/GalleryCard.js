import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const resolveImageUrl = (url) => {
  if (!url) return '/images/gallery-default.jpg';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `http://localhost:8080${url}`;
  return url;
};

export const GalleryCard = ({ gallery }) => {
  const created = gallery.createdAt ? new Date(gallery.createdAt) : null;
  const formattedDate = created && !isNaN(created) 
    ? format(created, 'MMMM d, yyyy') 
    : 'Recent Photos';

  const imageSrc = resolveImageUrl(gallery.thumbnailUrl || gallery.url);
  const title = gallery.caption || 'Gallery Image';
  const badgeText = (gallery.category || 'EVENT').toString();
  const count = gallery.imageCount ?? 1;

  return (
    <Link 
      to={`/gallery/${gallery.id}`} 
      className="group relative block overflow-hidden rounded-2xl shadow-2xl hover:shadow-[0_25px_60px_-12px_rgba(249,253,6,0.25)] transition-all duration-500 hover:-translate-y-2"
    >
      {/* IMAGE WITH OVERLAY */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* IMAGE COUNT BADGE */}
        <div className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 bg-[#339c0c] text-white rounded-full font-bold shadow-lg">
          {count}+
        </div>
      </div>

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-[#f9fd06] transition-colors line-clamp-1">
          {title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#f9fd06]/90">{formattedDate}</span>
          <span className="text-xs bg-black/30 text-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
            {badgeText}
          </span>
        </div>
      </div>

      {/* HOVER EFFECTS */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#f9fd06]/30 rounded-2xl transition-all duration-500 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  );
};