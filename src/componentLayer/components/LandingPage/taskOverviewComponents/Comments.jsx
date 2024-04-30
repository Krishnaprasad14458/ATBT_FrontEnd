import React, { useState } from "react";

import { Picker } from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';
// import 'emoji-mart/dist/emoji-mart.css';
import EmojiPicker from 'emoji-picker-react';
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
    <div>
       <div>
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
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Type your comment..."
          className="p-2 border-2 text-sm w-full  shadow-sm rounded-md  focus:outline-none focus:border-orange-400"
        />
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} style={dropzoneStyle}>
              <input {...getInputProps()} />
              <p>Icon</p>
            </div>
          )}
        </Dropzone>
        <button type="submit">Comment</button>
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
