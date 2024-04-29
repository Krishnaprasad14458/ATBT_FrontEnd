import React, { useState, useEffect } from "react";
import NonEditableFields from "./taskOverviewComponents/NonEditableFields";
import EditableFields from "./taskOverviewComponents/EditableFields";
import SubTasksList from "./taskOverviewComponents/SubTasksList";
import Collaborators from "./taskOverviewComponents/Collaborators";
import Comments from "./taskOverviewComponents/Comments";
import TaskOverViewHeader from "./taskOverviewComponents/TaskOverViewHeader";

const TaskOverview = ({
  setAutoFocussubTaskID,
  isSubTaskInputActiveID,
  setIsSubTaskInputActive,
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
  handleAddSubTask,
  subTasks,
  autoFocusSubTaskID,
  handleSubTaskSubmit,
  handleSubTaskChange,
  handleOverviewSubTaskChange,
  subTask,
  displayOverviewSubTask,
  displayOverviewTask,
  setDisplayOverviewTask,
  setDisplayOverviewSubTask,
  setSubTask,
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
      className={`fixed inset-0 transition-all duration-500 bg-gray-800 bg-opacity-50 z-50  ${
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
        <TaskOverViewHeader
          Qparams={Qparams}
          setQParams={setQParams}
          overViewTask={overViewTask}
          setOverViewTask={setOverViewTask}
          setTask={setTask}
          setSubTask={setSubTask}
          status={status}
          task={displayOverviewTask ? task : subTask}
          handleExpand={handleExpand}
          expand={expand}
          handleSubmit={
            displayOverviewTask ? handleSubmit : handleSubTaskSubmit
          }
          handleOverviewTaskChange={
            displayOverviewTask
              ? handleOverviewTaskChange
              : handleOverviewSubTaskChange
          }
          setDisplayOverviewTask={setDisplayOverviewTask}
          setDisplayOverviewSubTask={setDisplayOverviewSubTask}
        />
        <hr />
        <div
          className="overflow-y-scroll content relative"
          style={{ maxHeight: "calc(100vh - 17rem)" }}
        >
          <div className=" ms-2 p-2 ">
            <NonEditableFields
              task={task}
              age={displayOverviewTask ? task?.age : subTask?.age}
            />
            <EditableFields
              taskDecision={displayOverviewSubTask ? task?.decision : null}
              task={displayOverviewTask ? task : subTask}
              handleOverviewTaskChange={
                displayOverviewTask
                  ? handleOverviewTaskChange
                  : handleOverviewSubTaskChange
              }
              handleSubmit={
                displayOverviewTask ? handleSubmit : handleSubTaskSubmit
              }
              members={members}
              priority={priority}
              setSubTask={setSubTask}
              setDisplayOverviewTask={setDisplayOverviewTask}
              setDisplayOverviewSubTask={setDisplayOverviewSubTask}
              displayOverviewSubTask={displayOverviewSubTask}
            />
          </div>
          {displayOverviewTask && (
            <SubTasksList
              task={task}
              handleAddSubTask={handleAddSubTask}
              subTasks={subTasks}
              setQParams={setQParams}
              displayOverviewTask={displayOverviewTask}
              displayOverviewSubTask={displayOverviewSubTask}
              setDisplayOverviewTask={setDisplayOverviewTask}
              setDisplayOverviewSubTask={setDisplayOverviewSubTask}
              isInputActiveID={isSubTaskInputActiveID}
              handleTaskChange={handleSubTaskChange}
              handleSubmit={handleSubTaskSubmit}
              autoFocusID={autoFocusSubTaskID}
              setIsInputActive={setIsSubTaskInputActive}
              setAutoFocusID={setAutoFocussubTaskID}
              status={status}
            />
          )}
        </div>
        <hr />
        <Comments />
        <Collaborators />
      </div>
    </div>
  );
};

export default TaskOverview;
