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
import TeamsDataProvider from './contexts/teamsDataContext/teamsDataContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import PermissionsProvider from './rbac/PermissionsProvider';
import { router } from './router';
import ErrorBoundary from './components/pages/Errorpages/ErrorBoundary';
import BoardMeetingsDataProvider from "./contexts/boardmeetingsDataContext/boardmeetingsDataContext"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // <ErrorBoundary>
  <AuthProvider>
    <PermissionsProvider>
      <UserDataProvider>
        <EntitiesDataProvider>
          <TeamsDataProvider>
            <BoardMeetingsDataProvider>
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
            </BoardMeetingsDataProvider>
          </TeamsDataProvider>
        </EntitiesDataProvider>
      </UserDataProvider>
    </PermissionsProvider>
  </AuthProvider>,
  // </ErrorBoundary>
  {/* </React.StrictMode> */ }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// serviceWorkerRegistration.register();
reportWebVitals();
