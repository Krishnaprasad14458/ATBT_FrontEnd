// import TeamsForm from "../../components/createForm/TeamsForm/TeamsForm";
// import TeamsLandingPage from "../../components/landingPages/teams/TeamsLandingPage";
// import Teams from "../../components/pages/teams/Teams";

// export const teamRouter = [
//     { path: 'teams', element: <Teams /> },
//     { path: 'teams/new', element: <TeamsForm /> },
//     { path: 'teamslandingpage/:id', element: <TeamsLandingPage /> },
// ]



import TeamsForm, { teamFormLoader } from "../../components/createForm/TeamsForm/TeamsForm";
import Boardmeeting from "../../components/landingPages/ReuseableComponents/Boardmeeting";
import Documents from "../../components/landingPages/ReuseableComponents/Documents";
import Task from "../../components/landingPages/ReuseableComponents/Task";
import TeamsLandingPage from "../../components/landingPages/teams/TeamsLandingPage";
import TeamsOverview from "../../components/landingPages/teams/TeamsOverview";
import Teams from "../../components/pages/teams/Teams";
import RouteBlocker from "../../rbac/RouteBlocker";


export const teamRouter = [
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'team' && permission.canRead} />,
        children: [
            { index: true, element: <Teams />, },
            {
                path: ':id', element: <TeamsLandingPage />
                , children: [
                    { path: 'overview', element: <TeamsOverview /> },
                    { path: 'task', element: <Task /> },
                    { path: 'boardmeetings', element: <Boardmeeting /> },
                    { path: 'documents', element: <Documents /> },
                ]
            },
        ]
    },
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'team' && permission.canCreate} />,
        children: [
            { path: 'new', loader: teamFormLoader, element: <TeamsForm /> },
        ]
    },
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'team' && permission.canUpdate} />,
        children: [
            { path: ':id/edit', loader: teamFormLoader, element: <TeamsForm /> },
        ]
    },
]