import React, { useState } from "react";
import {
  
  useFetcher,
 
} from "react-router-dom";
import Dropzone from "react-dropzone";
const CommentsForm = ({taskID}) => {
  let fetcher = useFetcher();
  let loggedInUser = localStorage.getItem("data")
  let loggedInUserId = JSON.parse(loggedInUser).user.id
  
  // const [comments, setComments] = useState({message:"",file:"",senderId:"",});
  const [commentBoxExpand , setCommentBoxExpand] = useState()
  const handleBoxExpand =()=>{
    setCommentBoxExpand(!commentBoxExpand)
  }
  const [newComment, setNewComment] = useState({message:"",file:"",senderId:"",});

  const handleDrop = (acceptedFiles) => {
    setNewComment((prev) => ({
      ...prev,
      file: [...prev.file, ...acceptedFiles]
    }));
   
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here, you can send the comment and attachments to your backend
  //   setComments([...comments, { text: newComment, attachments }]);
  //   setNewComment("");
  //   setAttachments([]);
  // };
  
  const handleSubmit = () => {
  let postComment = newComment;
  postComment.senderId = loggedInUserId
    let UpdateData = {
      id: taskID,
      data:postComment,
      type:"ADD_TASK_COMMENT"
    };
    console.log("UpdateData", UpdateData);
    try {
      fetcher.submit(UpdateData, {
        method: "POST",
        encType: "application/json",
      });
    } catch (error) {
      console.log(error, "which error");
    }
  };


  return (
    <div className="p-3">
      {/* <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
            <div>
              {comment.file.map((attachment, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(attachment)}
                  alt={`Attachment ${idx}`}
                  style={attachmentStyle}
                />
              ))}
            </div>
          </div>
        ))}
      </div> */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-11 md:grid-cols-11 lg:grid-cols-11 xl:grid-cols-11 justify-center gap-3">
       <div  className="col-span-10  flex items-end border-2  border-back rounded-md">
       <textarea
          onClick={handleBoxExpand}
            value={newComment.message}
            onChange={(e)=>setNewComment((prev)=>({...prev,message:e.target.value}))}
            placeholder="Type your comment..."
            className={`p-2 text-sm w-full  resize-none  shadow-sm rounded-md  outline-none ${commentBoxExpand ? "h-16 " : "h-10"}` }
          />
          <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} style={dropzoneStyle}>
              <input {...getInputProps()} />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 me-2 mb-2 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
</svg>

            </div>
          )}
        </Dropzone>
       </div>
        <div  className="col-span-1 flex justify-center items-center">
        <button type="submit">
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

const attachmentStyle = {
  maxWidth: "200px",
  maxHeight: "200px",
  margin: "10px",
};
export default CommentsForm;
