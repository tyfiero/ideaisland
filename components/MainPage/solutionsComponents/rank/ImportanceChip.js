import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
function ImportanceChip({
  iconColor,
  text,
  icon,
  updateArray,
  givenFeature,
  updateFromChip,
  changes,
  value,
}) {
  const [clicked, setClicked] = useState(false);
  const [option, setOption] = useState(0);
  const [content, setContent] = useState(value);

  const [color, setColor] = useState(" bg-blue-200 text-blue-500");

  useEffect(() => {
    if (option === 0) {
      setColor(" bg-slate-200  text-slate-500");
      setContent("...");
    } else if (option === 1) {
      setColor(" bg-blue-200  text-blue-500");
      setContent("Could have");
    } else if (option === 2) {
      setColor(" bg-yellow-200  text-yellow-600");
      setContent("Should have");
    } else {
      setColor(" bg-red-200  text-red-600 shadow-md shadow-red-300");
      setContent("Must have");
    }
  }, [clicked]);

  return (
    <div className="flex justify-center">
      <button
        onClick={(e) => {
          // console.log(e);
          // if (option > 2) {
          //   setOption(0);
          // } else {
          //   setOption(option + 1);
          // }

          if (option === 0) {
            setOption(1);
            updateFromChip([givenFeature, "Could have"]);

              
          } else if (option === 1) {
            setOption(2);

            updateFromChip([givenFeature, "Should have"]);
            
          } else if (option === 2) {
            setOption(3);
            updateFromChip([givenFeature, "Must have"]);

          } else {
            setOption(0);

            updateFromChip([givenFeature, "..."]);

          }

          console.log(option);




          
          setClicked(!clicked);

          // if (clicked) {
          //   // console.log("DELETE");

          // } else {

          //   // updateArray(text);
          //   setClicked(true);
          // }
        }}
        // value={"BUTTON"}
        className={
          " justify-center  min-w-[60px] flex gap-1 items-center rounded-full p-1   md:hover:scale-105 md:active:scale-95 whitespace-nowrap transition cursor-pointer h-fit w-fit select-none text-bold" +
          color
        }
      >
        {icon === "plus" &&
          (clicked ? (
            <FaTimes className="text-t-pm" />
          ) : (
            <FaPlus className={iconColor} />
          ))}

        <p className="m-0 text-xs md:hover:scale-100">
          <b>{content}</b>
        </p>
      </button>
    </div>
  );
}

export default ImportanceChip;
