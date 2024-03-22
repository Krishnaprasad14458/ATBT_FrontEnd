import Dashboard, { loader as dashboardLoader, action as dashboardAction } from "../../components/pages/dashboard/Dashboard";
import { loader as entityDashboardResourceLoader } from "../../components/pages/dashboard/resoucesDashboard/entityDashboardResource";
import { loader as meetingDashboardResourceLoader } from "../../components/pages/dashboard/resoucesDashboard/meetingDashboardResource";
import { loader as teamDashboardResourceLoader } from "../../components/pages/dashboard/resoucesDashboard/teamDashboardResource";
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
    },
    {
        path: "resource/dashboard/meeting",
        loader: meetingDashboardResourceLoader,
    },
    {
        path: "resource/dashboard/team",
        loader: teamDashboardResourceLoader,
    },
]