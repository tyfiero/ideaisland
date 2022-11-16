import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
function StatusChip({setStatus, status, clickable}) {
  
  const [clicked, setClicked] = useState(false);
  const [option, setOption] = useState(0);
  const [content, setContent] = useState(status);

  const [color, setColor] = useState(" bg-green-200  text-green-600 shadow-sm shadow-green-300");

  useEffect(() => {
    if (status === "On Track") {
      setColor(" bg-sky-200  text-sky-600 shadow-sm shadow-sky-300");
      setContent("On Track");
    }else if(status === "Off Track"){
      setColor(" bg-yellow-200  text-yellow-600 shadow-sm shadow-yellow-300");
      setContent("Off Track");
    }else if(status === "Behind"){
      setColor(" bg-red-200  text-red-600 shadow-sm shadow-red-300");
      setContent("Behind");
    }else{
      setColor(" bg-green-200  text-green-600 shadow-sm shadow-green-300");
      setContent("Complete");
    }
  }, [status, clicked]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex justify-center">
      <button
        className={
          " justify-center  min-w-[60px] flex gap-1 items-center rounded-full p-1    whitespace-nowrap transition  h-fit w-fit select-none text-bold " +
          color + (clickable ? " cursor-pointer md:hover:scale-110 md:active:scale-95" : "")
        }
        onClick={(e) => {

          if (!clickable ) return;
          
          if (status === "On Track") {
            setStatus("Off Track");
          } else if (status === "Off Track") {
            setStatus("Behind");
          } else if (status === "Behind") {
            setStatus("Complete");
          } else {
            setStatus("On Track");
          }

          // console.log(option);

          setClicked(!clicked);

          // if (clicked) {
          //   // console.log("DELETE");

          // } else {

          //   // updateArray(text);
          //   setClicked(true);
          // }
        }}
      >
        {/* {icon === "plus" &&
          (clicked ? (
            <FaTimes className="text-t-pm" />
          ) : (
            <FaPlus className={iconColor} />
          ))} */}

        <h5 className="m-0 text-xs md:hover:scale-100">
          <b>{content}</b>
        </h5>
      </button>
    </div>
  );
}

export default StatusChip;
