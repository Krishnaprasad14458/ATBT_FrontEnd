import UserForm, {
  userFormLoader,
} from "../../componentLayer/pages/users/createUserForm/UserForm";
import { Link } from "react-router-dom";
import AllTasks from "../../componentLayer/components/LandingPage/AllTasks";
import Boardmeeting, {
  action as entityMeetingAction,
  loader as entityMeetingLoader,
} from "../../componentLayer/components/LandingPage/Boardmeeting";
import Documents from "../../componentLayer/components/LandingPage/Documents";
import UserLandingPage, {
  userLandingLoader,
} from "../../componentLayer/pages/users/userLandingPage/UserLandingPage";
import UserOverview from "../../componentLayer/pages/users/userLandingPage/UserOverview";
import Users, {
  action as userAction,
  loader as userLoader,
} from "../../componentLayer/pages/users/usersList/Users";
import MeetingWiseTask, { MeetingWiseTasksActions, tasksLoader } from "../../componentLayer/components/LandingPage/MeetingWiseTask";
import { Children } from "react";
export const userRouter = [
  { index: true, loader: userLoader, action: userAction, element: <Users /> },
  { path: "new", loader: userFormLoader, element: <UserForm /> },
  { path: ":id", 
  children :[
  
      {path: "edit", loader: userFormLoader, element: <UserForm />},
   { element: <UserLandingPage />,children:
   [
    {index: true,loader: userLandingLoader,element: <UserOverview />,},
    {path: "tasks",element: <AllTasks />,},
    {
                  path: "boardmeetings",
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
                    },
                  ],
                },
                {
                              path: "documents",
                              element: <Documents />,
                            },
  ]}
  ]
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
