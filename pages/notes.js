import IdeaSideBar from "../components/Notes/IdeaSideBar";
import { useRouter } from "next/router";
import IdeaFeed from "../components/Notes/IdeaFeed";
import AuthCheck from "../components/Authentication/AuthCheck";
import Editor from "../components/Notes/Editor";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ProblemEditor from "../components/Notes/ProblemEditor";
import { FaLongArrowAltLeft } from "react-icons/fa";


const NotePage = (props) => {
  const [currentNote, setCurrentNote] = useState("ideas");

  const unsavedChangesRedux = useSelector((state) => state.unsavedChanges);
  // const [ID, setID] = useState(null);
  // useEffect(() => {

  // console.log(currentNote)


const [isMobile, setIsMobile] = useState(false)
const [openNote, setOpenNote] = useState(false)
 
//choose the screen size 
// const handleResize = () => {
//   if (   window.innerWidth < 720) {
//       setIsMobile(true)
//   } else {
//       setIsMobile(false)
//   }
// }

// // create an event listener
// useEffect(() => {
//   window.addEventListener("resize", handleResize)
// console.log("ran")
// })




useEffect(() => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  function handleResize() {
if(getWindowDimensions().width < 720){
  setIsMobile(true)
} else {
  setIsMobile(false)
} 
  }
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
    <AuthCheck plan="Innovator">
    <div className="flex flex-col w-full mt-3 fade-effect-turbo">
      {/* <div className="flex flex-col items-center "> */}
      {/* <p>A place for all of your wild ideas and notes.</p> */}
      {/* </div> */}
      
      {isMobile ? ( <div className="w-full">
       
     {openNote &&  <div className="">
       <button className="flex items-center gap-2 px-3 py-1 my-1 ml-3 text-sm transition rounded-xl nun bg-clear-pl4 hover:scale-105 active:scale-95"
     onClick={() => {
      setOpenNote(!openNote);
    }}>

      <FaLongArrowAltLeft /> Back
    </button>
       </div>}
       
       {openNote ? ( <div className="w-full">
          {currentNote !== "problem" && <Editor type={currentNote}/>}
          {currentNote === "problem" && <ProblemEditor type={currentNote} />}
        </div>):(<div className="normal-box-soft h-full !rounded-2xl  min-w-[240px] fade-effect-quick">
          <IdeaSideBar type={currentNote} setCurrentNote={setCurrentNote} isMobile={isMobile} setOpenNote={setOpenNote}/>
        </div>)} 

       
      </div>
  ) : ( <div className="note-grid">
        <div className="note-grid-1 normal-box-soft h-full !rounded-2xl  min-w-[240px]">
          <IdeaSideBar type={currentNote} setCurrentNote={setCurrentNote} />
        </div>

        <div className=" note-grid-2">
          {currentNote !== "problem" && <Editor type={currentNote} />}
          {currentNote === "problem" && <ProblemEditor type={currentNote} />}
        </div>
      </div>
    )}
       </div>
    </AuthCheck>
  );
};

export default NotePage;
