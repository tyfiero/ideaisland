import IdeaSideBar from "../../../components/Notes/IdeaSideBar";
import { useRouter } from "next/router";
import IdeaFeed from "../../../components/Notes/IdeaFeed";
import AuthCheck from "../../../components/Authentication/AuthCheck";
import Editor from "../../../components/Notes/Editor";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const NotePage = () => {
  const unsavedChangesRedux = useSelector((state) => state.unsavedChanges);
  // const [ID, setID] = useState(null);
// useEffect(() => {

//   if(unsavedChangesRedux){
//     window.onbeforeunload = function (e) {
//       var message = "Your confirmation message goes here.",
//       e = e || window.event;
//       // For IE and Firefox
//       if (e) {
//         e.returnValue = message;
//       }
    
//       // For Safari
//       return message;
//     };
//   }
// }, [])

  return (
    <div className="flex flex-col mt-3 fade-effect-quick">
      {/* <div className="flex flex-col items-center "> */}
      {/* <p>A place for all of your wild ideas and notes.</p> */}
      {/* </div> */}
      <div className="note-grid">
        <div className="note-grid-1 normal-box-soft h-full !rounded-2xl  min-w-[240px]">
          <IdeaSideBar />
        </div>

        <div className="mt-1 note-grid-2">
          <Editor />
   
        </div>
      </div>
    </div>
  );
};

export default NotePage;
