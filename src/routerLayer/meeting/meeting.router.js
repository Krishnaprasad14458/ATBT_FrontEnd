
import BoardMeetingForm, { boardmeetingFormLoader } from "../../componentLayer/pages/boardmeetings/createBoardMeetingForm/BoardMeetingForm";

import Documents from "../../componentLayer/pages/landingPages/ReuseableComponents/Documents";

import BoardMeetingLandingPage from "../../componentLayer/pages/landingPages/boardMeeting/BoardMeetingLandingPage";

import BoardMeetings, { action as meetingAction, loader as meetingLoader } from "../../componentLayer/pages/boardmeetings/boardMeetingsList/BoardMeetings";

import BoardMeetingOverview from "../../componentLayer/pages/landingPages/boardMeeting/BoardMeetingOverview";

import MeetingWiseTask, { tasksLoader } from "../../componentLayer/pages/landingPages/ReuseableComponents/MeetingWiseTask";

export const meetingRouter = [
    { index: true, loader: meetingLoader, action: meetingAction, element: <BoardMeetings />, },
    { path: 'new', loader: boardmeetingFormLoader, element: <BoardMeetingForm /> },
    {
        path: ':id', children: [
            { path: 'edit', loader: boardmeetingFormLoader, element: <BoardMeetingForm /> },
            {
                element: <BoardMeetingLandingPage />, children: [
                    { index: true, element: <BoardMeetingOverview /> },
                    { path: 'task', loader: tasksLoader, element: <MeetingWiseTask /> },
                    { path: 'documents', element: <Documents /> },
                ]
            }
        ]
    },
]



// export const meetingRouter = [
//     {
//         element: <RouteBlocker permissionCheck={(permission) =>
//             permission.module === 'meeting' && permission.canRead} />,
//         children: [
//             { index: true, loader: meetingLoader, action: meetingAction, element: <BoardMeetings />, },
//             {
//                 path: ':id', element: <BoardMeetingLandingPage />
//                 , children: [
//                     { path: 'overview', element: <BoardMeetingOverview /> },
//                     { path: 'task', element: <Task /> },
//                     // { path: 'boardmeetings', element: <Boardmeeting /> },
//                     { path: 'documents', element: <Documents /> },
//                 ]
//             },
//         ]
//     },
//     {
//         element: <RouteBlocker permissionCheck={(permission) =>
//             permission.module === 'meeting' && permission.canCreate} />,
//         children: [
//             { path: 'new', loader: boardmeetingFormLoader, element: <BoardMeetingForm /> },
//         ]
//     },
//     {
//         element: <RouteBlocker permissionCheck={(permission) =>
//             permission.module === 'meeting' && permission.canUpdate} />,
//         children: [
//             { path: ':id/edit', loader: boardmeetingFormLoader, element: <BoardMeetingForm /> },
//         ]
//     },
// ]