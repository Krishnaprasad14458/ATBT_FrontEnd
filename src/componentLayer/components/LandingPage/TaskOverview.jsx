import React, { useState, useEffect, useRef } from "react";
import NonEditableFields from "./taskOverviewComponents/NonEditableFields";
import EditableFields from "./taskOverviewComponents/EditableFields";
import SubTasksList from "./taskOverviewComponents/SubTasksList";
import Collaborators from "./taskOverviewComponents/Collaborators";
import TaskOverViewHeader from "./taskOverviewComponents/TaskOverViewHeader";
import CommentsView from "./taskOverviewComponents/CommentsView";
import CommentsForm from "./taskOverviewComponents/CommentsForm";

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
  handleSendComment,
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

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div
      className={`fixed inset-0  bg-gray-800 bg-opacity-50 z-40  ${
        overViewTask ? "" : "opacity-0 pointer-events-none "
      }`}
      style={{ transition: "opacity 0.3s ease-in-out" }}
    >
      <div
        className={` fixed inset-y-0 right-0  w-full bg-white shadow-lg transform translate-x-full transition-transform duration-200 ease-in-out ${
          expand
            ? "w-full md:w-full lg:w-4/6 xl:w-4/6"
            : "w-4/5 md:w-3/5 lg:w-3/6 xl:2/5 "
        }`}
        style={{
          transform: `translateX(${overViewTask ? "0%" : "100%"})`,
          transition: "transform 0.3s ease-in-out",
        }}
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
          className="overflow-y-scroll content relative bg-[#f8fafc]"
          style={{ maxHeight: "calc(100vh - 12rem)" }}
        >
          <div className="bg-white">
          <div className=" p-3 ">
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
              members={members}
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
          <div className="bg-white">
          <CommentsView
            messagesEndRef={messagesEndRef}
            comments={displayOverviewTask ? task?.comments : subTask?.comments}
            
          />
            </div>
        </div>
        <hr />
        <CommentsForm 
          scrollToBottom={scrollToBottom}
          displayOverviewTask={displayOverviewTask}
          taskID={displayOverviewTask ? task?.id : subTask?.id}
        />

        <Collaborators members={members} />
      </div>
    </div>
  );
};

export default TaskOverview;
