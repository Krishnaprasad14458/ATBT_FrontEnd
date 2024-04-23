
import TeamsForm, { teamFormLoader } from "../../componentLayer/pages/teams/createTeamsForm/TeamsForm";
import AllTasks from "../../componentLayer/components/LandingPage/AllTasks";
import Boardmeeting, { action as entityMeetingAction, loader as entityMeetingLoader } from "../../componentLayer/components/LandingPage/Boardmeeting";
import Documents from "../../componentLayer/components/LandingPage/Documents";
import TeamsLandingPage from "../../componentLayer/pages/teams/teamsLandingPages/TeamsLandingPage";
import TeamsOverview from "../../componentLayer/pages/teams/teamsLandingPages/TeamsOverview";
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
                    { path: 'tasks', element: <AllTasks /> },
                    { path: ':moduleName/boardmeetings', loader: entityMeetingLoader, action: entityMeetingAction, element: <Boardmeeting /> },
                    { path: 'documents', element: <Documents /> },
                ]
            }
        ]
    },
]