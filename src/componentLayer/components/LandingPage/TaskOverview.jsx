import React, { useState, useEffect } from "react";
import Select from "react-select";

const TaskOverview = ({
  Qparams,
  task,
  overViewTask,
  handleOverviewTaskChange,
  handleSubmit,
  setOverViewTask,
  setQParams,
  members,
  setTask,
  status,
}) => {
  // -------full screen----
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  let priority = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];
  let moduleOptions = [
    { value: "user", label: "user" },
    { value: "entity", label: "entity" },
  ];
  useEffect(() => {
    console.log("ttaskask", task);
  }, [task]);

  return (
    <div
      className={`fixed inset-0 transition-all duration-500 bg-gray-800 bg-opacity-50 z-50  min-h-screen overflow-y-auto ${
        overViewTask ? "" : "hidden"
      }`}
    >
      <div
        className={` fixed inset-y-0 right-0  bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out ${
          expand
            ? "w-full md:w-full lg:w-4/6 xl:w-4/6"
            : "w-4/5 md:w-3/5 lg:w-3/6 xl:2/5"
        }`}
      >
        <div className="flex justify-start p-2">
          <div className="relative inline-block ms-2">
            <Select
              options={status}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "#white-50",
                  borderWidth: "1px",
                  borderColor: state.isFocused ? "#orange-400" : "#d1d5db",
                  boxShadow: state.isFocused ? "none" : provided.boxShadow,
                  width: "8rem",
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
                handleOverviewTaskChange("status", selectedOption.value);
              }}
              className="basic-multi-select"
              classNamePrefix="select"
              // value={{ label: task?.status, value: task?.status }}
              value={{label:task?.status, value:task?.status  }}
              // value={
              //   task?.status
              //     ? {
              //         label:
              //           task.status === "inprogress"
              //             ? "In Progress"
              //             : task.status === "close"
              //             ? "Close"
              //             : task.status === "resolve"
              //             ? "Resolve"
              //             : "",
              //         value: task.status,
              //       }
              //     : ""
              // }
            />
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
              {expand ? (
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
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 me-4 text-gray-500"
                >
                  <path d="M3.28 2.22a.75.75 0 0 0-1.06 1.06L5.44 6.5H2.75a.75.75 0 0 0 0 1.5h4.5A.75.75 0 0 0 8 7.25v-4.5a.75.75 0 0 0-1.5 0v2.69L3.28 2.22ZM13.5 2.75a.75.75 0 0 0-1.5 0v4.5c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-2.69l3.22-3.22a.75.75 0 0 0-1.06-1.06L13.5 5.44V2.75ZM3.28 17.78l3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 1 0 1.06 1.06ZM13.5 14.56l3.22 3.22a.75.75 0 1 0 1.06-1.06l-3.22-3.22h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-2.69Z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => {
                setTask({ decision: "", members: "", dueDate: "", status: "" });
                setOverViewTask(!overViewTask);
                let updatedQparams = { ...Qparams };
                delete updatedQparams.taskID;
                setQParams(updatedQparams);
              }}
              className=""
            >
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
        <div className=" h-screen">
        <div className="overflow-y-scroll h-full">
            <div className=" ms-2 p-3 ">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-col-4 items-center mb-3 gap-5">
              <div className="col-span-1">
                <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                  Date 
                </label>
               
                <p className=" border border-[#d1d5db] text-black h-10 w-full truncate px-3 flex items-center rounded-md text-sm   bg-white-50
                " >
                {task && (() => {
                        let date = new Date(task?.date);
                        const day = date.getUTCDate();
                        const monthIndex = date.getUTCMonth();
                        const year = date.getUTCFullYear();

                        const monthAbbreviations = [
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ];

let ordinalsText =""
if(day == 1 || day ==21 || day == 31){
        ordinalsText = "st"
}else if(day == 2 || day == 22 ){
  ordinalsText = "nd"
}
else if(day == 3 || day == 23 ){
  ordinalsText = "rd"
}
else {
  ordinalsText = "th"
}
                        // Formatting the date
                        date = ` ${
                          monthAbbreviations[monthIndex]
                        } ${day < 10 ? "0" : ""} ${day}${ordinalsText}, ${year}`;

                        return (
                        <span className="w-full truncate text-sm" title= {date ? date : "No Date"}>  {date ? date : "No Date"}</span> 
                        );
                      })()}

