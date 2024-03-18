import Api from "../../../components/pages/settings/SettingsComponents/Integrations/Api";
import EmailIntegrations from "../../../components/pages/settings/SettingsComponents/Integrations/EmailIntegrations";
import Integrations from "../../../components/pages/settings/SettingsComponents/Integrations/Integrations";
import PaymentGateway from "../../../components/pages/settings/SettingsComponents/Integrations/PaymentGateway";
import Sms from "../../../components/pages/settings/SettingsComponents/Integrations/Sms";
import Webhook from "../../../components/pages/settings/SettingsComponents/Integrations/Webhook";
import WhatsappIntegrations from "../../../components/pages/settings/SettingsComponents/Integrations/WhatsappIntegrations";

export const itegrationRoutes = [
    { path: 'integrations', element: <Integrations /> },
    { path: "whatsappintegration", element: <WhatsappIntegrations /> },
    { path: 'emailintegration', element: <EmailIntegrations /> },
    { path: 'api', element: <Api /> },
    { path: 'webhook', element: <Webhook /> },
    { path: 'sms', element: <Sms /> },
    { path: 'paymentgateway', element: <PaymentGateway /> },
]