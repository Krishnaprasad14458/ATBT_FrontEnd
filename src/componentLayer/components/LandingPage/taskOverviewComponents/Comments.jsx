import React, { useState } from "react";
import Dropzone from 'react-dropzone';
const Comments = ({ handleSendComment }) => {
  // let [comment, setComment] = useState({
  //   senderId: "",
  //   message: "",
  //   file: "",
  // });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [attachments, setAttachments] = useState([]);
  console.log("attachments",attachments)

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // const handleEmojiClick = (event, emojiObject) => {
  //   setNewComment(newComment + emojiObject.emoji);
  // };
  const handleEmojiClick = (event, emojiObject) => {
    console.log("FFSDFDSfs",emojiObject)
    const emoji = emojiObject.emoji;
    setNewComment(newComment + emoji);
  };

  const handleDrop = (acceptedFiles) => {
    setAttachments([...attachments, ...acceptedFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the comment and attachments to your backend
    setComments([...comments, { text: newComment, attachments }]);
    setNewComment('');
    setAttachments([]);
  };

  return (
    <div className="p-3">
       <div >
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
            <div>
              {comment.attachments.map((attachment, idx) => (
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
      </div>
      <form onSubmit={handleSubmit}>
       <div className="grid grid-cols-11 md:grid-cols-11 lg:grid-cols-11 xl:grid-cols-11 justify-center gap-3"> 
       <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Type your comment..."
          className="col-span-10 p-2 border-2 text-sm w-full h-10 resize-none  shadow-sm rounded-md  focus:outline-none focus:border-orange-400"
        />
  <button type="submit col-span-1 ">

  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

  </button>


       </div>







       
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} style={dropzoneStyle}>
              <input {...getInputProps()} />
              <p>Icon</p>
            </div>
          )}
        </Dropzone>
      
      </form>
     
    </div>
  );
}
const dropzoneStyle = {
  // border: '2px dashed #cccccc',
  // borderRadius: '4px',
  // padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const attachmentStyle = {
  maxWidth: '200px',
  maxHeight: '200px',
  margin: '10px',
};
export default Comments;
