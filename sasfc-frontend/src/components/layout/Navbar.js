import { Link } from 'react-router-dom';
import { SASLogo } from '../common/SASLogo';

export const Navbar = () => {
  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <SASLogo className="h-12 w-12" />
          <span className="text-xl font-bold">SAS FC</span>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
          <Link to="/team" className="hover:text-yellow-300 transition">Team</Link>
          <Link to="/matches" className="hover:text-yellow-300 transition">Matches</Link>
          <Link to="/news" className="hover:text-yellow-300 transition">News</Link>
          <Link to="/gallery" className="hover:text-yellow-300 transition">Gallery</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
        </div>
        
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};