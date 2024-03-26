import Dashboard, { loader as dashboardLoader, action as dashboardAction } from "../../components/pages/dashboard/Dashboard";
import { loader as entityDashboardResourceLoader } from "../../components/pages/dashboard/resoucesDashboard/entityDashboardResource";
import { loader as userDashboardResourceLoader } from "../../components/pages/dashboard/resoucesDashboard/userDashboardResource";
export const dashboardRouter = [
    {
        index: true, loader: dashboardLoader, action: dashboardAction, element: <Dashboard />
    },
    {
        path: "resource/dashboard/user",
        loader: userDashboardResourceLoader,
    },
    {
        path: "resource/dashboard/entity",
        loader: entityDashboardResourceLoader,
    }
]