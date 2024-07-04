import React, { useEffect, useState } from "react";
import { dateFormat, formatDateandTime } from "../../../../utils/utils";


const ActivityLogs = ({ task }) => {
  let logs =task?.activeLog?.changes
  logs = logs?.filter((log)=>log.oldValue !==null)
  console.log("tasksks", logs);
  const [displayAllLogs, setDisplayAllLogs] = useState(true);
  console.log("displayAllLogs", displayAllLogs);
  const [displayAllComments, setDisplayAllComments] = useState(true);
  console.log("displayAllComments", displayAllComments);

  useEffect(() => {
    setDisplayAllComments(logs?.length <= 5);
  }, [task]);
  return (
    <div className="bg-[#f8fafc] ">
      {logs?.length > 5 && (
        <p
          onClick={() => setDisplayAllComments((prev) => !prev)}
          className="text-sm p-3 text-end text-blue-500 hover:underline"
        >
          {displayAllComments
            ? "Hide earlier Logs"
            : logs.length === 6
            ? "One more Log"
            : logs.length - 5 + " more Logs"}
        </p>
      )}
      {task &&
        logs &&
        Array.isArray(logs) &&
        logs.map((change, changeIndex) => (
          <React.Fragment>
            {displayAllComments ||
            changeIndex >= logs.length - 5 ? (
              <div key={changeIndex} className="px-3 py-1">
                {change.oldValue && (
                  <div>
                    <span className="font-semibold block md:inline text-sm">
                      {change.changedBy} &nbsp;
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDateandTime(change.changeDate)}
                    </span>
                    <div>
                      {change.fieldChanged === "decision" && (
                        <p className="text-sm">
                          Decision Taken updated from {change.oldValue} to
                          &nbsp;
                          {change.newValue}
                        </p>
                      )}

                      {change.fieldChanged === "members" && (
                        <p className="text-sm">
                          Person responsible updated from {change.oldValue} to
                          &nbsp;
                          {change.newValue}
                        </p>
                      )}

                      {change.fieldChanged === "dueDate" && (
                        <p className="text-sm">
                          Due Date updated from {dateFormat(change.oldValue)} to &nbsp;
                          {dateFormat(change.newValue)}
                        </p>
                      )}

                      {change.fieldChanged === "collaborators" && (
                        <p className="text-sm">
                          {change.oldValue} removed from collaborators
                        </p>
                      )}
                      {change.fieldChanged === "priority" && (
                        <p className="text-sm">
                          Priority updated from {change.oldValue} to &nbsp;
                          {change.newValue}
                        </p>
                      )}

                      {change.fieldChanged === "status" && (
                        <p className="text-sm">
                          Status updated from {change.oldValue} to &nbsp;
                          {change.newValue}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {change.action === "added" && (
                  <div>
                    <span className="font-semibold block md:inline text-sm">
                      {change.changedBy} &nbsp;
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDateandTime(change.changeDate)}
                    </span>

                    {change.fieldChanged === "collaborators" && (
                      <p className="text-sm">
                        {change.newValue} added as a collaborator
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </React.Fragment>
        ))}
    </div>
  );
};

export default ActivityLogs;
