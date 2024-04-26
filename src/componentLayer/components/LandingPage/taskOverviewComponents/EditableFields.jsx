import React from "react";
import Select from "react-select";

const EditableFields = ({
  task,
  handleOverviewTaskChange,
  handleSubmit,
  members,
  priority,
  taskDecision,
  setSubTask,
  setDisplayOverviewTask,
  setDisplayOverviewSubTask,
  displayOverviewSubTask
}) => {
  console.log("taskDecision", taskDecision);
  return (
    <>
      <div className="mb-2">
        {displayOverviewSubTask && 
        
        <>
          <span
          onClick={() => {
            setSubTask({ decision: "", members: "", dueDate: "", status: "" });
              setDisplayOverviewSubTask(false);
              setDisplayOverviewTask(true);
          }}
        >
          {taskDecision}
        </span>
        - {task?.decision}</>}
      
        <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
          Decision Taken
        </label>
        <textarea
          className="px-2 py-2 text-sm block w-full resize-none h-24 overflow-auto rounded-md bg-white-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-[13px] placeholder:text-[#A0AEC0]"
          placeholder="Enter Decision"
          value={task?.decision === null ? "" : task?.decision}
          onChange={(e) => handleOverviewTaskChange("decision", e.target.value)}
          onBlur={(e) => handleSubmit(task?.id, "decision", e.target.value)}
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
                backgroundColor: state.isFocused ? "#ea580c" : "transparent",

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
            Due Date
          </label>
          <input
            className={`border border-[#d1d5db] text-black px-1.5 py-2 rounded-md  bg-white-50 focus:outline-none text-sm focus:border-orange-400 w-full date_type`}
            type="date"
            value={task?.dueDate ? task.dueDate : ""}
            onChange={(e) => {
              handleSubmit(task?.id, "dueDate", e.target.value);
              handleOverviewTaskChange("dueDate", e.target.value);
            }}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 my-1 text-gray-900">
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
                backgroundColor: state.isFocused ? "#ea580c" : "transparent",

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
    </>
  );
};

export default EditableFields;
