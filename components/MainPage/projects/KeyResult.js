import React from 'react'
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";


function KeyResult(props) {
    const [progress, setProgress] = React.useState(props.progress);

  return (
    <div className="flex  w-[85%] justify-between items-center px-4">
    <p>{props.text}</p>
   

   <div className="flex items-center gap-2">
    <div className="w-[10em]  shadow-3xl shadow-t-bl">
    <ProgressBar
        percent={progress}
        filledBackground="var(--colorDark1)"
      /> 
        </div>

      <p>{progress}%</p>
        </div>
        </div>
  )
}

export default KeyResult