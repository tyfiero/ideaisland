import React, { useEffect, useState } from "react";
import {
  FaShareSquare,
  FaChevronLeft,
  FaChevronRight,
  FaRedo,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

function ToolBar(props) {
  const sFormRedux = useSelector((state) => state.sForm);
  const sUpdate = useSelector((state) => state.sUpdate);

  const {idea} = useSelector((state) => state.sForm);

  const [ideaBar, setIdeaBar] = useState(null);
  // console.log(idea)

  useEffect(() => {
    // console.log("ran")

    if(sFormRedux.idea?.title){
      // console.log("idea")
      setIdeaBar(sFormRedux.idea.title)
    }else{
      setIdeaBar(null)
    }
  },[sUpdate]);// eslint-disable-line react-hooks/exhaustive-deps




  
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-t-0 shadow-xl bg-white/30">
      <div className="w-full h-full bg-gradient-to-l from-clear-pl2 ">
      
      {ideaBar ? ( <div className="whitespace-nowrap flex w-[30em] ml-4"><p className="text-t-bl">Current Idea: </p><p className="ml-2 truncate text-t-pd">{ideaBar}</p></div>) : <div></div>}
      
     
    <div className="flex justify-end text-xl ">
      <div className="flex gap-5 py-1 pl-3 pr-5 text-xl">
        <FaRedo className="cursor-pointer text-t-bd md:hover:scale-110" />
        <FaChevronLeft className="cursor-pointer text-t-pm md:hover:scale-110" />
        <FaChevronRight className="cursor-pointer text-t-bl md:hover:scale-110" />
        <FaShareSquare className="cursor-pointer text-t-bd md:hover:scale-110" />
      </div>
    </div>
    </div>
    </div>

  );
}

export default ToolBar;
