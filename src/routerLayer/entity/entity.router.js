import EntityForm, { entityFormLoader } from "../../components/createForm/createEntityForm/EntityForm";
import EntityLandingPage from "../../components/landingPages/entity/EntityLandingPage";
import Overview from "../../components/landingPages/entity/Overview";
import Entities, { action as entityAction, loader as entityLoader } from "../../components/pages/entities/Entities";
import RouteBlocker from "../../rbac/RouteBlocker";

export const entityRouter = [
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'entity' && permission.canRead} />,
        children: [
            { index: true, loader: entityLoader, action: entityAction, element: <Entities />, },
            { path: ':id', element: <EntityLandingPage />, children: [
                { path: 'overview', element: <Overview /> },
                { path: 'task', element: <Overview /> },

                { path: 'boardmeetings', element: <Overview /> },

                { path: 'documents', element: <Overview /> },


                // { path: 'sub-route-2', element: <SubComponent2 /> }
                // Add more sub-children as needed
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