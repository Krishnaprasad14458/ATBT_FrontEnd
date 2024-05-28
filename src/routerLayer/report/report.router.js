import Reports,{
   
    loader as reportLoader,
  } from "../../componentLayer/pages/reports/Reports";

export const reportRouter = [
    { path: "reports",
    loader:reportLoader,
    element: <Reports /> },
]