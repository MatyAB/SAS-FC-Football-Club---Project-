import { SASLogo } from '../common/SASLogo';
import { SocialMediaIcons } from '../common/SocialMediaIcons';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <SASLogo className="h-16 w-16 mb-4" />
            <p className="text-center md:text-left">
              Saris Addis Sefer Football Club - Promoting football excellence in our community.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-yellow-300 transition">Home</a></li>
              <li><a href="/about" className="hover:text-yellow-300 transition">About Us</a></li>
              <li><a href="/team" className="hover:text-yellow-300 transition">Our Team</a></li>
              <li><a href="/matches" className="hover:text-yellow-300 transition">Matches</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p>Saris Addis Sefer, Addis Ababa</p>
              <p>Email: info@sasfc.com</p>
              <p>Phone: +251 123 456 789</p>
            </address>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <SocialMediaIcons />
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} SAS FC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};