import Tasks from "../../components/pages/task/Tasks";
import Task from "../../components/landingPages/ReuseableComponents/Task";

export const taskRouter = [
    { path: 'tasks', element: <Tasks /> },
    { path: 'task', element: <Task /> },

]