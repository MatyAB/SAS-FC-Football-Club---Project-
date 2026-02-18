import { createContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, isAuthenticated } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        const adminData = getCurrentAdmin();
        // Add isAdmin property if not present
        if (adminData && typeof adminData.isAdmin === 'undefined') {
          const isAdmin = adminData.roles && adminData.roles.some(role => role.name === 'ROLE_ADMIN');
          setAdmin({ ...adminData, isAdmin });
        } else {
          setAdmin(adminData);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

// Helper function to get current admin from localStorage
const getCurrentAdmin = () => {
  const adminData = localStorage.getItem('adminData');
  if (!adminData || adminData === "undefined") return null;
  try {
    return JSON.parse(adminData);
  } catch {
    return null;
  }
};

  const login = async (email, password) => {
    try {
      const response = await authLogin(email, password);
      if (response.success && response.token && response.admin) {
        // Add isAdmin property based on roles
        const isAdmin = response.admin.roles && response.admin.roles.some(role => role.name === 'ROLE_ADMIN');
        const adminWithFlag = { ...response.admin, isAdmin };
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminData', JSON.stringify(adminWithFlag));
        setAdmin(adminWithFlag);
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    authLogout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};