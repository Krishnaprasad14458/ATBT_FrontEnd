import BoardMeetingForm, { boardmeetingFormLoader } from "../../components/createForm/createBoardMeetingForm/BoardMeetingForm";
import Boardmeeting from "../../components/landingPages/ReuseableComponents/Boardmeeting";
import Documents from "../../components/landingPages/ReuseableComponents/Documents";

import BoardMeetingLandingPage from "../../components/landingPages/boardMeeting/BoardMeetingLandingPage";
import BoardMeetings, { action as meetingAction, loader as meetingLoader } from "../../components/pages/boardMeetings/BoardMeetings";
import BoardMeetingOverview from "../../components/landingPages/boardMeeting/BoardMeetingOverview";
import RouteBlocker from "../../rbac/RouteBlocker";
import MeetingWiseTask from "../../components/landingPages/ReuseableComponents/MeetingWiseTask";

export const meetingRouter = [
    { index: true, loader: meetingLoader, action: meetingAction, element: <BoardMeetings />, },
    { path: 'new', loader: boardmeetingFormLoader, element: <BoardMeetingForm /> },
    {
        path: ':id', children: [
            { path: 'edit', loader: boardmeetingFormLoader, element: <BoardMeetingForm /> },
            {
                element: <BoardMeetingLandingPage />, children: [
                    { index: true, element: <BoardMeetingOverview /> },
                    { path: 'task', element: <MeetingWiseTask /> },
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