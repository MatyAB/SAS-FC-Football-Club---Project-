export const SASLogo = ({ className = '' }) => {
  return (
    <svg 
      className={`${className} fill-current`} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield background */}
      <path 
        d="M50 5L5 30V70L50 95L95 70V30L50 5Z" 
        className="text-green-800" 
      />
      
      {/* Inner circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="35" 
        className="text-green-600" 
      />
      
      {/* SAS text */}
      <text 
        x="50" 
        y="55" 
        textAnchor="middle" 
        className="text-white font-bold text-4xl"
        style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          fontSize: '40px',
          fill: 'white'
        }}
      >
        SAS
      </text>
      
      {/* Football club text */}
      <text 
        x="50" 
        y="80" 
        textAnchor="middle" 
        className="text-white text-xs"
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          fill: 'white'
        }}
      >
        Football Club
      </text>
      
      {/* Football decoration */}
      <path 
        d="M50 30L55 40L65 40L58 48L60 58L50 53L40 58L42 48L35 40L45 40Z" 
        className="text-yellow-400" 
      />
    </svg>
  );
};