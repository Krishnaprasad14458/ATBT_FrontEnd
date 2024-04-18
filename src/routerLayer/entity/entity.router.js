import EntityForm, { entityFormLoader } from "../../componentLayer/pages/entities/createEntityForm/EntityForm"
import Boardmeeting, { action as entityMeetingAction, loader as entityMeetingLoader } from '../../componentLayer/components/LandingPage/Boardmeeting'
import Documents from "../../componentLayer/components/LandingPage/Documents";
import EntityLandingPage from "../../componentLayer/pages/entities/entityLandingPage/EntityLandingPage";
import Overview from "../../componentLayer/pages/entities/entityLandingPage/Overview";
import Entities, { action as entityAction, loader as entityLoader } from "../../componentLayer/pages/entities/entitiesList/Entities";
import AllTasks from "../../componentLayer/components/LandingPage/AllTasks";

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