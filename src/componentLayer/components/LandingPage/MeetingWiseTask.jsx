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
let members = [
  { label: "Bhaskar", value: "bhaskar" },
  { label: "Zaheer", value: "zaheer" },
  { label: "Raghu Vamshi", value: "raghuvamshi" },
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
    const combinedResponse = {
      tasks: tasks?.data,
      task: task?.data,
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
    setTask(data?.task[0]);
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

  // Event handler for input focus
  const handleInputFocus = (id) => {
    setIsInputActive(id);
  };

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
            {tasks?.map((task, index) => (
              <tr key={task.id}>
                <td className={`border text-sm  py-2 px-2`}>
                  <div className=" flex justify-between items-start">
                    {isInputActiveID === task.id && (
                      <input
                        className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box  bg-[#f8fafc] w-full  text-sm"
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
                        onClick={() => {
                          setIsInputActive(task.id);
                          setAutoFocusID(task.id);
                        }}
                      >
                        {task.decision}
                      </p>
                    )}
                    <span
                      className="shadow_box p-1 rounded-sm cursor-pointer "
                      onClick={() => handleOverViewTask(task?.id)}
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
                <td className={`border text-sm  py-2 px-2`}>
                  <Select
                    options={members}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        backgroundColor: "#f9fafb", // Change the background color of the select input
                        borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                        borderColor: state.isFocused
                          ? "#orange-400"
                          : "#d1d5db", // Change border color when focused
                        boxShadow: state.isFocused
                          ? "none"
                          : provided.boxShadow, // Optionally remove box shadow when focused
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        fontSize: "small", // Adjust the font size of the placeholder text
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
                <td className={`border text-sm  py-2 px-2`}>
                  <input
                    type="date"
                    value={task?.dueDate}
                    onChange={(e) => {
                      handleSubmit(task?.id, "dueDate", e.target.value);
                      handleTaskChange(index, "dueDate", e.target.value);
                    }}
                  />
                </td>
                <td className={`border text-center  text-sm p-1.5`}>
                  <Select
                    options={status}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        backgroundColor: "#f9fafb", // Change the background color of the select input
                        borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                        borderColor: state.isFocused
                          ? "#orange-400"
                          : "#d1d5db", // Change border color when focused
                        boxShadow: state.isFocused
                          ? "none"
                          : provided.boxShadow, // Optionally remove box shadow when focused
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        fontSize: "small", // Adjust the font size of the placeholder text
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
                    className="basic-multi-select "
                    classNamePrefix="select"
                    value={{ label: task?.status, value: task?.status }}
                  />
                </td>
                <td className="border border-slate-200 text-center text-sm">
                  Updated By User
                </td>
                <td className="border border-slate-200 text-center text-sm">
                  Updated By Admin
                </td>
              </tr>
            ))}
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
