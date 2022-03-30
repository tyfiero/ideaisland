import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
function CostChip({
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
      setContent("Free");
    } else if (option === 2) {
      setColor(" bg-yellow-200  text-yellow-600");
      setContent("$");
    }else if (option === 3) {
      setColor(" bg-orange-200  text-orange-600");
      setContent("$$$");
    } else {
      setColor(" bg-red-200  text-red-600 shadow-md shadow-red-300");
      setContent("$$$$$");
    }
  }, [clicked]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex justify-center">
      <button
        onClick={(e) => {
          if (option === 0) {
            setOption(1);
            updateFromChip([givenFeature, "Free", "cost"]);

              
          } else if (option === 1) {
            setOption(2);

            updateFromChip([givenFeature, "$", "cost"]);
            
          } else if (option === 2) {
            setOption(3);
            updateFromChip([givenFeature, "$$$", "cost"]);

          } else if (option === 3) {
            setOption(4);
            updateFromChip([givenFeature, "$$$$$", "cost"]);

          } else {
            setOption(0);

            updateFromChip([givenFeature, "...", "cost"]);

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

        <p className="m-0 text-xs md:hover:scale-100">
          <b>{content}</b>
        </p>
      </button>
    </div>
  );
}

export default CostChip;
