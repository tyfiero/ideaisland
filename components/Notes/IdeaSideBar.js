import { UserContext } from "../../lib/context";
import {
  serverTimestamp,
  query,
  collection,
  orderBy,
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";
import { firestore, auth } from "../../lib/firebase";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import IdeaFeed from "./IdeaFeed";
import { editModeAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { statsAction } from "../../redux/actions";
import {
  FaEdit,
  FaLightbulb,
  FaExclamationTriangle,
  FaStickyNote,
  FaPlus,
  FaRegTimesCircle,
  FaSearch,
} from "react-icons/fa";
import IdeasList from "./IdeasList";


export default function IdeaSideBar(props) {
  // const [currentNote, setCurrentNote] = useState("ideas");
  const [searchValue, setSearchValue] = useState("");

  const editModeRedux = useSelector((state) => state.editMode);
  const dispatch = useDispatch();
  // dispatch(editModeAction("new"))
  let type = props.type;

  return (
    <div className="overflow-hidden rounded-2xl">
      <div className="normal-box-soft  md:bg-white/40 sm:bg-white/20 dark:bg-[hsla(200,0%,20%,0.764)] fade-effect-quick flex flex-col items-center md:max-h-[120vh] overflow-y-auto overflow-x-hidden !rounded-2xl !scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-t-bl scrollbar-track-blues-50 fade-effect-turbo">
        {type === "ideas" && (
          <>
            <h1 className="text-3xl text-t-bd dark:text-blues-100 fade-effect-quick">Ideas</h1>
          </>
        )}
        {type === "problem" && (
          <>
            <h1 className="text-3xl text-t-pd dark:text-pinks-100 fade-effect-quick">
              Problems
            </h1>
          </>
        )}
        {type === "notes" && (
          <>
            <h1 className="text-3xl text-slate-600 dark:text-slate-100 fade-effect-quick">Notes</h1>
          </>
        )}
        <div className="flex sm:w-[90%] md:w-[20em] p-2 gap-2 items-center justify-evenly text-center normal-box-soft">
     
          <button
            className={
              "w-[6em] h-[2em] rounded-3xl  flex items-center justify-center text-slate-100 gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
              (type === "ideas" ? " bg-t-bl" : " bg-slate-300 dark:bg-slate-800")
            }
            onClick={() => props.setCurrentNote("ideas")}
          >
            <FaLightbulb className="text-[18px] text-t-bd dark:text-blues-100" />

            <p
              className={
                "mr-1  mb-0 " +
                (type === "ideas"
                  ? "text-slate-100 text-[20px]"
                  : "text-black text-[18px]")
              }
            >
              Ideas
            </p>
          </button>
          <button
            className={
              "w-[7.5em] h-[2em] rounded-3xl px-1 bg-t-bl flex items-center justify-center text-slate-100 gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95  cursor-pointer " +
              (type === "problem" ? " bg-t-pm" : " bg-slate-300 dark:bg-slate-800")
            }
            onClick={() => props.setCurrentNote("problem")}
          >
            <FaExclamationTriangle className="text-[18px] text-t-pd dark:text-pinks-100" />

            <p
              className={
                "mr-1  mb-0 " +
                (type === "problem"
                  ? "text-slate-100 text-[20px]"
                  : "text-black text-[18px]")
              }
            >
              Problems
            </p>
          </button>
          <button
            className={
              "w-[6em] h-[2em] rounded-3xl bg-t-bl flex items-center justify-center  gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
              (type === "notes" ? " bg-slate-700 dark:bg-slate-300" : " bg-slate-300 dark:bg-slate-800")
            }
            onClick={() => props.setCurrentNote("notes")}
          >
            <FaStickyNote className={"text-[18px]  " +  (type === "notes" ? " text-slate-300 dark:text-slate-800" : " text-slate-800  dark:text-slate-100")} />

            <p
              className={
                "mr-1 mb-0 " +
                (type === "notes"
                  ? "text-slate-100 text-[20px] dark:text-slate-800"
                  : "text-black text-[18px]")
              }
            >
              Notes
            </p>
          </button>
        </div>
      

        <div className="relative mt-2 group">
          <div className="absolute transition duration-1000 rounded-full opacity-25 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
          {/* <div className="relative flex justify-start rounded-lg ring-1 items-top"> */}

          <button
            // type="submit"
            // disabled={!isValid}
            onClick={() => {
              dispatch(editModeAction("new"));
              // dispatch(currentDocAction(idea.identifier))
              if(props.isMobile){
                props.setOpenNote(true)
              }
            }}
            className=" w-[12em] h-[2em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
          >
            <FaPlus className="text-[20px]" />
            <p className="text-white">
              {" "}
              {type === "ideas"
                ? "Create New Idea"
                : type === "problem"
                ? "Create Problem"
                : "Create New Note"}
            </p>
          </button>
        </div>
        <div className="flex justify-center w-full">
          <FaRegTimesCircle className="relative right-6 -top-[13px] mt-[1.2rem] mr-4 text-t-pm md:hover:scale-125 text-xl opacity-0" />

          <input
            className="border-2 border-gray-300 bg-white dark:bg-slate-700 h-8 px-5 pr-16 rounded-full text-sm focus:outline-none w-[100%] placeholder:text-slate-400 dark:placeholder:text-slate-300"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          {searchValue ? (
            <button onClick={() => setSearchValue("")}>
              <FaRegTimesCircle className="relative right-6 -top-[13px] mt-[1.2rem] mr-4 text-t-pm md:hover:scale-125 text-xl" />
            </button>
          ) : (
            <button className="relative mt-4 mr-4 right-6 -top-3 text-slate-300">
              <FaSearch />
            </button>
          )}
        </div>

        {type === "ideas" && (
          <>
            <IdeasList searchValue={searchValue} type="ideas" isMobile={props.isMobile} setOpenNote={props.setOpenNote}/>
          </>
        )}
        {type === "problem" && (
          <>
            <IdeasList searchValue={searchValue} type="problem" isMobile={props.isMobile} setOpenNote={props.setOpenNote}/>
          </>
        )}
        {type === "notes" && (
          <>
            <IdeasList searchValue={searchValue} type="notes" isMobile={props.isMobile} setOpenNote={props.setOpenNote}/>
          </>
        )}
      </div>
    </div>
  );
}

