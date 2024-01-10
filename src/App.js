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

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content" style={{ overflow: "auto" }}>
        <TopBar />
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
            <Route path='/teams' element={<Teams/>} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

