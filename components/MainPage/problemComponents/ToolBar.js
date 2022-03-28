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
  const {idea} = useSelector((state) => state.sForm);

  // const [ideaBar, setIdeaBar] = useState(sFormRedux.idea?.title);
  // console.log(idea)

  // useEffect(() => {
  //   console.log("ran")

  //   if(sFormRedux.idea?.title){
  //     console.log("idea")
  //     setIdeaBar(sFormRedux.idea.title)
  //   }
  // },[idea]);

  return (
    <div className="flex justify-between z-[1000] bg-white/90 shadow-xl sticky top-0 rounded-xl border-b-2 border-t-0 items-center ">
      <div></div>
{/*       
      {ideaBar ? ( <div className="whitespace-nowrap flex w-[30em]"><p className="text-t-bl">Current Idea: </p><p className="text-t-pd ml-2 truncate">{ideaBar}</p></div>) : <div></div>} */}
      
     
    <div className="flex justify-end  text-xl  ">
      <div className="flex gap-5 py-1 pl-3 pr-5 text-xl">
        <FaRedo className="cursor-pointer text-t-bd md:hover:scale-110" />
        <FaChevronLeft className="cursor-pointer text-t-pm md:hover:scale-110" />
        <FaChevronRight className="cursor-pointer text-t-bl md:hover:scale-110" />
        <FaShareSquare className="cursor-pointer text-t-bd md:hover:scale-110" />
      </div>
    </div>
    </div>

  );
}

export default ToolBar;
