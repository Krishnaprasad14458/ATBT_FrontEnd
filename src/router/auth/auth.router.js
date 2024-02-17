import Login from "../../components/auth/Login";
import ChangePassword from "../../components/auth/ChangePassword";
import ResetPassword from "../../components/auth/ResetPassword";
export const authRoutes = [
    {
        path: '/login',
        action: async ({ request, params }) => {
            console.log(request.method, "method")
            switch (request.method) {
                case request.method: {
                    let formData = await request.formData();
                    console.log("fd", formData.get("email"));
                    return null
                    // let name = formData.get("projectName");
                    // return fakeUpdateProject(name);
                }
                case "DELETE": {
                    // return fakeDeleteProject(params.id);
                }
                default: {
                    throw new Response("why", { status: 405 });
                }
            }
            return null
        },
        element: <Login />
    },
    { path: '/resetpassword', element: <ResetPassword /> },
    { path: '/changepassword/:id', element: <ChangePassword /> },
]