</p>
                
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                   Number
                </label>
                <p className=" border border-[#d1d5db] text-black h-10 w-full truncate px-3 flex items-center rounded-md text-sm  bg-white-50"
                title={task?.meetingnumber}>
                  {task?.meetingnumber}
                </p>
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                  Age(days)
                </label>
                <p className=" border border-[#d1d5db] text-black h-10 w-full truncate px-3 flex items-center rounded-md text-sm  bg-white-50"
                title={task?.age}>
                  {task?.age}
                </p>
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                  {" "}
                  Entity
                </label>
                <p className=" border border-[#d1d5db] text-black h-10 w-full truncate px-3 flex items-center rounded-md text-sm  bg-white-50">
                  Infoz
                </p>
              </div>
            </div>

            <div className="mb-2">
              <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                Decision Taken
              </label>
              <textarea
                className="px-2 py-2 text-sm block w-full resize-none h-24 overflow-auto rounded-md bg-white-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-[13px] placeholder:text-[#A0AEC0]"
                // type="textarea"
                placeholder="Enter Decision"
                value={task?.decision === null ? "" : task?.decision}
                onChange={(e) =>
                  handleOverviewTaskChange("decision", e.target.value)
                }
                onBlur={(e) =>
                  handleSubmit(task?.id, "decision", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-col-3 items-center mb-3 gap-3">
              <div className="col-span-1">
                <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                  Person Responsible
                </label>
                <Select
                  options={members}
                  // placeholder="Custom Placeholder Text"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#white-50", // Change the background color of the select input
                      borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                      borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                      cursor: "pointer",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "small",
                      color: "#A0AEC0", // Lighter color for placeholder
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
                      fontSize: "0.875rem",
                      lineHeight: "1.25rem",
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
                    handleOverviewTaskChange("members", selectedOption.value);
                    handleSubmit(task?.id, "members", selectedOption.value);
                  }}
                  value={
                    task?.members === null || task?.members === ""
                      ? ""
                      : { label: task?.members, value: task?.members }
                  }
                  className="date_type"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
                  Due Date{" "}
                </label>
                <input
                  className={`border border-[#d1d5db] text-black px-1.5 py-2 rounded-md  bg-white-50 focus:outline-none text-sm focus:border-orange-400 w-full date_type`}
                  type="date"
                  value={task?.dueDate}
                  onChange={(e) => {
                    handleSubmit(task?.id, "dueDate", e.target.value);
                    handleOverviewTaskChange("dueDate", e.target.value);
                  }}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium leading-6 my-1 text-gray-900">
                  {" "}
                  priority
                </label>
                <Select
                  options={priority}
                  className="custom-select"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "rgb(255 255 255)",
                      borderWidth: state.isFocused ? "1px" : "1px",
                      borderColor: state.isFocused
                        ? "#orange-400"
                        : "rgb(209 213 219)",
                      boxShadow: state.isFocused ? "none" : provided.boxShadow,
                      fontSize: "0.875rem",
                      lineHeight: "1.25rem",
                      cursor: "pointer",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "small",
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
                      fontSize: "0.875rem",
                      lineHeight: "1.25rem",
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
                    handleSubmit(task?.id, "priority", selectedOption.value);
                    handleOverviewTaskChange("priority", selectedOption.value);
                  }}
                  value={
                    task?.priority
                      ? {
                          label:
                            task.priority === "high"
                              ? "High"
                              : task.priority === "medium"
                              ? "Medium"
                              : task.priority === "low"
                              ? "Low"
                              : "",
                          value: task.priority,
                        }
                      : ""
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end pe-3">
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
          <div className="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 ms-3 p-3">
            <div className="col-span-1 text-center ">
              <p className="bg-yellow-500 text-black py-1.5 w-8 h-8  rounded-full">
                <span className="flex justify-center text-gray-800 text-sm">
                  BA
                </span>
              </p>
            </div>
            <div className="col-span-6">
              <p className=" border border-[#d1d5db] text-black h-48 rounded-md text-sm   bg-white-50"></p>
              {/* <textarea
              placeholder="Add a comment"
              className="p-2 border-2 text-sm w-full  shadow-sm rounded-md  focus:outline-none focus:border-orange-400"
            ></textarea> */}
            </div>
          </div> 
        </div>
          
        </div>

        {/* <div className="flex ">

          <div className="flex-1 "></div>
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
        </div> */}
      </div>
    </div>
  );
};

export default TaskOverview;
