export const Sponsors = () => {
  const sponsors = [
    {
      name: "Addis Brewery",
      logo: "/sponsors/addis-brewery.png",
      url: "https://addisbrewery.com",
      tier: "platinum"
    },
    {
      name: "Saris Motors",
      logo: "/sponsors/saris-motors.png",
      url: "https://sarismotors.com",
      tier: "gold"
    },
    {
      name: "Abyssinia Bank",
      logo: "/sponsors/abyssinia-bank.png",
      url: "https://abyssiniabank.com",
      tier: "gold"
    },
    {
      name: "Local Community Partners",
      logo: "/sponsors/community.png",
      url: "#",
      tier: "silver"
    }
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Our Sponsors</h2>
        <p className="text-center text-gray-600 mb-8">Proudly supported by</p>
        
        {/* Platinum Sponsor */}
        <div className="mb-12 text-center">
          <h3 className="text-sm font-semibold text-gray-500 mb-4">PLATINUM PARTNER</h3>
          <div className="flex justify-center">
            {sponsors.filter(s => s.tier === 'platinum').map(sponsor => (
              <a 
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-4 hover:opacity-75 transition-opacity"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="h-24 object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 text-center">GOLD PARTNERS</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {sponsors.filter(s => s.tier === 'gold').map(sponsor => (
              <a 
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-opacity"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="h-20 object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Silver/Community Sponsors */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-4 text-center">COMMUNITY PARTNERS</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.filter(s => s.tier === 'silver').map(sponsor => (
              <a 
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-opacity"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="h-16 object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/sponsorship" 
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
};