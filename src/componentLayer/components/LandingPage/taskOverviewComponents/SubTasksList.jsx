import React from "react";
import Select from "react-select";
let members = [
  { label: "Bhaskar", value: "bhaskar" },
  { label: "Zaheer", value: "zaheer" },
  { label: "Raghu Vamshi Krishna", value: "raghuvamshiKrishna" },
];
const SubTasksList = ({
  task,
  handleAddSubTask,
  subTasks,
  setQParams,
  displayOverviewSubTask,
  displayOverviewTask,
  setDisplayOverviewTask,
  setDisplayOverviewSubTask,
  isInputActiveID,
  handleTaskChange,
  handleSubmit,
  autoFocusID,
  setIsInputActive,
  setAutoFocusID,status
}) => {
  return (
    <div>
      <div className="flex justify-end pe-3">
        <button
          onClick={() => handleAddSubTask(task?.id)}
          className=" px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white mb-4 mt-2"
        >
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
      {subTasks &&
        subTasks.map((task, index) => {
          const decisionHeight =
            task?.decision === null || task?.decision === "" ? "2rem" : "";

          return (
            <div className="border border-t-[#d1d5db] flex items-center">
              {isInputActiveID === task.id && (
                <input
                  className="outline-none text-black px-1.5 py-1.5 bg-[#f9fafb] "
                  style={{ width: "20rem" }}
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

              {(isInputActiveID !== task.id || isInputActiveID === null) && (
                <p
                  className="text-sm"
                  onClick={() => {
                    setIsInputActive(task.id);
                    setAutoFocusID(task.id);
                  }}
                  style={{
                    width: "20rem",
                    height: decisionHeight,
                    cursor: "pointer",
                  }}
                >
                  {task.decision}
                </p>
              )}

              
<Select
                      options={members}
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
                        handleSubmit(task?.id, "members", selectedOption.value);
                        handleTaskChange(
                          index,
                          "members",
                          selectedOption.value
                        );
                      }}
                      className="basic-multi-select "
                      classNamePrefix="select"
                      value={{ label: task?.members, value: task?.members }}
                    />
              {/* calender */}
              <input
                      className=" border border-transparent text-black px-1.5 py-2 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400  date_type"
                      type="date"
                      value={task?.dueDate}
                      onChange={(e) => {
                        handleSubmit(task?.id, "dueDate", e.target.value);
                        handleTaskChange(index, "dueDate", e.target.value);
                      }}
                    />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 text-gray-400"
              >
                <path d="M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75V12ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V10ZM10 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H10ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H12ZM11.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V10ZM14 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H14Z" />
                <path
                  fill-rule="evenodd"
                  d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                  clip-rule="evenodd"
                />
              </svg> */}
              {/*  Status */}
              <Select
                      options={status}
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
                      className="basic-multi-select"
                      classNamePrefix="select"
                      // value={{ label: task?.status, value: task?.status }}

                      // value={
                      //   task?.status
                      //     ? {
                      //         label:
                      //           task.status === "inprogress"
                      //             ? "In Progress"
                      //             : task.status === "close"
                      //             ? "Close"
                      //             : task.status === "resolve" ? "Resolve" : "",
                      //         value: task.status,
                      //       }
                      //     : ""
                      // }
                      value={{ label: task?.status, value: task?.status }}
                    />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                  clip-rule="evenodd"
                />
              </svg> */}
              {/* arrow for view */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                onClick={() => {
                  setDisplayOverviewTask(!displayOverviewTask);
                  setDisplayOverviewSubTask(!displayOverviewSubTask);
                  setQParams((prev) => ({ ...prev, subTaskID: task?.id }));
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          );
        })}
    </div>
  );
};

export default SubTasksList;
