import { Routes, Route } from 'react-router-dom'
import './App.css';
import ChangePassword from './components/auth/ChangePassword';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import Sidebar from './components/common/sidebar/Sidebar';
import TopBar from './components/common/topbar/TopBar';
import RequireAuth from './components/required/RequireAuth';
import PageNotFound from './components/pages/pageNotFound/PageNotFound';
import Reports from './components/pages/reports/Reports';
import Dashboard from './components/pages/dashboard/Dashboard';
import Entities from './components/pages/entities/Entities';
import BoardMeetings from './components/pages/boardMeetings/BoardMeetings';
import Teams from './components/pages/teams/Teams';
import Tasks from './components/pages/task/Tasks';
import Settings from './components/pages/settings/Settings';
import { useContext } from 'react';
import { AuthContext } from './contexts/authContext';
import Users from './components/pages/users/Users';
import UserProfile from './components/pages/userProfile/UserProfile';
import EntityForm from './components/createForm/createEntityForm/EntityForm';
import UserForm from './components/createForm/createUserForm/UserForm';
import BoardMeetingForm from './components/createForm/createBoardMeetingForm/BoardMeetingForm';
import TaskForm from './components/createForm/createTaskForm/TaskForm';

function App() {
  const { authState } = useContext(AuthContext);
  return (
    <div className="app">
      {authState.token ? <Sidebar /> : null}
      <main className="content" style={{ overflow: "auto" }}>
        {authState.token ? <TopBar /> : null}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route element={<RequireAuth />}>
            <Route path="/reports" element={<Reports />} />
            <Route path="/" element={<Dashboard />} />
            <Route path='/entities' element={<Entities />} />
            <Route path='/boardmeetings' element={<BoardMeetings />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/users' element={<Users />} />
            <Route
              path="/userProfile/:id"
              element={
                <UserProfile />
              }
            >
              <Route path="tasks" element={<UserProfile />} />
              <Route path="teams" element={<UserProfile />} />
              <Route path="enteties" element={<UserProfile />} />
            </Route>
            <Route path='/entityform' element={<EntityForm />} />
            <Route path='/userform' element={<UserForm/>} />
            <Route path='/boardmeetingform' element={<BoardMeetingForm/>} />
            <Route path='/taskform' element={<TaskForm/>} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}


export default App;

