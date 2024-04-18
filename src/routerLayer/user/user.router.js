
import UserForm, { userFormLoader } from "../../componentLayer/pages/users/createUserForm/UserForm";
import AllTasks from "../../componentLayer/pages/landingPages/ReuseableComponents/AllTasks";
import Boardmeeting, { action as entityMeetingAction, loader as entityMeetingLoader } from "../../componentLayer/pages/landingPages/ReuseableComponents/Boardmeeting";
import Documents from "../../componentLayer/pages/landingPages/ReuseableComponents/Documents";
import UserLandingPage, { userLandingLoader } from "../../componentLayer/pages/landingPages/user/UserLandingPage";
import UserOverview from "../../componentLayer/pages/landingPages/user/UserOverview";
import Users, { action as userAction, loader as userLoader } from "../../componentLayer/pages/users/usersList/Users";
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