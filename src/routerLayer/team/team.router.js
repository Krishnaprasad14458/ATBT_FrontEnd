import TeamsForm, { teamFormLoader } from "../../components/createForm/TeamsForm/TeamsForm";
import AllTasks from "../../components/landingPages/ReuseableComponents/AllTasks";
import Boardmeeting, { action as entityMeetingAction, loader as entityMeetingLoader } from "../../components/landingPages/ReuseableComponents/Boardmeeting";

import Documents from "../../components/landingPages/ReuseableComponents/Documents";

import TeamsLandingPage from "../../components/landingPages/teams/TeamsLandingPage";
import TeamsOverview from "../../components/landingPages/teams/TeamsOverview";
import Teams, { loader as teamLoader } from "../../components/pages/teams/Teams";
import RouteBlocker from "../../rbac/RouteBlocker";


export const teamRouter = [
    { index: true, loader: teamLoader, element: <Teams />, },
    { path: 'new', loader: teamFormLoader, element: <TeamsForm /> },
    {
        path: ':id', children: [
            { path: 'edit', loader: teamFormLoader, element: <TeamsForm /> },
            {
                element: <TeamsLandingPage />, children: [
                    { index: true, element: <TeamsOverview /> },
                    { path: 'task', element: <AllTasks /> },
                    { path: 'boardmeetings', loader: entityMeetingLoader, action: entityMeetingAction, element: <Boardmeeting /> },
                    { path: 'documents', element: <Documents /> },
                ]
            }
        ]
    },
]