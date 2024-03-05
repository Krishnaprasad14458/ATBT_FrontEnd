import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
// import App, { router_bsckup } from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from './contexts/authContext/authContext';
import UserDataProvider from './contexts/usersDataContext/usersDataContext';
import EntitiesDataProvider from './contexts/entitiesDataContext/entitiesDataContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import PermissionsProvider from './rbac/PermissionsProvider';
import { router } from './router';
import ErrorBoundary from './components/pages/Errorpages/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <PermissionsProvider>
      <UserDataProvider>
        <EntitiesDataProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </EntitiesDataProvider>
      </UserDataProvider>
    </PermissionsProvider>
  </AuthProvider>,
  {/* </React.StrictMode> */ }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// serviceWorkerRegistration.register();
reportWebVitals();
