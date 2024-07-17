import BoardMeetingForm, {
  boardmeetingFormLoader,
} from "../../componentLayer/pages/boardmeetings/createBoardMeetingForm/BoardMeetingForm";
import Documents from "../../componentLayer/components/LandingPageComponents/Documents";
import BoardMeetingLandingPage from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingLandingPage";
import BoardMeetings, {
  action as meetingAction,
  loader as meetingLoader,
} from "../../componentLayer/pages/boardmeetings/boardMeetingsList/BoardMeetings";
import BoardMeetingOverview, {
  boardMeetingOverviewLoader,
} from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingOverview";
import Tasks, {
  TasksActions,
  tasksLoader,
} from "../../componentLayer/components/LandingPageComponents/Tasks";
import { Link } from "react-router-dom";
import MeetingWiseDocuments from "../../componentLayer/components/LandingPageComponents/MeetingWiseDocuments";

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
    children: [
      {
        path: "edit",
        loader: boardmeetingFormLoader,
        element: <BoardMeetingForm />,
      },
      {
        element: <BoardMeetingLandingPage />,
        loader: boardMeetingOverviewLoader,
        handle: {
          crumb: (data) => <Link to={data.threadPathForOutsideBM}>{data.threadName}</Link>,
        },
        children: [
          {
            index: true,
            loader: boardMeetingOverviewLoader,
            element: <BoardMeetingOverview />,
            // handle: {
            //   crumb: (data) => (
            //     <Link to={data.threadPath}>{data.threadName}</Link>
            //   ),
            // },
          },

          {
            path: "tasks",
            loader: tasksLoader,
            action: TasksActions,
            element: <Tasks />,
            handle: {
              crumb: (data) => (
                <Link to={data?.threadPathForOutsideBM}>{data?.threadName}</Link>
              ),
            },
          },
          // {
          //   path: "documents",
          //   element: <Documents />,
          //   handle: {
          //     crumb: (data) => <Link to=".">Attachments</Link>,
          //   },
          // },
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
];
