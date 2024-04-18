import React, {
  useState,
  Fragment,
  useRef,
  useEffect,
  useContext,
} from "react";
import Select from "react-select";
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
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const TaskOverview = ({
  overViewTask,
  handleOverViewTask,
  tasks,
  overViewTaskId,
}) => {
  // -------full screen----
  const [expand, setExpand] = useState(false);
  const [task,setTask]=useState()
  useEffect(()=>{
    let task  =tasks?.filter(task => task.id === overViewTaskId)
    setTask(task[0])
  },[overViewTaskId])
  const handleExpand = () => {
    setExpand(!expand);
  };
console.log("tasktask",task)
  let moduleOptions = [
    { value: "user", label: "user" },
    { value: "entity", label: "entity" },
  ];
  return (
    <div
      className={`fixed inset-0 transition-all duration-500 bg-gray-800 bg-opacity-50 z-50  ${
        overViewTask ? "" : "hidden"
      }`}
    >
      <div
        className={` fixed inset-y-0 right-0  bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out ${
          expand ? "w-3/4" : "w-2/5"
        }`}
      >
        <div className="flex justify-start p-2">
          <div className="relative inline-block ms-2">
            <select className="block appearance-none w-full bg-white text-sm border border-gray-300 hover:border-gray-300 px-1 py-1.5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <option value="option1">Select Status</option>
              <option value="option2">Completed</option>
              <option value="option3">Inprogress</option>
              <option value="option4">To Do</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 7l3-3 3 3m0 6l-3 3-3-3"></path>
              </svg>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="me-4 w-5 h-5 text-gray-500"
            >
              <path
                fill-rule="evenodd"
                d="M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z"
                clip-rule="evenodd"
              />
            </svg>
            <button onClick={handleExpand}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 me-4 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button onClick={handleOverViewTask} className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr />
        <div className="mt-2 ms-2 p-3 overflow-y-auto h-screen">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 xl:grid-col-7 items-center mb-4">
            <div className="col-span-2 basis-1/4 text-sm text-gray-600">
              Decision Taken
            </div>
            <span className="col-span-1 text-center"> : </span>
            <div className="col-span-4">
              <input
              value={task?.decisionTaken}
                type="text"
                placeholder="Enter Description"
                className="px-2 py-2 text-sm block w-full rounded-md bg-white-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder-small"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 xl:grid-col-7 items-center mb-4">
            <div className="col-span-2 basis-1/4 text-sm text-gray-600">
              Person Responsible
            </div>
            <span className="col-span-1 text-center"> : </span>
            <div className="col-span-4">
              <input
                type="text"
                placeholder="Person Responsible"
                className="px-2 py-2 text-sm block w-full rounded-md bg-white-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder-small"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 xl:grid-col-7 items-center mb-4">
            <div className="col-span-2 basis-1/4 text-sm text-gray-600">
              Due Date
            </div>
            <span className="col-span-1 text-center"> : </span>
            <div className="col-span-4">
              <input
                type="date"
                className="px-2 py-2 text-sm block w-full rounded-md bg-white-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder-small"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 xl:grid-col-7 items-center mb-4">
            <div className="col-span-2 basis-1/4 text-sm text-gray-600">
              Age
            </div>
            <span className="col-span-1 text-center"> : </span>
            <div className="col-span-4">
              <input
                type="number"
                placeholder="Age"
                className="px-2 py-2 text-sm block w-full rounded-md bg-white-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder-small"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 xl:grid-col-7 items-center mb-4">
            <div className="col-span-2 basis-1/4 text-sm text-gray-600">
              Date of Board Meeting
            </div>
            <span className="col-span-1 text-center"> : </span>
            <div className="col-span-4">
              <input
                type="date"
                placeholder="Date of Board Meeting"
                className="px-2 py-2 text-sm block w-full rounded-md bg-white-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder-small"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 xl:grid-col-7 items-center mb-4">
            <div className="col-span-2 basis-1/4 text-sm text-gray-600">
              Board Meeting Number
            </div>
            <span className="col-span-1 text-center"> : </span>
            <div className="col-span-4">
              <input
                type="number"
                placeholder="Board Meeting Number"
                className="px-2 py-2 text-sm block w-full rounded-md bg-white-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder-small"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 xl:grid-col-7 items-center mb-4">
            <div className="col-span-2 basis-1/4 text-sm text-gray-600">
              Entity
            </div>
            <span className="col-span-1 text-center"> : </span>
            <div className="col-span-4">
              <Select
                options={moduleOptions}
                className="custom-select"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "rgb(255 255 255)", // Change the background color of the select input
                    borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                    borderColor: state.isFocused
                      ? "#orange-400"
                      : "rgb(209 213 219)", // Change border color when focused
                    boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                    fontSize: "0.875rem" /* 14px */,
                    lineHeight: "1.25rem" /* 20px */,
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "small", // Adjust the font size of the placeholder text
                    color: "#a0a7b2",
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
                  singleValue: (provided) => ({
                    ...provided,
                    fontSize: "0.875rem" /* 14px */,
                    lineHeight: "1.25rem" /* 20px */, // Adjust the font size for the selected option
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

                // value={module}
                // onChange={handleModuleChange}
              />
            </div>
          </div>
          {/* <div className="mt-5 flex flex-row">
            <p className="basis-1/4 text-sm text-gray-600">Due Date</p>
            <p className="basis-1/2 text-sm">24/1/2024</p>
          </div> */}

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 xl:grid-col-7 items-center mb-4">
            <div className="col-span-2 basis-1/4 text-sm text-gray-600">
              Priority
            </div>
            <span className="col-span-1 text-center"> : </span>
            <div className="col-span-4">
              <Select
                options={moduleOptions}
                className="custom-select"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "rgb(255 255 255)", // Change the background color of the select input
                    borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                    borderColor: state.isFocused
                      ? "#orange-400"
                      : "rgb(209 213 219)", // Change border color when focused
                    boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                    fontSize: "0.875rem" /* 14px */,
                    lineHeight: "1.25rem" /* 20px */,
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "small", // Adjust the font size of the placeholder text
                    color: "#a0a7b2",
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
                  singleValue: (provided) => ({
                    ...provided,
                    fontSize: "0.875rem" /* 14px */,
                    lineHeight: "1.25rem" /* 20px */, // Adjust the font size for the selected option
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
              />
            </div>
          </div>
          {/* <div className="mt-5 flex flex-row">
            <p className="basis-1/4 text-sm text-gray-600">Description</p>
            <p className="basis-1/2"></p>
          </div> */}
          {/* <div className="mt-5">
            <textarea
              placeholder="What is this task about ?"
              className="p-3 text-sm resize-none shadow-sm rounded-md w-full h-32 focus:outline-none focus:border-orange-400"
            ></textarea>
          </div> */}
          <div className="flex justify-end">
            <button className=" px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white mb-4 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 "
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              Add Subtask
            </button>
          </div>

          <hr />
          <div className="flex mt-3">
            <div className="me-2">
              <p className="bg-yellow-500 text-black py-1.5 w-8 h-8  rounded-full">
                <span className="flex justify-center text-gray-800 text-sm">
                  BA
                </span>
              </p>
            </div>
            <div className="flex-1 w-86">
              <textarea
                placeholder="Add a comment"
                className="p-2 border-2 text-sm resize-none shadow-sm rounded-md w-full h-28 focus:outline-none focus:border-orange-400"
              ></textarea>
              <div className="me-2 flex flex-row">
                <p className="text-sm mt-1">Collaborators</p>
                <p className="ms-2 bg-yellow-500 text-black py-1.5 w-8 h-8 rounded-full">
                  <span className="flex justify-center text-gray-800 text-sm">
                    BA
                  </span>
                </p>
                <p className="ms-2 bg-white border-dashed border-2 border-gray-600 text-gray-600  py-1 w-7 h-7 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="ms-1 w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </p>
                <p className="ms-2 bg-white border-dashed border-2 border-gray-600 text-gray-600  py-1 w-7 h-7 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="ms-1 w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </p>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mt-2 ms-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
