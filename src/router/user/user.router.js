import UserForm, { userFormLoader } from "../../components/createForm/createUserForm/UserForm";
import UserLandingPage, { userLandingLoader } from "../../components/landingPages/user/UserLandingPage";
import Users from "../../components/pages/users/Users";

export const userRouter = [
    { index: true, element: <Users /> },
    { path: ':id', loader: userLandingLoader, element: <UserLandingPage /> },
    { path: ':userid/edit', loader: userFormLoader, element: <UserForm /> },
    { path: 'new', loader: userFormLoader, element: <UserForm /> },
]