import { NavLink } from 'react-router-dom';
import { SASLogo } from '../common/SASLogo';

const AdminSidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-sas-green-700 text-white'
        : 'text-gray-300 hover:bg-sas-green-800 hover:text-white'
    }`;

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-sas-green-900 text-white">
      <div className="flex flex-col items-center mb-8">
        <SASLogo className="h-12 w-auto" />
        <h2 className="mt-4 text-xl font-semibold">SAS FC Admin</h2>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <NavLink to="/admin/dashboard" className={navLinkClasses}>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/players" className={navLinkClasses}>
              <span>Players</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/matches" className={navLinkClasses}>
              <span>Matches</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/news" className={navLinkClasses}>
              <span>News</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={navLinkClasses}>
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/roles" className={navLinkClasses}>
              <span>Roles</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        {/* Can add user info and logout button here later */}
      </div>
    </div>
  );
};

export default AdminSidebar;
