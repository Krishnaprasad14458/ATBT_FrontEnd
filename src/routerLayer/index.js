import PublicLayout from "../componentLayer/pages/layout/PublicLayout";
import RequireAuth from "../componentLayer/pages/layout/RequireAuth";
import { createBrowserRouter, redirect, Link } from "react-router-dom";
import { authRoutes } from "./auth/auth.router";
import { httpInterceptors } from "./httpInts/httpInts.router";
import { homeRouter } from "./home/home.router";
import { reportRouter } from "./report/report.router";
import { settingRouter } from "./setting/setting.router";
import { meetingRouter } from "./meeting/meeting.router";
import { userRouter } from "./user/user.router";
import { entityRouter } from "./entity/entity.router";
import { teamRouter } from "./team/team.router";
import { taskRouter } from "./task/task.router";
import RouteBlocker from "../rbac/RouteBlocker";
import ErrorBoundary from "../componentLayer/pages/errorPages/ErrorBoundary";
import "../App.css";
import { resourceRouter } from "./resources/resource.route";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth />,
    ErrorBoundary: ErrorBoundary,
    children: [
      ...homeRouter,
      ...resourceRouter,
      {
        path: "users",
        children: [...userRouter],
        handle: {
          crumb: () => <Link to="/users">Users</Link>,
        },
      },
      {
        path: "entities",
        children: [...entityRouter],
        // handle: {
        //   crumb: () => <Link to="/entities">Entities</Link>,
        // },
      },
      {
        path: "teams",
        children: [...teamRouter],
        handle: {
          crumb: () => <Link to="/teams">Teams</Link>,
        },
      },
      {
        path: "boardmeetings",
        children: [...meetingRouter],
      },
      {
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "meeting" && permission.canRead
            }
          />
        ),
        children: [...meetingRouter],
      },
      {
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "task" && permission.canRead
            }
          />
        ),
        children: [...taskRouter],
      },
      {
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "team" && permission.canRead
            }
          />
        ),
        children: [...teamRouter],
      },
      {
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "report" && permission.canRead
            }
          />
        ),
        children: [...reportRouter],
      },
      {
        element: (
          <RouteBlocker
            permissionCheck={(permission) =>
              permission.module === "setting" && permission.canRead
            }
          />
        ),
        path: "settings",
        children: [...settingRouter],
      },
    ],
  },
  {
    element: <PublicLayout />,
    children: [...authRoutes, ...httpInterceptors],
  },
]);

// ...dashboardRouter,
// ...userRouter,
// ...entityRouter,
// ...meetingRouter,
// ...taskRouter,
// ...teamRouter,
// ...reportRouter,
// ...settingRouter,
