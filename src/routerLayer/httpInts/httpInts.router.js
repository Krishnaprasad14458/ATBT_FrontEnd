import Error401 from "../../componentLayer/pages/errorPages/Error401"
import Error403 from "../../componentLayer/pages/errorPages/Error403"
import ErrorPage from "../../componentLayer/pages/errorPages/ErrorBoundary"
import PageNotFound from "../../componentLayer/pages/errorPages/PageNotFound"


export const httpInterceptors = [
    { path: '/401', element: <Error401 /> },
    { path: '/403', element: <Error403 /> },
    { path: '/500', element: <ErrorPage /> },
    { path: '*', element: <PageNotFound /> },
]