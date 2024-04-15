import UserForm, { userFormLoader } from "../../components/createForm/createUserForm/UserForm";
import AllTasks from "../../components/landingPages/ReuseableComponents/AllTasks";
// import Boardmeeting from "../../components/landingPages/ReuseableComponents/Boardmeeting";
import Boardmeeting, { action as entityMeetingAction, loader as entityMeetingLoader } from "../../components/landingPages/ReuseableComponents/Boardmeeting";

import Documents from "../../components/landingPages/ReuseableComponents/Documents";
import Task from "../../components/landingPages/ReuseableComponents/Task";
import UserLandingPage, { userLandingLoader } from "../../components/landingPages/user/UserLandingPage";
import UserOverview from "../../components/landingPages/user/UserOverview";
import Users, { action as userAction, loader as userLoader } from "../../components/pages/users/Users";
import RouteBlocker from "../../rbac/RouteBlocker";
export const userRouter = [
    { index: true, loader: userLoader, action: userAction, element: <Users /> },
    { path: 'new', loader: userFormLoader, element: <UserForm /> },
    {
        path: ':id', children: [
            { path: 'edit', loader: userFormLoader, element: <UserForm /> },
            {
                element: <UserLandingPage />, children: [
                    { index: true, loader: userLandingLoader, element: <UserOverview /> },
                    { path: 'tasks', element: <AllTasks /> },
                    { path: 'boardmeetings', loader: entityMeetingLoader, action: entityMeetingAction, element: <Boardmeeting /> },
                    { path: 'documents', element: <Documents /> },
                ]
            }
        ]
    },
]