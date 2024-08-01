
import AddDataShare, { loader as datashare } from "../../../componentLayer/pages/settings/SettingsComponents/DataShare/AddDataShare";

import DataShare, { DataShareDeleteAction } from "../../../componentLayer/pages/settings/SettingsComponents/DataShare/DataShare";
import { DataShareloader } from "../../../componentLayer/pages/settings/SettingsComponents/DataShare/DataShare";

export const datasharerouter = [
    {
        index: true,loader: DataShareloader, action:DataShareDeleteAction, element: <DataShare />,
    },
    { path: "adddatashare", loader: datashare, element: <AddDataShare /> }

]

