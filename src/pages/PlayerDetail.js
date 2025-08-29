import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlayerDetails } from '../services/playerService';
import { 
  FaSpinner, FaTshirt, FaRulerVertical, FaWeight, 
  FaBirthdayCake, FaFlag, FaFutbol, FaArrowLeft 
} from 'react-icons/fa';
import { GiSoccerBall, GiSoccerKick, GiSoccerField } from 'react-icons/gi';
import { IoMdSpeedometer } from 'react-icons/io';
import { BiFootball } from 'react-icons/bi';

export const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPlayerDetails(id);
        
        if (!data) throw new Error('Player data not found');
        
        setPlayer({
          ...data,
          position: data.position?.toUpperCase() || 'PLAYER'
        });
        setActiveImageIndex(0);
      } catch (err) {
        console.error('Error fetching player:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <FaSpinner className="animate-spin text-[#f9fd06] text-4xl" />
    </div>
  );

  if (error) return (
    <div className="text-center py-20 bg-gray-900 min-h-screen">
      <div className="max-w-md mx-auto bg-gray-800/50 p-8 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Player Not Found</h2>
        <p className="text-gray-300 mb-6">{error}</p>
        <a href="/team" className="inline-block px-6 py-2 bg-[#339c0c] hover:bg-[#2a850a] text-white rounded-full transition-colors">
          Back to Team
        </a>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      {/* SAS FC Brand Elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#339c0c] via-[#f9fd06] to-[#339c0c]"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f9fd06]/10 blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#339c0c]/10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <a href="/team" className="inline-flex items-center text-[#f9fd06] hover:text-white transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to Team
          </a>
        </div>

        {/* Main Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Player Image & Basic Info */}
          <div className="lg:w-2/5">
            <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl">
              {/* Large Player Image */}
              <div className="relative h-96 bg-gradient-to-br from-[#339c0c]/10 to-[#f9fd06]/10">
                {(() => {
                  const images = [player.imageUrl, player.imageUrl2, player.imageUrl3].filter(Boolean);
                  const mainSrc = images[activeImageIndex] || images[0] || '/images/player-default.jpg';
                  return (
                    <img 
                      src={mainSrc}
                      alt={player.name}
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-full w-auto object-contain"
                    />
                  );
                })()}
              </div>

              {/* Thumbnails */}
              {([player?.imageUrl, player?.imageUrl2, player?.imageUrl3].filter(Boolean).length > 1) && (
                <div className="p-4 border-t border-gray-700/50 bg-gray-900/30">
                  <div className="flex items-center justify-center space-x-3">
                    {[player.imageUrl, player.imageUrl2, player.imageUrl3]
                      .filter(Boolean)
                      .map((src, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-16 h-16 rounded overflow-hidden border ${activeImageIndex === idx ? 'border-[#f9fd06]' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-[#f9fd06]/50`}
                          aria-label={`View image ${idx + 1}`}
                        >
                          <img src={src} alt={`${player.name} ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Player Identity */}
              <div className="p-6 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                  {player.name}
                </h1>
                <div className="flex justify-center items-center space-x-4 mb-4">
                  <span className="bg-[#339c0c] text-white px-4 py-1 rounded-full text-lg font-bold flex items-center">
                    <FaTshirt className="mr-2" />
                    #{player.jerseyNumber}
                  </span>
                  <span className="text-xl font-medium text-gray-300">
                    {player.position}
                  </span>
                </div>
                <div className="text-[#f9fd06] text-lg font-medium flex items-center justify-center">
                  <FaFlag className="mr-2" />
                  {player.nationality || 'N/A'}
                </div>
              </div>

              {/* Physical Attributes */}
              <div className="p-6 border-t border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <IoMdSpeedometer className="text-[#f9fd06] mr-2 text-2xl" />
                  Physical Attributes
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-gray-400 flex items-center">
                      <FaRulerVertical className="mr-2" />
                      Height
                    </div>
                    <div className="text-white font-bold text-xl mt-1">
                      {player.height || 'N/A'}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-gray-400 flex items-center">
                      <FaWeight className="mr-2" />
                      Weight
                    </div>
                    <div className="text-white font-bold text-xl mt-1">
                      {player.weight || 'N/A'}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-gray-400 flex items-center">
                      <FaBirthdayCake className="mr-2" />
                      Age
                    </div>
                    <div className="text-white font-bold text-xl mt-1">
                      {player.age || 'N/A'}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-gray-400 flex items-center">
                      <BiFootball className="mr-2" />
                      Preferred Foot
                    </div>
                    <div className="text-white font-bold text-xl mt-1">
                      {player.preferredFoot || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Stats */}
          <div className="lg:w-3/5 space-y-8">
            {/* Performance Stats */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <GiSoccerBall className="text-[#f9fd06] mr-3 text-3xl" />
                Season Performance
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-[#339c0c]/20 to-[#339c0c]/40 p-4 rounded-lg border border-[#339c0c]/30">
                  <div className="text-gray-300">Matches</div>
                  <div className="text-3xl font-bold text-white">{player.matchesPlayed ?? '0'}</div>
                </div>
                <div className="bg-gradient-to-br from-[#f9fd06]/20 to-[#f9fd06]/40 p-4 rounded-lg border border-[#f9fd06]/30">
                  <div className="text-gray-300">Goals</div>
                  <div className="text-3xl font-bold text-white">{player.goalsScored ?? '0'}</div>
                </div>
                <div className="bg-gradient-to-br from-[#339c0c]/20 to-[#339c0c]/40 p-4 rounded-lg border border-[#339c0c]/30">
                  <div className="text-gray-300">Assists</div>
                  <div className="text-3xl font-bold text-white">{player.assists ?? '0'}</div>
                </div>
                <div className="bg-gradient-to-br from-[#f9fd06]/20 to-[#f9fd06]/40 p-4 rounded-lg border border-[#f9fd06]/30">
                  <div className="text-gray-300">Clean Sheets</div>
                  <div className="text-3xl font-bold text-white">{player.cleanSheets ?? '0'}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-gray-400">Pass Accuracy</div>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-[#339c0c] to-[#f9fd06] h-2.5 rounded-full" 
                        style={{ width: `${player.passAccuracy ?? 0}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-white font-medium">{player.passAccuracy ?? '0'}%</span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-gray-400">Tackle Success</div>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-[#339c0c] to-[#f9fd06] h-2.5 rounded-full" 
                        style={{ width: `${player.tackleSuccessRate ?? 0}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-white font-medium">{player.tackleSuccessRate ?? '0'}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <GiSoccerKick className="text-[#f9fd06] mr-3 text-3xl" />
                Player Biography
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {player.bio || 'No biography available for this player.'}
              </p>
            </div>

            {/* Career Highlights */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700/50 p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <GiSoccerField className="text-[#f9fd06] mr-3 text-3xl" />
                Career Highlights
              </h2>
              <ul className="space-y-3">
                {(() => {
                  const highlightsArray = Array.isArray(player.careerHighlights)
                    ? player.careerHighlights
                    : (player.careerHighlights ? String(player.careerHighlights).split(/\r?\n|\u2022|\|/).map(s => s.trim()).filter(Boolean) : []);
                  return highlightsArray.length > 0 ? (
                    highlightsArray.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-[#f9fd06] rounded-full mt-2 mr-3"></span>
                        <span className="text-gray-300">{highlight}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">No career highlights recorded</li>
                  );
                })()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};