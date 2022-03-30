// import React from "react";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// // import { connect } from "react-redux";

// // import { noteAction } from "../actions";
// import { gptJInputAction } from "../../../../redux/actions";
// var localGPTJPrompt;
// function GPTJTextArea({ q, ph }) {
//   const [textContent, setTextContent] = useState("");
//   // const [timeToSend, setTimeToSend] = useState(false);
//   const [charLength, setCharLength] = useState(0);

//   //redux
//   const gptJInputRedux = useSelector((state) => state.gptJInput);

//   //   const notesRedux = useSelector((state) => state.notes);
//   const dispatch = useDispatch();

//   // let identifier = "gpt3InputLS";
//   useEffect(() => {
//     //FIX THIS if side effects of no localStorage @Auth

//     // localGPTJPrompt = localStorage.getItem("gptJInputLS");
//   }, []);

//   //state
//   //   const [textareaheight, setTextareaheight] = useState(1);

//   useEffect(() => {
//     if (localGPTJPrompt !== null) {
//       setTextContent(localGPTJPrompt);
//     }
//   }, [localGPTJPrompt]);

//   //   console.log(localNotes + "LN");
//   const handleBlur = (event) => {
//     let longDelay = 5000; //5 second
//     let shortDelay = 600; //0.6 second

//     setTimeout(function () {
//       //   console.log(event.target.value + " LONG");

//       //   dispatch(noteAction(event.target.value));
//       setTextContent(event.target.value);
//       dispatch(gptJInputAction(event.target.value));

//       //   sendDataToParent(textContent);
//     //FIX THIS if side effects of no localStorage @Auth

//       // localStorage.setItem("gptJInputLS", gptJInputRedux);
//     }, longDelay);

//     setTimeout(function () {
//       //   console.log(event.target.value + "SHORT");

//       //   dispatch(noteAction(event.target.value));
//       setTextContent(event.target.value);
//       dispatch(gptJInputAction(event.target.value));
//     //FIX THIS if side effects of no localStorage @Auth

//       // localStorage.setItem("gptJInputLS", gptJInputRedux);
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
//     dispatch(gptJInputAction(event.target.value));

//     setCharLength(gptJInputRedux.length + 1);
//     // localStorage.setItem("gpt3InputLS", gpt3InputRedux);

//     console.log("gptJInputLS", gptJInputRedux);

//     // console.log(textContent + " TC");

//     // dispatch(noteAction(textContent));
//     // textAreaDataHandler(textContent);
//     // if ((trows, textareaheight)) {
//     //   setTextareaheight(trows);
//     // }
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
//         wrap="soft"
//         placeholder="Content to send to AI"
//         maxLength="100"
//         {...register("input", { required: "Required" })}

//       >
//         {" "}
//       </textarea>
//       <p>{charLength + "/100"}</p>
//     </div>
//   );
// }

// export default GPTJTextArea;
