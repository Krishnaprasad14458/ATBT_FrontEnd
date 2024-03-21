import CustomFormStructure from "../../../components/pages/settings/SettingsComponents/Forms/CustomFormStructure";
import Forms from "../../../components/pages/settings/SettingsComponents/Forms/Forms";


export const formRouter = [
    { index: true, element: <Forms /> },
    { path: ':formName', element: <CustomFormStructure /> },
    // { path: 'settingentityform', element: <Settingentityform /> },
    // { path: 'settingboardmeetingform', element: <SettingBoardMeetingForm /> },
    // { path: 'settingteamsform', element: <SettingTeamsForm /> },
    // { path: 'settinguserform', element: <SettingUserForm /> },
]