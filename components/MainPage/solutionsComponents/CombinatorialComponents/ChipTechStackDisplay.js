import React from "react";
import { FaTimes } from "react-icons/fa";

function ChipTechStackDisplay({ kind, name, cost, type }) {

  return (
    <div
      className={
        " h-[3.5em] rounded-xl px-2 flex flex-col items-center justify-center gap-1 drop-shadow-xl   md:transition-transform  bg-gradient-to-b from-white dark:from-black via-blues-200 to-blues-400 text-slate-700 -z-[1]"
      }

    >
     <div>
     <p className="fre">{name}</p> 
         </div>
         <div>
     <p className="text-xs lowercase">{cost > 0 ? ("$" + cost + " " + type) : "Free"}</p> 
         </div>
     
    </div>
  );
}

export default ChipTechStackDisplay;
