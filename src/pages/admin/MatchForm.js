import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createMatch,
  updateMatch,
  getMatch,
} from '../../services/matchService';
import {getTeams} from '../../services/teamsService';
import { getPlayers } from '../../services/playerService';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';

export const MatchForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '19:00',
    competition: 'League',
    venue: 'Home Stadium',
    homeTeamId: '', // Changed from homeTeamName
    awayTeamId: '', // Changed from awayTeamName
    homeScore: '',
    awayScore: '',
    status: 'SCHEDULED',
    matchReport: '', // Added matchReport
    manOfTheMatchPlayerId: null,
    goals: [], // { scorerPlayerId, assistPlayerId (optional), minuteScored }
  });

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [motmTeamSide, setMotmTeamSide] = useState(''); // '' | 'home' | 'away'
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    const loadPlayers = async () => {
      try {
        const playersData = await getPlayers();
        setPlayers(playersData);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    const loadMatch = async () => {
      try {
        const matchData = await getMatch(id);
        const teamsData = await getTeams(); // Fetch teams again to ensure we have all team data for mapping
        setTeams(teamsData);
        await loadPlayers();

        // Extract date and time from matchDateTime safely
        let datePart = '';
        let timePart = formData.time;
        if (matchData.matchDateTime) {
          let parsed = typeof matchData.matchDateTime === 'string' ? parseISO(matchData.matchDateTime) : new Date(matchData.matchDateTime);
          if (isValid(parsed)) {
            datePart = parsed.toISOString().split('T')[0];
            const hours = parsed.getHours().toString().padStart(2, '0');
            const minutes = parsed.getMinutes().toString().padStart(2, '0');
            timePart = `${hours}:${minutes}`;
          }
        }

        setFormData({
          date: datePart,
          time: timePart,
          competition: matchData.competition || 'League',
          venue: matchData.venue || '',
          homeTeamId: matchData.homeTeam.id || '', // Use ID
          awayTeamId: matchData.awayTeam.id || '', // Use ID
          homeScore: matchData.homeScore ?? '',
          awayScore: matchData.awayScore ?? '',
          status: (matchData.status || 'SCHEDULED').toString().toUpperCase(),
          matchReport: matchData.matchReport || '', // Set matchReport
          manOfTheMatchPlayerId: matchData.manOfTheMatch?.id || null,
          goals: Array.isArray(matchData.goals) ? matchData.goals.map(g => ({
            scorerPlayerId: g.scorerPlayerId || null,
            assistPlayerId: g.assistPlayerId || null,
            minuteScored: g.minuteScored || '',
            teamSide: ''
          })) : [],
        });
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    if (id) {
      loadMatch();
    } else {
      loadTeams();
      loadPlayers();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construct matchDateTime from date and time
      const dateTimeString = `${formData.date}T${formData.time}:00`; // Assuming seconds are 00
      const matchDateTime = new Date(dateTimeString);

      const payload = {
        ...formData,
        matchDateTime: isNaN(matchDateTime.getTime()) ? null : matchDateTime.toISOString(), // Send as ISO string if valid
        homeTeamId: formData.homeTeamId, // Keep UUIDs as-is
        awayTeamId: formData.awayTeamId,
        status: (formData.status || 'SCHEDULED').toString().toUpperCase(),
        // Only include scores, goals, motm if COMPLETED; otherwise send null/empty
        homeScore: formData.status === 'COMPLETED' ? (formData.homeScore === '' ? null : Number(formData.homeScore)) : null,
        awayScore: formData.status === 'COMPLETED' ? (formData.awayScore === '' ? null : Number(formData.awayScore)) : null,
        matchReport: formData.status === 'COMPLETED' ? formData.matchReport : null,
        manOfTheMatchPlayerId: formData.status === 'COMPLETED' ? formData.manOfTheMatchPlayerId : null,
        goals: formData.status === 'COMPLETED' ? formData.goals
          .filter(g => g.scorerPlayerId && g.minuteScored !== '')
          .map(g => ({
            scorerPlayerId: g.scorerPlayerId,
            assistPlayerId: g.assistPlayerId || null,
            minuteScored: Number(g.minuteScored)
          })) : []
      };

      // Remove date and time from payload as matchDateTime is used
      delete payload.date;
      delete payload.time;

      if (id) {
        await updateMatch(id, payload);
      } else {
        await createMatch(payload);
      }
      navigate('/admin/matches');
    } catch (error) {
      console.error('Error saving match:', error);
      // TODO: Display error message to the user
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-semibold mb-6">
        {id ? 'Edit Match' : 'Create Match'}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Competition</label>
          <input
            type="text"
            name="competition"
            value={formData.competition}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Venue</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Home Team</label>
          <select
            name="homeTeamId" // Changed from homeTeamName
            value={formData.homeTeamId}
            onChange={(e) => setFormData((prev) => ({ ...prev, homeTeamId: e.target.value }))} // Update to use value directly
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Home Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}> {/* Use team.id as value */}
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Away Team</label>
          <select
            name="awayTeamId" // Changed from awayTeamName
            value={formData.awayTeamId}
            onChange={(e) => setFormData((prev) => ({ ...prev, awayTeamId: e.target.value }))} // Update to use value directly
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Away Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}> {/* Use team.id as value */}
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Home Score</label>
          <input
            type="number"
            name="homeScore"
            value={formData.homeScore}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min="0"
            disabled={formData.status !== 'COMPLETED'}
          />
        </div>

        <div>
          <label className="block mb-1">Away Score</label>
          <input
            type="number"
            name="awayScore"
            value={formData.awayScore}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min="0"
            disabled={formData.status !== 'COMPLETED'}
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="POSTPONED">Postponed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {formData.status === 'COMPLETED' && (
          <>
            <div className="col-span-2"> {/* Span across two columns */}
              <label className="block mb-1">Match Report</label>
              <textarea
                name="matchReport"
                value={formData.matchReport}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                rows="4"
              ></textarea>
            </div>

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block mb-1">MOTM Team</label>
                <select
                  value={motmTeamSide}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMotmTeamSide(val);
                    // Reset MOTM selection when team changes
                    setFormData(prev => ({ ...prev, manOfTheMatchPlayerId: null }));
                  }}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Select Team</option>
                  <option value="home">Home Team</option>
                  <option value="away">Away Team</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1">Man of the Match (optional)</label>
                <select
                  name="manOfTheMatchPlayerId"
                  value={formData.manOfTheMatchPlayerId || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, manOfTheMatchPlayerId: e.target.value || null }))}
                  className="w-full px-3 py-2 border rounded"
                  disabled={!motmTeamSide}
                >
                  <option value="">Select Player</option>
                  {players
                    .filter(p => {
                      const teamId = motmTeamSide === 'home' ? formData.homeTeamId : motmTeamSide === 'away' ? formData.awayTeamId : '';
                      return p.team && p.team.id && teamId && p.team.id === teamId;
                    })
                    .map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block">Goals (optional)</label>
                <button
                  type="button"
                  className="px-3 py-1 text-sm bg-gray-100 border rounded"
                  onClick={() => setFormData(prev => ({ ...prev, goals: [...prev.goals, { teamSide: '', scorerPlayerId: '', assistPlayerId: '', minuteScored: '' }] }))}
                >
                  + Add Goal
                </button>
              </div>
              {formData.goals.map((g, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 mb-2 items-end">
                  <div className="col-span-3">
                    <label className="block mb-1 text-sm">Team</label>
                    <select
                      value={g.teamSide || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => {
                          const goals = [...prev.goals];
                          goals[idx] = { ...goals[idx], teamSide: value, scorerPlayerId: '', assistPlayerId: '' };
                          return { ...prev, goals };
                        });
                      }}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="">Select Team</option>
                      <option value="home">Home Team</option>
                      <option value="away">Away Team</option>
                    </select>
                  </div>
                  <div className="col-span-4">
                    <label className="block mb-1 text-sm">Scorer</label>
                    <select
                      value={g.scorerPlayerId || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => {
                          const goals = [...prev.goals];
                          goals[idx] = { ...goals[idx], scorerPlayerId: value };
                          return { ...prev, goals };
                        });
                      }}
                      className="w-full px-3 py-2 border rounded"
                      disabled={!g.teamSide}
                    >
                      <option value="">Select Scorer</option>
                      {players
                        .filter(p => {
                          const teamId = g.teamSide === 'home' ? formData.homeTeamId : g.teamSide === 'away' ? formData.awayTeamId : '';
                          return p.team && p.team.id && teamId && p.team.id === teamId;
                        })
                        .map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="col-span-4">
                    <label className="block mb-1 text-sm">Assist (optional)</label>
                    <select
                      value={g.assistPlayerId || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => {
                          const goals = [...prev.goals];
                          goals[idx] = { ...goals[idx], assistPlayerId: value };
                          return { ...prev, goals };
                        });
                      }}
                      className="w-full px-3 py-2 border rounded"
                      disabled={!g.teamSide}
                    >
                      <option value="">No Assist</option>
                      {players
                        .filter(p => {
                          const teamId = g.teamSide === 'home' ? formData.homeTeamId : g.teamSide === 'away' ? formData.awayTeamId : '';
                          return p.team && p.team.id && teamId && p.team.id === teamId;
                        })
                        .map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-1 text-sm">Minute</label>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={g.minuteScored}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData(prev => {
                          const goals = [...prev.goals];
                          goals[idx] = { ...goals[idx], minuteScored: value };
                          return { ...prev, goals };
                        });
                      }}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="col-span-12 text-right">
                    <button
                      type="button"
                      className="text-red-600 text-sm"
                      onClick={() => setFormData(prev => ({ ...prev, goals: prev.goals.filter((_, i) => i !== idx) }))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {id ? 'Update Match' : 'Create Match'}
        </button>
      </div>
    </form>
  );
};
