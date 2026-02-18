import { useState } from 'react';

const RolePermissionManager = ({ role, allPermissions, onAssign, onRemove, loading }) => {
  const [selectedPermission, setSelectedPermission] = useState('');

  const assignedPermissionIds = new Set(role.permissions.map(p => p.id));
  const availablePermissions = allPermissions.filter(p => !assignedPermissionIds.has(p.id));

  const handleAssign = () => {
    if (selectedPermission) {
      onAssign(role.id, selectedPermission);
      setSelectedPermission('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Manage Permissions for <span className="text-sas-green-700">{role.name.replace('ROLE_', '')}</span>
      </h3>

      {/* Assign New Permission */}
      <div className="flex items-center space-x-3 mb-6">
        <select
          value={selectedPermission}
          onChange={(e) => setSelectedPermission(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sas-green-500"
          disabled={loading || availablePermissions.length === 0}
        >
          <option value="">{availablePermissions.length > 0 ? 'Select a permission to add' : 'No more permissions to add'}</option>
          {availablePermissions.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <button
          onClick={handleAssign}
          disabled={!selectedPermission || loading}
          className="px-4 py-2 bg-sas-green-700 text-white rounded-md hover:bg-sas-green-800 focus:outline-none focus:ring-2 focus:ring-sas-green-500 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Permission'}
        </button>
      </div>

      {/* Assigned Permissions List */}
      <div>
        <h4 className="text-md font-semibold text-gray-800 mb-3">Assigned Permissions ({role.permissions.length})</h4>
        {role.permissions.length > 0 ? (
          <ul className="space-y-2">
            {role.permissions.map(permission => (
              <li
                key={permission.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <span className="text-sm font-medium text-gray-800">{permission.name}</span>
                <button
                  onClick={() => onRemove(role.id, permission.id)}
                  disabled={loading}
                  className="text-red-600 hover:text-red-800 text-sm font-semibold disabled:opacity-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No permissions assigned to this role yet.</p>
        )}
      </div>
    </div>
  );
};

export default RolePermissionManager;
