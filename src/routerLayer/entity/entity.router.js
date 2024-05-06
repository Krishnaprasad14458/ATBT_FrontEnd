import EntityForm, {
  entityFormLoader,
} from "../../componentLayer/pages/entities/createEntityForm/EntityForm";
import Boardmeeting, {
  action as entityMeetingAction,
  loader as entityMeetingLoader,
} from "../../componentLayer/components/LandingPage/Boardmeeting";
import Documents from "../../componentLayer/components/LandingPage/Documents";
import EntityLandingPage from "../../componentLayer/pages/entities/entityLandingPage/EntityLandingPage";
import Overview from "../../componentLayer/pages/entities/entityLandingPage/Overview";
import Entities, {
  action as entityAction,
  loader as entityLoader,
} from "../../componentLayer/pages/entities/entitiesList/Entities";
import AllTasks from "../../componentLayer/components/LandingPage/AllTasks";
import { Link } from "react-router-dom";

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
        children: [
          { index: true, element: <Overview /> },
          { path: "tasks", element: <AllTasks /> },
          {
            path: ":moduleName/boardmeetings",
            loader: entityMeetingLoader,
            action: entityMeetingAction,
            element: <Boardmeeting />,
          },
          { path: "documents", element: <Documents /> },
        ],
      },
    ],
  },
];
