// import { redirect } from "react-router-dom";
// import BoardMeetingForm from "../../components/createForm/createBoardMeetingForm/BoardMeetingForm";
// import BoardMeetingLandingPage from "../../components/landingPages/boardMeeting/BoardMeetingLandingPage";
// import BoardMeetings from "../../components/pages/boardMeetings/BoardMeetings";

// const dashboardLoader = async () => {
//     try {
//         // Check if the user has permission to access the dashboard
//         // const hasPermission = checkPermission(user.permissions, 'dashboard', 'read');
//         // const checkPermission = (permissions, module, action) => {
//         //   return permissions.some(permission => permission.module === module && permission[action]);
//         // };
//         const hasPermission = true;
//         if (!hasPermission) {
//             // If user doesn't have permission, redirect to a forbidden page
//             throw new Response("No permission", { status: 401 });
//         }

//         // If user is logged in and has permission, fetch dashboard stats
//         // const stats = await fake.getDashboardStats();
//         return { user: "custom" };
//     } catch (error) {
//         // Handle any errors
//         console.error("Error loading dashboard:", error);
//         // Redirect to a generic error page
//         throw redirect(`/${error?.response?.status ?? '500'}`);

//     }
// };

// export const meetingRouter = [
//     { path: 'boardmeetinglandingpage/:id', element: <BoardMeetingLandingPage /> },
//     { path: 'boardmeetings', loader: dashboardLoader, element: <BoardMeetings /> },
//     { path: 'boardmeetings/new', element: <BoardMeetingForm /> },
// ]




import BoardMeetingForm, { boardmeetingFormLoader } from "../../components/createForm/createBoardMeetingForm/BoardMeetingForm";
import Boardmeeting from "../../components/landingPages/ReuseableComponents/Boardmeeting";
import Documents from "../../components/landingPages/ReuseableComponents/Documents";
import Task from "../../components/landingPages/ReuseableComponents/Task";
import BoardMeetingLandingPage from "../../components/landingPages/boardMeeting/BoardMeetingLandingPage";
import BoardMeetingOverview from "../../components/landingPages/boardMeeting/BoardMeetingOverview";
import BoardMeetings from "../../components/pages/boardMeetings/BoardMeetings";
import RouteBlocker from "../../rbac/RouteBlocker";


export const meetingRouter = [
    {
        element: <RouteBlocker permissionCheck={(permission) =>
            permission.module === 'meeting' && permission.canRead} />,
        children: [
            { index: true, element: <BoardMeetings />, },
            {
                path: ':id', element: <BoardMeetingLandingPage />
                , children: [
                    { path: 'overview', element: <BoardMeetingOverview /> },
                    { path: 'task', element: <Task /> },
                    { path: 'boardmeetings', element: <Boardmeeting /> },
                    { path: 'documents', element: <Documents /> },
                ]
            },
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