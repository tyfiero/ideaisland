import React from 'react'
import { FaShareSquare, FaChevronLeft, FaChevronRight, FaRedo } from "react-icons/fa";

function ToolBar() {
  return (
    <div className="flex float-right gap-5 py-1 pl-3 pr-5 text-xl border-b-2 border-l-2 rounded-bl-md z-[1000]">
        <FaRedo className="cursor-pointer text-t-bd md:hover:scale-110"/>
        <FaChevronLeft className="cursor-pointer text-t-pm md:hover:scale-110"/>
        <FaChevronRight className="cursor-pointer text-t-bl md:hover:scale-110"/>
        <FaShareSquare className="cursor-pointer text-t-bd md:hover:scale-110"/>

        </div>
  )
}

export default ToolBar