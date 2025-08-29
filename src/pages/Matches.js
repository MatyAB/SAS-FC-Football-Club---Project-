import { useState, useEffect, useMemo } from 'react';
import { getMatches } from '../services/matchService';
import { MatchCard } from '../components/common/MatchCard';

export const Matches = () => {
  const [allMatches, setAllMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const data = await getMatches();
        setAllMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(['All']);
    allMatches.forEach(m => { if (m.competition) set.add(m.competition); });
    return Array.from(set);
  }, [allMatches]);

  const upcomingMatches = useMemo(() => {
    const list = allMatches.filter(m => m.status === 'SCHEDULED');
    return list.sort((a, b) => new Date(a.matchDateTime || 0) - new Date(b.matchDateTime || 0));
  }, [allMatches]);

  const pastMatches = useMemo(() => {
    const list = allMatches.filter(m => m.status === 'COMPLETED');
    return list.sort((a, b) => new Date(b.matchDateTime || 0) - new Date(a.matchDateTime || 0));
  }, [allMatches]);

  const filtered = useMemo(() => {
    const source = activeTab === 'upcoming' ? upcomingMatches : pastMatches;
    if (category === 'All') return source;
    return source.filter(m => (m.competition || '') === category);
  }, [activeTab, category, upcomingMatches, pastMatches]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12AIzaSyBDYmsmaG-MD6XnzGMSB3ORfuE9GNAbe7M">
          <span className="inline-block text-[#339c0c] font-bold mb-3 tracking-wider uppercase text-sm">
            Match Center
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {activeTab === 'upcoming' ? 'Upcoming Matches' : 'Match Results'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {activeTab === 'upcoming' 
              ? 'Our next fixtures and competitions' 
              : 'Relive our recent performances'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-800 rounded-full p-1 shadow-md border border-gray-700">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'upcoming'
                  ? 'bg-[#339c0c] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'past'
                  ? 'bg-[#339c0c] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Results
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                  category === cat ? 'bg-[#f9fd06] text-black border-[#f9fd06]' : 'border-gray-600 text-gray-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl aspect-[4/5] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length > 0 ? (
              filtered.map((match) => (
                <MatchCard key={match.id} match={{...match, status: match.status?.toLowerCase()}} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="text-gray-400 mb-3">
                  No {activeTab === 'upcoming' ? 'upcoming matches' : 'past results'} available
                </div>
                <p className="text-gray-500 max-w-md mx-auto">
                  Check back later for updates
                </p>
              </div>
            )}
          </div>
        )}

        {/* Optional: Competition Filter */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center text-[#f9fd06] hover:text-white transition-colors">
            View full match calendar
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};






