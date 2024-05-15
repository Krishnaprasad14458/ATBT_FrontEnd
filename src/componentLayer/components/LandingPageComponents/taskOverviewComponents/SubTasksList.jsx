import React from "react";
import Select from "react-select";
import { useFetcher } from "react-router-dom";

const SubTasksList = ({
  members,
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
  setAutoFocusID,
  status,
}) => {
  let fetcher = useFetcher();
  const handleDeleteSubTask = (subtaskID) => {
    let UpdateData = {
      id: subtaskID,
      type: "DELETE_SUB_TASK",
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
  return (
    <div className="pb-3 ">
      <div className="flex justify-end pe-3">
        <button
          onClick={() => handleAddSubTask(task?.id)}
          className=" px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white mb-4 mt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Add Subtask
        </button>
      </div>
      <div className="overflow-auto">
        <table className="w-full">
          <thead></thead>
          <tbody>
            {subTasks &&
              subTasks.map((task, index) => {
                const decisionHeight =
                  task?.decision === null || task?.decision === ""
                    ? "2rem"
                    : "";
                return (
                  <tr key={task.id} className="border-b border-gray-200 w-full">
                    <td className="border py-1.5 px-2">
                      <div className="flex items-center">
                        {isInputActiveID === task.id && (
                          <input
                            className="border border-[#d1d5db] text-black px-1.5 py-1.5 rounded-md  bg-[#f9fafb] focus:outline-none text-sm focus:border-orange-400 "
                            style={{ width: "15rem" }}
                            type="text"
                            placeholder="Type here"
                            value={task?.decision}
                            onChange={(e) =>
                              handleTaskChange(
                                index,
                                "decision",
                                e.target.value
                              )
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
                              width: "15rem",
                              height: decisionHeight,
                              cursor: "pointer",
                            }}
                          >
                            {task.decision}
                          </p>
                        )}
                        <span
                          className="ml-2 cursor-pointer"
                          onClick={() => {
                            setDisplayOverviewTask(!displayOverviewTask);
                            setDisplayOverviewSubTask(!displayOverviewSubTask);
                            setQParams((prev) => ({
                              ...prev,
                              subTaskID: task?.id,
                            }));
                          }}
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
                    </td>
                    <td
                      className="border py-1.5 px-2"
                      title={task?.members}
                      style={{ width: "16rem" }}
                    >
                      <Select
                        // menuPortalTarget={document.body}
                        options={members}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,

                            backgroundColor: "#white-50",
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
                          placeholder: (provided) => ({
                            ...provided,
                            fontSize: "12px", // Set the font size of the placeholder
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
                    <td className="border py-1.5 px-2">
                      <input
                        style={{ width: "8rem" }}
                        className=" border border-transparent text-black px-1.5 py-2 rounded-md  bg-white-50 focus:outline-none text-sm focus:border-orange-400  date_type"
                        type="date"
                        value={task?.dueDate}
                        onChange={(e) => {
                          handleSubmit(task?.id, "dueDate", e.target.value);
                          handleTaskChange(index, "dueDate", e.target.value);
                        }}
                      />
                    </td>
                    <td
                      className="border py-1.5 px-2"
                      style={{ width: "14rem" }}
                    >
                      <Select
                        options={status}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            backgroundColor: "#white-50",
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
                          placeholder: (provided) => ({
                            ...provided,
                            fontSize: "12px", // Set the font size of the placeholder
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
                          handleSubmit(
                            task?.id,
                            "status",
                            selectedOption.value
                          );
                          handleTaskChange(
                            index,
                            "status",
                            selectedOption.value
                          );
                        }}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={{ label: task?.status, value: task?.status }}
                        menuPlacement="auto"
                      />
                    </td>
                    <td className="border py-1.5 px-2 text-sm  text-gray-600" >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5"
                        onClick={() => handleDeleteSubTask(task.id)}
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
    </div>
  );
};

export default SubTasksList;
