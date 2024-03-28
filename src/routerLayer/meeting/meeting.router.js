import BoardMeetingForm, { boardmeetingFormLoader } from "../../components/createForm/createBoardMeetingForm/BoardMeetingForm";
import BoardMeetingLandingPage from "../../components/landingPages/boardMeeting/BoardMeetingLandingPage";
import BoardMeetings, { action as meetingAction, loader as meetingLoader } from "../../components/pages/boardMeetings/BoardMeetings";
import RouteBlocker from "../../rbac/RouteBlocker";




export const meetingRouter = [
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'meeting' && permission.canRead} />,
        children: [
            { index: true, loader: meetingLoader, action: meetingAction, element: <BoardMeetings />, },
            { path: ':id', element: <BoardMeetingLandingPage /> },
        ]
    },
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'meeting' && permission.canCreate} />,
        children: [
            { path: 'new', loader: boardmeetingFormLoader, element: <BoardMeetingForm /> },
        ]
    },
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'meeting' && permission.canUpdate} />,
        children: [
            { path: ':id/edit', loader: boardmeetingFormLoader, element: <BoardMeetingForm /> },
        ]
    },
]