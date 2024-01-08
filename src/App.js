import { Routes, Route } from 'react-router-dom'
import './App.css';
import ChangePassword from './components/pages/auth/ChangePassword';
import Login from './components/pages/auth/Login';
import ResetPassword from './components/pages/auth/ResetPassword';
import Sidebar from './components/common/Sidebar/Sidebar';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>

    </div>
  );
}

export default App;
