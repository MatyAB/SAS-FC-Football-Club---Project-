export const Hero = () => {
  return (
    <section className="relative bg-green-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Saris Addis Sefer FC</h1>
        <p className="text-xl md:text-2xl mb-8">The pride of our community</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition">
            Latest Results
          </button>
          <button className="bg-transparent hover:bg-white hover:text-green-900 border-2 border-white font-bold py-3 px-6 rounded-lg transition">
            Join Our Club
          </button>
        </div>
      </div>
    </section>
  );
};