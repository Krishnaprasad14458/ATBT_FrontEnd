
import BoardMeetingForm, { boardmeetingFormLoader } from "../../componentLayer/pages/boardmeetings/createBoardMeetingForm/BoardMeetingForm";
import Documents from "../../componentLayer/components/LandingPage/Documents";
import BoardMeetingLandingPage from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingLandingPage";
import BoardMeetings, { action as meetingAction, loader as meetingLoader } from "../../componentLayer/components/LandingPage/Boardmeeting";
import BoardMeetingOverview from "../../componentLayer/pages/boardmeetings/boardMeetingLandingPage/BoardMeetingOverview";
import MeetingWiseTask, { MeetingWiseTasksActions, tasksLoader } from "../../componentLayer/components/LandingPage/MeetingWiseTask";
export const meetingRouter = [
    { index: true, loader: meetingLoader, action: meetingAction, element: <BoardMeetings />, },
    { path: 'new', loader: boardmeetingFormLoader, element: <BoardMeetingForm /> },
    {
        path: ':id', children: [
            { path: 'edit', loader: boardmeetingFormLoader, element: <BoardMeetingForm /> },
            {
                element: <BoardMeetingLandingPage />, children: [
                    { index: true, element: <BoardMeetingOverview /> },
                    { path: 'task', loader: tasksLoader, action:MeetingWiseTasksActions, element: <MeetingWiseTask /> },
                    { path: 'documents', element: <Documents /> },
                ]
            }
        ]
    },
]
