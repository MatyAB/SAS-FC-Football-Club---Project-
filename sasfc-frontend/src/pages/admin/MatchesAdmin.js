import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMatches, getUpcomingMatches, getPastMatches, deleteMatch } from '../../services/matchService';
import { format } from 'date-fns';

export const MatchesAdmin = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        let data;
        if (filter === 'upcoming') {
          data = await getUpcomingMatches();
        } else if (filter === 'past') {
          data = await getPastMatches();
        } else {
          data = await getMatches();
        }
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [filter]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        await deleteMatch(id);
        setMatches(matches.filter(match => match.id !== id));
      } catch (error) {
        console.error('Error deleting match:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Matches</h1>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="all">All Matches</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
          <Link
            to="/admin/matches/new"
            className="bg-sas-green-700 hover:bg-sas-green-800 text-white px-4 py-2 rounded"
          >
            Add New Match
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {matches.length === 0 ? (
          <p className="text-center py-8">No matches found</p>
        ) : (
          matches.map(match => (
            <div key={match.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-center w-1/3">
                      <p className="font-bold">{match.homeTeam.name}</p>
                      <p className="text-lg font-bold">{match.homeScore ?? '-'}</p>
                    </div>
                    <div className="text-center w-1/3">
                      <p className="text-gray-500">
                        {format(new Date(match.date), 'MMM d, yyyy')} at {match.time}
                      </p>
                      <p className="text-xl font-bold">vs</p>
                      <p className="text-sm">{match.competition}</p>
                    </div>
                    <div className="text-center w-1/3">
                      <p className="font-bold">{match.awayTeam.name}</p>
                      <p className="text-lg font-bold">{match.awayScore ?? '-'}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex space-x-2">
                  <Link
                    to={`/admin/matches/edit/${match.id}`}
                    className="text-sas-green-700 hover:text-sas-green-900 px-3 py-1 rounded border border-sas-green-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(match.id)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
