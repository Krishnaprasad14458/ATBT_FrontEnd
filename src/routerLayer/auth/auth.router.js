import Login from "../../components/auth/Login";
import ChangePassword from "../../components/auth/ChangePassword";
import ResetPassword from "../../components/auth/ResetPassword";
export const authRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/resetpassword', element: <ResetPassword /> },      //
    { path: '/changepassword/:id', element: <ChangePassword /> },  
    { path: '/changepassword', element: <ChangePassword /> },  

]
