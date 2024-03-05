import Error401 from "../../components/pages/Errorpages/Error401"
import Error403 from "../../components/pages/Errorpages/Error403"
import ErrorPage from "../../components/pages/Errorpages/ErrorBoundary"
import PageNotFound from "../../components/pages/Errorpages/PageNotFound"


export const httpInterceptors = [
    { path: '/401', element: <Error401 /> },
    { path: '/403', element: <Error403 /> },
    { path: '/500', element: <ErrorPage /> },
    { path: '*', element: <PageNotFound /> },
]