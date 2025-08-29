import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getSponsors } from '../../services/sponsorService';
import PropTypes from 'prop-types';

// Constants for CSS classes and static content to improve readability and maintainability
const SECTION_GRADIENT = "bg-gradient-to-b from-gray-50 to-white";
const DIVIDER_GRADIENT = "bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]";
const PRIMARY_COLOR = "#339c0c"; // Green
const ACCENT_COLOR = "#f9fd06"; // Yellow

// Helper function to resolve sponsor logo URLs
const resolveSponsorLogoUrl = (url) => {
  if (!url) return '/images/sponsor-default.png';
  // Use a more robust check for absolute URLs
  try {
    new URL(url); // Throws an error if not a valid URL
    return url;
  } catch (e) {
    // If it's a relative path like /uploads/, prepend the base URL
    if (url.startsWith('/uploads/')) {
      // It's better to get this base URL from an environment variable
      // For now, keeping localhost as per original, but recommend .env
      return `http://localhost:8080${url}`;
    }
    return url; // Return as is if it's a relative path not starting with /uploads/
  }
};

// SponsorCard component for individual sponsor rendering
const SponsorCard = ({ sponsor, category, loading }) => {
  const imageHeight = useMemo(() => {
    switch (category) {
      case 'PLATINUM': return 'h-32';
      case 'GOLD': return 'h-24';
      case 'SILVER': return 'h-16';
      default: return 'h-20';
    }
  }, [category]);

  const imagePadding = useMemo(() => {
    switch (category) {
      case 'PLATINUM': return 'p-4';
      case 'GOLD': return 'p-3';
      case 'SILVER': return 'p-2';
      default: return 'p-2';
    }
  }, [category]);

  const cardClasses = useMemo(() => {
    switch (category) {
      case 'PLATINUM': return 'relative p-1 rounded-2xl bg-gradient-to-br from-gray-100 to-white shadow-xl border border-gray-200';
      case 'GOLD': return 'relative p-1 rounded-xl bg-gradient-to-br from-gray-100 to-white shadow-lg border border-gray-200';
      case 'SILVER': return 'relative p-1 rounded-lg bg-gray-50 shadow-md border border-gray-200';
      default: return 'relative p-1 rounded-lg bg-gray-50 shadow-md border border-gray-200';
    }
  }, [category]);

  const hoverBorderClasses = useMemo(() => {
    switch (category) {
      case 'PLATINUM': return `absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[${ACCENT_COLOR}]/50 transition-all duration-300`;
      case 'GOLD': return `absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[${ACCENT_COLOR}]/30 transition-all duration-300`;
      case 'SILVER': return ''; // Silver doesn't have a hover border
      default: return '';
    }
  }, [category]);

  const linkClasses = useMemo(() => {
    switch (category) {
      case 'PLATINUM': return 'group mx-6 transition-all duration-500 hover:scale-105';
      case 'GOLD': return 'group text-center transition-all duration-500 hover:scale-[1.03]';
      case 'SILVER': return 'group text-center transition-all duration-500 hover:scale-[1.02]';
      default: return 'group text-center transition-all duration-500';
    }
  }, [category]);

  const nameClasses = useMemo(() => {
    switch (category) {
      case 'PLATINUM': return `mt-4 text-gray-700 font-medium group-hover:text-[${PRIMARY_COLOR}] transition-colors`;
      case 'GOLD': return `mt-3 text-gray-600 text-sm font-medium group-hover:text-[${PRIMARY_COLOR}] transition-colors`;
      case 'SILVER': return `mt-2 text-gray-500 text-xs font-medium group-hover:text-[${PRIMARY_COLOR}] transition-colors`;
      default: return `mt-2 text-gray-500 text-xs font-medium group-hover:text-[${PRIMARY_COLOR}] transition-colors`;
    }
  }, [category]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className={`${imageHeight} w-full bg-gray-200 rounded-xl`}></div>
      </div>
    );
  }

  if (!sponsor) return null;

  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClasses}
      aria-label={`Visit ${sponsor.name}'s website`}
    >
      <div className={cardClasses}>
        {hoverBorderClasses && <div className={hoverBorderClasses}></div>}
        <img
          src={resolveSponsorLogoUrl(sponsor.logo)}
          alt={`${sponsor.name} logo`}
          className={`${imageHeight} object-contain ${imagePadding} mx-auto`}
          loading="lazy" // Add lazy loading for images
        />
      </div>
      <p className={nameClasses}>
        {sponsor.name}
      </p>
    </a>
  );
};

