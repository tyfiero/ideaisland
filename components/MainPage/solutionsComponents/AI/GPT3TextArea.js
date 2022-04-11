// import React from "react";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// // import { connect } from "react-redux";
// // import { noteAction } from "../actions";
// import { gpt3InputAction, gpt3OutputAction } from "../../../../redux/actions";
// var localGPT3Prompt;
// function GPT3TextArea({ q, ph }) {
//   const [textContent, setTextContent] = useState("");
//   // const [timeToSend, setTimeToSend] = useState(false);
//   const [charLength, setCharLength] = useState(0);

//   //redux
//   const gpt3InputRedux = useSelector((state) => state.gpt3Input);

//   //   const notesRedux = useSelector((state) => state.notes);
//   const dispatch = useDispatch();

//   // let identifier = "gpt3InputLS";
//   useEffect(() => {



    
//     // localGPT3Prompt = localStorage.getItem("gpt3InputLS");
//   }, []);

//   //state
//   //   const [textareaheight, setTextareaheight] = useState(1);

//   useEffect(() => {
//     if (localGPT3Prompt !== null) {
//       setTextContent(localGPT3Prompt);
//     }
//   }, [localGPT3Prompt]);

//   //   console.log(localNotes + "LN");
//   const handleBlur = (event) => {
//     let longDelay = 5000; //5 second
//     let shortDelay = 600; //0.6 second

//     setTimeout(function () {
//       //   console.log(event.target.value + " LONG");

//       //   dispatch(noteAction(event.target.value));
//       setTextContent(event.target.value);
//       dispatch(gpt3InputAction(event.target.value));

//       //   sendDataToParent(textContent);

//       // localStorage.setItem("gpt3InputLS", gpt3InputRedux);
//     }, longDelay);

//     setTimeout(function () {
//       //   console.log(event.target.value + "SHORT");

//       //   dispatch(noteAction(event.target.value));
//       setTextContent(event.target.value);
//       dispatch(gpt3InputAction(event.target.value));

//       // localStorage.setItem("gpt3InputLS", gpt3InputRedux);
//       // setCharLength(gpt3InputRedux.length);

//       // setTimeToSend(true);
//     }, shortDelay);
//   };

//   const handleChange = (event) => {
//     // console.log(event.target.rows);
//     // const height = event.target.scrollHeight;
//     // const rowHeight = 15;
//     // const trows = Math.ceil(height / rowHeight) - 1;

//     setTextContent(event.target.value);
//     // dispatch(gpt3InputAction(event.target.value));
//     // console.log("gpt3InputLS", gpt3InputRedux);

//     setCharLength(gpt3InputRedux.length + 1);
//     // localStorage.setItem("gpt3InputLS", gpt3InputRedux);

//     // console.log(textContent + " TC");

//     // dispatch(noteAction(textContent));
//     // textAreaDataHandler(textContent);
//     // if ((trows, textareaheight)) {
//     //   setTextareaheight(trows);
//     // }
//   };

//   const textStyles = {
//     resize: "none",
//     fontSize: "1rem",
//     lineHeight: "1.5em",
//     fontFamily: "Roboto",
//     padding: "10px",
//     width: "99%",
//     borderRadius: "1rem",
//   };

//   // useEffect(() => {
//   //   if (timeToSend) {
//   //     sendDataToParent([textContent, q]);
//   //     setTimeToSend(false);
//   //   }
//   // }, [timeToSend]);

//   return (
//     <div>
//       <textarea
//         className="text-area-note"
//         style={textStyles}
//         value={textContent}
//         rows="5"
//         onChange={handleChange}
//         onBlur={handleBlur}
//         placeholder={ph}
//         maxLength="100"
//       >
//         {" "}
//       </textarea>
//       <p>{charLength + "/100"}</p>
//     </div>
//   );
// }

// export default GPT3TextArea;
