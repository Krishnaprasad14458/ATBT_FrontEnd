import UserForm from "../../components/createForm/createUserForm/UserForm";
import UserLandingPage from "../../components/landingPages/user/UserLandingPage";
import Users from "../../components/pages/users/Users";

export const userRouter = [
    { path: 'users', element: <Users /> },
    { path: 'userlandingpage/:id', element: <UserLandingPage /> },
    { path: 'users/new', element: <UserForm /> },
]