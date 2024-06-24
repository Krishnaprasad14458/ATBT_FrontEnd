import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import atbtApi from "../../../serviceLayer/interceptor";
import MeetingAttachments from "./AttachmentsComponents/MeetingAttachments";
import TaskAttachments from "./AttachmentsComponents/TaskAttachments";

const MeetingWiseDocuments = ({ belongsTo }) => {
  const { id, BMid } = useParams();
  console.log("id, BMID", id, BMid);
  const [MeetingData, setMeetingData] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [msgColor, setMsgColor] = useState("");
  console.log("file", file?.name);
  // Function to fetch attachments

  const [meetingnumberName, setMeetingnumberName] = useState("");
  const fetchAttachment = async () => {
    const BM_Form_Data = await atbtApi.get(`form/list?name=boardmeetingform`);
    setMeetingnumberName(BM_Form_Data?.data?.Tableview.meetingnumber?.label);
    if (belongsTo === "boardMeeting") {
      try {
        const response = await atbtApi.get(
          `boardmeeting/getAttachment?MeetingId=${BMid}`
        );
        setMeetingData(response.data);
        console.log(response.data, "response");
      } catch (error) {
        console.error("Error fetching attachment:", error);
      }
    } else if (belongsTo === "entity") {
      try {
        const response = await atbtApi.get(
          `boardmeeting/getAttachment?EntityId=${id}`
        );
        setMeetingData(response.data);
        console.log(response.data, "response");
      } catch (error) {
        console.error("Error fetching attachment:", error);
      }
    } else if (belongsTo === "team") {
      try {
        const response = await atbtApi.get(
          `boardmeeting/getAttachment?TeamId=${id}`
        );
        setMeetingData(response.data);
        console.log(response.data, "response");
      } catch (error) {
        console.error("Error fetching attachment:", error);
      }
    }
  };

  useEffect(() => {
    fetchAttachment();
  }, [BMid]);
  function emptyMsg() {
    setMsg("");
  }
  const handleUpload = async () => {
    if (!file) {
      setMsg("No file selected");
      setTimeout(emptyMsg, 2500);

      setMsgColor("#dc2626");
      return;
    }
    const fd = new FormData();
    fd.append("files", file);
    fd.append("meeting", BMid);
    setMsg("Uploading...");
    setMsgColor("#f97316");
    setProgress((prevState) => ({ ...prevState, started: true }));

    try {
      const response = await atbtApi.post("upload", fd, {
        onUploadProgress: (pe) => {
          setProgress((prevState) => ({ ...prevState, pc: pe.progress * 100 }));
        },
        headers: { "Custom-Header": "value" },
      });

      if (response.status === 201) {
        setMsg("File Uploaded");

        setMsgColor("#047857");
        setProgress((prevState) => ({ ...prevState, started: false }));
        setFile(null);
        setTimeout(emptyMsg, 2500);

        fetchAttachment(); // Fetch updated data after upload
      } else {
        setMsg("Error In Uploading File");
        setMsgColor("#dc2626");
      }
      console.log(response, "response");
    } catch (error) {
      console.error("Error during file upload:", error);
      setMsg("Error In Uploading File");
    }
  };

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
const [activeLink, setActiveLink]= useState('meetingattachments')
  return (
    <div>
      <div className="flex overflow-auto mt-3">
        <NavLink
          // to={``}
          end
          onClick={() => setActiveLink("meetingattachments")}
          className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
            activeLink === "meetingattachments"
              ? "border-b-2 border-orange-500 text-orange-600"
              : ""
          }`}
        >
        Meeting Attachments
        </NavLink>
        <NavLink
          // to={``}
          end
          onClick={() => setActiveLink("taskattachments")}
          className={`cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09] ${
            activeLink === "taskattachments"
              ? "border-b-2 border-orange-500 text-orange-600"
              : ""
          }`}
        >
        Task Attachments
        </NavLink>
      </div>
{activeLink === "meetingattachments" &&
      <MeetingAttachments
        handleDownload={handleDownload}
        handleUpload={handleUpload}
        belongsTo={belongsTo}
        progress={progress}
        msg={msg}
        msgColor={msgColor}
        file={file}
        setFile={setFile}
        meetingnumberName={meetingnumberName}
        id={id}
        BMid={BMid}
        MeetingData={MeetingData}
      />}
    {  activeLink === "taskattachments" &&  <TaskAttachments />}
    </div>
  );
};

export default MeetingWiseDocuments;
