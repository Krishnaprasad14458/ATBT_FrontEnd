import axios from "axios"
import AddRoles from "../../../components/pages/settings/SettingsComponents/Roles/AddRoles"
import Dupaddrole from "../../../components/pages/settings/SettingsComponents/Roles/Dupaddrole"
import Roles from "../../../components/pages/settings/SettingsComponents/Roles/Roles"

export const roleRouter = [
    {
        path: 'roles',
        loader: async () => {
            const data = await axios.get("https://atbtmain.teksacademy.com/rbac/getroles")
            console.log(data, "data")
            return data
        },
        // https://atbtmain.teksacademy.com/rbac/getroles
            action: async({ request }) => {
    console.log("action called")
    let formData = await request.formData();

    // And then just parse your own format here
    let { roleId } = JSON.parse(formData.get("serialized"));
    console.log(roleId);
    const data = await axios.delete(`https://atbtmain.teksacademy.com/rbac/deleteRole/${roleId}`)
    console.log(data, "resp del")
    return null;
},
element: <Roles />
    },
{
    path: 'addroles',
        loader: async ({ request, params }) => {
            let url = new URL(request.url);
            let searchTerm = url.searchParams.get("id");
            console.log(searchTerm, "searchTerm")
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
                    return { response: response, id: searchTerm };
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                throw error; // Rethrow the error to be caught by the caller
            }
        },
            action: async () => {

            },
                element: <AddRoles />
},
{ path: "dupaddroles", element: <Dupaddrole /> },
]