import { format } from 'date-fns';

export const MatchCard = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      <div className="p-4 bg-gray-100">
        <p className="text-center font-semibold text-gray-700">
          {format(new Date(match.date), 'MMMM do, yyyy')} • {match.time}
        </p>
        <p className="text-center text-sm text-gray-500">{match.competition}</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-center w-1/3">
            <div className="h-16 w-16 mx-auto mb-2 bg-gray-200 rounded-full overflow-hidden">
              <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="h-full w-full object-contain" />
            </div>
            <h3 className="font-bold">{match.homeTeam.name}</h3>
          </div>
          
          <div className="text-center w-1/3">
            <div className="text-2xl font-bold py-2">VS</div>
            <div className="text-sm text-gray-600">{match.venue}</div>
          </div>
          
          <div className="text-center w-1/3">
            <div className="h-16 w-16 mx-auto mb-2 bg-gray-200 rounded-full overflow-hidden">
              <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="h-full w-full object-contain" />
            </div>
            <h3 className="font-bold">{match.awayTeam.name}</h3>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 text-center">
        <a href={`/matches/${match.id}`} className="text-green-700 hover:text-green-900 font-medium">
          Match Details
        </a>
      </div>
    </div>
  );
};