import BoardMeetingForm, {
  boardmeetingFormLoader,
} from "../../componentLayer/pages/boardmeetings/createBoardMeetingForm/BoardMeetingForm";
import Documents from "../../componentLayer/components/LandingPageComponents/Documents";
import BoardMeetingLandingPage from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingLandingPage";
import BoardMeetings, {
  action as meetingAction,
  loader as meetingLoader,
} from "../../componentLayer/pages/boardmeetings/boardMeetingsList/BoardMeetings";
import BoardMeetingOverview, { boardMeetingOverviewLoader } from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingOverview";
import Tasks, {
  TasksActions,
  tasksLoader,
} from "../../componentLayer/components/LandingPageComponents/Tasks";

export const meetingRouter = [
  {
    index: true,
    loader: meetingLoader,
    action: meetingAction,
    element: <BoardMeetings />,
  },
  {
    path: "new",
    loader: boardmeetingFormLoader,
    element: <BoardMeetingForm />,
  },
  {
    path: ":BMid",
    element: <BoardMeetingLandingPage />,

    children: [
      {
        index: true,
        loader: boardMeetingOverviewLoader,
        element: <BoardMeetingOverview />,
      },
      {
        path: "edit",
        loader: boardmeetingFormLoader,
        element: <BoardMeetingForm />,
      },
      {
        path: "tasks",
        loader: tasksLoader,
        action: TasksActions,
        element: <Tasks />,
        // handle: {
        //   crumb: (data) => (
        //     <Link to={data?.threadPath}>{data?.threadName}</Link>
        //   ),
        // },
      },
      {
        path: "documents",
        element: <Documents />,
        // handle: {
        //   crumb: (data) => <Link to=".">Documents</Link>,
        // },
      },
      
    ],
  },
];