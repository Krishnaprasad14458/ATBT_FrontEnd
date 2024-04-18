
import AddEmailTemplate from "../../../componentLayer/pages/settings/SettingsComponents/Communication/AddEmailTemplate";
import AddWhatsappTemplate from "../../../componentLayer/pages/settings/SettingsComponents/Communication/AddWhatsappTemplate";
import Communication from "../../../componentLayer/pages/settings/SettingsComponents/Communication/Communication";
import EditEmailTemplate from "../../../componentLayer/pages/settings/SettingsComponents/Communication/EditEmailTemplate";
import EditWhatsappTemplate from "../../../componentLayer/pages/settings/SettingsComponents/Communication/EditWhatsappTemplate";
import Email from "../../../componentLayer/pages/settings/SettingsComponents/Communication/Email";
import FieldsWhatsappTemplate from "../../../componentLayer/pages/settings/SettingsComponents/Communication/FieldsWhatsappTemplate";
import ViewEmailTemplate from "../../../componentLayer/pages/settings/SettingsComponents/Communication/ViewEmailTemplate";
import Whatsapp from "../../../componentLayer/pages/settings/SettingsComponents/Communication/Whatsapp";

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