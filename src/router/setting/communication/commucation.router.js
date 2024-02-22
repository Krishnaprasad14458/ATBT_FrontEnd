import AddEmailTemplate from "../../../components/pages/settings/SettingsComponents/Communication/AddEmailTemplate";
import AddWhatsappTemplate from "../../../components/pages/settings/SettingsComponents/Communication/AddWhatsappTemplate";
import Communication from "../../../components/pages/settings/SettingsComponents/Communication/Communication";
import EditEmailTemplate from "../../../components/pages/settings/SettingsComponents/Communication/EditEmailTemplate";
import EditWhatsappTemplate from "../../../components/pages/settings/SettingsComponents/Communication/EditWhatsappTemplate";
import Email from "../../../components/pages/settings/SettingsComponents/Communication/Email";
import FieldsWhatsappTemplate from "../../../components/pages/settings/SettingsComponents/Communication/FieldsWhatsappTemplate";
import ViewEmailTemplate from "../../../components/pages/settings/SettingsComponents/Communication/ViewEmailTemplate";
import Whatsapp from "../../../components/pages/settings/SettingsComponents/Communication/Whatsapp";

export const communicationRouter = [
    { path: "communication", element: <Communication /> },
    { path: 'whatsapp', element: <Whatsapp /> },
    { path: 'addwhatsapptemplate', element: <AddWhatsappTemplate /> },
    { path: 'editwhatsapptemplate', element: <EditWhatsappTemplate /> },
    { path: 'fieldswhatsapptemplate', element: <FieldsWhatsappTemplate /> },
    { path: 'email', element: <Email /> },
    { path: 'addemailtemplate', element: <AddEmailTemplate /> },
    { path: 'editemailtemplate', element: <EditEmailTemplate /> },
    { path: 'viewemailtemplate', element: <ViewEmailTemplate /> },
]