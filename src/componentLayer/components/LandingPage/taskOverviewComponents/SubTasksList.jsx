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
            </td>
            <td
              className="border py-1.5 px-3 "
              title={task?.members}
              style={{ width: "15rem" }}
            >
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
            <td className="border py-1.5 px-3" style={{ width: "8rem" }}>
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
            </td>
            <td className="border py-1.5 px-3 text-sm text-gray-600">
              Updated By User
            </td>
            <td className="border py-1.5 px-3 text-sm text-gray-600">
              Updated By Admin
            </td>
            <td className="border py-1.5 px-3 text-sm text-gray-600">
              <svg
                // onClick={() => handleDeleteTask(task.id)}
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
    </div>
  );
};

export default SubTasksList;
