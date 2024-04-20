import React, { useEffect, useState, useRef } from "react";
import { useParams, useLoaderData, useFetcher } from "react-router-dom";
import TaskOverview from "./TaskOverview";
import axios from "axios";
import atbtApi from "../../../serviceLayer/interceptor";

export async function tasksLoader({ params }) {
  try {
    const [tasks] = await Promise.all([atbtApi.get(`task/list/${params.id}`)]);
    const combinedResponse = {
      tasks: tasks?.data,
    };
    return combinedResponse;
  } catch (error) {
    console.log(error, "which error");
    if (error.response) {
      throw new Error(`Failed to fetch data: ${error.response.status}`);
    } else if (error.request) {
      throw new Error("Request made but no response received");
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}
export async function MeetingWiseTasksActions({ request, params }) {
  switch (request.method) {
    case "POST": {
      const id = (await request.json()) || null;
      console.log(id, "json", id);
      return await atbtApi.post(`task/add/${id}`);
    }
    case "PATCH": {
      const UpdatedTask = (await request.json()) || null;
      console.log(UpdatedTask.id, "json", UpdatedTask.data);
      return await atbtApi.patch(
        `task/update/${UpdatedTask.id}`,
        UpdatedTask.data
      );
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}
const MeetingWiseTask = () => {
  const { id } = useParams();

  const data = useLoaderData();
  let fetcher = useFetcher();
  console.log("tassa", data.tasks);
  // -------full screen----
  const [overViewTask, setOverViewTask] = useState(false);
  const [overViewTaskId, setoverViewTaskID] = useState(null);
  const handleOverViewTask = (id) => {
    setoverViewTaskID(id);
    setOverViewTask(!overViewTask);
  };
  const handleAddNewTask = async () => {
    try {
      fetcher.submit(id, { method: "POST", encType: "application/json" });
    } catch (error) {
      console.log(error, "which error");
    }
  };

  const [taskDupFieldId, SetTaskDupFieldId] = useState();
  const [taskDupFieldName, SetTaskDupFieldName] = useState();
  const [taskDupFieldvalue, SetTaskDupFieldvalue] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditingClick = (fieldid, fieldName, fieldValue) => {
    setIsEditing(true);
    SetTaskDupFieldId(fieldid);
    SetTaskDupFieldName(fieldName);
    SetTaskDupFieldvalue(fieldValue);
  };
  useEffect(() => {
    if (taskDupFieldId) {
      let data = {
        id: taskDupFieldId,
        data: { [taskDupFieldName]: taskDupFieldvalue },
      };
      try {
        fetcher.submit(data, {
          method: "PATCH",
          encType: "application/json",
        });
        // setUpdatedTask(null); // Reset updatedTask after submitting
      } catch (error) {
        console.log(error, "which error");
      }
    }
  }, [isEditing]);

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
            {data?.tasks?.map((task, index) => (
              <tr key={index}>
                <td
                  className={`border text-center text-sm px-1.5 py-2 flex items-center`}
                >
                  {isEditing === true && taskDupFieldId === task.id &&  taskDupFieldName === "decision"&& (
                    <input
                      className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box mx-2 bg-[#f8fafc] w-full"
                      type="text"
                      onChange={(e) => SetTaskDupFieldvalue(e.target.value)}
                      ref={inputRef}
                      value={taskDupFieldvalue}
                      autoFocus
                    />
                  )}

                  {(isEditing === false || taskDupFieldId !== task.id ||  taskDupFieldName !== "decision") && (
                    <span
                      title={task.decision}
                      onClick={() =>
                        handleEditingClick(task.id, "decision", task.decision)
                      }
                    >
                  {task.decision}
                    </span>
                  )}

                  <span
                    className="shadow_box p-1 rounded-sm cursor-pointer"
                    onClick={() => handleOverViewTask(task.id)}
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
                {isEditing === true && taskDupFieldId === task.id &&  taskDupFieldName === "members" && (
                    <input
                      className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box mx-2 bg-[#f8fafc] w-full"
                      type="text"
                      onChange={(e) => SetTaskDupFieldvalue(e.target.value)}
                      ref={inputRef}
                      value={taskDupFieldvalue}
                      autoFocus
                    />
                  )}

                  {(isEditing === false || taskDupFieldId !== task.id || taskDupFieldName !== "members") && (
                    <span
                      title={task.members}
                      onClick={() =>
                        handleEditingClick(task.id, "members", task.members)
                      }
                    >
                  {task.members} -  members
                    </span>
                  )}
                </td>
                <td className={`border text-center  text-sm p-1.5`}>
                {isEditing === true && taskDupFieldId === task.id && taskDupFieldName === "dueDate" && (
                    <input
                      className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box mx-2 bg-[#f8fafc] w-full"
                      type="text"
                      onChange={(e) => SetTaskDupFieldvalue(e.target.value)}
                      ref={inputRef}
                      value={taskDupFieldvalue}
                      autoFocus
                    />
                  )}

                  {(isEditing === false || taskDupFieldId !== task.id ||  taskDupFieldName !== "dueDate") && (
                    <span
                      title={task.dueDate}
                      onClick={() =>
                        handleEditingClick(task.id, "dueDate", task.dueDate)
                      }
                    >
                  {task.dueDate} -  dueDate
                    </span>
                  )}
                </td>


                <td className={`border text-center  text-sm p-1.5`}

                >
                  {isEditing === true && taskDupFieldId === task.id && taskDupFieldName === "status" &&(
                    <input
                      className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box mx-2 bg-[#f8fafc] w-full"
                      type="text"
                      onChange={(e) => SetTaskDupFieldvalue(e.target.value)}
                      ref={inputRef}
                      value={taskDupFieldvalue}
                      autoFocus
                    />
                  )}

                  {(isEditing === false || taskDupFieldId !== task.id || taskDupFieldName !== "status" ) && (
                    <span
                      title={task.status}
                      onClick={() =>
                        handleEditingClick(task.id, "status", task.status)
                      }
                    >
                  {task.status} -  para
                    </span>
                  )}
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
        tasks={data?.tasks}
        overViewTaskId={overViewTaskId}
        overViewTask={overViewTask}
        handleOverViewTask={handleOverViewTask}
      />
    </div>
  );
};

export default MeetingWiseTask;
