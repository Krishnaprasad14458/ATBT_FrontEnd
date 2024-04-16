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
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const TaskOverview = ({overViewNewTask,handleOverViewNewTask}) => {

  // -------full screen----
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  return (
        <div
          className={`fixed inset-0 transition-all duration-500 bg-gray-800 bg-opacity-50 z-50  ${
            overViewNewTask ? "" : "hidden"
          }`}
        >
          <div
            className={`p-3 fixed inset-y-0 right-0  bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out ${
              expand ? "w-3/4" : "w-2/5"
            }`}
          >
            <div className="flex justify-start">
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
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 me-4 text-gray-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg> */}
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
                <button onClick={handleOverViewNewTask} className="">
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
            <div className="mt-5 ms-3">
              {/* <p className="text-xl font-semibold">Bhavitha</p> */}
              {/* <div className="mt-5 flex flex-row">
                <p className="basis-1/4 text-sm text-gray-600">Assignee</p>
                <p className="basis-1/2 text-sm  flex flex-row">
                  {" "}
                  <p className="bg-yellow-500 text-black py-1.5 w-8 h-8  rounded-full">
                    <span className="flex justify-center text-gray-800 text-sm">
                      BA
                    </span>
                  </p>
                  <span className="ms-2 mt-1 text-sm"> Bhavitha Agrawal</span>
                </p>
              </div> */}

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-col-3 ">
                <div className="col-span-1 ">Decision Making :</div>
                <div className="col-span-2">
                  Decision Making ggv hhh uoiuiuiu vgvgff ffff ff f f ff yt
                  fyfytf yt f ytf yt f ytf ytfyt ftyfytf ytf tygygtygytg
                </div>
              </div>

              <div className="mt-5 flex flex-row">
                <p className="basis-1/4 text-sm text-gray-600">Due Date</p>
                <p className="basis-1/2 text-sm">24/1/2024</p>
              </div>
              <div className="mt-5 flex flex-row">
                <p className="basis-1/4 text-sm text-gray-600">Entity</p>
                <p className="basis-1/2 text-sm">Entity Text</p>
              </div>
              <div className="mt-5 flex flex-row">
                <p className="basis-1/4 text-sm text-gray-600">Board Meeting</p>
                <p className="basis-1/2 text-sm">Board Meeting Text</p>
              </div>
              <div className="mt-5 flex flex-row">
                <p className="basis-1/4 text-sm text-gray-600  mt-1">
                  Priority
                </p>
                <p className="basis-1/2">
                  <div className="relative inline-block">
                    <select className="block appearance-none w-full bg-white border text-sm border-gray-300 hover:border-gray-300 px-1 py-1.5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option value="option1">Select Priority</option>
                      <option value="option2">Low</option>
                      <option value="option3">Medium</option>
                      <option value="option4">High</option>
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
                </p>
              </div>
              <div className="mt-5 flex flex-row">
                <p className="basis-1/4 text-sm text-gray-600">Description</p>
                <p className="basis-1/2"></p>
              </div>
              <div className="mt-5">
                <textarea
                  placeholder="What is this task about ?"
                  className="p-3 text-sm resize-none shadow-sm rounded-md w-full h-32 focus:outline-none focus:border-orange-400"
                ></textarea>
              </div>
              <div className="flex mt-5">
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
                    className="p-2 border-2 text-sm resize-none shadow-sm rounded-md w-full h-24 focus:outline-none focus:border-orange-400"
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
