import { redirect } from "react-router-dom";
import BoardMeetingForm from "../../components/createForm/createBoardMeetingForm/BoardMeetingForm";
import BoardMeetingLandingPage from "../../components/landingPages/boardMeeting/BoardMeetingLandingPage";
import BoardMeetings from "../../components/pages/boardMeetings/BoardMeetings";

const dashboardLoader = async () => {
    try {
        // Check if the user has permission to access the dashboard
        // const hasPermission = checkPermission(user.permissions, 'dashboard', 'read');
        // const checkPermission = (permissions, module, action) => {
        //   return permissions.some(permission => permission.module === module && permission[action]);
        // };
        const hasPermission = true;
        if (!hasPermission) {
            // If user doesn't have permission, redirect to a forbidden page
            throw new Response("No permission", { status: 401 });
        }

        // If user is logged in and has permission, fetch dashboard stats
        // const stats = await fake.getDashboardStats();
        return { user: "custom" };
    } catch (error) {
        // Handle any errors
        console.error("Error loading dashboard:", error);
        // Redirect to a generic error page
        throw redirect(`/${error?.response?.status ?? '500'}`);

    }
};

export const meetingRouter = [
    { path: 'boardmeetinglandingpage/:id', element: <BoardMeetingLandingPage /> },
    { path: 'boardmeetings', loader: dashboardLoader, element: <BoardMeetings /> },
    { path: 'boardmeetings/new', element: <BoardMeetingForm /> },
]