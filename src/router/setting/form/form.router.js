import Forms from "../../../components/pages/settings/SettingsComponents/Forms/Forms";
import SettingBoardMeetingForm from "../../../components/pages/settings/SettingsComponents/Forms/SettingBoardMeetingForm";
import SettingTeamsForm from "../../../components/pages/settings/SettingsComponents/Forms/SettingTeamsForm";
import SettingUserForm from "../../../components/pages/settings/SettingsComponents/Forms/SettingUserForm";
import Settingentityform from "../../../components/pages/settings/SettingsComponents/Forms/Settingentityform";

export const formRouter = [
    { path: 'forms', element: <Forms /> },
    { path: 'settingentityform', element: <Settingentityform /> },
    { path: 'settingboardmeetingform', element: <SettingBoardMeetingForm /> },
    { path: 'settingteamsform', element: <SettingTeamsForm /> },
    { path: 'settinguserform', element: <SettingUserForm /> },
]