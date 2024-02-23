import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext/authContext';
import { Navigate, useLocation, Routes, Outlet } from 'react-router-dom';
import PanelLayout from './PanelLayout';

const RequireAuth = () => {
  const { authState } = useContext(AuthContext);
  const location = useLocation();
  return authState.token ? (
    <PanelLayout>
      <Outlet />
    </PanelLayout>
  ) : (
    <Navigate
      to='/login'
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
