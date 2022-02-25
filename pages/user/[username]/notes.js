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
    <div className="flex flex-col fade-effect-quick mt-3">
      {/* <div className="flex flex-col items-center "> */}
      {/* <p>A place for all of your wild ideas and notes.</p> */}
      {/* </div> */}
      <div className="note-grid">
        <div className="note-grid-1 normal-box-soft h-full !rounded-2xl">
          <IdeaSideBar />
        </div>

        <div className="note-grid-2">
          <Editor />
          <div className="feed-holder">
            <IdeaFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePage;
