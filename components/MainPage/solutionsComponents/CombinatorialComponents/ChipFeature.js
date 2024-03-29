import React from "react";
import { FaTimes } from "react-icons/fa";

function ChipFeature({ icon, name, version, cost, importance, feasibility, comments }) {

  return (
    <div
      className={
        " py-2 rounded-2xl px-2 flex flex-col items-start justify-center gap-1 drop-shadow-xl   md:transition-transform  bg-blues-300 dark:bg-blues-500 text-slate-700 -z-[1]"
      }

    >
     <p className="text-base !text-blues-700 dark:!text-blues-100 fre ">{name}</p> 

     {icon} <div className="flex flex-col items-start gap-0">
     <p  className="text-xs">Version: {version}</p> 
    {importance !== "..." &&  <p  className="text-xs">Importance: {importance}</p> }
    {feasibility !== "..." && <p  className="text-xs">Feasibility: {feasibility}</p> }
    {cost !== "..." && <p  className="text-xs">Cost: {cost}</p> }
    {comments !== "..." && <p  className="text-xs">Comments: {comments}</p> }


         </div>
      {/* {clicked ? (
        <span className="absolute flex items-center justify-center w-5 h-5 leading-none text-center text-black bg-blue-200 rounded-full -top-2 -left-2">
          <FaTimes className="text-blue-700" />
        </span>
      ) : null} */}
    </div>
  );
}

export default ChipFeature;
