import { useState, useEffect } from 'react';
import { getUpcomingMatches, getPastMatches } from '../services/matchService';

export const Matches = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        if (activeTab === 'upcoming') {
          const data = await getUpcomingMatches();
          setUpcomingMatches(data);
        } else {
          const data = await getPastMatches();
          setPastMatches(data);
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [activeTab]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Matches</h1>
      
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 font-medium ${activeTab === 'upcoming' ? 'border-b-2 border-green-700 text-green-700' : 'text-gray-500'}`}
        >
          Upcoming Matches
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 font-medium ${activeTab === 'past' ? 'border-b-2 border-green-700 text-green-700' : 'text-gray-500'}`}
        >
          Past Results
        </button>
      </div>

      {/* ... rest of the component remains the same ... */}
    </div>
  );
};