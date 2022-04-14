
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";

function ToolTip({id, place, text, w}) {
const [type, setType] = useState("dark")

let widthVal = w ? ` !w-[${w}em] ` : ` !w-[5em] `
let widthValtoString = widthVal.toString();
const [width, setWidth] = useState(widthValtoString)
const darkRedux = useSelector((state) => state.darkMode);

useEffect(() => {
    if(darkRedux){
        setType("light")
    }else{
        setType("dark")
    }
}, [darkRedux]);

    // useEffect(() => {

    //     if(w){
    //     let formatted = ` !w-[${w}em] `
    //    setWidth(formatted)
    //    console.log(formatted)
    //    console.log(width)
    //     }
    // }, [w]);
    
  return (
    <ReactTooltip
      id={id}
      place={place || "bottom"}
      type={type}
    //   className={"!rounded-lg " + width}
    // className={" !rounded-lg "}

      effect="solid"
      delayShow={300}
    >
      <p className={"" + (type === "dark" ? "text-slate-50" : "text-slate-700")}>
        {text}
      </p>
    </ReactTooltip>
  );
}

export default ToolTip;

