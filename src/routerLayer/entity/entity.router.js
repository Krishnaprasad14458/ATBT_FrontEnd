import EntityForm, {
  entityFormLoader,
} from "../../componentLayer/pages/entities/createEntityForm/EntityForm";
import Boardmeeting, {
  action as MeetingAction,
  loader as MeetingLoader,
} from "../../componentLayer/components/LandingPageComponents/Boardmeeting";
import Documents from "../../componentLayer/components/LandingPageComponents/Documents";
import EntityLandingPage from "../../componentLayer/pages/entities/entityLandingPage/EntityLandingPage";
import EntityOverview, {

  entityOverviewLoader,
} from "../../componentLayer/pages/entities/entityLandingPage/EntityOverview";
import Entities, {
  action as entityAction,
  loader as entityLoader,
} from "../../componentLayer/pages/entities/entitiesList/Entities";

import { Link } from "react-router-dom";
import Tasks, {
  TasksActions,
  tasksLoader,
} from "../../componentLayer/components/LandingPageComponents/Tasks";
import BoardMeetingOverview, { boardMeetingOverviewLoader } from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingOverview";

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
      crumb: () => <Link to="/entities/new">New Entity</Link>,
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
        loader: entityOverviewLoader,
        handle: {
          crumb: (data) => (
            <Link to={data?.data?.threadPath}>{data?.data?.threadName}</Link>
          ),
        },
        children: [
          {
            index: true,
            loader: entityOverviewLoader,
            element: <EntityOverview />,
          },

          {
            path: "tasks",
            loader: tasksLoader,
            action: TasksActions,
          
            element:  <Tasks NameModule="entities" tasksWithBm = "false" groupName="groupEntity" />,
            handle: {
              crumb: (data) => (
                <Link 
                to={{
                  pathname: data?.threadPath,
                  search: `?status=To-Do`,
                }}
                
                
                
                >{data?.threadName}</Link>
              ),
            },
          },

          {
            path: ":boardmeetings",
            loader: MeetingLoader,
            handle: {
              crumb: (data) => (
                <Link 
                to={{
                  pathname: data.threadPath,
                  search: `?search=&page=1&pageSize=10`,
                }}
                
                >{data.threadName}</Link>
              ),
            },
            children: [
              {
                index: true,
                loader: MeetingLoader,
                action: MeetingAction,
                element: <Boardmeeting />,
              },
              {
                path: ":BMid",
                loader: boardMeetingOverviewLoader,
                // element: <BoardMeetingOverview />,
                handle: {
                  crumb: (data) => (
                    <Link to={data.threadPath}>{data.threadName}</Link>
                  ),
                },
                children: [
                  {
                    index: true,
                    loader: boardMeetingOverviewLoader,
                    element: <BoardMeetingOverview />,
                   
                  },
                  {
                    path: "tasks",
                    loader: tasksLoader,
                    action: TasksActions,
      
                    element:  <Tasks NameModule="entities" tasksWithBm = "true" />,
                    handle: {
                      crumb: (data) => (
                        <Link to={data?.threadPath}>{data?.threadName}</Link>
                      ),
                    },
                  },
                  {
                    path: "documents",
                    element: <Documents />,
                    handle: {
                      crumb: (data) => (
                        <Link to=".">Documents</Link>
                      ),
                    },
                  },
                ],
              },
            ],
          },

          {
            path: "documents",
            element: <Documents />,
            handle: {
              crumb: () => <Link to=".">Entity Documents</Link>,
            },
          },
        ],
      },
    ],
  },
];
