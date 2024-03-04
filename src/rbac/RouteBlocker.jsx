import React from 'react';
import usePermissionCheck from './usePermissionCheck';
import { Navigate, useLocation, Routes, Outlet } from 'react-router-dom';

function RouteBlocker({ permissionCheck, fallback, loadingFallback }) {
  const { allowed, loading } = usePermissionCheck(permissionCheck);
  if (loading) {
    return loadingFallback || <div>Loading...</div>;
  }
  return allowed ? (
    <Outlet />
  ) : (
    <Navigate
      to='/403'
      replace
    />
  );
}

export default RouteBlocker;
