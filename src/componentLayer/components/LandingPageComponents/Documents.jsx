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
  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    try {
      const response = await atbtApi.delete(`boardmeeting/deleteAttachment/${id}`);
      console.log("response",response)
      if (response.status === 200) {
    fetchAttachment()
      } else {
        throw new Error('Failed to delete the attachment.');
      }
    } catch (err) {
      console.log('An error occurred while deleting the attachment.');
    }
  };

  return (
    <div className="mt-4 overflow-y-auto">
      {meetingnumberName && (
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
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
                Actions
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
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="size-4 cursor-pointer"
                          onClick={() =>
                            handleDownload(attachment?.Attachments)
                          }
                        >
                          <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                          <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                        </svg>
                      ) : (
                        <span className="text-xs">No file</span>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"

                        class="size-4 cursor-pointer"
                        onClick={()=> handleDelete(attachment.id)}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      )}
    </div>
  );
};

export default Documents;
