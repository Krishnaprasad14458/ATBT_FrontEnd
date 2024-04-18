import EntityForm, { entityFormLoader } from "../../componentLayer/pages/entities/createEntityForm/EntityForm"
import Boardmeeting, { action as entityMeetingAction, loader as entityMeetingLoader } from '../../componentLayer/pages/landingPages/ReuseableComponents/Boardmeeting'
import Documents from "../../componentLayer/pages/landingPages/ReuseableComponents/Documents";
import EntityLandingPage from "../../componentLayer/pages/landingPages/entity/EntityLandingPage";
import Overview from "../../componentLayer/pages/landingPages/entity/Overview";
import Entities, { action as entityAction, loader as entityLoader } from "../../componentLayer/pages/entities/entitiesList/Entities";
import AllTasks from "../../componentLayer/pages/landingPages/ReuseableComponents/AllTasks";

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