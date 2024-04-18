import React, {
    useState,
    Fragment,
    useRef,
    useEffect,
    useContext,
  } from "react";
  import "../LandingPageCommon.css";
  import { Calendar, momentLocalizer } from "react-big-calendar";
  import "react-big-calendar/lib/css/react-big-calendar.css";
  import moment from "moment";
  import { Dialog, Transition, Menu } from "@headlessui/react";
  import defprop from "../../../Images/defprof.svg";
  import { Link, Outlet, useParams } from "react-router-dom";
  import { ChevronDownIcon } from "@heroicons/react/20/solid";
  import useInitializePerPage from "../../../hooks/initializePerPage/useInitializePerPage";
  import useDebounce from "../../../hooks/debounce/useDebounce";
  import { EntitiesDataContext } from "../../../contexts/entitiesDataContext/entitiesDataContext";
  import axios from "axios";
  import TaskOverview from "./TaskOverview";
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const MeetingWiseTask = () => {
    const { id } = useParams();
    // ----toggleDrawer-------
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };
    // -------full screen----
  
    const [overViewNewTask, setOverViewNewTask] = useState(false);
    const handleOverViewNewTask = () => {
      setOverViewNewTask(!overViewNewTask);
    };
    const [tasks, setTasks] = useState([]);
  
    const handleAddNewTask = () => {
      setTasks((prevTasks) => [
        {
          taskName: "", //decisiontaken
          assignee: "", //responsibileperson
          duedate: "",
          dateOfBoardMeeting: "",
          boardMeetingNo: "",
          status: "",
          updateDecisionUser: "",
          updateDecisionAdmin: "",
        },
        ...prevTasks,
      ]);
    };
    const handleEditTask = (index, fieldName, e) => {
      const { name, value } = e.target;
      const updatedTasks = tasks.map((task, idx) => {
        if (idx === index) {
          return {
            ...task,
            [fieldName]: value,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
    };
    // active input
    const [activeInputIndex, setActiveInputIndex] = useState();
    const [activeInputName, setActiveInputName] = useState();
  
    const handleActiveInput = (index, name) => {
      setActiveInputIndex(index);
      setActiveInputName(name);
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
                      value={task.taskname}
                      onChange={(e) => handleEditTask(index, "taskname", e)}
                      onClick={() => handleActiveInput(index, "taskname")}
                      placeholder="Decision Taken"
                      title={task.taskname}
                    />
                    <span
                      className="shadow_box p-1 rounded-sm cursor-pointer"
                      onClick={handleOverViewNewTask}
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
                      value={task.assignee}
                      onChange={(e) => handleEditTask(index, "assignee", e)}
                      onClick={() => handleActiveInput(index, "assignee")}
                      placeholder="Person Reponsible"
                      title={task.assignee}
                    />
                  </td>
                  <td className={`border text-center  text-sm p-1.5`}>
                    <input
                      className="outline-none text-black truncate px-1.5 py-1 rounded-md shadow_box w-full bg-[#f8fafc]"
                      type="date"
                      value={task.duedate}
                      onChange={(e) => handleEditTask(index, "duedate", e)}
                      onClick={() => handleActiveInput(index, "duedate")}
                      title={task.duedate}
                   
                    />
  
                  </td>
  
                  <td
                    className={`border text-center  text-sm 
                                     ${activeInputIndex === index &&
                        activeInputName === "status"
                        ? " border-2 border-slate-300"
                        : " border border-slate-200 "
                      }`}
                  >
                    <input
                      className="outline-none text-black truncate  py-2 bg-[#f8fafc]"
                      type="text"
                      value={task.status}
                      onChange={(e) => handleEditTask(index, "status", e)}
                      onClick={() => handleActiveInput(index, "status")}
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
          overViewNewTask={overViewNewTask}
          handleOverViewNewTask={handleOverViewNewTask}
        />
      </div>
    );
  };
  
  export default MeetingWiseTask;
  