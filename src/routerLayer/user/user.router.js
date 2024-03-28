import UserForm, { userFormLoader } from "../../components/createForm/createUserForm/UserForm";
// import Boardmeeting from "../../components/landingPages/ReuseableComponents/Boardmeeting";
import Boardmeeting, { action as entityMeetingAction, loader as entityMeetingLoader } from "../../components/landingPages/ReuseableComponents/Boardmeeting";

import Documents from "../../components/landingPages/ReuseableComponents/Documents";
import Task from "../../components/landingPages/ReuseableComponents/Task";
import UserLandingPage, { userLandingLoader } from "../../components/landingPages/user/UserLandingPage";
import UserOverview from "../../components/landingPages/user/UserOverview";
import Users, { action as userAction, loader as userLoader } from "../../components/pages/users/Users";
import RouteBlocker from "../../rbac/RouteBlocker";
export const userRouter = [
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'user' && permission.canRead} />,
        children: [
            { index: true, loader: userLoader, action: userAction, element: <Users /> },
            {
                path: ':id', element: <UserLandingPage />, children: [
                    { index: true, loader: userLandingLoader, element: <UserOverview /> },
                    { path: 'task', element: <Task /> },
                    // { path: 'boardmeetings', element: <Boardmeeting /> },
                    { path: 'boardmeetings', loader: entityMeetingLoader, action: entityMeetingAction, element: <Boardmeeting /> },

                    { path: 'documents', element: <Documents /> },
                ]
            },

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