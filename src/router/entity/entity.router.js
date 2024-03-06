import EntityForm from "../../components/createForm/createEntityForm/EntityForm";
import EntityLandingPage from "../../components/landingPages/entity/EntityLandingPage";
import Entities from "../../components/pages/entities/Entities";
import RouteBlocker from "../../rbac/RouteBlocker";

export const entityRouter = [
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'entity' && permission.canRead} />,
        children: [
            { path: 'entities', element: <Entities />, },
            { path: 'entitylandingpage/:id', element: <EntityLandingPage /> },
        ]
    },
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'entity' && permission.canCreate} />,
        children: [
            { path: 'entities/new', element: <EntityForm /> },
        ]
    },
]