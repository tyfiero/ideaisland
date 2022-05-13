import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'


function CommentsTextArea({updateFromChip, givenFeature, text}) {
const [content, setContent] = useState(text)


const sendUpdates = () => {
    updateFromChip([givenFeature, content, "comments"]);
    // console.log("text update sent")

}

  return (
    <div><TextareaAutosize className="w-full rounded-md textarea-tw nun" defaultValue={text} placeholder="..." onChange={(e)=>{setContent(e.target.value)}} onBlur={sendUpdates}></TextareaAutosize>
    
     </div>
  )
}

export default CommentsTextArea