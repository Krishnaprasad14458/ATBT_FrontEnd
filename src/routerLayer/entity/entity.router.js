import EntityForm, { entityFormLoader } from "../../components/createForm/createEntityForm/EntityForm";
import Boardmeeting, { action as entityMeetingAction, loader as entityMeetingLoader } from "../../components/landingPages/ReuseableComponents/Boardmeeting";
import Documents from "../../components/landingPages/ReuseableComponents/Documents";
import EntityLandingPage from "../../components/landingPages/entity/EntityLandingPage";
import Overview from "../../components/landingPages/entity/Overview";
import BoardMeetings from "../../components/pages/boardMeetings/BoardMeetings";
import Entities, { action as entityAction, loader as entityLoader } from "../../components/pages/entities/Entities";
import RouteBlocker from "../../rbac/RouteBlocker";
import AllTasks from "../../components/landingPages/ReuseableComponents/AllTasks";

export const entityRouter = [
    { index: true, loader: entityLoader, action: entityAction, element: <Entities />, },
    { path: 'new', loader: entityFormLoader, element: <EntityForm /> },
    {
        path: ':id', children: [
            { path: 'edit', loader: entityFormLoader, element: <EntityForm /> },
            {
                element: <EntityLandingPage />, children: [
                    { index: true, element: <Overview /> },
                    { path: 'task', element: <AllTasks /> },
                    { path: 'boardmeetings', loader: entityMeetingLoader, action: entityMeetingAction, element: <Boardmeeting /> },
                    { path: 'documents', element: <Documents /> },
                ]
            }
        ]
    },
]