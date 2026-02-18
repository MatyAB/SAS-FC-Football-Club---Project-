import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminNav = () => {
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="bg-sas-green-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard" className="font-bold">
              SAS FC Admin
            </Link>
            <Link to="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sas-green-700">
              Dashboard
            </Link>
            <Link to="/admin/players" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sas-green-700">
              Players
            </Link>
            <Link to="/admin/matches" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sas-green-700">
              Matches
            </Link>
            <Link to="/admin/news" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sas-green-700">
              News
            </Link>
            <Link to="/admin/users" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sas-green-700">
              Users
            </Link>
            <Link to="/admin/roles" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-sas-green-700">
              Roles
            </Link>
          </div>
          
          {admin && (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {admin.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium bg-sas-yellow text-sas-green-900 hover:bg-sas-gold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
