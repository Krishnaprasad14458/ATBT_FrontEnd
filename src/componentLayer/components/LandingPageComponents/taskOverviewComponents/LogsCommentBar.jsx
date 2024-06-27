import React, { useState } from "react";

const LogsCommentBar = ({ ActiveBar, setActiveBar }) => {
    console.log("ActiveBarActiveBar",ActiveBar)
  return (
    <>
    <div className="flex  gap-4 px-2  pt-2 bg-[#f8fafc]">
      <span
        onClick={() => {
          setActiveBar("Logs");
        }}
        className={` ${
          ActiveBar === "Logs" ? "border-b-2 border-orange-500" : ""
        }`}
      >
        Logs{" "}
      </span>
      <span
        onClick={() => {
          setActiveBar("Comments");
        }}
        className={` ${
            ActiveBar === "Comments" ? "border-b-2 border-orange-500" : ""
          }`}
      >
        Comments
      </span>

    </div>
    <hr /></>
  );
};

export default LogsCommentBar;
