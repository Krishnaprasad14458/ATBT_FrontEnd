import ParentLayout from "../components/layout/ParentLayout";
import PublicLayout from "../components/layout/PublicLayout";
import RequireAuth from "../components/layout/RequireAuth";
import Dashboard from "../components/pages/dashboard/Dashboard";
import Reports from "../components/pages/reports/Reports";
import Settings from "../components/pages/settings/Settings";
import AddEmailTemplate from "../components/pages/settings/SettingsComponents/Communication/AddEmailTemplate";
import AddWhatsappTemplate from "../components/pages/settings/SettingsComponents/Communication/AddWhatsappTemplate";
import Communication from "../components/pages/settings/SettingsComponents/Communication/Communication";
import EmailIntegrations from "../components/pages/settings/SettingsComponents/Integrations/EmailIntegrations";
import Integrations from "../components/pages/settings/SettingsComponents/Integrations/Integrations";
import OrganizationProfile from "../components/pages/settings/SettingsComponents/Organizationprofile/Oranizationprofiles";
import AddRoles from "../components/pages/settings/SettingsComponents/Roles/AddRoles";
import Dupaddrole from "../components/pages/settings/SettingsComponents/Roles/Dupaddrole";
import Roles from "../components/pages/settings/SettingsComponents/Roles/Roles";
// import WhatsappIntegrations from './components/pages/settings/SettingsComponents/Integrations/WhatsappIntegrations';
import EditEmailTemplate from "../components/pages/settings/SettingsComponents/Communication/EditEmailTemplate";
import EditWhatsappTemplate from "../components/pages/settings/SettingsComponents/Communication/EditWhatsappTemplate";
import ViewEmailTemplate from "../components/pages/settings/SettingsComponents/Communication/ViewEmailTemplate";
import FieldsWhatsappTemplate from "../components/pages/settings/SettingsComponents/Communication/FieldsWhatsappTemplate";
import Api from "../components/pages/settings/SettingsComponents/Integrations/Api";
import Webhook from "../components/pages/settings/SettingsComponents/Integrations/Webhook";
import Sms from "../components/pages/settings/SettingsComponents/Integrations/Sms";
import PaymentGateway from "../components/pages/settings/SettingsComponents/Integrations/PaymentGateway";
import Email from "../components/pages/settings/SettingsComponents/Communication/Email";
import Whatsapp from "../components/pages/settings/SettingsComponents/Communication/Whatsapp";
import Forms from "../components/pages/settings/SettingsComponents/Forms/Forms";
import Teams from "../components/pages/teams/Teams";
import TeamsForm from "../components/createForm/TeamsForm/TeamsForm";
import Entities from "../components/pages/entities/Entities";
import EntityForm from "../components/createForm/createEntityForm/EntityForm";
import EntityLandingPage from "../components/landingPages/entity/EntityLandingPage";
import BoardMeetingLandingPage from "../components/landingPages/boardMeeting/BoardMeetingLandingPage";
import TeamsLandingPage from "../components/landingPages/teams/TeamsLandingPage";
import UserLandingPage from "../components/landingPages/user/UserLandingPage";
import Settingentityform from "../components/pages/settings/SettingsComponents/Forms/Settingentityform";
import SettingBoardMeetingForm from "../components/pages/settings/SettingsComponents/Forms/SettingBoardMeetingForm";
import SettingTeamsForm from "../components/pages/settings/SettingsComponents/Forms/SettingTeamsForm";
// import SettingUserForm from './components/pages/settings/SettingsComponents/Forms/SettingUserForm';
import BoardMeetings from "../components/pages/boardMeetings/BoardMeetings";
import BoardMeetingForm from "../components/createForm/createBoardMeetingForm/BoardMeetingForm";
import Tasks from "../components/pages/task/Tasks";
import Users from "../components/pages/users/Users";
import UserForm from "../components/createForm/createUserForm/UserForm";
import UsersFormDup from "../components/pages/settings/SettingsComponents/Forms/SettingUserForm";
import UserProfile from "../components/pages/userProfile/UserProfile";
import UserTasks from "../components/pages/userProfile/userTabs/UserTasks";
import UserTeams from "../components/pages/userProfile/userTabs/UserTeams";
import UserEntities from "../components/pages/userProfile/userTabs/UserEntities";
import MyCalendar from "../components/pages/task/MyCalendar";
import Login from "../components/auth/Login";
import ResetPassword from "../components/auth/ResetPassword";
import ChangePassword from "../components/auth/ChangePassword";
import PageNotFound from "../components/pages/pageNotFound/PageNotFound";
import { createBrowserRouter, redirect } from "react-router-dom";
import axios from "axios";


const dashboardLoader = async () => {
    try {
        // Check if the user has permission to access the dashboard
        // const hasPermission = checkPermission(user.permissions, 'dashboard', 'read');
        // const checkPermission = (permissions, module, action) => {
        //   return permissions.some(permission => permission.module === module && permission[action]);
        // };
        const hasPermission = false
        if (!hasPermission) {
            // If user doesn't have permission, redirect to a forbidden page
            throw redirect("/403");
        }

        // If user is logged in and has permission, fetch dashboard stats
        // const stats = await fake.getDashboardStats();
        return { user: "custom" };
    } catch (error) {
        // Handle any errors
        console.error("Error loading dashboard:", error);
        // Redirect to a generic error page
        throw redirect("/error");
    }
};


