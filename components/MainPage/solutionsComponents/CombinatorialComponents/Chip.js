import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
function Chip({
  iconColor,
  text,
  icon,
  bColor,
  color,
  updateArray,
  deleteIndex,
}) {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <button
        onClick={(e) => {
          // console.log(e);

          if (clicked) {
          console.log("DELETE");

            deleteIndex(text);
          setClicked(false);

            
          } else {
          console.log("UPDATE");

            updateArray(text);
          setClicked(true);

          }

        }}
        // value={"BUTTON"}
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

        <p className="m-0 text-xs">{text}</p>
      </button>
    </div>
  );
}

export default Chip;
