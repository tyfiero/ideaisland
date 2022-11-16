import React from "react";
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
  FaImage,
} from "react-icons/fa";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

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
  const [isPic, setIsPic] = useState(false);

  const [isAutoSaved, setIsAutoSaved] = useState(false);

  return (

    <AnimatePresence exitBeforeEnter>
    {props.isPopUpOpen && (
    <motion.div 
       key={"notebox"}
       exit={{ opacity: 0, scale: 0.2, top: "80%", left: "100%" }}
       initial={{ opacity: 0, scale: 0.2, top: "80%", left: "100%" }}
       animate={{ opacity: 1, scale: 1, top: "-3%", left: "57%" }}
       transition={{ delay: 0.1, duration: 0.4 }}
    className="popup-box lg:!left-[55%] md:!left-[30%] sm:!left-0 md:!w-[60%] lg:!w-[43%]">
      <div className="relative box bg-white/90 dark:bg-slate-700/90">
        {/* <span className="close-icon" onClick={props.handleClose}>
          x
        </span> */}
        {/* <p className="text-[22px]">{noteType=== "idea" ? "Quick Idea" :"Quick Note"}</p> */}

        <div className="flex items-center justify-center w-full gap-3 pb-3 align-middle fade-effect-fast note-button-div">
         

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
                  ? " !bg-slate-800/60 shadow-lg shadow-slate-800/60"
                  : " bg-slate-300 shadow-inner")
              }
              onClick={() => setnoteType("note")}
            >
              <FaStickyNote className={"text-[18px]  " +   (noteType === "note"
                  ? " !text-slate-100 "
                  : " !text-slate-800")} />

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
       
        {noteType === "idea" && <IdeaNote />}
        {/* {noteType === "problem" && <ProblemNote />} */}
        {noteType === "note" && <NoteNote />}
      </div>
    </motion.div>
    )}
    </AnimatePresence>

  );
};

export default NotePopUp;
