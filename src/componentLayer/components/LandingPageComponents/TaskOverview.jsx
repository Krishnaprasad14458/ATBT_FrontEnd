import React, { useState, useEffect, useRef } from "react";
import NonEditableFields from "./taskOverviewComponents/NonEditableFields";
import EditableFields from "./taskOverviewComponents/EditableFields";
import SubTasksList from "./taskOverviewComponents/SubTasksList";
import Collaborators from "./taskOverviewComponents/Collaborators";
import TaskOverViewHeader from "./taskOverviewComponents/TaskOverViewHeader";
import CommentsView from "./taskOverviewComponents/CommentsView";
import CommentsForm from "./taskOverviewComponents/CommentsForm";
import ActivityLogs from "./taskOverviewComponents/ActivityLogs";
import LogsCommentBar from "./taskOverviewComponents/LogsCommentBar";
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
  console.log("firsxxxt",displayOverviewTask,displayOverviewSubTask)
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

  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [newComment, setNewComment] = useState({
    message: "",
    senderId: "",
  });
  console.log("newCOmment", newComment);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [fileName,setFileName] = useState(null)
  const [ActiveBar,setActiveBar] = useState("Logs")

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
          className={` overflow-y-scroll content  bg-[#f8fafc] ${ActiveBar === "Comments" ? "max-h-comment" : "max-h-logs"}`}
          // style={{ maxHeight: "calc(100vh - 12rem)" }}
        >
          <div className="bg-white">
            <div className=" px-3 pt-3 ">
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
          <div className="bg-white">
            <LogsCommentBar ActiveBar={ActiveBar}  setActiveBar={setActiveBar}/>
           {ActiveBar === "Comments" && <CommentsView
              setIsCommentEditing={setIsCommentEditing}
              setNewComment={setNewComment}
              messagesEndRef={messagesEndRef}
              comments={
                displayOverviewTask ? task?.comments : subTask?.comments
              }
              fileName={fileName}
              setFileName={setFileName}
             
            />}
          { ActiveBar === "Logs" && <ActivityLogs   task={task}/>}
          </div>
        </div>
        <hr />
        {ActiveBar === "Comments" &&
        <CommentsForm
          isCommentEditing={isCommentEditing}
          setIsCommentEditing={setIsCommentEditing}
          newComment={newComment}
          setNewComment={setNewComment}
          scrollToBottom={scrollToBottom}
          displayOverviewTask={displayOverviewTask}
          taskID={displayOverviewTask ? task?.id : subTask?.id}
          fileName={fileName}
          setFileName={setFileName}


        />}
      {displayOverviewTask &&  <Collaborators
        handleOverviewTaskChange={
          displayOverviewTask
            ? handleOverviewTaskChange
            : handleOverviewSubTaskChange
        }
        handleSubmit={
          displayOverviewTask ? handleSubmit : handleSubTaskSubmit
        }
          // members={members}
          task={
            displayOverviewTask ? task : subTask
          }
        />}
      </div>
    </div>
  );
};

export default TaskOverview;
