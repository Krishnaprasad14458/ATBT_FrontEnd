import React, { useContext, useEffect } from 'react';
import Sidebar from '../common/sidebar/Sidebar';
import TopBar from '../common/topbar/TopBar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext/authContext';
import useOnlineStatus from '../../hooks/isOnline/useOnlineStatus ';
import { io } from 'socket.io-client';
import useServiceWorker from '../../useSw';

const Layout = () => {
  const isOnline = useOnlineStatus();
  const { authState } = useContext(AuthContext);
  const isLoggedIn = authState?.token ? true : false ?? false;
  console.log(isOnline, isLoggedIn, "sw.js", Date.now())
  const { usingSW, swRegistration, svcworker, sendSWMessage, sendStatusUpdate } = useServiceWorker(isOnline, isLoggedIn);


  useEffect(() => {
    // Establish WebSocket connection with the server (replace URL with your server URL)
    const socket = io('http://localhost:3001', {
      query: { userId: `${authState?.user.id}` } // Pass JWT token as query parameter
    });

    // Handle events from the server
    socket.on('permissionsUpdated', () => {
      // Logic to update permissions in your React app
      console.log('Permissions updated');
    });

    return () => {
      // Clean up WebSocket connection when component unmounts
      socket.disconnect();
    };
  }, []);
  return (
    <div className="app">
      <Sidebar />
      <main
        className="content h-screen bg-[#f8fafc]"
        style={{ overflow: 'auto' }}
      >
        <TopBar />
        {isOnline ? null : (
        <span role="img" aria-label="Offline" style={{ position: 'fixed', bottom: 0, right: 0, padding: '15px', background: 'red', color: 'white', zIndex: 1000 }}>
          ⚠️ You are offline
        </span>
      )}
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
