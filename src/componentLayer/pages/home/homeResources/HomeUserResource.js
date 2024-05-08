import { redirect } from "react-router-dom";
import atbtApi from "../../../../serviceLayer/interceptor";

export async function loader({ request, params }) {
    let url = new URL(request.url);
    const res = await atbtApi.post(`/user/list${url?.search ? url?.search : ''}`, {})
    console.log(request, "making progress", res)
    return res
}