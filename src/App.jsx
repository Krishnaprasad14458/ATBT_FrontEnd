import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ChangePassword from "./pages/changepassword/ChangePassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Login from "./pages/login/Login";

function App() {
  return (
    <div>
      <Routes className="App">
        <Route path="/" element={<Login />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
