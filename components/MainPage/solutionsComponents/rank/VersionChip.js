import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
function VersionChip({
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
      setColor(" bg-blue-200  text-blue-500");
      setContent("MVP");
    } else if (option === 1) {
      setColor(" bg-green-200  text-green-500");
      setContent("V2");
    } else if (option === 2) {
      setColor(" bg-orange-200  text-orange-600");
      setContent("V3+");
    } else {
      setColor(" bg-pink-200  text-pink-600 shadow-md shadow-pink-300");
      setContent("Back burner");
    }
  }, [clicked]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex justify-center" >
      <button
        onClick={(e) => {
          if (option === 0) {
            setOption(1);
            updateFromChip([givenFeature, "V2", "version"]);

              
          } else if (option === 1) {
            setOption(2);

            updateFromChip([givenFeature, "V3+", "version"]);
            
          } else if (option === 2) {
            setOption(3);

            updateFromChip([givenFeature, "Back burner", "version"]);

          } else {
            setOption(0);

            updateFromChip([givenFeature, "MVP", "version"]);

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

export default VersionChip;
