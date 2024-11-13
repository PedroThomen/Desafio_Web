import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCookie } from '../services/cookieService';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const authToken = getCookie('authToken');

  if (!user && !authToken) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute; 