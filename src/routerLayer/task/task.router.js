import Tasks, { AllTasksLoader, TasksActions, tasksLoader } from "../../componentLayer/components/LandingPageComponents/Tasks";

export const taskRouter = [
    // { index :true, element: <Tasks /> },
    {
        index :true,
        loader: AllTasksLoader,
        action: TasksActions,
        element: <Tasks />,
        // handle: {
        //   crumb: (data) => (
        //     <Link to={data?.threadPath}>{data?.threadName}</Link>
        //   ),
        // },
      },
    // { path: 'task', element: <Task /> },

]