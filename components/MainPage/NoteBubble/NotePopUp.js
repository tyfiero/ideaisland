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
} from "react-icons/fa";

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
  const notesRedux = useSelector((state) => state.notes);
  const [isSaved, setIsSaved] = useState(false);
  const [noteType, setnoteType] = useState("note");

  const [isAutoSaved, setIsAutoSaved] = useState(false);

  //   console.log(notesRedux);

  //   const [textAreaContent, setTextAreaContent] = useState("");
  let current = new Date();
  let cTime =
    current.getHours() +
    ":" +
    current.getMinutes() +
    ":" +
    current.getSeconds();
  let savedMessage = "Saved at: " + cTime;

  const saveHandler = () => {
    localStorage.setItem("notes", notesRedux);
    setIsSaved(true);

    setTimeout(function () {
      //   console.log(event.target.value + " LONG");

      setIsSaved(false);
    }, 3000);
    // console.log(notesRedux);
  };

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
    <div className="popup-box fade-effect-fast">
      <div className="box fade-effect-fast">
        {/* <span className="close-icon" onClick={props.handleClose}>
          x
        </span> */}
        <p className="text-[22px]">Notes</p>
        <div className="flex items-center justify-center w-full gap-3 py-2 align-middle fade-effect-fast note-button-div">
          <button
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
          </button>
          <button
            // className="flex items-center notes-btn-sm"
            className={
              noteType === "problem"
                ? "flex items-center notes-btn-sm notes-btn-sm-selected"
                : "flex items-center notes-btn-sm"
            }
            onClick={() => setnoteType("problem")}
          >
            <FaPlus style={{ fontSize: "16px" }} />
            <p className="pl-1 pr-1 text-[16px]">Problem</p>
            <FaExclamationTriangle style={{ fontSize: "16px" }} />
          </button>
          <button
            // className="flex items-center notes-btn-sm"
            className={
              noteType === "note"
                ? "flex items-center notes-btn-sm notes-btn-sm-selected"
                : "flex items-center notes-btn-sm"
            }
            onClick={() => setnoteType("note")}
          >
            <FaPlus style={{ fontSize: "16px" }} />
            <p className="pl-1 pr-1 text-[16px]">Note</p>
            <FaStickyNote style={{ fontSize: "16px" }} />
          </button>
        </div>
        {noteType === "idea" && <IdeaNote />}
        {noteType === "problem" && <ProblemNote />}
        {noteType === "note" && <NoteNote />}

        <div className="save-wrapper">
          {/* <Toggle
                id="cheese-status"
                icons={false}
                defaultChecked={isAutoSaved}
                onChange={handleToggleChange}
              />
              <label htmlFor="cheese-status">Autosave</label> */}

          <button
            className="card__btn_prev save_button fade-effect"
            onClick={saveHandler}
          >
            Save
          </button>
        </div>
        {isSaved && <p className="saved-message">{savedMessage}</p>}
      </div>
    </div>
  );
};

export default NotePopUp;
