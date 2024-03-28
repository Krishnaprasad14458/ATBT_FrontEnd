import EntityForm, { entityFormLoader } from "../../components/createForm/createEntityForm/EntityForm";
import Boardmeeting from "../../components/landingPages/ReuseableComponents/Boardmeeting";
import Documents from "../../components/landingPages/ReuseableComponents/Documents";
import EntityLandingPage from "../../components/landingPages/entity/EntityLandingPage";
import Overview from "../../components/landingPages/entity/Overview";
import Task from "../../components/landingPages/ReuseableComponents/Task";
import BoardMeetings from "../../components/pages/boardMeetings/BoardMeetings";
import Entities, { action as entityAction, loader as entityLoader } from "../../components/pages/entities/Entities";
import RouteBlocker from "../../rbac/RouteBlocker";

export const entityRouter = [
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'entity' && permission.canRead} />,
        children: [
            { index: true, loader: entityLoader, action: entityAction, element: <Entities />, },
            { path: ':id', element: <EntityLandingPage />, children: [
                { path: 'overview', element: <Overview />  },
                { path: 'task', element: <Task /> },
                { path: 'boardmeetings', element: <Boardmeeting /> },
                { path: 'documents', element: <Documents/> },
            ] },
        ]
    },
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'entity' && permission.canCreate} />,
        children: [
            { path: 'new', loader: entityFormLoader, element: <EntityForm /> },
        ]
    },
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'entity' && permission.canUpdate} />,
        children: [
            { path: ':id/edit', loader: entityFormLoader, element: <EntityForm /> },
        ]
    },
]