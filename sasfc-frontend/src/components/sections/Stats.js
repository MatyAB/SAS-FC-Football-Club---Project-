import { useEffect, useState } from 'react';
import { getClubStats } from '../../services/statsService';

export const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getClubStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          Loading club statistics...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Club Statistics</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Players Stat */}
          <div className="bg-green-700 p-6 rounded-lg">
            <div className="text-4xl font-bold mb-2">
              {stats?.players || 0}
            </div>
            <div className="text-sm uppercase tracking-wider">
              Players
            </div>
          </div>
          
          {/* Matches Stat */}
          <div className="bg-green-700 p-6 rounded-lg">
            <div className="text-4xl font-bold mb-2">
              {stats?.matches || 0}
            </div>
            <div className="text-sm uppercase tracking-wider">
              Matches Played
            </div>
          </div>
          
          {/* Trophies Stat */}
          <div className="bg-green-700 p-6 rounded-lg">
            <div className="text-4xl font-bold mb-2">
              {stats?.trophies || 0}
            </div>
            <div className="text-sm uppercase tracking-wider">
              Trophies Won
            </div>
          </div>
          
          {/* Youth Stat */}
          <div className="bg-green-700 p-6 rounded-lg">
            <div className="text-4xl font-bold mb-2">
              {stats?.youthPlayers || 0}
            </div>
            <div className="text-sm uppercase tracking-wider">
              Youth Graduates
            </div>
          </div>
        </div>
        
        {/* Additional stats row */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="bg-green-700 p-4 rounded-lg">
            <div className="text-2xl font-bold mb-1">
              {stats?.goals || 0}
            </div>
            <div className="text-xs uppercase tracking-wider">
              Goals Scored
            </div>
          </div>
          <div className="bg-green-700 p-4 rounded-lg">
            <div className="text-2xl font-bold mb-1">
              {stats?.cleanSheets || 0}
            </div>
            <div className="text-xs uppercase tracking-wider">
              Clean Sheets
            </div>
          </div>
          <div className="bg-green-700 p-4 rounded-lg">
            <div className="text-2xl font-bold mb-1">
              {stats?.years || 0}
            </div>
            <div className="text-xs uppercase tracking-wider">
              Years Established
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};