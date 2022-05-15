import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
function ImportanceChip({
  iconColor,
  icon,
  givenFeature,
  updateFromChip,
  value,
}) {
  const [clicked, setClicked] = useState(false);
  const [option, setOption] = useState(0);
  const [content, setContent] = useState(value);

  const [color, setColor] = useState(" bg-blue-200 text-blue-500");
  // console.log(value);

  useEffect(() => {
    if (value === "...") {
      setOption(0);
    }else if(value === "Could have"){
      setOption(1);
    }else if(value === "Should have"){
      setOption(2);
    }else if(value === "Must have"){
      setOption(3);
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

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
  }, [clicked, option]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex justify-center">
      <button
        onClick={(e) => {
          if (option === 0) {
            setOption(1);
            updateFromChip([givenFeature, "Could have", "importance"]);
          } else if (option === 1) {
            setOption(2);

            updateFromChip([givenFeature, "Should have", "importance"]);
          } else if (option === 2) {
            setOption(3);
            updateFromChip([givenFeature, "Must have", "importance"]);
          } else {
            setOption(0);

            updateFromChip([givenFeature, "...", "importance"]);
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

        <h5 className="m-0 text-xs md:hover:scale-100">
          <b>{content}</b>
        </h5>
      </button>
    </div>
  );
}

export default ImportanceChip;
