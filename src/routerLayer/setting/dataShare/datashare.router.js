import AddDataShare, { loader as datashare } from "../../../components/pages/settings/SettingsComponents/DataShare/AddDataShare";
import DataShare from "../../../components/pages/settings/SettingsComponents/DataShare/DataShare";
import { DataShareloader } from "../../../components/pages/settings/SettingsComponents/DataShare/DataShare";

export const datasharerouter = [
    {
        index: true,loader: DataShareloader, element: <DataShare />,
    },
    { path: "adddatashare", loader: datashare, element: <AddDataShare /> }

]