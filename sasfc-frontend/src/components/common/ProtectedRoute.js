import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { admin, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (adminOnly && !admin.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};