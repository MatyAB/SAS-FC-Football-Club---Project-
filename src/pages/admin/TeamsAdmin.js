import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeams, deleteTeam } from '../../services/teamsService';

export const TeamsAdmin = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await deleteTeam(id);
        setTeams(teams.filter(team => team.id !== id));
      } catch (error) {
        console.error('Error deleting team:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Teams</h1>
        <Link
          to="/admin/teams/new"
          className="bg-sas-green-700 hover:bg-sas-green-800 text-white px-4 py-2 rounded"
        >
          Add New Team
        </Link>
      </div>

      <div className="space-y-4">
        {teams.length === 0 ? (
          <p className="text-center py-8">No teams found</p>
        ) : (
          teams.map(team => (
            <div key={team.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {team.logoUrl && (
                  <img src={team.logoUrl} alt={`${team.name} logo`} className="w-12 h-12 object-contain rounded" />
                )}
                <div>
                  <h2 className="text-xl font-bold">{team.name}</h2>
                  <p className="text-sm text-gray-600">{team.shortName || ''}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/admin/teams/edit/${team.id}`}
                  className="text-sas-green-700 hover:text-sas-green-900 px-3 py-1 rounded border border-sas-green-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(team.id)}
                  className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
