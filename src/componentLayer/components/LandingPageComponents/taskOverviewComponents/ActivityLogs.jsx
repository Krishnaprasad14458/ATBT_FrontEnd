import React, { useState } from "react";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const ISTOffset = 330; // 5 hours 30 minutes in minutes
  const indianDateTime = new Date(date.getTime() + ISTOffset * 60000);
  const hours = indianDateTime.getUTCHours();
  const minutes = indianDateTime.getUTCMinutes();
  const monthAbbreviations = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const ordinals = ["th", "st", "nd", "rd"];
  const ordinalsText = day % 10 > 3 ? ordinals[0] : ordinals[day % 10];

  const formattedDate = `${monthAbbreviations[monthIndex]} ${day}${ordinalsText}, ${year}`;
  const amPM = hours >= 12 ? "PM" : "AM";
  const hour12Format = hours % 12 || 12;
  const time = `${hour12Format}:${minutes < 10 ? "0" : ""}${minutes} ${amPM}`;

  return `${formattedDate} at ${time}`;
};



const ActivityLogs = ({ task }) => {
  console.log("tasksks", task);



  

  const [displayAllLogs, setDisplayAllLogs] = useState(true)
  console.log("displayAllLogs", displayAllLogs);

  return (
    <div>
    
     
      {task &&
        Array.isArray(task.activeLog) &&
        task.activeLog.map((item, index) => (
          <div key={index}>
              
             
            {item.changes &&
              item.changes.map((change, changeIndex) => (
                <div key={changeIndex} className="px-3 py-1">
                  {change.oldValue && (
                    <div>
                      <span className="font-semibold block md:inline text-sm">
                        {change.changedBy} &nbsp;
                      </span>
                      <span className="text-sm text-gray-500">
                      {formatDate(change.changeDate)}
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
                            Due Date updated from {change.oldValue} to &nbsp;
                            {change.newValue}
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

{change.action === "added" && 
<div>
<span className="font-semibold block md:inline text-sm">
                        {change.changedBy} &nbsp;
                      </span>
                      <span className="text-sm text-gray-500">
                      {formatDate(change.changeDate)}
                      </span>

                  {change.fieldChanged === "collaborators" &&
                     (
                      <p className="text-sm">
                        {change.newValue} added as a collaborator
                      </p>
                    )}
</div>
}



                  {/* <p><strong>Field Changed:</strong> {change.fieldChanged}</p> */}
                </div>
              ))}
           
          
          </div>
        ))}
    </div>
  );
};

export default ActivityLogs;
