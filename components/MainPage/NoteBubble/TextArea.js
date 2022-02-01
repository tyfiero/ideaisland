import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { connect } from "react-redux";
// import { noteAction } from "../redux/actions";
// import noteAction
import { noteAction } from "../../../redux/actions";

var localNotes;
function TextArea(props) {
  //redux
  const notesRedux = useSelector((state) => state.notes);
  const dispatch = useDispatch();


  useEffect(() => {
   localNotes = localStorage.getItem("notes");
}, []);

  //state
  const [textareaheight, setTextareaheight] = useState(1);
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    if (localNotes !== null) {
      setTextContent(localNotes);
    }
  }, [localNotes]);

  //   console.log(localNotes + "LN");

  const handleChange = (event) => {
    // console.log(event.target.rows);
    const height = event.target.scrollHeight;
    const rowHeight = 15;
    const trows = Math.ceil(height / rowHeight) - 1;

    setTextContent(event.target.value);
    // console.log(textContent + " TC");

    dispatch(noteAction(textContent));
    // textAreaDataHandler(textContent);
    // if ((trows, textareaheight)) {
    //   setTextareaheight(trows);
    // }
    let longDelay = 5000; //5 second
    let shortDelay = 600; //0.6 second

    setTimeout(function () {
      //   console.log(event.target.value + " LONG");

      dispatch(noteAction(event.target.value));
      setTextContent(event.target.value);
    }, longDelay);

    setTimeout(function () {
      //   console.log(event.target.value + "SHORT");

      dispatch(noteAction(event.target.value));
      setTextContent(event.target.value);
    }, shortDelay);
  };

  const textStyles = {
    resize: "none",
    fontSize: "1rem",
    lineHeight: "1.5em",
    fontFamily: "Roboto",
    padding: "10px",
    width: "99%",
    borderRadius: "1rem",
  };

  return (
    <div>
      <textarea
        className="text-area-note"
        style={textStyles}
        value={textContent}
        rows={props.rows}
        onChange={handleChange}
        placeholder={props.ph}
      >
        {" "}
      </textarea>
    </div>
  );
}

export default TextArea;
