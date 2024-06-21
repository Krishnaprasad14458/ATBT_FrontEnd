import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import atbtApi from "../../../serviceLayer/interceptor";
export async function attachmentsLoader({ params, request }) {
  const url = new URL(request.url);
  try {
    let [boardmeetingResponse] = await Promise.all([
      params.BMid
        ? atbtApi.get(`boardmeeting/getAttachment?MeetingId=${params.BMid}`)
        : null, //Api for edit
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
const Documents = ({ belongsTo }) => {
  console.log("belongsTo", belongsTo);
  const data = useLoaderData();
  const { id, BMid } = useParams();
  let MeetingData = data?.boardmeetingResponse?.data;
  console.log(MeetingData, "MeetingData");

  const [attachment, setAttachment] = useState();
  const handleFileChange = (event) => {
    setAttachment(event.target.files[0]);
  };
  console.log("attachment", attachment);
  // const handleUpload = () => {
  //   const formData = new FormData();
  //   formData.set("files", attachment);
  //   if (belongsTo === "boardMeeting") {
  //     formData.set("meeting", BMid);
  //   }
  //   let response = atbtApi.post("upload", formData);
  //   console.log("response", response);
  // };
  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    // link.download = "report.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
 
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const handleUpload = async () => {
    if (!file) {
      setMsg("No file selected");
      return;
    }
    const fd = new FormData();
    fd.append("files", file);
    fd.append("meeting", BMid);
    setMsg("Uploading...")
    setProgress(prevState => {
      return {...prevState,started:true}
    })
   let response =  await atbtApi.post("upload", fd, {
      onUploadProgress: (pe) => {
        setProgress(prevState => {
          return {...prevState,pc:pe.progress*100}
        })
      },
      headers: { "Custom-Header": "value" },
    });
    if(response.status === 201){
    setMsg("File Uploaded")
    setProgress(prevState=> ({...prevState,started:false}))

setFile(null)
    }else{
    setMsg("Error In Uploading File")

    }
    console.log(response,"response")
  };
  return (
    <div className="mt-4 overflow-y-auto">
      {belongsTo === "boardMeeting" && (
         <div>
                <h1>uploading files in react</h1>
               <input onChange={(e) => setFile(e.target.files[0])} type="file" />
              <button onClick={handleUpload}>upload</button>
              {progress.started && <progress max="100" value={progress.pc}></progress>}
             {msg && <span>{msg}</span>}
            </div>
      )}
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
        <thead>
          <tr>
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
          MeetingData?.map((attachment, index) => {
            const getFileName = (url) => {
              const urlParts = url.split('/');
              const encodedFileName = urlParts[urlParts.length - 1];
              return decodeURIComponent(encodedFileName);
            };
            // Extract the file name
            const fileName = getFileName(attachment?.Attachments);
            return (
              <tbody className=" divide-gray-200 dark:divide-gray-700">
                <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
                  <td
                    className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                  >
                   {fileName}
                  </td>

                  <td
                    className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden flex gap-6`}
                  >
                    {attachment?.Attachments ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                        onClick={() => handleDownload(attachment?.Attachments)}
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
            );
          })}
      </table>
    </div>
  );
};

export default Documents;
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import atbtApi from "../../../serviceLayer/interceptor";

// const Documents = () => {
//   const { id, BMid } = useParams();
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState({ started: false, pc: 0 });
//   const [msg, setMsg] = useState(null);
//   const handleUpload = async () => {
//     if (!file) {
//       setMsg("No file selected");
//       return;
//     }
//     const fd = new FormData();
//     fd.append("files", file);
//     fd.append("meeting", BMid);
//     setMsg("Uploading...")
//     setProgress(prevState => {
//       return {...prevState,started:true}
//     })
//    let response =  await atbtApi.post("upload", fd, {
//       onUploadProgress: (pe) => {
//         setProgress(prevState => {
//           return {...prevState,pc:pe.progress*100}
//         })
//       },
//       headers: { "Custom-Header": "value" },
//     });
//     if(response.status === 201){
//     setMsg("File Uploaded")
//     setProgress(prevState=> ({...prevState,started:false}))

// setFile(null)
//     }else{
//     setMsg("Error In Uploading File")

//     }
//     console.log(response,"response")
//   };
//   return (
//     <div>
//       <h1>uploading files in react</h1>
//       <input onChange={(e) => setFile(e.target.files[0])} type="file" />
//       <button onClick={handleUpload}>upload</button>
//       {progress.started && <progress max="100" value={progress.pc}></progress>}
//       {msg && <span>{msg}</span>}
//     </div>
//   );
// };

// export default Documents;
