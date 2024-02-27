import axios from "axios"
import AddRoles from "../../../components/pages/settings/SettingsComponents/Roles/AddRoles"
import Dupaddrole from "../../../components/pages/settings/SettingsComponents/Roles/Dupaddrole"
import Roles from "../../../components/pages/settings/SettingsComponents/Roles/Roles"
import { redirect } from "react-router-dom"

export const roleRouter = [
    {
        path: 'roles',
        loader: async () => {
            const data = await axios.get("https://atbtmain.teksacademy.com/rbac/getroles")
            console.log(data, "data")
            return data
        },
        // https://atbtmain.teksacademy.com/rbac/getroles
        action: async ({ request }) => {
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
                // const { data, status } = await axios.get(`http://localhost:3000/rbac/getrolebyid/${searchTerm}`);
                const { data, status } = await axios.get(`https://atbtmain.teksacademy.com/rbac/getrolebyid/${searchTerm}`);

                console.log(data.role.Permissions, status, "rd")

                // Check if the response is successful and return the data
                if (status === 200) {
                    return { response: data?.role };
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                throw error; // Rethrow the error to be caught by the caller
            }
        },
        action: async ({ request }) => {
            console.log("action called")
            let formData = await request.text()
            console.log(formData, "formData")
            return redirect("/roles");
        },
        element: <AddRoles />
    },
    { path: "dupaddroles", element: <Dupaddrole /> },
]