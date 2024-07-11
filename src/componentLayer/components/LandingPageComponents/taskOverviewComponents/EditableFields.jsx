import React, { useState } from "react";
import Select from "react-select";
import { getCurrentDate } from "../../../../utils/utils";
import atbtApi from "../../../../serviceLayer/interceptor";
const EditableFields = ({
  task,
  handleOverviewTaskChange,
  handleSubmit,
  meetingPermission,
  priority,
  taskDecision,
  setSubTask,
  setDisplayOverviewTask,
  setDisplayOverviewSubTask,
  displayOverviewSubTask,
  updateDecisionToggle,
  setUpdateDecisionToggle,
  fetchStatus
}) => {
  let members = task?.group?.map((user) => ({
    label: user.name,
    value: user.id,
  }));
  let [updateDecisionForm, setUpdateDecisionForm] = useState({senderId:23,message:"",Date:"",TaskId:task.id});
  console.log("taskDecision", updateDecisionForm);

  const handleSubmitUpdateDecision = async () => {
    try {
      const response = await atbtApi.post("task/addStaus", updateDecisionForm);
      
      if (response.status === 201) {
        
        console.log("Status updated successfully:", response.data);
        setUpdateDecisionForm({senderId:null,message:"",Date:"",TaskId:null})
        fetchStatus()
      } else {
      
        console.error("Unexpected response status:", response.status);

      }
    } catch (error) {
  
      console.error("Error updating status:", error);
      
    }
  };
  
  return (
    <>
      <div className="mb-2">
        {displayOverviewSubTask && (
          <div className="flex items-center">
            <span
              className="text-xs text-orange-500 hover:underline cursor-pointer"
              onClick={() => {
                setSubTask({
                  decision: "",
                  members: "",
                  dueDate: "",
                  status: "",
                });
                setDisplayOverviewSubTask(false);
                setDisplayOverviewTask(true);
              }}
            >
              Back to Main Decision Overview
            </span>
            <span className="mx-2 arrow_breadcrumbs"></span>
            <span className="text-xs text-orange-500 ">Sub Decision</span>
          </div>
        )}
        <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
          Decision Taken
        </label>
        <textarea
          className="px-2 py-2 text-sm block w-full resize-none h-24 overflow-auto rounded-md bg-white-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-[13px] placeholder:text-[#A0AEC0]"
          placeholder="Type Decision Taken"
          value={task?.decision === null ? "" : task?.decision}
          onChange={
            meetingPermission.canUpdate
              ? (e) => handleOverviewTaskChange("decision", e.target.value)
              : null
          }
          onBlur={
            meetingPermission.canUpdate
              ? (e) => handleSubmit(task?.id, "decision", e.target.value)
              : null
          }
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setUpdateDecisionToggle(!updateDecisionToggle)}
          className=" px-1 py-1.5 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white mb-4 mt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>{" "}
          &nbsp; Update Decision
        </button>
        <button
          // onClick={() => handleAddSubTask(task?.id)}
          className=" px-1 py-1.5 inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white mb-4 mt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>{" "}
          &nbsp; Update Status
        </button>
      </div>

      {updateDecisionToggle && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-7 xl:grid-col-7 items-center mb-3 gap-3 justify-center">
          <div className="col-span-4">
            <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
              Update Decision
            </label>
            <input
              className={`border border-[#d1d5db] text-black px-1.5 py-2 rounded-md  bg-white-50 focus:outline-none text-sm focus:border-orange-400 w-full date_type`}
              type="text"
              disabled={!meetingPermission.canUpdate}
              value={updateDecisionForm.message}
              onChange={
                meetingPermission.canUpdate
                  ? (e) => {
                    setUpdateDecisionForm((prev)=>(
                      {...prev,message:e.target.value}
                    ))
                      // handleSubmit(task?.id, "dateOfDecision", e.target.value);
                      // handleOverviewTaskChange("dateOfDecision", e.target.value);
                    }
                  : null
              }
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
              Date of Update Decision
            </label>
            <input
              className={`border border-[#d1d5db] text-black px-1.5 py-2 rounded-md  bg-white-50 focus:outline-none text-sm focus:border-orange-400 w-full date_type`}
              type="date"
              disabled={!meetingPermission.canUpdate}

              value={updateDecisionForm.Date}
              onChange={
                meetingPermission.canUpdate
                  ? (e) => {
                    setUpdateDecisionForm((prev)=>(
                      {...prev,Date:e.target.value}
                    ))
                      // handleSubmit(task?.id, "dateOfDecision", e.target.value);
                      // handleOverviewTaskChange("dateOfDecision", e.target.value);
                    }
                  : null
              }
            />
          </div>

          <div className="col-span-1 ">
            <button
              onClick={() =>{ setUpdateDecisionToggle(false)
                handleSubmitUpdateDecision()
              }}
              className=" px-1.5 py-2 inline-flex items-center justify-end whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white mt-8 ms-3"
             
              
            
            >
              Update
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-col-4 items-center mb-3 gap-3">
        <div className="col-span-1">
          <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
            Initial Date of Decision
          </label>
          <input
            className={`border border-[#d1d5db] text-black px-1.5 py-2 rounded-md  bg-white-50 focus:outline-none text-sm focus:border-orange-400 w-full date_type`}
            type="date"
            disabled={!meetingPermission.canUpdate}
            min={getCurrentDate()}
            value={task?.dateOfDecision ? task.dateOfDecision : ""}
            onChange={
              meetingPermission.canUpdate
                ? (e) => {
                    handleSubmit(task?.id, "dateOfDecision", e.target.value);
                    handleOverviewTaskChange("dateOfDecision", e.target.value);
                  }
                : null
            }
          />
        </div>

        <div className="col-span-1">
          <label className="block text-xs font-medium leading-6 my-1 text-[1e1f21]">
            Person Responsible
          </label>
          <Select
            options={members}
            isDisabled={!meetingPermission.canUpdate}
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
                fontSize: "12px",
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
            onChange={
              meetingPermission.canUpdate
                ? (selectedOption) => {
                    handleOverviewTaskChange("members", selectedOption.value);
                    handleSubmit(task?.id, "members", selectedOption.value);
                  }
                : null
            }
            value={
              task?.members === null ||
              task?.members === "" ||
              task?.members === undefined
                ? ""
                : members?.find((person) => person.value === task?.members)
            }
            // value={members?.find(person => person.value === task?.members)}

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
            disabled={!meetingPermission.canUpdate}
            min={getCurrentDate()}
            value={task?.dueDate ? task.dueDate : ""}
            onChange={
              meetingPermission.canUpdate
                ? (e) => {
                    handleSubmit(task?.id, "dueDate", e.target.value);
                    handleOverviewTaskChange("dueDate", e.target.value);
                  }
                : null
            }
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 my-1 text-gray-900">
            Priority
          </label>
          <Select
            isDisabled={!meetingPermission.canUpdate}
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
                fontSize: "12px",
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
            onChange={
              meetingPermission.canUpdate
                ? (selectedOption) => {
                    handleSubmit(task?.id, "priority", selectedOption.value);
                    handleOverviewTaskChange("priority", selectedOption.value);
                  }
                : null
            }
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
