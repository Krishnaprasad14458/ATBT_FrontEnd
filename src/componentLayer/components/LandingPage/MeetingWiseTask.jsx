import React, { useEffect, useState, useCallback } from "react";
import {
  useParams,
  useLoaderData,
  useFetcher,
  useSubmit,
} from "react-router-dom";
import Select from "react-select";
import TaskOverview from "./TaskOverview";
import atbtApi from "../../../serviceLayer/interceptor";
import { debounce } from "../../../utils/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
let members = [
  { label: "Bhaskar", value: "bhaskar" },
  { label: "Zaheer", value: "zaheer" },
  { label: "Raghu Vamshi Krishna", value: "raghuvamshiKrishna" },
];
let status = [
  { label: "In Progress", value: "inprogress" },
  { label: "Close", value: "close" },
  { label: "Resolve", value: "resolve" },
];
export async function tasksLoader({ request, params }) {
  try {
    const url = new URL(request.url);
    const taskID = url.searchParams.get("taskID");
    const [tasks, task] = await Promise.all([
      atbtApi.get(`task/list/${params.id} `),
      atbtApi.get(`task/listbyid/${taskID}`),
    ]);
    let updatedTask = task?.data[0]
    let age = null

    if(updatedTask){
      const currentDate = new Date();
      const enteredDate = new Date(updatedTask?.createdAt);
      const differenceInMilliseconds = currentDate - enteredDate;
      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
      age = (Math.floor(differenceInDays));
    updatedTask.age = age

    }
    const combinedResponse = {
      tasks: tasks?.data,
      task: updatedTask,
    };
   
    console.log("combinedResponse", combinedResponse,updatedTask);
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
  const data = useLoaderData();
  let [tasks, setTasks] = useState([]);
  let [task, setTask] = useState({});
  useEffect(() => {
    setTasks(data?.tasks);
    setTask(data?.task);
  }, [data]);
  console.log("task", task);
  console.log("tasks", tasks);
  let fetcher = useFetcher();
  const { id } = useParams();
  const [Qparams, setQParams] = useState({
    //  taskID:null
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
  const handleOverViewTask = (taskId) => {
    setOverViewTask(!overViewTask);

    setQParams((prev) => ({ ...prev, taskID: taskId }));
  };
  const handleAddNewTask = async () => {
    try {
      fetcher.submit(id, { method: "POST", encType: "application/json" });
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

  const handleSubmit = (taskId, taskFieldName, taskValue) => {
    setAutoFocusID(null)
    setIsInputActive(null);
    let UpdateData = {
      id: taskId,
      data: { [taskFieldName]: taskValue },
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
  const [isInputActiveID, setIsInputActive] = useState(null);
  const [autoFocusID,setAutoFocusID]= useState(null)
  const [startDate, setStartDate] = useState();
  // Event handler for input focus
  const handleInputFocus = (id) => {
    setIsInputActive(id);
  };
  return (
    <div className="p-3">

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
<div className=" ">
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
              >
                Status
              </th>
              <th
               
                className="py-2  px-2  text-sm text-white bg-orange-600    border border-collapse border-[#e5e7eb] text-left
                whitespace-nowrap"
              >
                Updated By User
              </th>
              <th
               
                className="py-2 px-2  text-sm text-white bg-orange-600   border border-collapse border-[#e5e7eb] whitespace-nowrap text-left"
              >
                Updated by Admin
              </th>
            </tr>
          </thead>
          <tbody className="">
            {tasks?.map((task, index) => {
  const decisionHeight = task?.decision === null ||  task?.decision === ""  ? "2rem" : "";

              return (

                <tr key={task.id} className="border-b border-gray-200">
                <td className="border py-1.5 px-3">
                    <div className="flex items-center">
                    {isInputActiveID === task.id && (
                      <input
                        className="border border-[#d1d5db] text-black px-1.5 py-1.5 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400 "
                        style={{ width: "22rem" }}
                        type="text"
                        placeholder="Type here"
                        value={task?.decision}
                        onChange={(e) =>
                          handleTaskChange(index, "decision", e.target.value)
                        }
                        onBlur={(e) =>
                          handleSubmit(task?.id, "decision", e.target.value)
                        }
                        // onFocus={handleInputFocus}
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
                          width: "22rem",
                          height: decisionHeight,
                          cursor: "pointer",
                        }}

                      >
                        {task.decision}
                      </p>
                    )}
                        <span
                            className="ml-2 cursor-pointer"
                            onClick={() => handleOverViewTask(task?.id)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </div>
                </td>
                <td className="border py-1.5 px-3 " title={task?.members}
                style={{width:"15rem"}}>
                    <Select
                        options={members}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                backgroundColor: "#f9fafb",
                                borderWidth: "1px",
                                borderColor: state.isFocused ? "#orange-400" : "#d1d5db",
                                boxShadow: state.isFocused ? "none" : provided.boxShadow,
                                fontSize: "16px", 
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                color: state.isFocused ? "#fff" : "#000000",
                                backgroundColor: state.isFocused ? "#ea580c" : "transparent",
                                "&:hover": {
                                    color: "#fff",
                                    backgroundColor: "#ea580c",
                                },
                                
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
                            handleTaskChange(index, "members", selectedOption.value);
                        }}
                        className="basic-multi-select "
                        classNamePrefix="select"
                        value={{ label: task?.members, value: task?.members }}
                    />
                </td>
                <td className="border py-1.5 px-3"
                style={{width:"11rem"}}>
                {/* <DatePicker 
                 value={task?.dueDate}
                 
                // selected={startDate}
                        onChange={(e) => {
                            handleSubmit(task?.id, "dueDate", e.target.value);
                            handleTaskChange(index, "dueDate", e.target.value);
                        }} /> */}
                    <input
                        className=" border border-[#d1d5db] text-black px-1.5 py-2 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400  date_type"
                        
                        type="date"
                        value={task?.dueDate}
                        onChange={(e) => {
                            handleSubmit(task?.id, "dueDate", e.target.value);
                            handleTaskChange(index, "dueDate", e.target.value);
                        }}
                    />
                </td>
                <td className="border py-1.5 px-3"
                style={{ width:"8rem"}}
                >
                    <Select
                        options={status}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                backgroundColor: "#f9fafb",
                                borderWidth: "1px",
                                borderColor: state.isFocused ? "#orange-400" : "#d1d5db",
                                boxShadow: state.isFocused ? "none" : provided.boxShadow,
                                width:"8rem"
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                fontSize: "small",
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                color: state.isFocused ? "#fff" : "#000000",
                                backgroundColor: state.isFocused ? "#ea580c" : "transparent",
                                "&:hover": {
                                    color: "#fff",
                                    backgroundColor: "#ea580c",
                                },
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
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={{ label: task?.status, value: task?.status }}
                    />
                </td>
                <td className="border py-1.5 px-3 text-sm text-gray-600">
                    Updated By User
                </td>
                <td className="border py-1.5 px-3 text-sm text-gray-600">
                    Updated By Admin
                </td>
            </tr>
            
              )
           
 } )}
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
      
      />

    </div>
  );
};
export default MeetingWiseTask;
