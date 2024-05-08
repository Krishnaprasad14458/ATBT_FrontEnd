import BoardMeetingForm, {
  boardmeetingFormLoader,
} from "../../componentLayer/pages/boardmeetings/createBoardMeetingForm/BoardMeetingForm";
import Documents from "../../componentLayer/components/LandingPageComponents/Documents";
import BoardMeetingLandingPage from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingLandingPage";
import BoardMeetings, {
  action as meetingAction,
  loader as meetingLoader,
} from "../../componentLayer/pages/boardmeetings/boardMeetingsList/BoardMeetings";
import BoardMeetingOverview from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingOverview";
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
    path: ":id",
    children: [
      {
        path: "edit",
        loader: boardmeetingFormLoader,
        element: <BoardMeetingForm />,
      },
      {
        element: <BoardMeetingLandingPage />,
        children: [
          { index: true, element: <BoardMeetingOverview /> },
          {
            path: "task",
            loader: tasksLoader,
            action: TasksActions,
            element: <Tasks />,
          },
          { path: "documents", element: <Documents /> },
        ],
      },
    ],
  },
];
