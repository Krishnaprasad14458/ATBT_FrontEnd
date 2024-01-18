import { Routes, Route, useLocation } from 'react-router-dom'
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
import MyCalendar from './components/pages/task/MyCalendar';
import UserTasks from './components/pages/userProfile/userTabs/UserTasks';
import UserTeams from './components/pages/userProfile/userTabs/UserTeams';
import UserEntities from './components/pages/userProfile/userTabs/UserEntities';
import CompletedBoardMeetings from './components/pages/boardMeetings/completed/CompletedBoardMeetings';
import UpcommingBoardMeetings from './components/pages/boardMeetings/upcomming/UpcommingBoardMeetings';
import CompletedTasks from './components/pages/task/completed/CompletedTasks';
import UpcommingTasks from './components/pages/task/upcomming/UpcommingTasks';
import OverdueTasks from './components/pages/task/overdue/OverdueTasks';


function App() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();
  const isChangePasswordRoute = location.pathname === '/resetpassword';
  return (
    <div className="app">
      {!isChangePasswordRoute && authState.token ? <Sidebar /> : null}
      <main className="content h-screen bg-[#f8fafc]" style={{ overflow: "auto" }}>
        {!isChangePasswordRoute && authState.token ? <TopBar /> : null}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/entities' element={<Entities />}>
              <Route path="otl" element={<EntityForm />} />
            </Route>
            <Route path="/entities/new" element={<EntityForm />} />
            <Route path='/boardmeetings' element={<BoardMeetings />}>
              <Route path="completed" element={<CompletedBoardMeetings />} />
              <Route path="upcomming" element={<UpcommingBoardMeetings />} />
            </Route>
            <Route path="/boardmeetings/new" element={<BoardMeetingForm />} />
            <Route path='/tasks' element={<Tasks />} >
              <Route path="upcomming" element={<UpcommingTasks />} />
              <Route path="completed" element={<CompletedTasks />} />
              <Route path="overdue" element={<OverdueTasks />} />
            </Route>
            <Route path="tasks/new" element={<TaskForm />} />
            <Route path='/users' element={<Users />} >
              <Route path="otl" element={<UserForm />} />
            </Route>
            <Route path="/users/new" element={<UserForm />} />
            <Route
              path="/userProfile/:id"
              element={
                <UserProfile />
              }
            >
              <Route path="tasks" element={<UserTasks />} />
              <Route path="teams" element={<UserTeams />} />
              <Route path="enteties" element={<UserEntities />} />
            </Route>
            <Route path='/mycalendar' element={<MyCalendar />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}


export default App;