export const router = createBrowserRouter([
    {
        id: "root",
        element: <ParentLayout />,
        children: [
            {
                element: <RequireAuth />,
                children: [
                    { path: "/", element: <Dashboard /> },
                    { path: "/reports", element: <Reports /> },
                    { path: "/settings", element: <Settings /> },
                    { path: "/organizationprofile", element: <OrganizationProfile /> },
                    {
                        path: '/roles',
                        loader: async () => {
                            const data = await axios.get("http://localhost:3001/rbac/getroles")
                            console.log(data, "data")
                            return data
                        },
                        action: async ({ request }) => {
                            console.log("action called")
                            let formData = await request.formData();

                            // And then just parse your own format here
                            let { roleId } = JSON.parse(formData.get("serialized"));
                            console.log(roleId);
                            const data = await axios.delete(`http://localhost:3001/rbac/deleteRole/${roleId}`)
                            console.log(data, "resp del")
                            return null;
                        },
                        element: <Roles />
                    },
                    { path: '/integrations', element: <Integrations /> },
                    {
                        path: '/addroles',
                        action: async ({ request, params }) => {
                            let url = new URL(request.url);
                            let searchTerm = url.searchParams.get("id");
                            if (!searchTerm) {
                                return null
                            }
                            try {
                                // const response = await axios.get(`http://localhost:3001/rbac/${searchTerm}`);

                                const response = [
                                    {
                                        module: "dashboard",
                                        all: true,
                                        create: true,
                                        read: true,
                                        update: true,
                                        delete: true
                                    },
                                    {
                                        module: "user",
                                        all: true,
                                        create: true,
                                        read: true,
                                        update: true,
                                        delete: true
                                    },
                                    {
                                        module: "entity",
                                        all: true,
                                        create: true,
                                        read: true,
                                        update: true,
                                        delete: true
                                    },
                                    {
                                        module: "meeting",
                                        all: true,
                                        create: true,
                                        read: true,
                                        update: true,
                                        delete: true
                                    },
                                    {
                                        module: "task",
                                        all: true,
                                        create: true,
                                        read: true,
                                        update: true,
                                        delete: true
                                    },
                                    {
                                        module: "team",
                                        all: true,
                                        create: true,
                                        read: true,
                                        update: true,
                                        delete: true
                                    },
                                    {
                                        module: "report",
                                        all: true,
                                        create: true,
                                        read: true,
                                        update: true,
                                        delete: true
                                    },
                                    {
                                        module: "setting",
                                        all: true,
                                        create: true,
                                        read: true,
                                        update: true,
                                        delete: true
                                    }
                                ]

                                // Check if the response is successful and return the data
                                if (response) {
                                    console.log(response, "resp.data")
                                    return response;
                                } else {
                                    throw new Error('Failed to fetch data');
                                }
                            } catch (error) {
                                console.error('Error fetching data:', error.message);
                                throw error; // Rethrow the error to be caught by the caller
                            }
                        },
                        element: <AddRoles />
                    },
                    { path: "/dupaddroles", element: <Dupaddrole /> },
                    { path: "/communication", element: <Communication /> },
                    // { path: "/whatsappintegration", element: <WhatsappIntegrations /> },
                    { path: '/emailintegration', element: <EmailIntegrations /> },
                    { path: '/addemailtemplate', element: <AddEmailTemplate /> },
                    { path: '/addwhatsapptemplate', element: <AddWhatsappTemplate /> },
                    { path: '/editemailtemplate', element: <EditEmailTemplate /> },
                    { path: '/editwhatsapptemplate', element: <EditWhatsappTemplate /> },
                    { path: 'viewemailtemplate', element: <ViewEmailTemplate /> },
                    { path: '/fieldswhatsapptemplate', element: <FieldsWhatsappTemplate /> },
                    { path: '/api', element: <Api /> },
                    { path: '/webhook', element: <Webhook /> },
                    { path: '/sms', element: <Sms /> },
                    { path: '/paymentgateway', element: <PaymentGateway /> },
                    { path: '/email', element: <Email /> },
                    { path: '/whatsapp', element: <Whatsapp /> },
                    { path: '/forms', element: <Forms /> },
                    { path: '/teams', element: <Teams /> },
                    { path: '/teams/new', element: <TeamsForm /> },
                    { path: '/entities', element: <Entities />, },
                    { path: '/entitylandingpage/:id', element: <EntityLandingPage /> },
                    { path: '/boardmeetinglandingpage/:id', element: <BoardMeetingLandingPage /> },
                    { path: '/teamslandingpage/:id', element: <TeamsLandingPage /> },
                    { path: '/userlandingpage/:id', element: <UserLandingPage /> },
                    { path: '/settingentityform', element: <Settingentityform /> },
                    { path: '/settingboardmeetingform', element: <SettingBoardMeetingForm /> },
                    { path: '/settingteamsform', element: <SettingTeamsForm /> },
                    // { path: '/settinguserform', element: <SettingUserForm /> },
                    { path: '/entities/new', element: <EntityForm /> },
                    { path: '/boardmeetings', loader: dashboardLoader, element: <BoardMeetings /> },
                    { path: '/boardmeetings/new', element: <BoardMeetingForm /> },
                    { path: '/tasks', element: <Tasks /> },
                    { path: '/users', element: <Users /> },
                    { path: '/users/new', element: <UserForm /> },
                    { path: '/userform/dup', element: <UsersFormDup /> },
                    { path: '/mycalendar', element: <MyCalendar /> },
                ]
            },
            {
                element: <PublicLayout />,
                children: [
                    { path: '/login', element: <Login /> },
                    { path: '/resetpassword', element: <ResetPassword /> },
                    { path: '/changepassword/:id', element: <ChangePassword /> },
                    { path: '/*', element: <PageNotFound /> },
                ]
            }
        ]
    }
])