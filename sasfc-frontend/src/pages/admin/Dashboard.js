import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Welcome to the SAS FC administration panel.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Quick Actions</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/admin/players/new" className="text-sas-green-700 hover:underline font-medium">
                Add New Player
              </Link>
            </li>
            <li>
              <Link to="/admin/matches/new" className="text-sas-green-700 hover:underline font-medium">
                Schedule Match
              </Link>
            </li>
            <li>
              <Link to="/admin/news/new" className="text-sas-green-700 hover:underline font-medium">
                Create News Article
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="text-sas-green-700 hover:underline font-medium">
                Manage Users
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-gray-800 text-lg mb-4">User Management</h3>
          <p className="text-gray-600 mb-4">Control user accounts, roles, and permissions.</p>
          <Link to="/admin/users" className="inline-block bg-sas-green-700 text-white px-4 py-2 rounded-md hover:bg-sas-green-800">
            Go to User Management
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Recent Activity</h3>
          <p className="mt-2 text-sm text-gray-500">No recent activity to display.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Club Statistics</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Players: <span className="font-bold">25</span></p>
            <p className="text-sm text-gray-600">Upcoming Matches: <span className="font-bold">3</span></p>
            <p className="text-sm text-gray-600">Total Users: <span className="font-bold">5</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
