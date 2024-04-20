import React, { useEffect, useState, useRef , useCallback} from "react";
import { useParams, useLoaderData, useFetcher ,useSubmit} from "react-router-dom";
import TaskOverview from "./TaskOverview";
import atbtApi from "../../../serviceLayer/interceptor";
import {debounce} from '../../../utils/utils'
export async function tasksLoader({ request ,params }) {
  try {
    const url = new URL(request.url);
    const taskID = url.searchParams.get("taskID")
    const [tasks ,task] = await Promise.all([atbtApi.get(`task/list/${params.id} `), atbtApi.get(`task/listbyid/${taskID}`)]);
    const combinedResponse = {
      tasks: tasks?.data,
      task:task?.data
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
  let submit = useSubmit();
  
   const { id } = useParams();
   const [Qparams, setQParams] = useState({
     taskID:null
   });
   useEffect(() => {
     debouncedParams(Qparams);
   }, [Qparams]);
   const debouncedParams = useCallback(
     debounce((param) => {
       console.log(param);
       submit(param, { method: "get", action: "." });
     }, 500),
     []
   );

  const data = useLoaderData();
  let fetcher = useFetcher();
  console.log("tassa", data.tasks);
  // ----full screen----
  const [overViewTask, setOverViewTask] = useState(false);
  const [overViewTaskId, setoverViewTaskID] = useState(null);
  const handleOverViewTask = (task) => {
    setoverViewTaskID(task.id);
    setOverViewTask(!overViewTask);
    setQParams((prev)=>({...prev,taskID:task.id}))
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
    if (taskDupFieldId && taskDupFieldName) {
      let UpdateData = {
        id: taskDupFieldId,
        data: { [taskDupFieldName]: taskDupFieldvalue },
      };
      try {
        fetcher.submit(UpdateData, {
          method: "PATCH",
          encType: "application/json",
        });
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
                style={{ width: "22rem" }}
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
                  className={`border text-sm  py-2`}
                  onClick={() =>
                    handleEditingClick(task.id, "decision", task.decision)
                  }
                >

                  <div className=" flex justify-between">
                  {isEditing === true &&
                    taskDupFieldId === task.id &&
                    taskDupFieldName === "decision" && (
                      <input
                        className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box mx-2 bg-[#f8fafc] w-full  text-sm"
                        type="text"
                        onChange={(e) => SetTaskDupFieldvalue(e.target.value)}
                        ref={inputRef}
                        placeholder="Type here"
                        value={taskDupFieldvalue}
                        autoFocus
                      />
                    )}
                  {(isEditing === false ||
                    taskDupFieldId !== task.id ||
                    taskDupFieldName !== "decision") && (
                    <p className="px-2  text-sm" title={task.decision}>
                      {task.decision}
                    </p>
                  )}
                  <span
                    className="shadow_box p-1 rounded-sm cursor-pointer "
                    onClick={() => handleOverViewTask(task)}
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
                  </div>
                 
                </td>
                <td
                  className={`border text-sm  py-2 px-2`}
                  onClick={() =>
                    handleEditingClick(task.id, "members", task.members)
                  }
                  style={{ width: "15rem" }}
                >
                  {isEditing === true &&
                    taskDupFieldId === task.id &&
                    taskDupFieldName === "members" && (
                      <select
                        className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box   bg-[#f8fafc] text-sm w-full"
                        onChange={(e) => SetTaskDupFieldvalue(e.target.value)}
                        ref={inputRef}
                        value={taskDupFieldvalue}
                        autoFocus
                      >
                        <option value="" disabled defaultValue>
                          Please select
                        </option>
                        <option>bhavithaakshmi sri hhh hhhhhhhh </option>

                        <option>Irshad </option>
                      </select>
                      // <input
                      //   className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box mx-2 bg-[#f8fafc] text-sm"
                      //   type="text"
                      //   onChange={(e) => SetTaskDupFieldvalue(e.target.value)}
                      //   ref={inputRef}
                      //   value={taskDupFieldvalue}
                      //   autoFocus
                      // />
                    )}

                  {(isEditing === false ||
                    taskDupFieldId !== task.id ||
                    taskDupFieldName !== "members") && (
                    <p className="px-2 text-sm" title={task.members}>
                      {task.members}
                    </p>
                  )}
                </td>
                <td
                  className={`border text-sm  py-2 px-2`}
                  onClick={() =>
                    handleEditingClick(task.id, "dueDate", task.dueDate)
                  }
                  style={{ width: "8rem" }}
                >
                  {isEditing === true &&
                    taskDupFieldId === task.id &&
                    taskDupFieldName === "dueDate" && (
                      <input
                        className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box  bg-[#f8fafc] w-full  text-sm "
                        type="date"
                        onChange={(e) => SetTaskDupFieldvalue(e.target.value)}
                        ref={inputRef}
                        value={taskDupFieldvalue}
                        autoFocus
                      />
                    )}
                  {(isEditing === false ||
                    taskDupFieldId !== task.id ||
                    taskDupFieldName !== "dueDate") && (

                      <p className="px-2 text-sm" title={task.dueDate}>
                      {task.dueDate}
                    </p>
                    // <span title={task.dueDate}>{task.dueDate}</span>
                  )}
                </td>
                <td className={`border text-center  text-sm p-1.5`}
                 onClick={() =>
                  handleEditingClick(task.id, "status", task.status)
                }
                style={{ width: "10rem" }}>
                  {isEditing === true &&
                    taskDupFieldId === task.id &&
                    taskDupFieldName === "status" && (
                      <select
                      className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box   bg-[#f8fafc] text-sm w-full"
                      onChange={(e) => SetTaskDupFieldvalue(e.target.value)}
                      ref={inputRef}
                      value={taskDupFieldvalue}
                      autoFocus
                    >
                      <option value="" disabled defaultValue>
                        Please select
                      </option>
                      <option>complete </option>
                      <option>Inprogress </option>
                      <option>Pending </option>
                    </select>
                      // <input
                      //   className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box mx-2 bg-[#f8fafc] w-full"
                      //   type="text"
                      //   onChange={(e) => SetTaskDupFieldvalue(e.target.value)}
                      //   ref={inputRef}
                      //   value={taskDupFieldvalue}
                      //   autoFocus
                      // />
                    )}
                  {(isEditing === false ||
                    taskDupFieldId !== task.id ||
                    taskDupFieldName !== "status") && (
                    <span
                      title={task.status}
                    >
                      {task.status}
                    </span>
                  )}
                </td>
                <td className=" border border-slate-200 text-center  text-sm">
                  
                  Updated By User  
                </td>
                <td className=" border border-slate-200 text-center text-sm">
                  Updated ByAdmin
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TaskOverview
        taskDupFieldId={taskDupFieldId}
        taskDupFieldName={taskDupFieldName}
        SetTaskDupFieldvalue={SetTaskDupFieldvalue}
        inputRef={inputRef}
        taskDupFieldvalue={taskDupFieldvalue}
        handleEditingClick={handleEditingClick}
        isEditing={isEditing}
        task={data?.task[0]}
        overViewTaskId={overViewTaskId}
        overViewTask={overViewTask}
        handleOverViewTask={handleOverViewTask}
      />
    </div>
  );
};
export default MeetingWiseTask;
