import { useState } from 'react';

const RoleForm = ({ onSubmit, onCancel, loading = false }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Role name is required');
      return;
    }
    // Basic validation for role name format
    if (!/^ROLE_[A-Z_]+$/.test(name)) {
      setError('Role name must be in the format ROLE_NAME_IN_CAPS');
      return;
    }
    onSubmit({ name });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Role</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Role Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sas-green-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., ROLE_MODERATOR"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-sas-green-700 text-white rounded-md hover:bg-sas-green-800 focus:outline-none focus:ring-2 focus:ring-sas-green-500 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Role'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
