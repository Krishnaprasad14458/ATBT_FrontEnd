// RouteGuard.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Navigate, useLocation, Routes, Outlet } from "react-router-dom";
import usePermissionCheck from '../../rbac/usePermissionCheck';

const RouteGuard = ({ module, action, role }) => {
    const [loading, allowed] = usePermissionCheck(module, action);
    const location = useLocation();

    console.log(location, "loc")

    return allowed ? (
          <Outlet/>
      ) : loading ? <div>Loading...</div> : (
        <Navigate to="/asdads" state={{ from: location }} />
      );
};

export default RouteGuard;
