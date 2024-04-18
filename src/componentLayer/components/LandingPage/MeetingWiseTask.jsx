import React, {useState,} from "react";
import {  useParams, useLoaderData, } from "react-router-dom";
import TaskOverview from "./TaskOverview";
export async function tasksLoader({ params }) {
  try {
    const tasks =[
      {
        id: 1,
        decisionTaken: "task1",
        personResponsible: "bhaskar",
        dueDate: "",
      },
      {
        id: 2,
        decisionTaken: "task2",
        personResponsible: "zaheer",
        dueDate: "",
      },
    ]
    return tasks;
  } catch (error) {
    console.log(error, 'which error');
    if (error.response) {
      throw new Error(`Failed to fetch data: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Request made but no response received');
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}
const MeetingWiseTask = () => {
  const { id } = useParams();
const tasks = useLoaderData()
  // -------full screen----
  const [overViewTask, setOverViewTask] = useState(false);
  const [overViewTaskId,setoverViewTaskID] = useState(null)
  const handleOverViewTask = (id) => {
    setoverViewTaskID(id)
    setOverViewTask(!overViewTask);
  };
  const handleAddNewTask = () => {
   // add new task api here
   
   
axios.post(`https://atbtbeta.infozit.com/task/add/${}`)
  };
  
  const handleEditTask = (id, fieldName, e) => {
    const { name, value } = e.target;
    const updatedTasks = tasks.map((task, idx) => {
      if (task.id === id) {
        return {
          ...task,
          [fieldName]: value,
        };
      }
      return task;
    });
    // setTasks(updatedTasks);
  };
console.log("tasks",tasks)
  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <div className="flex justify-end">
          <button
            className=" ms-2 create-btn mt-1 inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  text-orange-foreground shadow hover:bg-orange/90 h-9 px-3 py-1 shrink-0 bg-orange-600 text-white gap-1"
            onClick={handleAddNewTask}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Add Task
          </button>
        </div>
        <table className="w-full  mt-1 table-auto">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-2 px-2  text-sm text-white bg-orange-600 border border-collapse border-[#e5e7eb] whitespace-nowrap "
              >
                Decision Taken
              </th>
              <th
                scope="col"
                className="py-2 px-2  text-sm text-white bg-orange-600 border border-collapse border-[#e5e7eb]
                                  whitespace-nowrap"
              >
                Person Responsible
              </th>
              <th
                scope="col"
                className="py-2 px-2  text-sm text-white bg-orange-600 border border-collapse border-[#e5e7eb] 
                                  whitespace-nowrap"
              >
                Due Date
              </th>
              <th
                scope="col"
                className="py-2 px-2  text-sm text-white bg-orange-600    border border-collapse border-[#e5e7eb] 
                                  whitespace-nowrap"
              >
                Status
              </th>
              <th
                scope="col"
                className="py-2  px-2  text-sm text-white bg-orange-600    border border-collapse border-[#e5e7eb] 
                                  whitespace-nowrap"
              >
                Updated By User
              </th>
              <th
                scope="col"
                className="py-2 px-2  text-sm text-white bg-orange-600   border border-collapse border-[#e5e7eb] whitespace-nowrap"
              >
                Updated by Admin
              </th>
            </tr>
          </thead>
          <tbody className="">
            {tasks?.map((task, index) => (
              <tr key={index}>
                <td
                  className={`border text-center text-sm px-1.5 py-2 flex items-center`}
                >
                  <input
                    className="outline-none text-black  truncate px-1.5 py-1 rounded-md shadow_box  mx-2 bg-[#f8fafc] w-full "
                    type="text"
                    value={task.decisionTaken}
                    onChange={(e) => handleEditTask(task.id, "decisionTaken", e)}
                    placeholder="Decision Taken"
                    title={task.decisionTaken}
                  />
                  <span
                    className="shadow_box p-1 rounded-sm cursor-pointer"
                    onClick={()=>handleOverViewTask(task.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </td>
                <td className={`border text-center  text-sm p-1.5`}>
                  <input
                    className="outline-none text-black  truncate px-1.5 py-1 rounded-md shadow_box  w-full bg-[#f8fafc] "
                    type="text"
                    value={task.personResponsible}
                    onChange={(e) => handleEditTask(index, "personResponsible", e)}
                    placeholder="Person Reponsible"
                    title={task.personResponsible}
                  />
                </td>
                <td className={`border text-center  text-sm p-1.5`}>
                  <input
                    className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box w-full bg-[#f8fafc]"
                    type="date"
                    value={task.duedate}
                    onChange={(e) => handleEditTask(index, "duedate", e)}
                    title={task.duedate}
                  />
                </td>

                <td className={`border text-center  text-sm p-1.5`}
                // className={`border text-center  text-sm
                //                  ${activeInputIndex === index &&
                //     activeInputName === "status"
                //     ? " border-2 border-slate-300"
                //     : " border border-slate-200 "
                //   }`}
                >
                  <input
                    className="outline-none text-black truncate  py-2 bg-[#f8fafc]"
                    type="text"
                    value={task.status}
                    onChange={(e) => handleEditTask(index, "status", e)}
                    style={{ maxWidth: "110px" }}
                    title={task.status}
                  />
                </td>
                <td className=" border border-slate-200 text-center  text-sm">
                  Updated By User
                </td>
                <td className=" border border-slate-200 text-center text-sm">
                  Updated By Admin
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TaskOverview
      tasks = {tasks}
      overViewTaskId = {overViewTaskId} 
        overViewTask={overViewTask}
        handleOverViewTask={handleOverViewTask}
      />
    </div>
  );
};

export default MeetingWiseTask;
