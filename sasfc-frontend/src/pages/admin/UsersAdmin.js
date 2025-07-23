import { useState, useEffect } from 'react';
import UserForm from '../../components/admin/UserForm';
import UserTable from '../../components/admin/UserTable';
import UserDetailsModal from '../../components/admin/UserDetailsModal';
import { userService } from '../../services/userService';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, rolesData] = await Promise.all([
        userService.getAllUsers(),
        userService.getAllRoles()
      ]);
      setUsers(usersData);
      setRoles(rolesData);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load users and roles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      setCreateLoading(true);
      setError('');
      
      let newUser;
      if (userData.role === 'ROLE_ADMIN') {
        newUser = await userService.createAdmin({
          name: userData.name,
          email: userData.email,
          password: userData.password
        });
      } else {
        newUser = await userService.createEditor({
          name: userData.name,
          email: userData.email,
          password: userData.password
        });
      }

      setUsers(prevUsers => [...prevUsers, newUser]);
      setShowCreateForm(false);
      setSuccess(`User "${newUser.name}" created successfully!`);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.message || 'Failed to create user. Please try again.');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleCloseUserDetails = () => {
    setSelectedUser(null);
    setShowUserDetails(false);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setError('');
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage system users, roles, and permissions</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-sas-green-700 text-white px-4 py-2 rounded-md hover:bg-sas-green-800 focus:outline-none focus:ring-2 focus:ring-sas-green-500 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Create New User</span>
          </button>
        </div>
      </div>

      {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
            <button
              onClick={clearMessages}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="text-xl">&times;</span>
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{success}</span>
            <button
              onClick={clearMessages}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="text-xl">&times;</span>
            </button>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {users.filter(user => user.roles?.some(role => role.name === 'ROLE_ADMIN')).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Editors</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {users.filter(user => user.roles?.some(role => role.name === 'ROLE_EDITOR')).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Roles</p>
                <p className="text-2xl font-semibold text-gray-900">{roles.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Create User Form */}
        {showCreateForm && (
          <div className="mb-8">
            <UserForm
              onSubmit={handleCreateUser}
              onCancel={handleCancelCreate}
              loading={createLoading}
            />
          </div>
        )}

        {/* Users Table */}
        <UserTable
          users={users}
          onViewUser={handleViewUser}
          loading={loading}
        />

        {/* User Details Modal */}
        <UserDetailsModal
          user={selectedUser}
          isOpen={showUserDetails}
          onClose={handleCloseUserDetails}
        />
    </div>
  );
};

export default UsersAdmin;
