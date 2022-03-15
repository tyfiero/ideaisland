import React from "react";
import {
  FaShareSquare,
  FaChevronLeft,
  FaChevronRight,
  FaRedo,
} from "react-icons/fa";

function ToolBar() {
  return (
    <div className="flex justify-end  text-xl border-b-2 border-t-0  z-[1000] bg-white/90 shadow-xl sticky top-0 rounded-xl">
      <div className="flex gap-5 py-1 pl-3 pr-5 text-xl">
        <FaRedo className="cursor-pointer text-t-bd md:hover:scale-110" />
        <FaChevronLeft className="cursor-pointer text-t-pm md:hover:scale-110" />
        <FaChevronRight className="cursor-pointer text-t-bl md:hover:scale-110" />
        <FaShareSquare className="cursor-pointer text-t-bd md:hover:scale-110" />
      </div>
    </div>
  );
}

export default ToolBar;
