import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
function FeasibilityChip({
  iconColor,
  icon,
  givenFeature,
  updateFromChip,
  value,
}) {
  const [clicked, setClicked] = useState(false);
  const [option, setOption] = useState(0);
  const [content, setContent] = useState(value);

  const [color, setColor] = useState(" bg-green-200 text-green-500");

  useEffect(() => {
    if (option === 0) {
      setColor(" bg-slate-200  text-slate-500");
      setContent("...");
    } else if (option === 1) {
      setColor(" bg-green-200  text-green-500");
      setContent("Easy");
    } else if (option === 2) {
      setColor(" bg-orange-200  text-orange-600");
      setContent("Moderate");
    } else {
      setColor(" bg-pink-200  text-pink-600 shadow-md shadow-pink-300");
      setContent("Difficult");
    }
  }, [clicked]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex justify-center">
      <button
        onClick={(e) => {
          if (option === 0) {
            setOption(1);
            updateFromChip([givenFeature, "Easy", "feasibility"]);

              
          } else if (option === 1) {
            setOption(2);

            updateFromChip([givenFeature, "Moderate", "feasibility"]);
            
          } else if (option === 2) {
            setOption(3);
            updateFromChip([givenFeature, "Difficult", "feasibility"]);

          } else {
            setOption(0);

            updateFromChip([givenFeature, "...", "feasibility"]);

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

export default FeasibilityChip;
