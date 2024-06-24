import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import atbtApi from "../../../serviceLayer/interceptor";

const Documents = ({ belongsTo }) => {
  const { id, BMid } = useParams();
  console.log("id, BMID", id, BMid);
  const [MeetingData, setMeetingData] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  console.log("MeetingData", MeetingData);
  // Function to fetch attachments

  const [meetingnumberName,setMeetingnumberName]=useState("")
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

  const handleUpload = async () => {
    if (!file) {
      setMsg("No file selected");
      return;
    }
    const fd = new FormData();
    fd.append("files", file);
    fd.append("meeting", BMid);
    setMsg("Uploading...");
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
        setProgress((prevState) => ({ ...prevState, started: false }));
        setFile(null);
        fetchAttachment(); // Fetch updated data after upload
      } else {
        setMsg("Error In Uploading File");
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

  return (
    <div className="mt-4 overflow-y-auto">
      {belongsTo === "boardMeeting" && (
        <div className="flex justify-end items-center mb-2 gap-2 ">
          <h1>Attachments : </h1>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="border border-gray-300 p-1 rounded-md"
          />
          <button
            onClick={handleUpload}
            className=" flex  justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-medium leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="flex justify-end items-center gap-2">
        {progress.started && (
          <progress max="100" value={progress.pc}></progress>
        )}
        {msg && <span>{msg}</span>}
      </div>

    {meetingnumberName &&  <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
        <thead>
          <tr>
            {id && !BMid && (
              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
               {meetingnumberName}
              </th>
            )}
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Attachment
            </th>
            <th
              className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
              style={{ width: "200px" }}
            >
              Download Attachment
            </th>
          </tr>
        </thead>
        {MeetingData &&
          MeetingData.length > 0 &&
          MeetingData.map((attachment, index) => {
            const getFileName = (url) => {
              const urlParts = url.split("/");
              const encodedFileName = urlParts[urlParts.length - 1];
              return decodeURIComponent(encodedFileName);
            };

            const fileName = getFileName(attachment?.Attachments);
            return (
              <tbody
                key={index}
                className="divide-gray-200 dark:divide-gray-700"
              >
                <tr className="hover:bg-slate-100 dark:hover:bg-gray-700">
                  {id && !BMid && (
                    <td className="px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium overflow-hidden">
                      {attachment?.MeetingId}
                    </td>
                  )}
                  <td className="px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium overflow-hidden">
                    {fileName}
                  </td>
                  <td className="px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium overflow-hidden flex gap-6">
                    {attachment?.Attachments ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                        onClick={() => handleDownload(attachment?.Attachments)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    ) : (
                      <span className="text-xs">No file</span>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>}
    </div>
  );
};

export default Documents;
