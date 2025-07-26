const API_BASE_URL = "http://localhost:8080/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Create editor user
  createEditor: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/editor`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create editor');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating editor:', error);
      throw error;
    }
  },

  // Create admin user
  createAdmin: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/admin`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create admin');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  },

  // Get all roles
  getAllRoles: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/roles`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch roles');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },

  // Get all permissions
  getAllPermissions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/permissions`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch permissions');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw error;
    }
  },

  // Assign permission to role
  assignPermissionToRole: async (roleId, permissionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/roles/${roleId}/permissions/${permissionId}`, {
        method: 'POST',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to assign permission');
      }

      return await response.json();
    } catch (error) {
      console.error('Error assigning permission:', error);
      throw error;
    }
  },

  // Remove permission from role
  removePermissionFromRole: async (roleId, permissionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/roles/${roleId}/permissions/${permissionId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to remove permission');
      }

      return await response.json();
    } catch (error) {
      console.error('Error removing permission:', error);
      throw error;
    }
  },

  // Create a new role
  createRole: async (roleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/roles`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(roleData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create role');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }
};
