import React from 'react'
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";



function Objective(props) {

    const [progress, setProgress] = React.useState(props.progress);

  return (
    <div className="flex flex-col glass-box bg-clear-bl2 w-[70%] items-center ">
        
<div className="flex justify-between w-full px-4">

    <p>{props.text}</p>
   
   <div className="flex items-center gap-2">
    <div className="w-[10em]  shadow-3xl shadow-t-bl">
    <ProgressBar
        percent={progress}
        filledBackground="linear-gradient(to right, var(--colorDark1), var(--colorPop))"
      /> 
        </div>

      <p>{progress}%</p>
        </div>
        </div>
        <hr className='w-[97%] border-clear-bl4'/>
        {props.children}
      
        </div>
    
  )
}

export default Objective