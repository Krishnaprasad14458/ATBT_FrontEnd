import axios from "axios"
import AddRoles from "../../../components/pages/settings/SettingsComponents/Roles/AddRoles"
import Dupaddrole from "../../../components/pages/settings/SettingsComponents/Roles/Dupaddrole"
import Roles from "../../../components/pages/settings/SettingsComponents/Roles/Roles"
import { redirect } from "react-router-dom"

export const roleRouter = [
    {
        index: true,
        loader: async ({ params, request }) => {
            let url = new URL(request.url);
            let searchTerm = url.searchParams.get("search") || "";
            console.log(searchTerm, "role params")
            const data = await axios.get(`https://atbtmain.teksacademy.com/rbac/getroles?search=${searchTerm}`)
            console.log(data, "roles data")
            return data
        },
        // https://atbtmain.teksacademy.com/rbac/getroles
        action: async ({ request }) => {

            let formData = await request.formData();
            let { roleId } = JSON.parse(formData.get("serialized"));
            const data = await axios.delete(`https://atbtmain.teksacademy.com/rbac/deleteRole/${roleId}`)
            return null;
        },
        element: <Roles />
    },
    {
        path: 'upsert',
        loader: async ({ request, params }) => {
            let url = new URL(request.url);
            let searchTerm = url.searchParams.get("id");
            if (!searchTerm) {
                return null
            }
            try {
                // const { data, status } = await axios.get(`http://localhost:3000/rbac/getrolebyid/${searchTerm}`);
                const { data, status } = await axios.get(`https://atbtmain.teksacademy.com/rbac/getrolebyid/${searchTerm}`);

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
            let formData = await request.text()
            return redirect("..");
        },
        element: <AddRoles />
    },
    { path: "dupaddroles", element: <Dupaddrole /> },
]