import AddDataShare, { loader as datashare } from "../../../components/pages/settings/SettingsComponents/DataShare/AddDataShare";
import DataShare from "../../../components/pages/settings/SettingsComponents/DataShare/DataShare";


export const datasharerouter = [
    {
        index: true, element: <DataShare />,
    },
    { path: "adddatashare", loader: datashare, element: <AddDataShare /> }

]