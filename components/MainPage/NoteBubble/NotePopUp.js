import React from "react";
import TextArea from "./TextArea";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toggle from "react-toggle";
import styled from "styled-components";
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

  return (
    <div className="popup-box fade-effect-quick">
      <div className="box fade-effect-quick">
        {/* <span className="close-icon" onClick={props.handleClose}>
          x
        </span> */}
        <p>Notes</p>
        <TextArea />
        <div className="save-wrapper">
          {/* <Toggle
            id="cheese-status"
            icons={false}
            defaultChecked={isAutoSaved}
            onChange={handleToggleChange}
          />
          <label htmlFor="cheese-status">Autosave</label> */}

          <button className="card__btn save_button fade-effect" onClick={saveHandler}>
            Save
          </button>
          {isSaved && <p className="saved-message">{savedMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default NotePopUp;
