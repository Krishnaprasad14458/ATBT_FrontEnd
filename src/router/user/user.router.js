import UserForm from "../../components/createForm/createUserForm/UserForm";
import UserLandingPage, { userLandingLoader } from "../../components/landingPages/user/UserLandingPage";
import Users from "../../components/pages/users/Users";

export const userRouter = [
    { index: true, element: <Users /> },
    { path: ':id', loader: userLandingLoader, element: <UserLandingPage /> },
    { path: ':userid/edit', element: <UserForm /> },
    { path: 'new', element: <UserForm /> },
]