import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSponsors, deleteSponsor, getSponsorsByCategory } from '../../services/sponsorService';

const categories = ['ALL', 'PLATINUM', 'GOLD', 'SILVER'];

const resolveSponsorLogoUrl = (url) => {
  if (!url) return '/images/sponsor-default.png';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `http://localhost:8080${url}`;
  return url;
};

export const SponsorsAdmin = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSponsors = async () => {
      setLoading(true);
      try {
        let data;
        if (filter === 'ALL') {
          data = await getSponsors();
        } else {
          data = await getSponsorsByCategory(filter);
        }
        setSponsors(data);
        setError('');
      } catch (error) {
        console.error('Error fetching sponsors:', error);
        setError('Failed to load sponsors');
        setSponsors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, [filter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sponsor?')) {
      try {
        await deleteSponsor(id);
        setSponsors(sponsors.filter(sponsor => sponsor.id !== id));
      } catch (error) {
        console.error('Error deleting sponsor:', error);
        setError('Failed to delete sponsor');
      }
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case 'PLATINUM':
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 'GOLD':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'SILVER':
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Sponsor Management</h1>
          <p className="text-gray-600 mt-1">Manage club sponsors and partnerships</p>
        </div>
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
            to="/admin/sponsors/new"
            className="bg-sas-green-600 hover:bg-sas-green-700 text-white px-4 py-2 rounded-full shadow flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Sponsor
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
      ) : sponsors.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-gray-400 mb-3">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="text-gray-500 mb-4">No sponsors found</div>
          <p className="text-gray-400 max-w-md mx-auto">
            {filter === 'ALL' 
              ? 'Get started by adding your first sponsor' 
              : `No ${filter.toLowerCase()} sponsors available`}
          </p>
          {filter === 'ALL' && (
            <Link
              to="/admin/sponsors/new"
              className="inline-block mt-4 bg-sas-green-600 hover:bg-sas-green-700 text-white px-6 py-2 rounded-full"
            >
              Add First Sponsor
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {sponsors.map(sponsor => (
            <div
              key={sponsor.id}
              className="group relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Logo Section */}
              <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <img
                  src={resolveSponsorLogoUrl(sponsor.logo)}
                  alt={sponsor.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/admin/sponsors/edit/${sponsor.id}`}
                    className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(sponsor.id)}
                    className="p-2 bg-red-500/90 hover:bg-red-500 text-white rounded-full shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{sponsor.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(sponsor.category)}`}>
                    {sponsor.category}
                  </span>
                </div>
                
                {sponsor.slogan && (
                  <p className="text-sm text-gray-600 italic mb-2 line-clamp-2">"{sponsor.slogan}"</p>
                )}
                
                {sponsor.description && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{sponsor.description}</p>
                )}

                {sponsor.website && (
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-sas-green-600 hover:text-sas-green-700 font-medium"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
