import React from 'react'

const CommentsView = ({comments}) => {
    console.log("comments" , comments)
    const attachmentStyle = {
        maxWidth: "200px",
        maxHeight: "200px",
        margin: "10px",
      };
  return (
   
      <div>

        <h1>--------------------------Comments Section-------------</h1>
        {Array.isArray(comments) && comments.length > 0 &&  comments?.map((comment, index) => (
          <div key={index}>
            <hr/>
            <p >{comment.message}</p>
            <hr/>
            {/* <div>
              {comment.file.map((attachment, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(attachment)}
                  alt={`Attachment ${idx}`}
                  style={attachmentStyle}
                />
              ))}
            </div> */}
          </div>
        ))}
      </div>
    
  )
}

export default CommentsView