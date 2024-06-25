import TeamsForm, {
  teamFormLoader,
} from "../../componentLayer/pages/teams/createTeamsForm/TeamsForm";
import { Link } from "react-router-dom";
import Boardmeeting, {
  action as MeetingAction,
  loader as MeetingLoader,
} from "../../componentLayer/components/LandingPageComponents/Boardmeeting";

import Documents from "../../componentLayer/components/LandingPageComponents/Documents";
import TeamsLandingPage from "../../componentLayer/pages/teams/teamsLandingPages/TeamsLandingPage";
import TeamsOverview, {
  teamLandingLoader,
} from "../../componentLayer/pages/teams/teamsLandingPages/TeamsOverview";
import Teams, {
  TeamsAction,
  TeamsLoader,
} from "../../componentLayer/pages/teams/teamsList/Teams";
import Tasks, {
  TasksActions,
  tasksLoader,
} from "../../componentLayer/components/LandingPageComponents/Tasks";
import BoardMeetingOverview, {
  boardMeetingOverviewLoader,
} from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingOverview";
import MeetingWiseDocuments from "../../componentLayer/components/LandingPageComponents/MeetingWiseDocuments";
export const teamRouter = [
  {
    index: true,
    loader: TeamsLoader,
    action: TeamsAction,
    element: <Teams />,
  },
  {
    path: "new",
    loader: teamFormLoader,
    element: <TeamsForm />,
    handle: {
      crumb: () => <Link to="/teams/new">New Team</Link>,
    },
  },
  {
    path: ":id",
    children: [
      {
        path: "edit",
        loader: teamFormLoader,
        element: <TeamsForm />,
        handle: {
          crumb: (data) => <Link to={data.threadPath}>{data.threadName}</Link>,
        },
      },
      {
        element: <TeamsLandingPage />,
        loader: teamLandingLoader,
        handle: {
          crumb: (data) => (
            <Link to={data?.data?.threadPath}>{data?.data?.threadName}</Link>
          ),
        },
        children: [
          {
            index: true,
            loader: teamLandingLoader,
            element: <TeamsOverview />,
          },
          {
            path: "tasks/:statusType",
            loader: tasksLoader,
            action: TasksActions,
            element: (
              <Tasks
                NameModule="teams"
                tasksWithBm="false"
                groupName="groupTeam"
              />
            ),
            handle: {
              crumb: (data) => (
                <Link
                  to={{
                    pathname: data?.threadPath,
                    // search: `?status=To-Do`,
                  }}
                >
                  {data?.threadName}
                </Link>
              ),
            },
          },
          {
            path: ":boardmeetings",
            
            children: [
              // /users/:id/:boardmeetings                     bmeetings list
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
                >
                  {data.threadName}
                </Link>
              ),
            },
              },
              // /users/:id/:boardmeetings/:BMid        tasks of :BMid  bmeetings
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
                    element: <Tasks NameModule="teams" tasksWithBm="true" />,
                    handle: {
                      crumb: (data) => (
                        <Link to={data?.threadPath}>{data?.threadName}</Link>
                      ),
                    },
                  },
                  {
                    path: "documents",
                    element: <MeetingWiseDocuments  belongsTo ="boardMeeting" />,
                    handle: {
                      crumb: (data) => <Link to=""> Attachments</Link>,
                    },
                  },
                ],
              },
            ],
          },

          {
            path: "documents",
            element: <Documents  belongsTo ="team" />,
            handle: {
              crumb: () => <Link to=""> Attachments</Link>,
            },
          },
        ],
      },
    ],
  },
];


// {
//     path: ':id', children: [
//         { path: 'edit', loader: teamFormLoader, element: <TeamsForm /> },
//         {
//             element: <TeamsLandingPage />, children: [
//                 { index: true, element: <TeamsOverview /> },
//                 // { path: 'tasks', element: <AllTasks /> },
//                 { path: ':moduleName/boardmeetings', loader: entityMeetingLoader, action: entityMeetingAction, element: <Boardmeeting /> },
//                 { path: 'documents', element: <Documents /> },
//             ]
//         }
//     ]
// },
