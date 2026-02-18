import { useEffect, useState } from 'react';
import { MatchCard } from '../common/MatchCard';
import { getUpcomingMatches } from '../../services/matchService';

export const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getUpcomingMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Matches</h2>
      
      {loading ? (
        <div className="text-center">Loading matches...</div>
      ) : matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map(match => (
            <MatchCard 
              key={match.id} 
              match={match} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center">No upcoming matches scheduled</div>
      )}
      
      <div className="text-center mt-8">
        <a 
          href="/matches" 
          className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          View All Matches
        </a>
      </div>
    </section>
  );
};