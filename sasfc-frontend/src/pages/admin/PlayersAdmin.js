import { useState, useEffect } from 'react';
import { getPlayers, deletePlayer } from '../../services/playerService';
import { Link } from 'react-router-dom';

export const PlayersAdmin = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayers();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await deletePlayer(id);
        setPlayers(players.filter(player => player.id !== id));
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    }
  };

  if (loading) return <div>Loading players...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Players</h1>
        <Link
          to="/admin/players/new"
          className="bg-sas-green-700 hover:bg-sas-green-800 text-white px-4 py-2 rounded"
        >
          Add New Player
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-sas-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Position</th>
              <th className="py-3 px-4 text-left">Jersey</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {players.map(player => (
              <tr key={player.id}>
                <td className="py-3 px-4">{player.name}</td>
                <td className="py-3 px-4">{player.position}</td>
                <td className="py-3 px-4">#{player.jerseyNumber}</td>
                <td className="py-3 px-4 space-x-2">
                  <Link
                    to={`/admin/players/edit/${player.id}`}
                    className="text-sas-green-700 hover:text-sas-green-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(player.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
