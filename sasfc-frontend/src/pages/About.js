export const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About SAS FC</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our History</h2>
          <p className="mb-4">
            Founded in 2010, Saris Addis Sefer Football Club has been a pillar of 
            our community, nurturing local talent and promoting sportsmanship.
          </p>
          <p>
            From humble beginnings playing in local tournaments, we've grown to 
            compete at regional levels while maintaining our community roots.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Develop local football talent</li>
            <li>Promote health and fitness in our community</li>
            <li>Foster teamwork and discipline</li>
            <li>Represent Saris Addis Sefer with pride</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Club Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-bold text-green-800">2015</h3>
            <p>Regional Division Champions</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-bold text-green-800">2018</h3>
            <p>Community Club of the Year</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-bold text-green-800">2022</h3>
            <p>Youth Development Award</p>
          </div>
        </div>
      </div>
    </div>
  );
};