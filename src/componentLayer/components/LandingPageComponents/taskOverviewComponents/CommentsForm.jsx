import React, { useContext, useState } from "react";
import { useFetcher } from "react-router-dom";
import Dropzone from "react-dropzone";
import { AuthContext } from "../../../../contexts/authContext/authContext";
import axios from "axios";
import atbtApi from "../../../../serviceLayer/interceptor";
const CommentsForm = ({
  taskID,
  displayOverviewTask,
  scrollToBottom,
  newComment,
  setNewComment,
  isCommentEditing,
  setIsCommentEditing,
  fileName,
  setFileName,
}) => {
  let fetcher = useFetcher();
  console.log("newComment", newComment);
  const { authState } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  console.log("file", file);
let [uploadStatus,setUploadStatus] = useState()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCommentEditing) {
      setUploadStatus("Sending...")
      let postComment = newComment;
      postComment.senderId = authState?.user?.id;
      let response;
      if (file) {
        const attachmentFormData = new FormData();
        attachmentFormData.append("files", file);
        attachmentFormData.append("TaskId", taskID);
        // fd.append("meeting", BMid);
        try {
          response = await atbtApi.post("upload", attachmentFormData, {
            onUploadProgress: (pe) => {
              // setProgress((prevState) => ({ ...prevState, pc: pe.progress * 100 }));
            },
            headers: { "Custom-Header": "value" },
          });
          if (response.status === 201) {
      setUploadStatus("")

            setFile(null);
            setFileName(null);
            // const formData = new FormData();
            // console.log("UpdateData 4",response.data,postComment);
            // formData.set("file", response.data);
            // formData.set("message", postComment.message);
            // formData.set("senderId", postComment.senderId);
            // console.log("UpdateData");
            let CommentData = {
              file: response.data,
              message: postComment.message,
              senderId: postComment.senderId,
            };
            let UpdateData = {
              id: taskID,
              data: CommentData,
              type: displayOverviewTask
                ? "ADD_TASK_COMMENT"
                : "ADD_SUBTASK_COMMENT",
            };
            console.log("UpdateData", UpdateData);
            try {
              console.log("fdskjfhdskfjs");
              fetcher.submit(UpdateData, {
                method: "POST",
                encType: "application/json",
              });
              setTimeout(() => {
                scrollToBottom();
              }, 1000);
              setNewComment({ message: "", senderId: "" });
            } catch (error) {
              console.log(error, "which error");
            }
          }
        } catch (error) {
          console.error("Error during file upload:", error);
          // setMsg("Error In Uploading File");
        }
      } else if (!file) {
        let CommentData = {
          file: null,
          message: postComment.message,
          senderId: postComment.senderId,
        };
        let UpdateData = {
          id: taskID,
          data: CommentData,
          type: displayOverviewTask
            ? "ADD_TASK_COMMENT"
            : "ADD_SUBTASK_COMMENT",
        };
        console.log("UpdateData", UpdateData);
        try {
          fetcher.submit(UpdateData, {
            method: "POST",
            encType: "application/json",
          });
          setTimeout(() => {
            scrollToBottom();
          }, 1000);
      setUploadStatus("")

          setNewComment({ message: "", senderId: "" });
        } catch (error) {
          console.log(error, "which error");
        }
      }
    } else if (isCommentEditing) {
      setUploadStatus("Sending...")

      let postComment = newComment;
      let UpdateData = {
        id: postComment.id,
        data: postComment,
        type: "EDIT_COMMENT",
      };
      try {
        fetcher.submit(UpdateData, {
          method: "PATCH",
          encType: "application/json",
        });
        setFileName(null);
        setIsCommentEditing(false);
      setUploadStatus("")

        setNewComment({ message: "", senderId: "" });
      } catch (error) {
        console.log(error, "which error");
      }
    }
  };

  console.log("newcomment", newComment);
  console.log("fileName", fileName, file);
  return (
    <div className="px-3 pt-3 ">
      <form>
        <div className="grid grid-cols-11 md:grid-cols-11 lg:grid-cols-11 xl:grid-cols-11 justify-center gap-3">
          <div className="col-span-10  flex items-start  border-2  border-back rounded-md h-15">
            <textarea
              value={newComment.message}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="Type your comment..."
              className={`p-2 text-sm w-full  resize-none   shadow-sm rounded-md  outline-none `}
            />
            <div>
            {fileName && <span className="text-xs w-5 truncate">{fileName}</span>}
              <label htmlFor="fileInput" className="cursor-pointer">
                {!isCommentEditing && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 me-2 mt-2 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                    />
                  </svg>
                )}
              </label>
              <input
                name="image"
                id="fileInput"
                type="file"
                className="hidden"
                // onChange={handleFileChange}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                }}
              />
                
            </div>
          </div>

          <div className="col-span-1 flex justify-center items-center">
            <button
              // type="submit"
              onClick={handleSubmit}
              disabled={newComment.message.length < 2}
              className={
                newComment.message.length >= 2
                  ? ""
                  : "text-gray-300 cursor-not-allowed"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <span className="flex justify-end text-xs h-6"> {uploadStatus}</span>
      </form>
    </div>
  );
};
const dropzoneStyle = {
  // border: '2px dashed #cccccc',
  // borderRadius: '4px',
  // padding: '20px',
  textAlign: "center",
  cursor: "pointer",
};

export default CommentsForm;
