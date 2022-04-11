import IdeaSideBar from "../components/Notes/IdeaSideBar";
import { useRouter } from "next/router";
import IdeaFeed from "../components/Notes/IdeaFeed";
import AuthCheck from "../components/Authentication/AuthCheck";
import Editor from "../components/Notes/Editor";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ProblemEditor from "../components/Notes/ProblemEditor";


const NotePage = (props) => {
  const [currentNote, setCurrentNote] = useState("ideas");

  const unsavedChangesRedux = useSelector((state) => state.unsavedChanges);
  // const [ID, setID] = useState(null);
  // useEffect(() => {

  // console.log(currentNote)

  return (
    <div className="flex flex-col mt-3 fade-effect-quick">
      {/* <div className="flex flex-col items-center "> */}
      {/* <p>A place for all of your wild ideas and notes.</p> */}
      {/* </div> */}
      <div className="note-grid">
        <div className="note-grid-1 normal-box-soft h-full !rounded-2xl  min-w-[240px]">
          <IdeaSideBar type={currentNote} setCurrentNote={setCurrentNote} />
        </div>

        <div className="note-grid-2">
          {currentNote !== "problem" && <Editor type={currentNote} />}
          {currentNote === "problem" && <ProblemEditor type={currentNote} />}
        </div>
      </div>
    </div>
  );
};

export default NotePage;
