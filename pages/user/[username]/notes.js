import IdeaSideBar from "../../../components/Notes/IdeaSideBar";
import { useRouter } from "next/router";
import IdeaFeed from "../../../components/Notes/IdeaFeed";
import AuthCheck from "../../../components/Authentication/AuthCheck";
import Editor from "../../../components/Notes/Editor";
import { useState } from "react";



const NotePage = () => {

  // const [ID, setID] = useState(null);

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
