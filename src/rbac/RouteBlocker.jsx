import React, { useContext } from 'react';
import usePermissionCheck from './usePermissionCheck';
import {
  Navigate,
  useLocation,
  Routes,
  Outlet,
  useMatch,
  useMatches,
} from 'react-router-dom';
import { AuthContext } from '../contexts/authContext/authContext';

function checkParamsForMatch(matches, matcher) {
  for (const item of matches) {
    const params = item.params;
    console.log(params);
    for (const key in params) {
      console.log(params[key], matcher, 'mtr');
      if (+params[key] === matcher) {
        return true;
      }
    }
  }
  return false;
}

function RouteBlocker({ permissionCheck, fallback, loadingFallback }) {
  const { authState } = useContext(AuthContext);
  const match = useMatch('/users/:id');
  const useredit = useMatch('/users/:id/edit');
  const matches = useMatches();
  console.log(
    'match',
    match?.params?.id,
    authState?.user?.id,
    useredit,
    matches
  );
  const { allowed, loading } = usePermissionCheck(permissionCheck);
  const self = checkParamsForMatch(matches, authState?.user?.id);
  // const isUserLandingPage =
  //   match &&
  //   match?.params &&
  //   authState?.user?.id &&
  //   +match?.params?.id === authState?.user?.id.id;
  // if (+match?.params?.id === authState?.user?.id) {
  //   console.log('matched');
  //   return <Outlet />;
  // }
  if (!!self) {
    console.log('matched');
    return <Outlet />;
  }
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
