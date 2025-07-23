import { useEffect, useState } from 'react';
import { PlayerCard } from '../components/common/PlayerCard';
import { getTeamPlayers } from '../services/playerService';

export const Team = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('first-team');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getTeamPlayers(activeCategory);
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlayers();
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Team</h1>
      
      <div className="flex justify-center mb-8 space-x-2">
        <button 
          onClick={() => setActiveCategory('first-team')}
          className={`px-4 py-2 rounded-lg ${activeCategory === 'first-team' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
        >
          First Team
        </button>
        <button 
          onClick={() => setActiveCategory('youth')}
          className={`px-4 py-2 rounded-lg ${activeCategory === 'youth' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
        >
          Youth Team
        </button>
        <button 
          onClick={() => setActiveCategory('staff')}
          className={`px-4 py-2 rounded-lg ${activeCategory === 'staff' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
        >
          Coaching Staff
        </button>
      </div>
      
      {loading ? (
        <div className="text-center">Loading team data...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {players.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
};