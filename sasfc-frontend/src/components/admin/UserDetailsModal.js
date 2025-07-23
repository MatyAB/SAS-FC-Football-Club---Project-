const UserDetailsModal = ({ user, onClose, isOpen }) => {
  if (!isOpen || !user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadgeColor = (roleName) => {
    switch (roleName) {
      case 'ROLE_ADMIN':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'ROLE_EDITOR':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPermissionBadgeColor = (permissionName) => {
    // Color coding based on permission type
    if (permissionName.includes('DELETE')) return 'bg-red-50 text-red-700 border-red-200';
    if (permissionName.includes('CREATE')) return 'bg-green-50 text-green-700 border-green-200';
    if (permissionName.includes('UPDATE') || permissionName.includes('EDIT')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (permissionName.includes('READ') || permissionName.includes('VIEW')) return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-sm text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <p className="mt-1 text-sm text-gray-500 font-mono">{user.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Created</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Login Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Login Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Login</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(user.lastLogin)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Login Status</label>
                <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.lastLogin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.lastLogin ? 'Active' : 'Never Logged In'}
                </span>
              </div>
            </div>
          </div>

          {/* Roles and Permissions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Roles & Permissions</h3>
            
            {user.roles && user.roles.length > 0 ? (
              <div className="space-y-4">
                {user.roles.map((role) => (
                  <div key={role.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Role: {role.name.replace('ROLE_', '')}</h4>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getRoleBadgeColor(role.name)}`}>
                        {role.name.replace('ROLE_', '')}
                      </span>
                    </div>
                    
                    {role.permissions && role.permissions.length > 0 ? (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permission) => (
                            <span
                              key={permission.id}
                              className={`px-2 py-1 text-xs font-medium rounded border ${getPermissionBadgeColor(permission.name)}`}
                            >
                              {permission.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No specific permissions assigned to this role</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No roles assigned to this user</p>
            )}
          </div>

          {/* Account Statistics */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Account Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-sas-green-600">{user.roles?.length || 0}</p>
                <p className="text-sm text-gray-600">Roles Assigned</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {user.roles?.reduce((total, role) => total + (role.permissions?.length || 0), 0) || 0}
                </p>
                <p className="text-sm text-gray-600">Total Permissions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {user.createdAt ? Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)) : 0}
                </p>
                <p className="text-sm text-gray-600">Days Since Created</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
