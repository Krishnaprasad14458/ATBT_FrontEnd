import EntityForm, {
  entityFormLoader,
} from "../../componentLayer/pages/entities/createEntityForm/EntityForm";
import Boardmeeting, {
  action as entityMeetingAction,
  loader as entityMeetingLoader,
} from "../../componentLayer/components/LandingPageComponents/Boardmeeting";
import Documents from "../../componentLayer/components/LandingPageComponents/Documents";
import EntityLandingPage from "../../componentLayer/pages/entities/entityLandingPage/EntityLandingPage";
import EntityOverview from "../../componentLayer/pages/entities/entityLandingPage/EntityOverview";
import Entities, {
  action as entityAction,
  loader as entityLoader,
} from "../../componentLayer/pages/entities/entitiesList/Entities";

import { Link } from "react-router-dom";
import Tasks, { TasksActions, tasksLoader } from "../../componentLayer/components/LandingPageComponents/Tasks";

export const entityRouter = [
  {
    index: true,
    loader: entityLoader,
    action: entityAction,
    element: <Entities />,
  },
  {
    path: "new",
    loader: entityFormLoader,
    element: <EntityForm />,
    handle: {
      crumb: () => <Link to="/entities/new">New User</Link>,
    },
  },
  {
    path: ":id",
    children: [
      {
        path: "edit",
        loader: entityFormLoader,
        element: <EntityForm />,
        handle: {
          crumb: (data) => <Link to={data.threadPath}>{data.threadName}</Link>,
        },
      },
      {
        element: <EntityLandingPage />,
        handle: {
          crumb: (data) => (
            <Link to={data?.data?.threadPath}>{data?.data?.threadName}</Link>
          ),
        },
        children: [
          { index: true, element: <EntityOverview /> },

          { path: "tasks",    element: <Tasks /> , handle: {
            crumb: () => <Link to="">Tasks</Link>,
          },},


          {
            path: ":boardmeetings",
            loader: entityMeetingLoader,
            action: entityMeetingAction,
            handle: {
              crumb: (data) => (
                <Link to={data.threadPath}>{data.threadName}</Link>
              ),
            },
            children: [
              {
                index: true,
                loader: entityMeetingLoader,
                action: entityMeetingAction,
                element: <Boardmeeting />,
              },
              {
                path: ":BMid",
                loader: tasksLoader,
                action: TasksActions,
                element: <Tasks />,
                handle: {
                  crumb: (data) => (
                    <Link to={data.threadPath}>{data.threadName}</Link>
                  ),
                },
              },
            ],
          },


          { path: "documents", element: <Documents /> ,  handle: {
            crumb: () => <Link to="">Documents</Link>,
          },},
        ],
      },
    ],
  },
];
