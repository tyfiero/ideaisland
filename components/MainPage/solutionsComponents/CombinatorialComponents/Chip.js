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

  // console.log(formContent);



  //Attempted fix to have chips be 'unclicked' when the feature is deleted from feature list. I failed at this one. useEffect is not working as expected, it should be running this function every time formContent changes, but its not for some reason.
  // useEffect(() => {
  //   console.log(
  //   "UE RANNNNNNN"
  //   );

  //   if (formContent) {
  //     let __FOUND = formContent.find(function (formContent, index) {
  //       if (formContent.name === text) {
  //         console.log("FOUND INDEX @ " + index + text + " clicked? " + clicked);

        
  //       } else {
  //         console.log("not found " + text + " clicked? " + clicked);
  //         if(clicked){
  //           setClicked(false);
            
  //         }
  //       }
  //     });
  //   }
  // }, [formContent, changes]);

  return (
    <div>
      <button
        onClick={(e) => {
          // console.log(e);

          if (clicked) {
            // console.log("DELETE");

            deleteIndex(text);
            setClicked(false);
          } else {
            // console.log("UPDATE");

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
