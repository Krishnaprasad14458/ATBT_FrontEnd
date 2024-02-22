import EntityForm from "../../components/createForm/createEntityForm/EntityForm";
import EntityLandingPage from "../../components/landingPages/entity/EntityLandingPage";
import Entities from "../../components/pages/entities/Entities";

export const entityRouter = [
    { path: 'entities', element: <Entities />, },
    { path: 'entitylandingpage/:id', element: <EntityLandingPage /> },
    { path: 'entities/new', element: <EntityForm /> },
]