import PageNotFound from "../../components/pages/Errorpages/PageNotFound"

export const httpInterceptors = [
    { path: '*', element: <PageNotFound /> },
]