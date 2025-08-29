import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 group ${
      isActive
        ? 'bg-gradient-to-r from-[#339c0c] to-[#2a850a] text-white shadow-lg'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`;

  const menuItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { path: "/admin/players", name: "Players", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { path: "/admin/teams", name: "Teams", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { path: "/admin/matches", name: "Matches", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { path: "/admin/news", name: "News", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
    { path: "/admin/gallery", name: "Gallery", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { path: "/admin/sponsors", name: "Sponsors", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { path: "/admin/users", name: "Users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { path: "/admin/roles", name: "Roles", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }
  ];

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-900 border-r border-gray-800 text-white">
      {/* BRANDING HEADER */}
      <div className="flex flex-col items-center mb-10">
        <div className="group mb-4">
          <img 
            src="/logo.png" 
            alt="SAS FC Logo"
            className="h-14 w-14 object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(249,253,6,0.5)] transition-all duration-500"
          />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#f9fd06]/80">
          SAS FC Admin
        </h2>
        <div className="w-16 h-0.5 bg-[#f9fd06]/50 mt-4 rounded-full"></div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={navLinkClasses}>
                <svg 
                  className="w-5 h-5 mr-3 group-hover:text-[#f9fd06] transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="group-hover:translate-x-1 transition-transform">
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* USER FOOTER (PLACEHOLDER) */}
      <div className="mt-auto pt-6 border-t border-gray-800">
        <div className="flex items-center px-3 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#339c0c] flex items-center justify-center mr-3">
            <span className="text-xs font-bold">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@sasfc.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;