import PageNotFound from "../../components/pages/pageNotFound/PageNotFound"

export const httpInterceptors = [
    { path: '*', element: <PageNotFound /> },
]