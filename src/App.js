import { Routes, Route } from 'react-router-dom'
import './App.css';
import ChangePassword from './components/pages/auth/ChangePassword';
import Login from './components/pages/auth/Login';
import ResetPassword from './components/pages/auth/ResetPassword';
import Sidebar from './components/common/Sidebar/Sidebar';
import RequireAuth from './components/requireAuth/RequireAuth';
import PageNotFound from './components/pages/pageNotFound/PageNotFound';
import Reports from './components/pages/reports/Reports';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword/:id" element={<ChangePassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Sidebar />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>

    </div>
  );
}

export default App;
