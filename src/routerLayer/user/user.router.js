import UserForm, { userFormLoader } from "../../components/createForm/createUserForm/UserForm";
import UserLandingPage, { userLandingLoader } from "../../components/landingPages/user/UserLandingPage";
import Users, { action as userAction, loader as userLoader } from "../../components/pages/users/Users";

import RouteBlocker from "../../rbac/RouteBlocker";

export const userRouter = [
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'user' && permission.canRead} />,
        children: [
            { index: true, loader: userLoader, action: userAction, element: <Users /> },
            { path: ':id', loader: userLandingLoader, element: <UserLandingPage /> },
        ]
    },
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'user' && permission.canCreate} />,
        children: [
            { path: 'new', loader: userFormLoader, element: <UserForm /> },
        ]
    },
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'user' && permission.canUpdate} />,
        children: [
            { path: ':id/edit', loader: userFormLoader, element: <UserForm /> },
        ]
    },
]