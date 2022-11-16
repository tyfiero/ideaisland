import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
function Chip({
  iconColor,
  text,
  icon,
  bColor,
  color,
  updateArray,
  deleteIndex,
  changes,
}) {
  const [clicked, setClicked] = useState(false);


  return (
    <div>
      <button
        onClick={(e) => {
          if (clicked) {
            deleteIndex(text);
            setClicked(false);
          } else {
            updateArray(text);
            setClicked(true);
          }
        }}
        className={
          " flex gap-1 items-center rounded-full p-1 border-2  md:hover:scale-105 md:active:scale-95 whitespace-nowrap transition cursor-pointer h-fit w-fit " +
          (clicked ? " bg-slate-200  border-slate-500" : color + " " + bColor)
        }
      >
        {icon === "plus" &&
          (clicked ? (
            <FaTimes className="text-t-pm" />
          ) : (
            <FaPlus className={iconColor} />
          ))}

        <h4 className={"m-0 text-sm  nun "  + iconColor}>{text}</h4>
      </button>
    </div>
  );
}

export default Chip;
