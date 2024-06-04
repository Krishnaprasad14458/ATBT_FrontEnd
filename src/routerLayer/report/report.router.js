import Reports,{
   
    loader as reportLoader,
  } from "../../componentLayer/pages/reports/Reports";

export const reportRouter = [
   
   
    { index:true,
    loader:reportLoader,
    element: <Reports /> },
]