import React from "react";
import TextArea from "./TextArea";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toggle from "react-toggle";
import styled from "styled-components";
import IdeaNote from "./Idea";
import NoteNote from "./NoteNote";
import ProblemNote from "./ProblemNote";
import {
  FaLightbulb,
  FaPlus,
  FaExclamationTriangle,
  FaStickyNote,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { useRouter } from "next/router";

const Label = styled.label`
  font-weight: bold;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  white-space: nowrap;
  align-items: center;
  cursor: pointer;
`;
const NotePopUp = (props) => {
  //redux
  const router = useRouter();
  const notesRedux = useSelector((state) => state.notes);
  const [isSaved, setIsSaved] = useState(false);
  const [noteType, setnoteType] = useState("idea");

  const [isAutoSaved, setIsAutoSaved] = useState(false);

  //   console.log(notesRedux);

  //   const [textAreaContent, setTextAreaContent] = useState("");
  // let current = new Date();
  // let cTime =
  //   current.getHours() +
  //   ":" +
  //   current.getMinutes() +
  //   ":" +
  //   current.getSeconds();
  // let savedMessage = "Saved at: " + cTime;

  // const saveHandler = () => {
  //   localStorage.setItem("notes", notesRedux);
  //   setIsSaved(true);

  //   setTimeout(function () {
  //     //   console.log(event.target.value + " LONG");

  //     setIsSaved(false);
  //   }, 3000);
  //   // console.log(notesRedux);
  // };

  //AUTOSAVE
  //   setInterval(function () {
  //       let prevNote = notesRedux;
  //     if (notesRedux) {
  //       localStorage.setItem("notes", notesRedux);
  //       setIsSaved(true);
  //       console.log("Saving changes");
  //       setTimeout(function () {
  //         //   console.log(event.target.value + " LONG");

  //         setIsSaved(false);
  //       }, 3000);
  //     }
  //   }, 10000);
  //   const handleToggleChange = (event) => {};
  //   const textAreaDataHandler = (content) => {
  //     setTextAreaContent(content);
  //   };

  // if(noteType)
  //    buttonSyle = {
  //     background: "linear-gradient(145deg, #f8f8f8, #e4c2df)",
  //   }
  // let buttonStyle = {
  //   background: "linear-gradient(145deg, #e4c2df, #B25CC9) !important",
  // };

  // let idea =

  return (
    <div className="popup-box fade-effect-turbo">
      <div className="box fade-effect-fast bg-white/90 dark:bg-slate-700/90">
        {/* <span className="close-icon" onClick={props.handleClose}>
          x
        </span> */}
        {/* <p className="text-[22px]">{noteType=== "idea" ? "Quick Idea" :"Quick Note"}</p> */}

        <div className="flex items-center justify-center w-full gap-3 pb-3 align-middle fade-effect-fast note-button-div">
          {/* <button
            // className="flex items-center notes-btn-sm"
            className={
              noteType === "idea"
                ? "flex items-center notes-btn-sm notes-btn-sm-selected"
                : "flex items-center notes-btn-sm"
            }
            onClick={() => setnoteType("idea")}
            //  style={ {noteType ? buttonStyle : null}
          >
            <FaPlus style={{ fontSize: "16px" }} />
            <p className="pl-2 pr-1">Idea</p>
            <FaLightbulb style={{ fontSize: "16px" }} />
          </button> */}

          <div className="flex w-[22em] p-2 gap-2 items-center justify-evenly text-center normal-box-soft">
            <button
              className={
                "w-[10em] h-[2em] rounded-3xl  flex items-center justify-center text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
                (noteType === "idea"
                  ? " bg-t-bl shadow-lg shadow-clear-bl3"
                  : " bg-slate-300 shadow-inner")
              }
              onClick={() => setnoteType("idea")}
            >
              <FaLightbulb className="text-[18px] text-t-bd" />

              <p
                className={
                  "mr-1  mb-0 " +
                  (noteType === "idea"
                    ? "text-white text-[20px]"
                    : "text-black text-[18px]")
                }
              >
                Quick Idea
              </p>
            </button>

            <button
              className={
                "w-[10em] h-[2em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
                (noteType === "note"
                  ? " bg-clear-bpop4 shadow-lg shadow-clear-bpop2"
                  : " bg-slate-300 shadow-inner")
              }
              onClick={() => setnoteType("note")}
            >
              <FaStickyNote className="text-[18px] text-t-bd" />

              <p
                className={
                  "mr-1 mb-0 " +
                  (noteType === "note"
                    ? "text-white text-[20px]"
                    : "text-black text-[18px]")
                }
              >
                Quick Note
              </p>
            </button>
          </div>
        </div>
        <div className="absolute top-5 right-3">
          <button
            className={
              "w-[6em] h-[2em] rounded-3xl bg-t-pl flex items-center justify-center text-t-pd gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
            }
            onClick={() => {router.push("/notes")}}
          >
            {noteType === "idea" ? "All Ideas" : "All Notes"} <FaExternalLinkAlt />
          </button>
        </div>
        {noteType === "idea" && <IdeaNote />}
        {/* {noteType === "problem" && <ProblemNote />} */}
        {noteType === "note" && <NoteNote />}
      </div>
    </div>
  );
};

export default NotePopUp;
