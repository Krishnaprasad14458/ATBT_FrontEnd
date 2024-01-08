import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import ChangePassword from './components/pages/auth/ChangePassword';
import Login from './components/pages/auth/Login';
import ResetPassword from './components/pages/auth/ResetPassword';
import Sidebar from './components/common/Sidebar/Sidebar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