SponsorCard.propTypes = {
  sponsor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string,
    website: PropTypes.string,
  }),
  category: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};


export const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors

  // Use useCallback for memoizing the fetch function
  const fetchSponsors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const data = await getSponsors();
      setSponsors(data);
    } catch (err) {
      console.error('Error fetching sponsors:', err);
      setError('Failed to load sponsors. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]); // Depend on fetchSponsors to avoid lint warnings, though it's stable

  // Memoize filtered sponsors to prevent re-computation on every render
  const platinumSponsors = useMemo(() => sponsors.filter(s => s.category === 'PLATINUM'), [sponsors]);
  const goldSponsors = useMemo(() => sponsors.filter(s => s.category === 'GOLD'), [sponsors]);
  const silverSponsors = useMemo(() => sponsors.filter(s => s.category === 'SILVER'), [sponsors]);

  if (error) {
    return (
      <section className={`relative py-20 ${SECTION_GRADIENT} overflow-hidden text-center text-red-600`}>
        <p>{error}</p>
        <button
          onClick={fetchSponsors}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className={`relative py-20 ${SECTION_GRADIENT} overflow-hidden`}>
      {/* DECORATIVE ELEMENTS */}
      <div className={`absolute top-0 left-0 w-full h-1 ${DIVIDER_GRADIENT}`}></div>
      <div className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[${ACCENT_COLOR}]/10 blur-3xl`}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <span className={`inline-block text-[${PRIMARY_COLOR}] font-bold mb-3 tracking-wider`}>STRATEGIC PARTNERSHIPS</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
            Our Valued Sponsors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proudly supported by industry leaders who share our vision for excellence
          </p>
        </div>

        {/* PLATINUM SPONSOR */}
        <div className="mb-20 text-center">
          <div className="inline-block bg-gradient-to-r from-gray-200 to-white px-6 py-2 rounded-full shadow-sm mb-8">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
              Platinum Partner
            </h3>
          </div>
          <div className="flex justify-center flex-wrap gap-8"> {/* Added flex-wrap and gap */}
            {loading ? (
              <SponsorCard loading={true} category="PLATINUM" />
            ) : (
              platinumSponsors.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} category="PLATINUM" loading={false} />
              ))
            )}
            {!loading && platinumSponsors.length === 0 && (
              <p className="text-gray-500">No Platinum sponsors found.</p>
            )}
          </div>
        </div>

        {/* GOLD SPONSORS */}
        <div className="mb-16">
          <div className="inline-block bg-gradient-to-r from-gray-200 to-white px-6 py-2 rounded-full shadow-sm mb-8 mx-auto">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-widest text-center">
              Gold Partners
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {loading ? (
              [...Array(4)].map((_, i) => <SponsorCard key={i} loading={true} category="GOLD" />)
            ) : (
              goldSponsors.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} category="GOLD" loading={false} />
              ))
            )}
            {!loading && goldSponsors.length === 0 && (
              <p className="text-gray-500 col-span-full text-center">No Gold sponsors found.</p>
            )}
          </div>
        </div>

        {/* SILVER SPONSORS */}
        <div className="mb-12">
          <div className="inline-block bg-gradient-to-r from-gray-200 to-white px-6 py-2 rounded-full shadow-sm mb-8 mx-auto">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-widest text-center">
              Community Partners
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {loading ? (
              [...Array(5)].map((_, i) => <SponsorCard key={i} loading={true} category="SILVER" />)
            ) : (
              silverSponsors.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} category="SILVER" loading={false} />
              ))
            )}
            {!loading && silverSponsors.length === 0 && (
              <p className="text-gray-500 col-span-full text-center">No Community partners found.</p>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/sponsorship"
            className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-[${PRIMARY_COLOR}] to-[#2a850a] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 group`}
            aria-label="Learn how to become a sponsor"
          >
            Become a Sponsor
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg" // Added xmlns for proper SVG rendering
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};