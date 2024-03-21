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

import BoardMeetings from "../components/pages/boardMeetings/BoardMeetings";
import BoardMeetingForm from "../components/createForm/createBoardMeetingForm/BoardMeetingForm";
import Tasks from "../components/pages/task/Tasks";
import Users from "../components/pages/users/Users";
import UserForm from "../components/createForm/createUserForm/UserForm";
// import UsersFormDup from "../components/pages/settings/SettingsComponents/Forms/SettingUserForm";
import UserProfile from "../components/pages/userProfile/UserProfile";
import UserTasks from "../components/pages/userProfile/userTabs/UserTasks";
import UserTeams from "../components/pages/userProfile/userTabs/UserTeams";
import UserEntities from "../components/pages/userProfile/userTabs/UserEntities";
import MyCalendar from "../components/pages/task/MyCalendar";
import Login from "../components/auth/Login";
import ResetPassword from "../components/auth/ResetPassword";
import ChangePassword from "../components/auth/ChangePassword";
import { createBrowserRouter, redirect } from "react-router-dom";
import axios from "axios";
import { authRoutes } from "./auth/auth.router";
import { httpInterceptors } from "./httpInts/httpInts.router";
import { dashboardRouter } from "./dashboard/dashboard.router";
import { reportRouter } from "./report/report.router";
import { settingRouter } from "./setting/setting.router";
// import { teamRouter } from "./team/team.router";
import { meetingRouter } from "./meeting/meeting.router";
import { userRouter } from "./user/user.router";
import { entityRouter } from "./entity/entity.router";
import { teamRouter } from "./team/team.router";


import { taskRouter } from "./task/task.router";
import RouteBlocker from "../rbac/RouteBlocker";
import ErrorBoundary from "../components/pages/Errorpages/ErrorBoundary";
import '../App.css';



export const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth />,
        ErrorBoundary: ErrorBoundary,
        children: [
            ...dashboardRouter,
            {
                path: 'users',
                children: [
                    ...userRouter,
                ]
            },
            {
                path: 'entities',
                children: [
                    ...entityRouter,
                ]
            },
            {
                path: 'teams',
                children: [
                    ...teamRouter,
                ]
            },
            {
                path: 'boardmeetings',
                children: [
                    ...meetingRouter,
                ]
            },
            {
                element: <RouteBlocker permissionCheck={(permission) =>
                    permission.module === 'meeting' && permission.canRead} />,
                children: [
                    ...meetingRouter,
                ]
            },
            {
                element: <RouteBlocker permissionCheck={(permission) =>
                    permission.module === 'task' && permission.canRead} />,
                children: [
                    ...taskRouter,
                ]
            },
            {
                element: <RouteBlocker permissionCheck={(permission) =>
                    permission.module === 'team' && permission.canRead} />,
                children: [
                    ...teamRouter,
                ]
            },
            {
                element: <RouteBlocker permissionCheck={(permission) =>
                    permission.module === 'report' && permission.canRead} />,
                children: [
                    ...reportRouter,
                ]
            },
            {
                element: <RouteBlocker permissionCheck={(permission) =>
                    permission.module === 'setting' && permission.canRead} />,
                path: 'settings',
                children: [
                    ...settingRouter,
                ]
            },
            { path: 'mycalendar', element: <MyCalendar /> },
        ]
    },
    {
        element: <PublicLayout />,
        children: [
            ...authRoutes,
            ...httpInterceptors
        ]
    }
])



// ...dashboardRouter,
// ...userRouter,
// ...entityRouter,
// ...meetingRouter,
// ...taskRouter,
// ...teamRouter,
// ...reportRouter,
// ...settingRouter,
