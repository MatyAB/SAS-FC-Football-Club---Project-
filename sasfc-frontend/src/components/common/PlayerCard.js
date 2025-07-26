export const PlayerCard = ({ player }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={player.image || '/images/player-default.jpg'} 
          alt={player.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{player.name}</h3>
          <p className="text-yellow-300 text-sm">{player.position}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Age:</span>
          <span>{player.age}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Nationality:</span>
          <span>{player.nationality}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">Jersey:</span>
          <span className="font-bold">#{player.jerseyNumber}</span>
        </div>
      </div>
    </div>
  );
};