
import TeamsForm, { teamFormLoader } from "../../componentLayer/pages/teams/createTeamsForm/TeamsForm";
import AllTasks from "../../componentLayer/pages/landingPages/ReuseableComponents/AllTasks";
import Boardmeeting, { action as entityMeetingAction, loader as entityMeetingLoader } from "../../componentLayer/pages/landingPages/ReuseableComponents/Boardmeeting";
import Documents from "../../componentLayer/pages/landingPages/ReuseableComponents/Documents";
import TeamsLandingPage from "../../componentLayer/pages/landingPages/teams/TeamsLandingPage";
import TeamsOverview from "../../componentLayer/pages/landingPages/teams/TeamsOverview";
import Teams, { loader as teamLoader } from "../../componentLayer/pages/teams/teamsList/Teams";
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