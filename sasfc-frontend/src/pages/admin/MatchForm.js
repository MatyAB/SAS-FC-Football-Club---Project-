import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMatch, createMatch, updateMatch } from '../../services/matchService';
import { getTeams } from '../../services/teamService';

export const MatchForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: '',
    time: '19:00',
    competition: 'League',
    venue: 'Home Stadium',
    homeTeamId: '',
    awayTeamId: '',
    homeScore: null,
    awayScore: null,
    status: 'scheduled'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);

        if (id) {
          const matchData = await getMatch(id);
          setFormData({
            date: matchData.date.split('T')[0],
            time: matchData.time,
            competition: matchData.competition,
            venue: matchData.venue,
            homeTeamId: matchData.homeTeam.id,
            awayTeamId: matchData.awayTeam.id,
            homeScore: matchData.homeScore,
            awayScore: matchData.awayScore,
            status: matchData.status
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateMatch(id, formData);
      } else {
        await createMatch(formData);
      }
      navigate('/admin/matches');
    } catch (error) {
      console.error('Error saving match:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Match' : 'Create New Match'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Team</label>
            <select
              name="homeTeamId"
              value={formData.homeTeamId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Team</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Away Team</label>
            <select
              name="awayTeamId"
              value={formData.awayTeamId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Team</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Competition</label>
            <input
              type="text"
              name="competition"
              value={formData.competition}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Score</label>
            <input
              type="number"
              name="homeScore"
              value={formData.homeScore ?? ''}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Away Score</label>
            <input
              type="number"
              name="awayScore"
              value={formData.awayScore ?? ''}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="postponed">Postponed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/matches')}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-sas-green-700 text-white rounded hover:bg-sas-green-800"
          >
            {id ? 'Update Match' : 'Create Match'}
          </button>
        </div>
      </form>
    </div>
  );
};