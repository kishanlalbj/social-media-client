import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to="/"></Navigate>;

  return children;
};

export default ProtectedRoute;
