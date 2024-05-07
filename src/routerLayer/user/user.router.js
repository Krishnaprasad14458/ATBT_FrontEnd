import UserForm, {
  UserFormActions,
  userFormLoader,
} from "../../componentLayer/pages/users/createUserForm/UserForm";
import { Link } from "react-router-dom";
import AllTasks from "../../componentLayer/components/LandingPage/AllTasks";
import Boardmeeting, {
  action as entityMeetingAction,
  loader as entityMeetingLoader,
} from "../../componentLayer/components/LandingPage/Boardmeeting";
import Documents from "../../componentLayer/components/LandingPage/Documents";
import { userLandingLoader } from "../../componentLayer/pages/users/userLandingPage/UserOverview";
import UserLandingPage from "../../componentLayer/pages/users/userLandingPage/UserLandingPage";
import UserOverview from "../../componentLayer/pages/users/userLandingPage/UserOverview";
import Users, {
  action as userAction,
  loader as userLoader,
} from "../../componentLayer/pages/users/usersList/Users";
import MeetingWiseTask, {
  MeetingWiseTasksActions,
  tasksLoader,
} from "../../componentLayer/components/LandingPage/MeetingWiseTask";

export const userRouter = [
  {
    index: true,
    loader: userLoader,
    action: userAction,
    element: <Users />,
  },
  {
    path: "new",
    loader: userFormLoader,
    action: UserFormActions,
    element: <UserForm />,
    handle: {
      crumb: () => <Link to="/users/new">New User</Link>,
    },
  },
  {
    path: ":id",
    children: [
      {
        path: "edit",
        loader: userFormLoader,
        action: UserFormActions,
        element: <UserForm />,
        handle: {
          crumb: (data) => <Link to={data.threadPath}>{data.threadName}</Link>,
        },
      },
      {
        element: <UserLandingPage />,
        loader: userLandingLoader,
        handle: {
          crumb: (data) => <Link to={data?.data?.threadPath}>{data?.data?.threadName}</Link>,
        },
        children: [
          {
            index: true,
            loader: userLandingLoader,
            element: <UserOverview />,
            // handle: {
            //   crumb: () => <Link to="">Overview</Link>,
            // },
           
          },
          {
            path: "tasks",
            element: <AllTasks />,
            handle: {
              crumb: () => <Link to="">Tasks</Link>,
            },
          },
          {
            path: ":boardmeetings",
            loader: entityMeetingLoader,

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
                action: MeetingWiseTasksActions,
                element: <MeetingWiseTask />,
                handle: {
                  crumb: (data) => (
                    <Link to={data.threadPath}>{data.threadName}</Link>
                  ),
                },
              },
            ],
          },
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
    //     children :[
    //   {index:true,  loader: userLandingLoader, element: <UserOverview />,},

    // ]

    // children: [
    //   { path: "edit", loader: userFormLoader, element: <UserForm /> },
    //   {
    //     // index: true,
    //     children: [
    //       { path: "edit", loader: userFormLoader, element: <UserForm /> },
    //       {
    //         element: <UserLandingPage />,
    //         children: [
    //           {
    //             index: true,
    //             loader: userLandingLoader,
    //             element: <UserOverview />,
    //           },
    //           {
    //             path: "tasks",
    //             element: <AllTasks />,
    //           },
    //           {
    //             path: "boardmeetings",
    //             children: [
    //               {
    //                 index: true,
    //                 loader: entityMeetingLoader,
    //                 action: entityMeetingAction,
    //                 element: <Boardmeeting />,
    //               },
    //               {
    //                 path: ":BMid",
    //                 loader: tasksLoader,
    //                 action: MeetingWiseTasksActions,
    //                 element: <MeetingWiseTask />,
    //               },
    //             ],
    //           },
    //           {
    //             path: "documents",
    //             element: <Documents />,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  },
];

// children: [
//   {
//     index: true,
//     loader: userLandingLoader,
//     element: <UserOverview />,

//   },
//   {
//     path: "tasks",
//     element: <AllTasks />,

//   },
//   {
//     path: ":moduleName/boardmeetings",
//     loader: entityMeetingLoader,
//     action: entityMeetingAction,
//     element: <Boardmeeting />,

//   },
//   { path: "documents", element: <Documents /> ,

// },
// ],
