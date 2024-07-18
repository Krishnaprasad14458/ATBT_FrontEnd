import EntityForm, {
  entityFormLoader,
} from "../../componentLayer/pages/entities/createEntityForm/EntityForm";
import Boardmeeting, {
  loader,
  action as MeetingAction,
  loader as MeetingLoader,
} from "../../componentLayer/components/LandingPageComponents/Boardmeeting";
import Documents, { attachmentsLoader, Documentsloader, uploadAttachmentActions } from "../../componentLayer/components/LandingPageComponents/Documents";
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
import MeetingWiseDocuments, { MeetingWiseloader } from "../../componentLayer/components/LandingPageComponents/MeetingWiseDocuments";

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
            path: "tasks/:statusType",
            loader: tasksLoader,
            action: TasksActions,
          
            element:  <Tasks NameModule="entities" tasksWithBm = "false" groupName="groupEntity" />,
            handle: {
              crumb: (data) => (
                <Link 
                to={{
                  pathname: data?.threadPath,
                  search: `?search=&page=1&pageSize=10`,
                }}
                         
                >{data?.threadName}</Link>
              ),
            },
          },

          {
            path: ":boardmeetings",
            // loader: MeetingLoader,
            children: [
              {
                index: true,
                loader: MeetingLoader,
                action: MeetingAction,
                element: <Boardmeeting />,
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
                        <Link   to={{
                          pathname: data?.threadPath,
                          search: `?search=&page=1&pageSize=10`,
                        }}>{data?.threadName}</Link>
                       
                      ),
                    },
                  },
                  {
                    path: "documents",
                    element: <MeetingWiseDocuments belongsTo ="boardMeeting" />,
                    loader: MeetingWiseloader,
                    // action : uploadAttachmentActions,
                    // handle: {
                    //   crumb: (data) => (
                    //     <Link to=""> Attachments</Link>
                    //   ),
                    // },
                    handle: {
                      crumb: (data) => (
                        <Link   to={{
                          pathname: data?.threadPath,
                          // search: `?search=&page=1&pageSize=10`,
                        }}>Attachments</Link>
                       
                      ),
                    },
                  },
                ],
              },
            ],
          },

          {
            path: "documents",
            element: <Documents  belongsTo ="entity"  />,
            loader: Documentsloader,
            handle: {
              crumb: (data) => (
                <Link   to={{
                  pathname: data?.threadPath,
                  // search: `?search=&page=1&pageSize=10`,
                }}>Attachments</Link>
               
              ),
            },
          },
        ],
      },
    ],
  },
];
