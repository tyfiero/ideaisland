import React from "react";
import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { connect } from "react-redux";
import { noteAction } from "../../../redux/actions";
var localNotes;
function ProblemTextArea({ q, sendDataToParent, ph }) {
  const [textContent, setTextContent] = useState("");
  const [timeToSend, setTimeToSend] = useState(false);

  //redux
  //   const notesRedux = useSelector((state) => state.notes);
  //   const dispatch = useDispatch();

  let identifier = "pq" + q;
  useEffect(() => {
    localNotes = localStorage.getItem(identifier);
  }, []);


  //state
  //   const [textareaheight, setTextareaheight] = useState(1);

  useEffect(() => {
    if (localNotes !== null) {
      setTextContent(localNotes);
    }
  }, [localNotes]);

  //   console.log(localNotes + "LN");
  const handleBlur = (event) => {
    let longDelay = 5000; //5 second
    let shortDelay = 600; //0.6 second

    setTimeout(function () {
      //   console.log(event.target.value + " LONG");

      //   dispatch(noteAction(event.target.value));
      setTextContent(event.target.value);
      //   sendDataToParent(textContent);

      //   localStorage.setItem("pq1", textContent);
    }, longDelay);

    setTimeout(function () {
      //   console.log(event.target.value + "SHORT");

      //   dispatch(noteAction(event.target.value));
      setTextContent(event.target.value);
      //   console.log(event.target.value + "TEST SHORT");

      //   let textToSend = textContent;
      setTimeToSend(true);
    }, shortDelay);
  };

  const handleChange = (event) => {
    // console.log(event.target.rows);
    // const height = event.target.scrollHeight;
    // const rowHeight = 15;
    // const trows = Math.ceil(height / rowHeight) - 1;

    setTextContent(event.target.value);
    // console.log(textContent + " TC");

    // dispatch(noteAction(textContent));
    // textAreaDataHandler(textContent);
    // if ((trows, textareaheight)) {
    //   setTextareaheight(trows);
    // }
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

  useEffect(() => {
    if (timeToSend) {
      sendDataToParent([textContent, q]);
      setTimeToSend(false);
    }
  }, [timeToSend]);

  return (
    <div>
      <textarea
        className="text-area-note"
        style={textStyles}
        value={textContent}
        rows="5"
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={ph}
      >
        {" "}
      </textarea>
    </div>
  );
}

export default ProblemTextArea;
