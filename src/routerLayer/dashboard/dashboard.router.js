import Dashboard, { loader as dashboardLoader } from "../../components/pages/dashboard/Dashboard";

export const dashboardRouter = [
    { index: true, loader: dashboardLoader, element: <Dashboard /> },
]