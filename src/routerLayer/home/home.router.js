
import Home, { loader as HomeLoader, action as HomeAction } from "../../componentLayer/pages/home/Home";
import { loader as entityHomeResourceLoader } from "../../componentLayer/pages/home/homeResources/HomeEntityResource";
import { loader as userHomeResourceLoader } from "../../componentLayer/pages/home/homeResources/HomeUserResource";
export const homeRouter = [
    {
        index: true, loader: HomeLoader, action: HomeAction, element: <Home />
    },
    {
        path: "resource/dashboard/user",
        loader: userHomeResourceLoader,
    },
    {
        path: "resource/dashboard/entity",
        loader: entityHomeResourceLoader,
    }
]