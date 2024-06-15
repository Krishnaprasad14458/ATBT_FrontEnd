import React from "react";
import Select from "react-select";
const TaskOverViewHeader = ({
  handleSubmit,
  handleOverviewTaskChange,
  status,
  task,
  handleExpand,
  expand,
  setTask,
  setSubTask,
  Qparams,
  setQParams,
  overViewTask,
  setOverViewTask,
  setDisplayOverviewTask,
  setDisplayOverviewSubTask,
}) => {
  // const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 items-center p-2">
      <div className="col-span-2 md:col-span-1 ms-2">
        <Select
          options={status}
          styles={{
            control: (provided, state) => ({
              ...provided,
              backgroundColor: "#white-50",
              borderWidth: "1px",
              borderColor: state.isFocused ? "#orange-400" : "#d1d5db",
              boxShadow: state.isFocused ? "none" : provided.boxShadow,
              
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
          value={{ label: task?.status, value: task?.status }}
        />
      </div>
      <div className="col-span-2  md:col-span-3">
      <div className=" flex justify-end gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className=" w-5 h-5 text-gray-500"
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
              className="w-5 h-5  text-gray-500"
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
              className="w-5 h-5  text-gray-500"
            >
              <path d="M3.28 2.22a.75.75 0 0 0-1.06 1.06L5.44 6.5H2.75a.75.75 0 0 0 0 1.5h4.5A.75.75 0 0 0 8 7.25v-4.5a.75.75 0 0 0-1.5 0v2.69L3.28 2.22ZM13.5 2.75a.75.75 0 0 0-1.5 0v4.5c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-2.69l3.22-3.22a.75.75 0 0 0-1.06-1.06L13.5 5.44V2.75ZM3.28 17.78l3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 1 0 1.06 1.06ZM13.5 14.56l3.22 3.22a.75.75 0 1 0 1.06-1.06l-3.22-3.22h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-2.69Z" />
            </svg>
          )}
        </button>
        <button
          onClick={() => {
            setTask({ decision: "", members: "", dueDate: "", status: "" });
            setSubTask({ decision: "", members: "", dueDate: "", status: "" });
            setDisplayOverviewTask(false);
            setDisplayOverviewSubTask(false);
            setOverViewTask(!overViewTask);
            let updatedQparams = { ...Qparams };
            delete updatedQparams.taskID;
            delete updatedQparams.subTaskID;
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
      </div></div>
    </div>
  );
};

export default TaskOverViewHeader;
