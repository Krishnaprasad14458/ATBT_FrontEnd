import Settings from "../../components/pages/settings/Settings";
import { roleRouter } from "./role/role.router";
import { organizationRouter } from "./organization/organization.router";
import { formRouter } from "./form/form.router";
import { itegrationRoutes } from "./integration/integration.router";
import { communicationRouter } from "./communication/commucation.router";

export const settingRouter = [
    { path: "settings", element: <Settings /> },
    ...organizationRouter,
    ...formRouter,
    ...communicationRouter,
    ...roleRouter,
    ...itegrationRoutes,
]