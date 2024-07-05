import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";
import {
  NavLink,
  useParams,
  useLoaderData,
  useFetcher,
  useSubmit,
  useLocation,
  useMatches,
  useNavigation,
} from "react-router-dom";
import Select from "react-select";
import TaskOverview from "./TaskOverview";
import atbtApi from "../../../serviceLayer/interceptor";
import { caseLetter, debounce, getCurrentDate } from "../../../utils/utils";
import GateKeeper from "../../../rbac/GateKeeper";
import { AuthContext } from "../../../contexts/authContext/authContext";
import TasksFilter from "../tableCustomization/TasksFilter";

import { toast } from "react-toastify";

import mailsent from "../../../assets/Images/mailsent.svg";
import { PermissionsContext } from "../../../rbac/PermissionsProvider";

let status = [
  { label: "To-Do", value: "To-Do" },
  { label: "In-Progress", value: "In-Progress" },
  { label: "Completed", value: "Completed" },
  { label: "On-Hold", value: "On-Hold" },
];

let parentPath;
// let groupName;
let idOF;
export async function tasksLoader({ request, params }) {
  try {
    const url = new URL(request.url);
    if (url.pathname.split("/")[1] === "users") {
      parentPath = "users";
      // groupName = "groupUser";
      idOF = "userId";
    }
    if (url.pathname.split("/")[1] === "entities") {
      parentPath = "entities";
      // groupName = "groupEntity";
      idOF = "entityId";
    }
    if (url.pathname.split("/")[1] === "teams") {
      parentPath = "teams";
      // groupName = "groupTeam";
      idOF = "teamId";
    }
    if (url.pathname.split("/")[1] === "tasks") {
      parentPath = "tasks";
    }
    if (url.pathname.split("/")[1] === "boardmeetings") {
      parentPath = "boardmeetings";
    }
    console.log("url parentPath", parentPath, url.pathname.split("/")[1]);
    const taskID = url.searchParams.get("taskID");
    const subTaskID = url.searchParams.get("subTaskID");
    const search = url.searchParams.get("search");
    const page = url.searchParams.get("page");
    const pageSize = url.searchParams.get("pageSize");
    // const statusType = url.searchParams.get("status");
    const statusType = params.statusType;
    console.log("statusType", statusType);
    const [tasks, task, subTasks, subTask] = await Promise.all([
      params.BMid
        ? atbtApi.get(
            `task/list?meetingId=${params.BMid}&search=${search}&page=${page}&pageSize=${pageSize}`
          )
        : statusType !== "Master"
        ? atbtApi.get(
            `task/list?${idOF}=${params.id}&status=${statusType}&search=${search}&page=${page}&pageSize=${pageSize}`
          )
        : atbtApi.get(
            `task/list?${idOF}=${params.id}&search=${search}&page=${page}&pageSize=${pageSize}`
          ),
      // atbtApi.get(`task/listAll?user=${params.id}`),
      taskID ? atbtApi.get(`task/listbyid/${taskID}`) : null,
      taskID ? atbtApi.get(`task/subList/${taskID}`) : null,
      subTaskID ? atbtApi.get(`task/subtaskbyid/${subTaskID}`) : null,
      // groupName && params.BMid
      //   ? atbtApi.get(`/boardmeeting/${groupName}/${params.BMid}`)
      //   : {},
    ]);
    // console.log("personResponsiblee", personResponsible);
    let updatedTasks = tasks?.data;
    console.log("updatedTasks", updatedTasks);
    let updatedTask = task?.data[0];
    let updatedSubTask = subTask?.data[0];
    let taskAge = null;
    let subTaskAge = null;
    if (
      updatedTasks &&
      updatedTasks?.tasks &&
      updatedTasks?.tasks?.length > 0
    ) {
      for (let i = 0; i < updatedTasks.tasks.length; i++) {
        const currentDate = new Date();
        const enteredDate = new Date(updatedTasks?.tasks[i]?.createdAt);
        const differenceInMilliseconds = currentDate - enteredDate;
        const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
        // updatedTasks.tasks[i].age = Math.floor(differenceInDays);
      }
    }
    if (updatedTask) {
      const currentDate = new Date();
      const enteredDate = new Date(updatedTask?.createdAt);
      const differenceInMilliseconds = currentDate - enteredDate;
      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
      taskAge = Math.floor(differenceInDays);
      // updatedTask.age = taskAge;
    }
    if (updatedSubTask) {
      const currentDate = new Date();
      const enteredDate = new Date(updatedSubTask?.createdAt);
      const differenceInMilliseconds = currentDate - enteredDate;
      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
      subTaskAge = Math.floor(differenceInDays);
      // updatedSubTask.age = subTaskAge;
    }
    const combinedResponse = {
      tasks: updatedTasks,
      task: updatedTask,
      subTasks: subTasks?.data?.Task,
      subTask: updatedSubTask,
      threadName: params.BMid ? ` Decisions` : `Decisions`,
      threadPath: params.BMid
        ? `/${parentPath}/${params.id}/${params.boardmeetings}/${params.BMid}/tasks`
        : `/${parentPath}/${params.id}/tasks/To-Do`,
      threadPathForOutsideBM: `/boardmeetings/${params.BMid}/tasks`,
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
export async function AllTasksLoader({ request, params }) {
  try {
    const url = new URL(request.url);
    // const url = new URL(request.url);
    if (url.pathname.split("/")[1] === "users") {
      parentPath = "users";
      // groupName = "groupUser";
      // idOF = "userId";
    }
    if (url.pathname.split("/")[1] === "entities") {
      parentPath = "entities";
      // groupName = "groupEntity";
      // idOF = "entityId";
    }
    if (url.pathname.split("/")[1] === "teams") {
      parentPath = "teams";
      // groupName = "groupTeam";
      // idOF = "teamId";
    }
    if (url.pathname.split("/")[1] === "tasks") {
      parentPath = "tasks";
    }
    if (url.pathname.split("/")[1] === "boardmeetings") {
      parentPath = "boardmeetings";
    }
    console.log("url", url.pathname.split("/")[1]);
    const taskID = url.searchParams.get("taskID");
    const subTaskID = url.searchParams.get("subTaskID");
    // const statusType = url.searchParams.get("status");
    const statusType = params.statusType;
    const fromDate = url.searchParams.get("fromDate");
    const moduleName = url.searchParams.get("moduleName");
    const listID = url.searchParams.get("listID");
    const meetingId = url.searchParams.get("meetingId");
    const pageSize = url.searchParams.get("pageSize");
    const search = url.searchParams.get("search");

    const page = url.searchParams.get("page");

    const toDate = url.searchParams.get("toDate");
    let idOF;
    if (moduleName === "user") {
      idOF = "userId";
    } else if (moduleName === "entity") {
      idOF = "entityId";
    } else if (moduleName === "team") {
      idOF = "teamId";
    }
    console.log("statusType", statusType);
    const queryParams = [];
    queryParams.push(`page=${page}`);
    queryParams.push(`pageSize=${pageSize}`);
    queryParams.push(`search=${search}`);

    // Validate and add query parameters
    if (meetingId && meetingId !== "all") {
      queryParams.push(`meetingId=${meetingId}`);
    } else if (meetingId === "all" && listID) {
      queryParams.push(`${idOF}=${listID}`);
    }
    if (statusType && statusType !== "Master") {
      queryParams.push(`status=${statusType}`);
    }
    if (fromDate && toDate) {
      queryParams.push(`fromDate=${fromDate}`, `toDate=${toDate}`);
    }
    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    console.log(queryString, "queryString");

    const [tasks, task, subTasks, subTask] = await Promise.all([
      atbtApi.get(`task/list${queryString}`),
      taskID ? atbtApi.get(`task/listbyid/${taskID}`) : null,
      taskID ? atbtApi.get(`task/subList/${taskID}`) : null,
      subTaskID ? atbtApi.get(`task/subtaskbyid/${subTaskID}`) : null,
      // groupName && params.BMid
      //   ? atbtApi.get(`/boardmeeting/${groupName}/${params.BMid}`)
      //   : {},
    ]);
    // console.log("personResponsiblee", personResponsible);
    let updatedTasks = tasks?.data;

    let updatedTask = task?.data[0];
    let updatedSubTask = subTask?.data[0];
    let taskAge = null;
    let subTaskAge = null;
    if (
      updatedTasks &&
      updatedTasks?.tasks &&
      updatedTasks?.tasks?.length > 0
    ) {
      for (let i = 0; i < updatedTasks.tasks.length; i++) {
        const currentDate = new Date();
        const enteredDate = new Date(updatedTasks?.tasks[i]?.createdAt);
        const differenceInMilliseconds = currentDate - enteredDate;
        const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
        updatedTasks.tasks[i].age = Math.floor(differenceInDays);
      }
    }
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
      tasks: updatedTasks,
      task: updatedTask,
      subTasks: subTasks?.data?.Task,
      subTask: updatedSubTask,
      // personResponsible: personResponsible?.data?.map((user) => ({
      //   label: user.name,
      //   value: user.id,
      // })),
      // threadName: params.BMid ? ` Board Meetings Tasks` : `Tasks`,
      // threadPath: params.BMid
      //   ? `/${parentPath}/${params.id}/${params.boardmeetings}/${params.BMid}/tasks`
      //   : `/${parentPath}/${params.id}/tasks`,
    };
    console.log("tasks AllTasksLoader");

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

        if (requestBody.type === "ADD_NEW_TASK") {
          return await atbtApi.post(
            `task/add/${params.BMid}`,

            {
              createdby: requestBody.createdby,
              taskCreatedBy: { name: parentPath, id: parseInt(params.id) },
              collaborators: [requestBody.createdby],
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
  const { authState } = useContext(AuthContext);
  const { permissions, loading } = useContext(PermissionsContext);

  let meetingPermission = permissions?.find(
    (permission) => permission.module === "task"
  );
  console.log(meetingPermission, "meetingPermission");
  console.log("authState authState", authState);
  let submit = useSubmit();
  let location = useLocation();
  let matches = useMatches();
  console.log(matches[0].params.statusType, "matches matches");
  const data = useLoaderData();
  const navigation = useNavigation();
  let [tasks, setTasks] = useState([]);
  let [task, setTask] = useState({});
  let [subTasks, setSubTasks] = useState();
  let [subTask, setSubTask] = useState();
  // members = data?.personResponsible;
  useEffect(() => {
    setTasks(data?.tasks?.tasks);
    setTask(data?.task);
    setSubTasks(data?.subTasks);
    setSubTask(data?.subTask);
  }, [data]);

  let fetcher = useFetcher();
  const { id, BMid, statusType } = useParams();
  // const [Qparams, setQParams] = useState(() => {
  //   search: "",

  //   page: 1,
  //   pageSize: 10,
  //   // Initialize the state object conditionally
  //   // const initialState = {};
  //   // if (!BMid) {
  //   //   initialState.status = status;
  //   // }
  //   // return initialState;
  // });
  const [Qparams, setQParams] = useState({
    search: "",
    page: 1,
    pageSize: 10,
  });
  console.log(Qparams, "Qparams");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

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
    let requestBody = {
      type: "ADD_NEW_TASK",
      createdby: parseInt(authState?.user?.id),
    };

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
  const handlePerPageChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    console.log(selectedValue, "sv");
    setQParams({
      ...Qparams,
      page: 1,
      pageSize: selectedValue,
    });
  };
  function handlePage(page) {
    setQParams({
      ...Qparams,
      page,
    });
  }

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
  const [activeLink, setActiveLink] = useState(matches[0].params.statusType);
  useEffect(() => {
    setActiveLink(matches[0].params.statusType);
  }, [matches]);
  console.log(activeLink, "activeLink");
  // Function to handle click and set active link
  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  function handleSearch(event) {
    setQParams({
      ...Qparams,
      search: event.target.value,
    });
  }
  let [dueDateFilter, setDueDateFilter] = useState({});
  const createQueryString = (params) => {
    return new URLSearchParams(params).toString();
  };
  const queryString = createQueryString(Qparams);
  console.log(queryString, "queryString");
  let [mailSending, setMailSending] = useState(false);

  let [mailSendingId, setMailSendingId] = useState(null);
  const handleSendMail = async (id) => {
    return await toast.promise(atbtApi.post(`sendbyemail/${id}`), {
      pending: {
        render() {
          setMailSending(true);
          return "Sending Mail...";
        },
      },
      success: {
        render() {
          setMailSending(false);
          setMailSendingId(null);
          return "Mail Sent";
        },
      },
      error: {
        render({ data }) {
          setMailSending(false);
          setMailSendingId(null);
          // Extracting the error message from the response
          const errorMessage =
            data?.response?.data?.message || "Error occurred";
          console.log(data?.response?.data, "Error sending email");
          // Returning the error message for the toast notification
          return `Error: ${errorMessage}`;
          // Optionally, you can use a custom component here instead
          // return <MyErrorComponent message={errorMessage} />;
        },
      },
    });
  };

  console.log("mailSending", mailSending);

  return (
    <div className={` ${parentPath === "tasks" ? "p-3" : ""}`}>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-col-4 items-center gap-2 mt-2">
        <div className="col-span-1">
          {parentPath === "tasks" && (
            <p className="text-md font-semibold">Decisions</p>
          )}
        </div>

        <div className="col-span-1 text-start">
          {/* <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center p-3 pointer-events-none">
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={handleSearch}
              value={Qparams?.search}
              type="search"
              id="default-search"
              className="block w-full px-4 py-2 ps-8 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none placeholder:text-sm"
              placeholder="Search here..."
              required
            />
          </div> */}
        </div>

        {parentPath === "tasks" && (
          <div className="col-span-2 ">
            <div className=" md:flex gap-2 items-center md:justify-end">
              <label className="text-sm text-gray-400"> From:</label>

              <input
                className=" border border-gray-200 text-black px-1.5 py-2 rounded-md bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400 date_type w-full"
                type="date"
                value={dueDateFilter.fromDate}
                style={{
                  fontSize: "0.8rem",
                  WebkitAppearance: "none",
                }}
                onChange={(e) => {
                  // handleSubmit(task?.id, "dueDate", e.target.value);
                  setQParams((prev) => ({ ...prev, fromDate: e.target.value }));
                  setDueDateFilter((prev) => ({
                    ...prev,
                    fromDate: e.target.value,
                  }));
                  // handleTaskChange(index, "dueDate", e.target.value);
                }}
              />
              <label className="text-sm text-gray-400"> To:</label>
              <input
                className=" border border-gray-200 text-black px-1.5 py-2 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400 date_type w-full"
                type="date"
                value={dueDateFilter.toDate}
                style={{
                  fontSize: "0.8rem",
                  WebkitAppearance: "none",
                }}
                onChange={(e) => {
                  setQParams((prev) => ({
                    ...prev,

                    toDate: e.target.value,
                  }));
                  setDueDateFilter((prev) => ({
                    ...prev,
                    toDate: e.target.value,
                  }));
                }}
              />
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    let Qprms = { ...Qparams };
                    delete Qprms.fromDate;
                    delete Qprms.toDate;
                    setQParams(Qprms);
                    setDueDateFilter({ toDate: "", fromDate: "" });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4 cursor-pointer hover:text-orange-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                    />
                  </svg>
                </button>

                <TasksFilter Qparams={Qparams} setQParams={setQParams} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {BMid &&
          (parentPath === "users" ||
            parentPath === "entities" ||
            parentPath === "teams") && (
            <GateKeeper
              permissionCheck={(permission) =>
                permission.module === "task" && permission.canCreate
              }
            >
              <button
                className=" ms-2  mt-3 inline-flex items-center  whitespace-nowrap rounded-2xl text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  text-orange-foreground shadow hover:bg-orange/90 h-9 px-3 py-1 shrink-0 bg-orange-600 text-white gap-1"
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
                Create
              </button>
            </GateKeeper>
          )}
      </div>
      <div>
        <div className="flex overflow-x-auto my-2">
          {!BMid &&
            (parentPath === "users" ||
              parentPath === "entities" ||
              parentPath === "teams") && (
              <NavLink
                to={`/${parentPath}/${id}/tasks/runningdecisions?${queryString}`}
                end
                onClick={() => handleNavLinkClick("runningdecisions")}
                className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                  activeLink === "runningdecisions"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : ""
                }`}
              >
                Running Decisions
              </NavLink>
            )}
          {!BMid && parentPath === "tasks" && (
            <NavLink
              // to={`/tasks`}
              to={`/tasks/runningdecisions?${queryString}`}
              end
              onClick={() => handleNavLinkClick("runningdecisions")}
              className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                activeLink === "runningdecisions"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : ""
              }`}
            >
              Running Decisions
            </NavLink>
          )}
          {!BMid &&
            (parentPath === "users" ||
              parentPath === "entities" ||
              parentPath === "teams") && (
              <NavLink
                to={`/${parentPath}/${id}/tasks/Master?${queryString}`}
                end
                className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                  activeLink === "Master"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("Master")}
              >
                Master
              </NavLink>
            )}
          {!BMid && parentPath === "tasks" && (
            <NavLink
              // to={`/tasks`}
              to={`/tasks/Master?${queryString}`}
              end
              className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                activeLink === "Master"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : ""
              }`}
              onClick={() => handleNavLinkClick("Master")}
              // onClick={() =>{ handleNavLinkClick("Master");
              // let Qprams = {...Qparams}
              // delete Qprams.status
              // setQParams(Qprams)}}
            >
              Master
            </NavLink>
          )}
          {!BMid &&
            (parentPath === "users" ||
              parentPath === "entities" ||
              parentPath === "teams") && (
              <NavLink
                to={`/${parentPath}/${id}/tasks/To-Do?${queryString}`}
                end
                className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                  activeLink === "To-Do"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("To-Do")}
              >
                To-Do
              </NavLink>
            )}
          {!BMid && parentPath === "tasks" && (
            <NavLink
              to={`/tasks/To-Do?${queryString}`}
              end
              className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                activeLink === "To-Do"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : ""
              }`}
              onClick={() => {
                handleNavLinkClick("To-Do");
              }}
              // onClick={() => handleNavLinkClick("To-Do")}
            >
              To-Do
            </NavLink>
          )}
          {!BMid &&
            (parentPath === "users" ||
              parentPath === "entities" ||
              parentPath === "teams") && (
              <NavLink
                to={`/${parentPath}/${id}/tasks/In-Progress?${queryString}`}
                end
                className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                  activeLink === "In-Progress"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("In-Progress")}
              >
                In-Progress
              </NavLink>
            )}
          {!BMid && parentPath === "tasks" && (
            <NavLink
              to={`/tasks/In-Progress?${queryString}`}
              end
              className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                activeLink === "In-Progress"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : ""
              }`}
              // onClick={() => handleNavLinkClick("In-Progress")}
              onClick={() => {
                handleNavLinkClick("In-Progress");
              }}
            >
              In-Progress
            </NavLink>
          )}
          {!BMid &&
            (parentPath === "users" ||
              parentPath === "entities" ||
              parentPath === "teams") && (
              <NavLink
                to={`/${parentPath}/${id}/tasks/Over-Due?${queryString}`}
                end
                className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                  activeLink === "Over-Due"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("Over-Due")}
              >
                Overdue
              </NavLink>
            )}
          {!BMid && parentPath === "tasks" && (
            <NavLink
              to={`/tasks/Over-Due?${queryString}`}
              end
              className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                activeLink === "Over-Due"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : ""
              }`}
              onClick={() => handleNavLinkClick("Over-Due")}
              // onClick={() =>{ handleNavLinkClick("OverDue");setQParams((prev)=>({...prev,status:"Over-Due"}))}}
            >
              Overdue
            </NavLink>
          )}
          {!BMid &&
            (parentPath === "users" ||
              parentPath === "entities" ||
              parentPath === "teams") && (
              <NavLink
                to={`/${parentPath}/${id}/tasks/On-Hold?${queryString}`}
                end
                className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                  activeLink === "On-Hold"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("On-Hold")}
              >
                On-Hold
              </NavLink>
            )}
          {!BMid && parentPath === "tasks" && (
            <NavLink
              to={`/tasks/On-Hold?${queryString}`}
              end
              className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                activeLink === "On-Hold"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : ""
              }`}
              onClick={() => handleNavLinkClick("On-Hold")}
            >
              On-Hold
            </NavLink>
          )}
          {!BMid &&
            (parentPath === "users" ||
              parentPath === "entities" ||
              parentPath === "teams") && (
              <NavLink
                to={`/${parentPath}/${id}/tasks/Completed?${queryString}`}
                end
                className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                  activeLink === "Completed"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : ""
                }`}
                onClick={() => handleNavLinkClick("Completed")}
              >
                Completed
              </NavLink>
            )}
          {!BMid && parentPath === "tasks" && (
            <NavLink
              to={`/tasks/Completed?${queryString}`}
              end
              className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
                activeLink === "Completed"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : ""
              }`}
              onClick={() => handleNavLinkClick("Completed")}
              // onClick={() =>{ handleNavLinkClick("Completed");setQParams((prev)=>({...prev,status:"Completed"}))}}
            >
              Completed
            </NavLink>
          )}
        </div>
      </div>
      <div className=" max-h-[410px] overflow-y-auto">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md table ">
          <thead>
            <tr>
              {parentPath === "tasks" && (
                <th className="sticky top-0  bg-orange-600 text-white text-sm text-left px-2 py-2 border-l-2 border-gray-200">
                  Module
                </th>
              )}
              {parentPath === "tasks" && (
                <th className="sticky top-0  bg-orange-600 text-white text-sm text-left px-2 py-2 border-l-2 border-gray-200">
                  Name
                </th>
              )}
              <th
                className="sticky top-0  bg-orange-600 text-white text-sm text-left px-2 py-2 border-l-2 border-gray-200"
                style={{ width: "15rem" }}
              >
                Initial Decision Taken
              </th>
              <th
                className="sticky top-0 z-10  bg-orange-600 text-white text-sm text-left px-2 py-2 border-l-2 border-gray-200 "
                style={{ width: "13rem" }}
              >
                Person Responsible
              </th>
              <th
                className="sticky top-0 z-10 bg-orange-600 text-white text-sm text-left px-2 py-2 border-l-2 border-gray-200 "
                style={{ width: "6rem" }}
              >
                Due Date
              </th>
              <th className="sticky top-0 z-10 bg-orange-600 text-white text-sm text-left px-2 py-2 border-l-2 border-gray-200">
                Age
              </th>
              <th
                className="sticky top-0 z-10 bg-orange-600 text-white text-sm text-left px-2 py-2 border-l-2 border-gray-200 "
                style={{ width: "8rem" }}
              >
                Decision Status
              </th>
              <th
                className="sticky top-0  bg-orange-600 text-white text-sm text-left px-2 py-2 border-l-2 border-gray-200 "
                style={{ width: "15rem" }}
              >
                Latest Decision Update
              </th>
              {/* <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2 border-l-2 border-gray-200">
                Decision Updated of Admin
              </th> */}
              {(authState?.user?.role === "super admin" ||
                authState?.user?.role === "Super Admin" ||
                authState?.user?.role === "admin" ||
                authState?.user?.role === "Admin") && (
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2 border-l-2 border-gray-200">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="">
            {tasks?.map((task, index) => {
              const decisionHeight =
                task?.decision === null || task?.decision === "" ? "2rem" : "";
              let members = task?.group.map((user) => ({
                label: user.name,
                value: user.id,
              }));
              return (
                <tr key={task.id} className="border-b border-gray-200 ">
                  {parentPath === "tasks" && (
                    <td className="border py-1 px-2 text-sm">
                      {caseLetter(task?.createdBy.name)}
                    </td>
                  )}
                  {parentPath === "tasks" && (
                    <td className="border py-1 px-2 text-sm">
                      {caseLetter(task?.blongsTo)}{" "}
                    </td>
                  )}
                  <td className="border py-1.5 px-2 ">
                    <div className="flex items-center justify-between">
                      {isInputActiveID === task.id && (
                        <input
                          className="border border-[#d1d5db] text-black px-1.5 py-1 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400 "
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
                          className="text-sm break-words"
                          onClick={
                            meetingPermission.canUpdate
                              ? () => {
                                  setIsInputActive(task.id);
                                  setAutoFocusID(task.id);
                                }
                              : null
                          }
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
                          <span className="flex items-center ml-2 px-0.5 ">
                            <span className="text-sm">{task.subtaskCount}</span>
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

                  <td className="border py-1 px-2">
                    <Select
                      isDisabled={!meetingPermission.canUpdate}
                      options={members}
                      menuPortalTarget={document.body}
                      closeMenuOnScroll={() => true}
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
                          cursor: "pointer",
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
                          width: "13rem",
                        }),

                        option: (provided, state) => ({
                          ...provided,
                          color: state.isFocused ? "#fff" : "#000000",
                          fontSize: "12px",
                          cursor: "pointer",
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
                      onChange={
                        meetingPermission.canUpdate
                          ? (selectedOption) => {
                              handleSubmit(
                                task?.id,
                                "members",
                                selectedOption.value
                              );
                              handleTaskChange(
                                index,
                                "members",
                                selectedOption.value
                              );
                            }
                          : null
                      }
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
                      maxMenuHeight={150}
                      // closeMenuOnSelect={()=> true}
                      // menuIsOpen = {()=> true}
                    />
                  </td>
                  <td className="border py-1 px-2">
                    <input
                      className=" border border-transparent text-black px-1.5 py-2 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400  date_type"
                      type="date"
                      value={task?.dueDate}
                      style={{
                        fontSize: "0.8rem",
                        WebkitAppearance: "none",
                      }}
                      min={getCurrentDate()}
                      onChange={
                        meetingPermission.canUpdate
                          ? (e) => {
                              handleSubmit(task?.id, "dueDate", e.target.value);
                              handleTaskChange(
                                index,
                                "dueDate",
                                e.target.value
                              );
                            }
                          : null
                      }
                      disabled={!meetingPermission.canUpdate}
                    />
                  </td>

                  <td className="border py-1 px-2 text-sm" title={task?.age}>
                    {task?.age}{" "}
                  </td>
                  <td className="border py-1 px-2 text-sm" title={task?.status}>
                    {task?.status}

                    {/* <Select
                      options={status}
                      menuPortalTarget={document.body}
                      closeMenuOnScroll={() => true}
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
                    /> */}
                  </td>
                  <td className="border py-1 px-2 text-sm text-gray-600 ">
                    {task?.updatedbyuser}
                  </td>
                  {(authState?.user?.role === "super admin" ||
                    authState?.user?.role === "Super Admin" ||
                    authState?.user?.role === "admin" ||
                    authState?.user?.role === "Admin") && (
                    <td className="border py-1 px-2 text-sm text-gray-600 ">
                      <p
                        className={`text-sm flex  ${
                          mailSending && mailSendingId === task?.id
                            ? "text-gray-400 cursor-not-allowed"
                            : "hover:text-orange-500 cursor-pointer"
                        }`}
                        onClick={() => {
                          if (!mailSending) {
                            handleSendMail(task?.id);

                            setMailSendingId(task?.id);
                          }
                        }}
                      >
               

                        {/* <svg
                          height="650pt"
                          viewBox="-20 -149 650.66601 650"
                          width="650pt"
                          xmlns="http://www.w3.org/2000/svg"
                          class="size-5 hover:text-orange-500"
                          id="fi_1334160"
                          
                        >
                          <path d="m500.414062 60.027344c-2.5-2.492188-6.253906-3.230469-9.519531-1.875-3.257812 1.355468-5.382812 4.539062-5.382812 8.070312v55.371094c-6.558594.210938-12.746094.726562-18.601563 1.453125v-72.644531c0-1.160156-.042968-2.3125-.109375-3.453125.222657-1.449219.078125-2.929688-.421875-4.304688-3.914062-29.125-28.753906-50.875-58.140625-50.925781l-349.566406-.007812c-29.484375.042968-54.371094 21.933593-58.175781 51.171874-.4609378 1.335938-.597656 2.757813-.394532 4.152344-.0624995 1.113282-.101562 2.226563-.101562 3.351563v233.992187c-.015625 13.683594 4.777344 26.941406 13.539062 37.449219.421876.816406.972657 1.5625 1.632813 2.203125.390625.382812.820313.726562 1.273437 1.027344 11.035157 11.503906 26.289063 18.007812 42.226563 18.003906l349.566406.007812c15.917969 0 31.148438-6.484374 42.179688-17.960937 1.234375-.8125 2.242187-1.929687 2.921875-3.242187 8.777344-10.515626 13.578125-23.777344 13.566406-37.472657v-61.058593c6.179688-.636719 12.402344-.753907 18.605469-.34375v57.257812c0 3.535156 2.132812 6.71875 5.402343 8.070312 3.269532 1.351563 7.027344.59375 9.527344-1.910156l107.015625-107.542968c3.402344-3.425782 3.386719-8.960938-.03125-12.363282zm-441.742187-50.839844 349.566406.011719c19.605469.027343 36.488281 13.84375 40.390625 33.054687l-191.699218 162.570313c-13.484376 11.503906-33.324219 11.511719-46.820313.019531l-191.851563-162.464844c3.847657-19.277344 20.757813-33.167968 40.414063-33.191406zm-.007813 316.394531c-8.921874.011719-17.601562-2.890625-24.722656-8.257812l105.4375-107.832031c3.375-3.453126 3.3125-8.984376-.140625-12.359376-3.449219-3.375-8.984375-3.316406-12.359375.136719l-104.410156 106.78125c-3.292969-6.03125-5.015625-12.792969-5.003906-19.667969l.007812-219.765624 181.34375 153.566406c20.007813 17.035156 49.421875 17.023437 69.414063-.027344l181.207031-153.675781v61.574219c-32.691406 7.277343-50.800781 20.945312-54.289062 23.800781l-.019532-.027344c-19.320312 15.875-34.453125 36.246094-44.066406 59.332031l-11.699219-11.898437c-3.382812-3.445313-8.914062-3.492188-12.355469-.109375-3.445312 3.386718-3.492187 8.921875-.109374 12.359375l17.839843 18.15625c-.957031 3.527343-1.824219 7.085937-2.539062 10.710937-3.394531 16.769532-4.003907 33.980469-1.800781 50.945313l.011718.078125c.019532.132812.039063.269531.0625.40625l2.148438 12.367187c.625 3.597657 3.425781 6.425781 7.015625 7.09375 3.585937.667969 7.214843-.964843 9.09375-4.09375l6.445312-10.75c5.589844-9.378906 12.003907-18.234375 19.171875-26.464843l48.5625 49.40625c-7.109375 5.34375-15.769531 8.226562-24.664062 8.214843zm390.765626-41.1875c.003906 6.902344-1.730469 13.6875-5.046876 19.734375l-47.804687-48.644531c14.980469-13.84375 33.128906-23.808594 52.851563-29.011719zm53.554687-25.320312v-43.894531c0-4.289063-3.109375-7.945313-7.34375-8.628907-12.839844-1.84375-25.890625-1.671875-38.675781.515625-.226563.035156-.457032.070313-.675782.117188-28.878906 4.867187-67.664062 20.980468-99.621093 68.089844-.414063-11.230469.480469-22.476563 2.667969-33.503907 6.222656-31.4375 22.011718-57.839843 46.941406-78.476562.125-.097657.230468-.199219.34375-.300781 1.175781-.960938 30.324218-24.039063 86.019531-24.039063h1.617187c4.820313 0 8.738282-3.914063 8.738282-8.738281v-42.96875l85.90625 85.484375zm0 0"></path>
                        </svg> */}
                        <svg
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          id="fi_10747263"
                          xmlns="http://www.w3.org/2000/svg"
                          class="size-5 hover:text-orange-500"
                        >
                          <path d="m19 1.75h-14c-2.07 0-3.75 1.68-3.75 3.75v10c0 2.07 1.68 3.75 3.75 3.75h3c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-3c-1.24 0-2.25-1.01-2.25-2.25v-9.66l8.35 5c.28.17.59.25.9.25s.62-.08.9-.25l8.35-5v7c0 .41.34.75.75.75s.75-.34.75-.75v-7.34c0-2.07-1.68-3.75-3.75-3.75zm-6.87 7.8c-.08.05-.17.05-.26 0l-8.77-5.25c.4-.63 1.1-1.05 1.9-1.05h14c.8 0 1.5.42 1.9 1.05zm10.4 8.42c.29.29.29.77 0 1.06l-3 3c-.15.15-.34.22-.53.22s-.38-.07-.53-.22c-.29-.29-.29-.77 0-1.06l1.72-1.72h-8.19c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8.19l-1.72-1.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0z"></path>
                        </svg>
                        {/* Email */}
                      </p>
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`size-5 ${
                          mailSending && mailSendingId === task?.id
                            ? "text-gray-400 cursor-not-allowed"
                            : "hover:text-orange-500"
                        }`}
                        onClick={() => {
                          if (!mailSending) {
                            handleSendMail(task?.id);

                            setMailSendingId(task?.id);
                          }
                        }}
                      >
                        <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                        <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                      </svg> */}
                    </td>
                  )}
                  {/* <td className="border py-1.5 px-3 text-sm text-gray-600 cursor-pointer" style={{width :"3rem"}} >
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
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <TaskOverview
        task={task}
        subTasks={subTasks}
        subTask={subTask}
        setTask={setTask}
        Qparams={Qparams}
        setQParams={setQParams}
        setOverViewTask={setOverViewTask}
        handleOverviewTaskChange={handleOverviewTaskChange}
        overViewTask={overViewTask}
        handleSubmit={handleSubmit}
        status={status}
        handleAddSubTask={handleAddSubTask}
        handleSubTaskChange={handleSubTaskChange}
        handleSubTaskSubmit={handleSubTaskSubmit}
        handleOverviewSubTaskChange={handleOverviewSubTaskChange}
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
        meetingPermission={meetingPermission}
      />
      {/* pagination */}
      <div className="inset-x-0 bottom-0 mt-5">
        <div className="md:flex md:justify-between block text-end">
          <div className="">
            {!data?.tasks?.tasks || data?.tasks?.tasks?.length === 0 ? (
              "no data to show"
            ) : data?.tasks?.tasks?.loading ? (
              "Loading..."
            ) : (
              <p className="text-sm text-gray-700">
                Showing {data?.tasks?.startTasks} to {data?.tasks?.endTasks} of{" "}
                <span className="text-sm">{data?.tasks?.totalTasks}</span> Tasks
              </p>
            )}
          </div>

          <section
            className="isolate inline-flex rounded-md  ms-4 mt-2 md:mt-0"
            aria-label="Pagination"
          >
            <select
              value={Qparams?.pageSize}
              onChange={handlePerPageChange}
              className="focus:outline-none me-3 rounded-md bg-[#f8fafc]  px-1 py-1.5 text-sm font-semibold  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 shadow-sm  text-gray-500 cursor-pointer"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
            </select>
            {/* previos button */}
            <button
              disabled={
                navigation?.state === "loading"
                  ? true
                  : false || data?.tasks?.currentPage === 1
              }
              onClick={() => handlePage(data?.tasks?.currentPage - 1)}
              href="#"
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                navigation?.state === "loading"
                  ? "cursor-wait"
                  : data?.tasks?.currentPage === 1
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            {/* next button */}
            <button
              disabled={
                navigation?.state === "loading"
                  ? true
                  : false ||
                    data?.tasks?.currentPage === data?.tasks?.totalPages
              }
              onClick={() => handlePage(data?.tasks?.currentPage + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                navigation?.state === "loading"
                  ? "cursor-wait"
                  : data?.tasks?.currentPage === data?.tasks?.totalPages
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Tasks;
