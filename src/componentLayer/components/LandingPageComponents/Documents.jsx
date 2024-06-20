import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import atbtApi from "../../../serviceLayer/interceptor";
export async function attachmentsLoader({ params, request }) {
  const url = new URL(request.url);
  try {
    let [boardmeetingResponse] = await Promise.all([
      params.BMid ? atbtApi.get(`boardmeeting/getByid/${params.BMid}`) : null, //Api for edit
    ]);

    // to
    return { boardmeetingResponse };
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to fetch data: ${error.response.status}`);
    } else if (error.request) {
      throw new Error("Request made but no response received");
    } else {
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}
const Documents = () => {
  const data = useLoaderData();
  const { id, BMid } = useParams();
  let MeetingData = data?.boardmeetingResponse?.data;
  console.log(MeetingData, "MeetingData");
  const fileUrl = MeetingData?.image;
  // Function to handle the download action
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "report.xlsx"; // Filename to save as
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="mt-4 overflow-y-auto">
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
        <thead>
          <tr>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Meeting Id
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Date
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Description
            </th>
            <th
              className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
              style={{ width: "200px" }}
            >
              Download Attachment
            </th>
          </tr>
        </thead>
        <tbody className=" divide-gray-200 dark:divide-gray-700">
          <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
            <td
              className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
            >
              {MeetingData?.meetingnumber}
            </td>

            <td
              className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
            >
              {MeetingData?.date}
            </td>

            <td
              className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
            >
              {MeetingData?.description}
            </td>

            <td
              className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden flex gap-6`}
            >
              {MeetingData?.image ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                  onClick={handleDownload}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              ) : (
                <span className="text-xs">No file</span>
              )}
              {/* <svg
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
              </svg> */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
