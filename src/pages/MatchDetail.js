import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMatch } from '../services/matchService';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';
import { format } from 'date-fns';

export const MatchDetail = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getMatch(id);
        setMatch(data);
      } catch (e) {
        setError('Failed to load match');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-12 text-white">Loading...</div>;
  if (error || !match) return <div className="container mx-auto px-4 py-12 text-white">{error || 'Not found'}</div>;

  let dateObj = null;
  if (match.matchDateTime) {
    const parsed = typeof match.matchDateTime === 'string' ? parseISO(match.matchDateTime) : new Date(match.matchDateTime);
    dateObj = isValid(parsed) ? parsed : null;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="container mx-auto px-4 py-12 relative z-10 text-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{match.homeTeam?.name} vs {match.awayTeam?.name}</h1>
          <div className="text-gray-300 mt-2">
            {dateObj ? `${format(dateObj, 'EEEE, MMM d yyyy')} • ${format(dateObj, 'HH:mm')}` : 'TBD'}
            <span className="mx-2">•</span>
            {match.venue}
            <span className="mx-2">•</span>
            {match.competition}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="text-center w-1/3">
              <div className="text-4xl font-black">{match.homeScore ?? '-'}</div>
              <div className="mt-2">{match.homeTeam?.name}</div>
            </div>
            <div className="text-center w-1/3">
              <div className="text-sm text-gray-400">{match.status}</div>
              <div className="text-2xl font-bold">vs</div>
            </div>
            <div className="text-center w-1/3">
              <div className="text-4xl font-black">{match.awayScore ?? '-'}</div>
              <div className="mt-2">{match.awayTeam?.name}</div>
            </div>
          </div>
        </div>

        {match.manOfTheMatch && (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-8">
            <div className="font-semibold mb-3">Man of the Match</div>
            <div className="flex items-center">
              <img src={match.manOfTheMatch.imageUrl || '/images/player-default.png'} alt={match.manOfTheMatch.name} className="w-12 h-12 rounded-full mr-3 object-cover" />
              <div>
                <div className="font-bold">{match.manOfTheMatch.name}</div>
                <div className="text-sm text-gray-400">#{match.manOfTheMatch.jerseyNumber} • {match.manOfTheMatch.position}</div>
              </div>
            </div>
          </div>
        )}

        {Array.isArray(match.goals) && match.goals.length > 0 && (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-8">
            <div className="font-semibold mb-3">Goals</div>
            <ul className="space-y-2">
              {match.goals.map(g => (
                <li key={g.id || `${g.scorerPlayerId}-${g.minuteScored}`}> 
                  <span className="text-[#f9fd06] font-bold mr-2">{g.minuteScored}'</span>
                  <span className="font-semibold">{g.scorerName || g.scorerPlayerId}</span>
                  {g.assistPlayerName && (
                    <span className="text-gray-400"> (assist: {g.assistPlayerName})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {match.matchReport && (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <div className="font-semibold mb-3">Match Report</div>
            <div className="whitespace-pre-wrap text-gray-200">{match.matchReport}</div>
          </div>
        )}
      </div>
    </div>
  );
};


