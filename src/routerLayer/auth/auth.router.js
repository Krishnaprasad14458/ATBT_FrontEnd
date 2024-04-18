import Login from "../../componentLayer/pages/auth/Login"
import ChangePassword from "../../componentLayer/pages/auth/ChangePassword";
import ResetPassword from "../../componentLayer/pages/auth/ResetPassword";

export const authRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/resetpassword', element: <ResetPassword /> },      //
    { path: '/changepassword/:id', element: <ChangePassword /> },  
    { path: '/changepassword', element: <ChangePassword /> },  

]
