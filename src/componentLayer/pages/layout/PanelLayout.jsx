import React, { useContext } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/TopBar';
import { Outlet, useNavigation } from 'react-router-dom';
import useOnlineStatus from '../../../hooks/isOnline/useOnlineStatus ';
import { AuthContext } from '../../../contexts/authContext/authContext';
import useServiceWorker from '../../../useSw';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
  barColors: {
    0: '#ff7f50',
    '1.0': '#ff7f50',
  },
  barThickness: 5,
  shadowBlur: 2,
});

const Layout = () => {
  const isOnline = useOnlineStatus();
  const { authState } = useContext(AuthContext);
  const isLoggedIn = authState?.token ? true : false ?? false;
  console.log(isOnline, isLoggedIn, 'sw.js', Date.now());
  const {
    usingSW,
    swRegistration,
    svcworker,
    sendSWMessage,
    sendStatusUpdate,
  } = useServiceWorker(isOnline, isLoggedIn);
  const navigation = useNavigation();
  console.log(navigation, 'navigation state');
  return (
    <div className='app'>
      <Sidebar />
      <main
        className='content h-screen bg-[#f8fafc]'
        style={{ overflow: 'auto' }}
      >
        <TopBar />
        {isOnline ? null : (
          <span
            role='img'
            aria-label='Offline'
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              padding: '15px',
              background: 'red',
              color: 'white',
              zIndex: 1000,
            }}
          >
            ⚠️ You are offline
          </span>
        )}
        {navigation.state == 'loading' && <TopBarProgress />}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
