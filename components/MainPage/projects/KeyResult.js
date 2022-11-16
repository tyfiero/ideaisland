import React, { useEffect } from "react";
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import StatusChip from "./StatusChip";

function KeyResult(props) {
  const [progress, setProgress] = React.useState(50);
  const [viewKr, setViewKr] = React.useState(false);

  useEffect(() => {
    
    if(props.value){
        if(progress !== ((props.value / props.target) * 100)){
            let progNum = Math.round((props.value / props.target) * 100)
            setProgress(progNum)


         

        }
    }else{
        setProgress(0)
    }
     

  }, [props.value]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      className={
        "flex flex-col w-[99%]  items-start px-4 glass-box border-0 !border-t-2 !rounded-sm cursor-pointer bg-white/50 !border-slate-500/70 dark:!border!white/80" 
      }
    >
      <div
        className={"flex  w-full justify-between items-center  cursor-pointer "}
        onClick={() => {
          props.setSelectedKr(props.krs[props.num]);
          props.setModalOpen(true);
          // setViewKr(!viewKr);
        }}
      >
        <div className="flex px-2 border-r-2 BOX1 basis-2/6 border-slate-600/50 dark:border-slate-50/60">
        {props.title.length > 0 ? <p>{props.title}</p>:<p>-</p>}  

        </div>
        <div className="flex justify-center px-2 border-r-2 BOX2 basis-1/6 border-slate-600/50 dark:border-slate-50/60">
          {/* <p>{props.date}</p> */}
          <StatusChip  value={props.status} clickable={false} />
        </div>
        <div className="flex justify-center px-2 border-r-2 BOX3 basis-1/6 border-slate-600/50 dark:border-slate-50/60">
          {/* <p>{props.date}</p> */}
          {props.date !== null  && <p className="text-xs">{props.date.toLocaleDateString('en-us', {  year:"numeric", month:"short", day:"numeric"}) }</p>}
        {props.date === null  && <p >-</p>}
        </div>
        <div className="flex justify-center px-2 border-r-2 BOX4 basis-2/6 border-slate-600/50 dark:border-slate-50/60">
          {/* <p>{props.date}</p> */}
          {props.value ? (props.type === "$" ? (
            <p>{"$" + props.value + " / " + "$" + props.target}</p>
          ) : (
            <p>{props.value + " / " + props.target + " " + props.type}</p>
          )): (<p>-</p>)}
          
          
      
        </div>
        <div className="flex items-center justify-center gap-2 BOX4 basis-2/6">
          <div className="w-[10em]  shadow-3xl shadow-t-bl">
            <ProgressBar
              percent={progress}
              filledBackground={props.color[2]}
              unfilledBackground={props.color[1]}
            />
          </div>

          <p>{progress}%</p>
        </div>
      </div>

    
    </div>
  );
}

export default KeyResult;
