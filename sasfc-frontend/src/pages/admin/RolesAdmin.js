import { useState, useEffect } from 'react';
import RolePermissionManager from '../../components/admin/RolePermissionManager';
import RoleForm from '../../components/admin/RoleForm';
import { userService } from '../../services/userService';

const RolesAdmin = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [rolesData, permissionsData] = await Promise.all([
        userService.getAllRoles(),
        userService.getAllPermissions()
      ]);
      setRoles(rolesData);
      setPermissions(permissionsData);
      if (rolesData.length > 0) {
        setSelectedRole(rolesData[0]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load roles and permissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    clearMessages();
  };

  const handleAssignPermission = async (roleId, permissionId) => {
    try {
      setActionLoading(true);
      const updatedRole = await userService.assignPermissionToRole(roleId, permissionId);
      updateRoleInState(updatedRole);
      setSuccess('Permission assigned successfully!');
    } catch (error) {
      console.error('Error assigning permission:', error);
      setError(error.message || 'Failed to assign permission.');
    } finally {
      setActionLoading(false);
      setTimeout(() => clearMessages(), 3000);
    }
  };

  const handleCreateRole = async (roleData) => {
    try {
      setActionLoading(true);
      const newRole = await userService.createRole(roleData);
      setRoles([...roles, newRole]);
      setShowCreateForm(false);
      setSuccess(`Role "${newRole.name}" created successfully!`);
    } catch (error) {
      console.error('Error creating role:', error);
      setError(error.message || 'Failed to create role.');
    } finally {
      setActionLoading(false);
      setTimeout(() => clearMessages(), 3000);
    }
  };

  const handleRemovePermission = async (roleId, permissionId) => {
    try {
      setActionLoading(true);
      const updatedRole = await userService.removePermissionFromRole(roleId, permissionId);
      updateRoleInState(updatedRole);
      setSuccess('Permission removed successfully!');
    } catch (error) {
      console.error('Error removing permission:', error);
      setError(error.message || 'Failed to remove permission.');
    } finally {
      setActionLoading(false);
      setTimeout(() => clearMessages(), 3000);
    }
  };

  const updateRoleInState = (updatedRole) => {
    const newRoles = roles.map(r => (r.id === updatedRole.id ? updatedRole : r));
    setRoles(newRoles);
    setSelectedRole(updatedRole);
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role & Permission Management</h1>
          <p className="text-gray-600 mt-2">Assign permissions to user roles.</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-sas-green-700 text-white px-4 py-2 rounded-md hover:bg-sas-green-800 focus:outline-none focus:ring-2 focus:ring-sas-green-500"
        >
          + Create New Role
        </button>
      </div>

      {showCreateForm && (
        <RoleForm
          onSubmit={handleCreateRole}
          onCancel={() => setShowCreateForm(false)}
          loading={actionLoading}
        />
      )}

      {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {success}
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Roles List */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Roles</h2>
                <ul className="space-y-2">
                  {roles.map(role => (
                    <li key={role.id}>
                      <button
                        onClick={() => handleRoleSelect(role)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                          selectedRole?.id === role.id
                            ? 'bg-sas-green-700 text-white font-semibold'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        {role.name.replace('ROLE_', '')}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Permission Manager */}
            <div className="md:col-span-2">
              {selectedRole ? (
                <RolePermissionManager
                  role={selectedRole}
                  allPermissions={permissions}
                  onAssign={handleAssignPermission}
                  onRemove={handleRemovePermission}
                  loading={actionLoading}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-500">Select a role to manage its permissions.</p>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default RolesAdmin;
