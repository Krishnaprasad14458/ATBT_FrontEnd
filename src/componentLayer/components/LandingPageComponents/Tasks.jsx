import React, { useEffect, useState, useCallback } from "react";
import {
  NavLink,
  useParams,
  useLoaderData,
  useFetcher,
  useSubmit,
} from "react-router-dom";
import Select from "react-select";
import TaskOverview from "./TaskOverview";
import atbtApi from "../../../serviceLayer/interceptor";
import { debounce } from "../../../utils/utils";
import subtask_icon from "../../../assets/Images/Subtask_icon.svg";
import "react-datepicker/dist/react-datepicker.css";
let members;
let status = [
  { label: "To-Do", value: "To-Do" },
  { label: "In-Progress", value: "In-Progress" },
  { label: "Completed", value: "Completed" },
];
let moduleName;
let parentPath
export async function tasksLoader({ request, params }) {
  try {
    if (params.boardmeetings === "userboardmeetings") {
      moduleName = "user";
      parentPath = "users"
    }
    if (params.boardmeetings === "entityboardmeetings") {
      moduleName = "entity";
    }
    const url = new URL(request.url);

    const taskID = url.searchParams.get("taskID");
    const subTaskID = url.searchParams.get("subTaskID");
    const statusType = url.searchParams.get("status");
console.log("statusType",statusType)
    const [tasks, task, subTasks, subTask, personResponsible] =
      await Promise.all([
        params.BMid
          ? atbtApi.get(`task/list?meetingId=${params.BMid}`)
          : statusType !== null ? atbtApi.get(`task/list?userId=${params.id}&status=${statusType}`) : atbtApi.get(`task/list?userId=${params.id}`),
        // atbtApi.get(`task/listAll?user=${params.id}`),
        taskID ? atbtApi.get(`task/listbyid/${taskID}`) : null,
        taskID ? atbtApi.get(`task/subList/${taskID}`) : null,
        subTaskID ? atbtApi.get(`task/subtaskbyid/${subTaskID}`) : null,
        atbtApi.get(`/boardmeeting/groupUser/${params.BMid}`),
        // atbtApi.get(`task/listAll?user=103`)
        // Api For Get boardmeeting members
        // get('/groupEntiy/:id')                Meeting.ListEntiyGroup
        // get('/groupTeam/:id',)            Meeting.ListTeamGroup)
        // get('/groupUser/:id')              Meeting.ListUserGroup)
      ]);

    let updatedTask = task?.data[0];
    let updatedSubTask = subTask?.data[0];
    let taskAge = null;
    let subTaskAge = null;
    if (updatedTask) {
      const currentDate = new Date();
      const enteredDate = new Date(updatedTask?.createdAt);
      const differenceInMilliseconds = currentDate - enteredDate;
      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
      taskAge = Math.floor(differenceInDays);
      updatedTask.age = taskAge;
    }
    if (updatedSubTask) {
      const currentDate = new Date();
      const enteredDate = new Date(updatedSubTask?.createdAt);
      const differenceInMilliseconds = currentDate - enteredDate;
      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
      subTaskAge = Math.floor(differenceInDays);
      updatedSubTask.age = subTaskAge;
    }
    const combinedResponse = {
      tasks: tasks?.data,
      task: updatedTask,
      subTasks: subTasks?.data?.Task,
      subTask: updatedSubTask,
      personResponsible: personResponsible?.data?.map((user) => ({
        label: user.name,
        value: user.id,
      })),
      threadName: `${tasks?.data[0]?.meetingnumber}`,
      threadPath: `/${parentPath}/${params.id}/${params.boardmeetings}/${params.BMid}/tasks`,
    };
    console.log("combinedResponse", combinedResponse);
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
export async function TasksActions({ request, params }) {
  switch (request.method) {
    case "POST":
      {
        const requestBody = (await request.json()) || null;
        console.log(requestBody, "request");
        let moduleName;
        if (params.boardmeetings === "userboardmeetings") {
          moduleName = "users";
        }
        if (params.boardmeetings === "entityboardmeetings") {
          moduleName = "entity";
        }
        if (params.boardmeetings === "entityboardmeetings") {
          moduleName = "team";
        }
        if (requestBody.type === "ADD_NEW_TASK") {
          return await atbtApi.post(
            `task/add/${params.BMid}`,

            {
              taskCreatedBy: { name: moduleName, id: params.id },
              collaborators: [
                parseInt(JSON.parse(localStorage.getItem("data")).user.id),
              ],
            }
          );
        }
        if (requestBody.type === "ADD_SUB_TASK") {
          return await atbtApi.post(`task/subtaskAdd/${requestBody.id}`);
        }
        if (requestBody.type === "ADD_TASK_COMMENT") {
          return await atbtApi.post(
            `task/addComments?task=${requestBody.id}`,
            requestBody.data
          );
        }
        if (requestBody.type === "ADD_SUBTASK_COMMENT") {
          return await atbtApi.post(
            `task/addComments?subtask=${requestBody.id}`,
            requestBody.data
          );
        }
      }
      break;
    case "PATCH":
      {
        const requestBody = (await request.json()) || null;
        console.log(requestBody, "request");

        if (requestBody.type === "UPDATE_TASK") {
          return await atbtApi.patch(
            `task/update/${requestBody.id}`,
            requestBody.data
          );
        }
        if (requestBody.type === "UPDATE_SUB_TASK") {
          return await atbtApi.patch(
            `task/subtaskUpdate/${requestBody.id}`,
            requestBody.data
          );
        }
        if (requestBody.type === "EDIT_COMMENT") {
          return await atbtApi.patch(
            `task/patchComments/${requestBody.id}`,
            requestBody.data
          );
        }
      }
      break;
    case "DELETE":
      {
        const requestBody = (await request.json()) || null;
        console.log(requestBody, "request");
        if (requestBody.type === "DELETE_TASK") {
          return await atbtApi.delete(`task/delete/${requestBody.id}`);
        }
        if (requestBody.type === "DELETE_SUB_TASK") {
          return await atbtApi.delete(`task/subtaskdelete/${requestBody.id}`);
        }
        if (requestBody.type === "DELETE_COMMENT") {
          return await atbtApi.delete(`task/delComments/${requestBody.id}`);
        }
      }
      break;
    default: {
      throw new Response("", { status: 405 });
    }
  }
}
const Tasks = () => {
  let submit = useSubmit();
  const data = useLoaderData();
  let [tasks, setTasks] = useState([]);
  let [task, setTask] = useState({});
  let [subTasks, setSubTasks] = useState();
  let [subTask, setSubTask] = useState();
  members = data?.personResponsible;
  useEffect(() => {
    setTasks(data?.tasks);
    setTask(data?.task);
    setSubTasks(data?.subTasks);
    setSubTask(data?.subTask);
  }, [data]);

  let fetcher = useFetcher();
  const { id, BMid} = useParams();
  const [Qparams, setQParams] = useState({
    //  taskID:null
    status:"To-Do"
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
  const [overViewTask, setOverViewTask] = useState(false);
  const [displayOverviewTask, setDisplayOverviewTask] = useState(false);
  const [displayOverviewSubTask, setDisplayOverviewSubTask] = useState(false);
  const handleOverViewTask = (taskId) => {
    setOverViewTask(!overViewTask);
    setDisplayOverviewTask(!displayOverviewTask);
    setQParams((prev) => ({ ...prev, taskID: taskId }));
  };
  const handleAddNewTask = async () => {
    let requestBody = { type: "ADD_NEW_TASK" };

    try {
      fetcher.submit(requestBody, {
        method: "POST",
        encType: "application/json",
      });
    } catch (error) {
      console.log(error, "which error");
    }
  };
  const handleAddSubTask = (taskID) => {
    let requestBody = { id: taskID, type: "ADD_SUB_TASK" };
    try {
      fetcher.submit(requestBody, {
        method: "POST",
        encType: "application/json",
      });
    } catch (error) {
      console.log(error, "which error");
    }
  };
  const handleSubmit = (taskId, taskFieldName, taskValue) => {
    console.log("handleSubmit clicked");
    setAutoFocusID(null);
    setIsInputActive(null);
    let UpdateData = {
      id: taskId,
      data: { [taskFieldName]: taskValue },
      type: "UPDATE_TASK",
    };
    console.log("UpdateData", UpdateData);
    try {
      fetcher.submit(UpdateData, {
        method: "PATCH",
        encType: "application/json",
      });
    } catch (error) {
      console.log(error, "which error");
    }
  };
  const handleSubTaskSubmit = (subTaskId, taskFieldName, taskValue) => {
    console.log("handleSubTaskSubmit clicked");

    setAutoFocussubTaskID(null);
    setIsSubTaskInputActive(null);
    let UpdateData = {
      id: subTaskId,
      data: { [taskFieldName]: taskValue },
      type: "UPDATE_SUB_TASK",
    };

    try {
      fetcher.submit(UpdateData, {
        method: "PATCH",
        encType: "application/json",
      });
    } catch (error) {
      console.log(error, "which error");
    }
  };
  const handleDeleteTask = async (deleteId) => {
    let UpdateData = {
      id: deleteId,
      type: "DELETE_TASK",
    };

    try {
      fetcher.submit(UpdateData, {
        method: "DELETE",
        encType: "application/json",
      });
    } catch (error) {
      console.log(error, "which error");
    }
  };
  const handleSendComment = async () => {
    let UpdateData = {
      // id: subTaskId,
      // data: { [taskFieldName]: taskValue },
      type: "Send_Comment",
    };

    try {
      fetcher.submit(UpdateData, {
        method: "POST",
        encType: "application/json",
      });
    } catch (error) {
      console.log(error, "which error");
    }
  };
  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };
  const handleOverviewTaskChange = (field, value) => {
    const updatedTask = { ...task };
    updatedTask[field] = value;
    setTask(updatedTask);
  };
  const handleSubTaskChange = (index, field, value) => {
    const updatedSubTasks = [...subTasks];
    updatedSubTasks[index][field] = value;
    setSubTasks(updatedSubTasks);
  };

  const handleOverviewSubTaskChange = (field, value) => {
    const updatedSubTask = { ...subTask };
    updatedSubTask[field] = value;
    setSubTask(updatedSubTask);
  };
  const [isInputActiveID, setIsInputActive] = useState(null);
  const [isSubTaskInputActiveID, setIsSubTaskInputActive] = useState(null);
  const [autoFocusID, setAutoFocusID] = useState(null);
  const [autoFocusSubTaskID, setAutoFocussubTaskID] = useState(null);



  const [activeLink, setActiveLink] = useState("toDo");

  // Function to handle click and set active link
  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="">
      <div className="flex justify-end">
       {BMid && <button
          className=" ms-2  mt-1 inline-flex items-center  whitespace-nowrap rounded-2xl text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  text-orange-foreground shadow hover:bg-orange/90 h-9 px-3 py-1 shrink-0 bg-orange-600 text-white gap-1"
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
        }
      </div>
      <div>


      <div className="flex overflow-x-auto">
        {!BMid && (
            <NavLink
            to="/users/160/tasks?status=To-Do"
            end
            className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
              activeLink === "toDo"
                ? "border-b-2 border-orange-600"
                : ""
            }`}
            onClick={() => handleNavLinkClick("toDo")}
          >
            To do
          </NavLink>
        )}
        {!BMid && (
          <NavLink
          to="/users/160/tasks?status=In-progress"
          end
          className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
            activeLink === "inProgress"
              ? "border-b-2 border-orange-600"
              : ""
          }`}
          onClick={() => handleNavLinkClick("inProgress")}
        >
          In-progress
        </NavLink>
        )}

        {!BMid && (
          <NavLink
          to="/users/160/tasks?status=overdue"
          end
          className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
            activeLink === "OverDue"
              ? "border-b-2 border-orange-600"
              : ""
          }`}
          onClick={() => handleNavLinkClick("OverDue")}
        >
      OverDue
        </NavLink>
         
        )}
        {!BMid && (
           <NavLink
           to="/users/160/tasks?status=Completed"
           end
           className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
             activeLink === "Completed"
               ? "border-b-2 border-orange-600"
               : ""
           }`}
           onClick={() => handleNavLinkClick("Completed")}
         >
       Completed
         </NavLink>
        
        )}
        {!BMid && (
         
           <NavLink
           to="/users/160/tasks"
           end
           className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
             activeLink === "Master"
               ? "border-b-2 border-orange-600"
               : ""
           }`}
           onClick={() => handleNavLinkClick("Master")}
         >
      Master
         </NavLink>
        )}

    
      </div>
       

<hr/>
      </div>
      <div className=" mt-2 overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
          <thead>
            <tr>
              <th
                className="py-2 px-2  text-sm text-white bg-orange-600 border border-collapse border-[#e5e7eb] whitespace-nowrap text-left"
                style={{ width: "22rem" }}
              >
                Decision Taken
              </th>
              <th
                className="py-2 px-2  text-sm text-white bg-orange-600 border border-collapse border-[#e5e7eb] text-left
                 whitespace-nowrap"
              >
                Person Responsible
              </th>
              <th
                className="py-2 px-2  text-sm text-white bg-orange-600 border border-collapse border-[#e5e7eb]  text-left
                whitespace-nowrap"
              >
                Due Date
              </th>
              <th
                className="py-2 px-2  text-sm text-white bg-orange-600    border border-collapse border-[#e5e7eb]  text-left
               whitespace-nowrap"
                style={{ width: "8rem" }}
              >
                Status
              </th>
              <th
                className="py-2  px-2  text-sm text-white bg-orange-600    border border-collapse border-[#e5e7eb] text-left
                whitespace-nowrap"
              >
                Updated By User
              </th>
              <th className="py-2 px-2  text-sm text-white bg-orange-600   border border-collapse border-[#e5e7eb] whitespace-nowrap text-left">
                Updated by Admin
              </th>
              <th className="py-2 px-2  text-sm text-white bg-orange-600   border border-collapse border-[#e5e7eb] whitespace-nowrap text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {tasks?.map((task, index) => {
              const decisionHeight =
                task?.decision === null || task?.decision === "" ? "2rem" : "";

              return (
                <tr key={task.id} className="border-b border-gray-200">
                  <td className="border py-1.5 px-3">
                    <div className="flex items-center justify-between">
                      {isInputActiveID === task.id && (
                        <input
                          className="border border-[#d1d5db] text-black px-1.5 py-1.5 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400 "
                          style={{ width: "21rem" }}
                          type="text"
                          placeholder="Type here"
                          value={task?.decision}
                          onChange={(e) =>
                            handleTaskChange(index, "decision", e.target.value)
                          }
                          onBlur={(e) =>
                            handleSubmit(task?.id, "decision", e.target.value)
                          }
                          autoFocus={autoFocusID === task.id ? true : false}
                        />
                      )}

                      {(isInputActiveID !== task.id ||
                        isInputActiveID === null) && (
                        <p
                          className="text-sm"
                          onClick={() => {
                            setIsInputActive(task.id);
                            setAutoFocusID(task.id);
                          }}
                          style={{
                            width: "21rem",
                            height: decisionHeight,
                            cursor: "pointer",
                          }}
                        >
                          {task.decision}
                        </p>
                      )}
                      <div className="flex">
                        {task.subtaskCount > 0 && (
                          <span className="flex items-center ml-2 px-0.5 cursor-pointer border border-[#f8fafc] hover:border hover:border-gray-500 hover:rounded-sm hover:bg-gray-100">
                            <span className="text-sm">
                              {task.subtaskCount}
                            </span>
                            <svg
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_14915913"
                              className="w-3 h-3"
                            >
                              <g id="Layer_2" data-name="Layer 2">
                                <path d="m15 18h10a2 2 0 0 0 2-2v-4a2 2 0 0 0 -2-2h-10a2 2 0 0 0 -2 2v1h-4v-9h2a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2h2v20a3 3 0 0 0 3 3h3v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4a2 2 0 0 0 -2-2h-10a2 2 0 0 0 -2 2v1h-3a1 1 0 0 1 -1-1v-9h4v1a2 2 0 0 0 2 2z"></path>
                              </g>
                            </svg>
                          </span>
                        )}

                        <span
                          className="ml-2 cursor-pointer"
                          onClick={() => handleOverViewTask(task?.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 hover:border hover:border-gray-500 hover:rounded-sm hover:bg-gray-100"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td
                    className="border py-1.5 px-3 "
                    title={task?.members}
                    style={{ width: "15rem" }}
                  >
                    <Select
                      options={members}
                      menuPortalTarget={document.body}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          backgroundColor: "#f9fafb",
                          borderWidth: "1px",
                          borderColor: state.isFocused
                            ? "#orange-400"
                            : "transparent",
                          boxShadow: state.isFocused
                            ? "none"
                            : provided.boxShadow,
                          fontSize: "16px",
                          height: "36px",
                          "&:hover": {
                            borderColor: state.isFocused
                              ? "#fb923c"
                              : "transparent",
                          },
                          "&:focus": {
                            borderColor: "#fb923c",
                          },
                          "&:focus-within": {
                            borderColor: "#fb923c",
                          },
                        }),

                        option: (provided, state) => ({
                          ...provided,
                          color: state.isFocused ? "#fff" : "#000000",
                          backgroundColor: state.isFocused
                            ? "#ea580c"
                            : "transparent",
                          "&:hover": {
                            color: "#fff",
                            backgroundColor: "#ea580c",
                          },
                        }),
                        indicatorSeparator: (provided, state) => ({
                          ...provided,
                          display: state.isFocused ? "visible" : "none",
                        }),
                        dropdownIndicator: (provided, state) => ({
                          ...provided,
                          display: state.isFocused ? "visible" : "none",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                        }),

                        placeholder: (provided) => ({
                          ...provided,
                          fontSize: "12px",
                        }),
                      }}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                          ...theme.colors,
                          primary: "#fb923c",
                        },
                      })}
                      onChange={(selectedOption) => {
                        handleSubmit(task?.id, "members", selectedOption.value);
                        handleTaskChange(
                          index,
                          "members",
                          selectedOption.value
                        );
                      }}
                      value={
                        task?.members === null ||
                        task?.members === "" ||
                        task?.members === undefined
                          ? ""
                          : members?.find(
                              (person) => person.value === task?.members
                            )
                      }
                      menuPlacement="auto"
                    />
                  </td>
                  <td className="border py-1.5 px-3" style={{ width: "11rem" }}>
                    <input
                      className=" border border-transparent text-black px-1.5 py-2 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400  date_type"
                      type="date"
                      value={task?.dueDate}
                      onChange={(e) => {
                        handleSubmit(task?.id, "dueDate", e.target.value);
                        handleTaskChange(index, "dueDate", e.target.value);
                      }}
                    />
                  </td>
                  <td
                    className="border py-1.5 px-3 "
                    title={task?.status}
                    style={{ width: "8rem" }}
                  >
                    <Select
                      options={status}
                      menuPortalTarget={document.body}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          backgroundColor: "#f9fafb",
                          borderWidth: "1px",
                          borderColor: state.isFocused
                            ? "#orange-400"
                            : "transparent", // Changed borderColor
                          boxShadow: state.isFocused
                            ? "none"
                            : provided.boxShadow,
                          fontSize: "16px",
                          height: "36px", // Adjust the height here
                          "&:hover": {
                            borderColor: state.isFocused
                              ? "#fb923c"
                              : "transparent",
                          },
                          "&:focus": {
                            borderColor: "#fb923c",
                          },
                          "&:focus-within": {
                            borderColor: "#fb923c",
                          },
                          width: "8rem",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          color: state.isFocused ? "#fff" : "#000000",
                          backgroundColor: state.isFocused
                            ? "#ea580c"
                            : "transparent",
                          "&:hover": {
                            color: "#fff",
                            backgroundColor: "#ea580c",
                          },
                        }),
                        indicatorSeparator: (provided, state) => ({
                          ...provided,
                          display: state.isFocused ? "visible" : "none",
                        }),
                        dropdownIndicator: (provided, state) => ({
                          ...provided,
                          display: state.isFocused ? "visible" : "none",
                        }),
                      }}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                          ...theme.colors,
                          primary: "#fb923c",
                        },
                      })}
                      onChange={(selectedOption) => {
                        handleSubmit(task?.id, "status", selectedOption.value);
                        handleTaskChange(index, "status", selectedOption.value);
                      }}
                      classNamePrefix="select"
                      value={{ label: task?.status, value: task?.status }}
                      menuPlacement="auto"
                    />
                  </td>
                  <td className="border py-1.5 px-3 text-sm text-gray-600">
                    Updated By User
                  </td>
                  <td className="border py-1.5 px-3 text-sm text-gray-600">
                    Updated By Admin
                  </td>
                  <td className="border py-1.5 px-3 text-sm text-gray-600">
                    <svg
                      onClick={() => handleDeleteTask(task.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <TaskOverview
        task={task}
        setTask={setTask}
        Qparams={Qparams}
        setQParams={setQParams}
        setOverViewTask={setOverViewTask}
        handleOverviewTaskChange={handleOverviewTaskChange}
        overViewTask={overViewTask}
        handleSubmit={handleSubmit}
        members={members}
        status={status}
        handleAddSubTask={handleAddSubTask}
        subTasks={subTasks}
        handleSubTaskChange={handleSubTaskChange}
        handleSubTaskSubmit={handleSubTaskSubmit}
        handleOverviewSubTaskChange={handleOverviewSubTaskChange}
        subTask={subTask}
        displayOverviewTask={displayOverviewTask}
        displayOverviewSubTask={displayOverviewSubTask}
        setDisplayOverviewTask={setDisplayOverviewTask}
        setDisplayOverviewSubTask={setDisplayOverviewSubTask}
        isSubTaskInputActiveID={isSubTaskInputActiveID}
        setIsSubTaskInputActive={setIsSubTaskInputActive}
        autoFocusSubTaskID={autoFocusSubTaskID}
        setAutoFocussubTaskID={setAutoFocussubTaskID}
        setSubTask={setSubTask}
        handleSendComment={handleSendComment}
      />
    </div>
  );
};
export default Tasks;
