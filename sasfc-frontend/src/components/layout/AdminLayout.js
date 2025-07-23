import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { AuthContext } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-end items-center">
            {admin && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600">Welcome, {admin.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-sas-yellow text-sas-green-900 hover:bg-sas-gold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
