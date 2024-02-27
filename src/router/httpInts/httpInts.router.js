import Error401 from "../../components/pages/Errorpages/Error401"
import Error403 from "../../components/pages/Errorpages/Error403"
import Error500 from "../../components/pages/Errorpages/Error500"
import PageNotFound from "../../components/pages/Errorpages/PageNotFound"


export const httpInterceptors = [
    { path: '/401', element: <Error401 /> },
    { path: '/403', element: <Error403 /> },
    { path: '/500', element: <Error500 /> },
    { path: '*', element: <PageNotFound /> },
]