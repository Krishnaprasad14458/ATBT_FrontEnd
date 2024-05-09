import UserForm, {
  userFormLoader,
} from "../../componentLayer/pages/users/createUserForm/UserForm";
import { Link } from "react-router-dom";
import Boardmeeting, {
  action as entityMeetingAction,
  loader as entityMeetingLoader,
} from "../../componentLayer/components/LandingPageComponents/Boardmeeting";
import Documents from "../../componentLayer/components/LandingPageComponents/Documents";
import { userLandingLoader } from "../../componentLayer/pages/users/userLandingPage/UserOverview";
import UserLandingPage from "../../componentLayer/pages/users/userLandingPage/UserLandingPage";
import UserOverview from "../../componentLayer/pages/users/userLandingPage/UserOverview";
import Users, {
  action as userAction,
  loader as userLoader,
} from "../../componentLayer/pages/users/usersList/Users";
import Tasks, {
  TasksActions,
  tasksLoader,
} from "../../componentLayer/components/LandingPageComponents/Tasks";
import BoardMeetingOverview, { boardMeetingOverviewLoader } from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingOverview";
import BoardMeetingForm, { boardmeetingFormLoader } from "../../componentLayer/pages/boardmeetings/createBoardMeetingForm/BoardMeetingForm";

export const userRouter = [
  //   /users     <users/>
  {
    index: true,
    loader: userLoader,
    action: userAction,
    element: <Users />,
  },
  // /users/new

  {
    path: "new",
    loader: userFormLoader,
    element: <UserForm />,
    handle: {
      crumb: () => <Link to="/users/new">New User</Link>,
    },
  },
  // /users/:id

  {
    path: ":id",
    children: [
      // /users/:id/ edit
      {
        path: "edit",
        loader: userFormLoader,
        element: <UserForm />,
        handle: {
          crumb: (data) => <Link to={data.threadPath}>{data.threadName}</Link>,
        },
      },
      {
        element: <UserLandingPage />,
        loader: userLandingLoader,
        handle: {
          crumb: (data) => (
            <Link to={data?.data?.threadPath}>{data?.data?.threadName}</Link>
          ),
        },
        children: [
          // /users/:id          overview

          {
            index: true,
            loader: userLandingLoader,
            element: <UserOverview />,
          },
          // /users/:id/tasks          all tasks
          {
            path: "tasks",
            loader: tasksLoader,
            action: TasksActions,
            element: <Tasks />,
            handle: {
              crumb: () => <Link to="">Tasks</Link>,
            },
          },
          // /users/:id/:boardmeetings                     bmeetings

          {
            path: ":boardmeetings",
            loader: entityMeetingLoader,
            handle: {
              crumb: (data) => (
                <Link to={data.threadPath}>{data.threadName}</Link>
              ),
            },
            children: [
              // /users/:id/:boardmeetings                     bmeetings list
              {
                index: true,
                loader: entityMeetingLoader,
                action: entityMeetingAction,
                element: <Boardmeeting />,
                
              },
              // /users/:id/:boardmeetings/:BMid        tasks of :BMid  bmeetings
              {
                path: ":BMid",
               
                children: [
                  {
                    index: true,
                    loader : boardMeetingOverviewLoader,
                    element: <BoardMeetingOverview />,
                  },
                  {
                    path: "tasks",
                    loader: tasksLoader,
                    action: TasksActions,
                    element: <Tasks />,
                  },
                  {
                    path: "documents",
                    element: <Documents />,

                  },
                ],
              },
            ],
          },
          // /users/:id/documents                     documents
          {
            path: "documents",
            element: <Documents />,
            handle: {
              crumb: () => <Link to="">Documents</Link>,
            },
          },
        ],
      },
    ],
  },
];
