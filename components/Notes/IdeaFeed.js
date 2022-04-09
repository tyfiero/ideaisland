import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { currentDocAction } from "../../redux/actions";
// import AuthCheck from "../components/Authentication/AuthCheck";

// import { doc, getDoc } from "firebase/firestore";
// import { firestore } from "../lib/firebase";
import { FaEdit, FaGlobeAmericas, FaLock, FaRegTrashAlt } from "react-icons/fa";
import OneStar from "./OneStar";
import Stars from "./Stars";
// import DOMPurify from "dompurify";
import sanitize from "../../lib/sanitize";
import { useState, useEffect } from "react";
import { editModeAction } from "../../redux/actions";
import { statsAction } from "../../redux/actions";

export default function IdeaFeed({ ideas, admin, type }) {
  const statsRedux = useSelector((state) => state.stats);
  const currentDocRedux = useSelector((state) => state.currentDoc);

  const dispatch = useDispatch()

  useEffect(() => {
//TODO, ensure the logic of the stats is working properly. Is it actually keeping track of idea number?
    if(ideas){
      let num = ideas.length;
      dispatch(statsAction({ideaNum: num}))
    }
  
   
  }, [])// eslint-disable-line react-hooks/exhaustive-deps



  //This useeffect changes the default current note on tab change, ideas, problems, or notes.
  useEffect(() => {

    if(ideas){

      if(type === "ideas" && currentDocRedux.rating >= 0){
        //empty blank func
        const blah = () => void 0;
      }else if(type === "notes" && !currentDocRedux.rating){
        //empty blank func
        const blah = () => void 0;
      }else{
        let currentNote = ideas[0];
        dispatch(currentDocAction(currentNote))
        
      }
          
        }
      }, [type, ideas])// eslint-disable-line react-hooks/exhaustive-deps
  
  return ideas
    ? ideas.map((idea, key) => (
        <IdeaItem idea={idea} key={key} admin={admin} type={type}/>
      ))
    : null;
}

function IdeaItem({ idea, admin = false, type }) {
  const [hover, setHover] = useState(false);
  const [nav, setNav] = useState(null);
  const currentDocRedux = useSelector((state) => state.currentDoc);

  const dispatch = useDispatch();

  useEffect(() => {
    setNav(navigator);
    // console.log(navigator);
  }, []);

  const TimeDisplay = (time) => {
    let formattedTime = new Date(
      time?.seconds * 1000 + time?.nanoseconds / 1000000
    );
    let date = formattedTime.toLocaleDateString();
    // let clockTime = formattedTime.toLocaleString(navigator.language, {
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });
    let clockTime = formattedTime.toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return date + ", " +clockTime;
  };


  let clickTimer;
  const onClickHandler = (event) => {
    clearTimeout(clickTimer);
    if (event.detail === 1) {
      clickTimer = setTimeout(() => {
        // console.log("SINGLE CLICK");
        dispatch(currentDocAction(idea));
        dispatch(editModeAction("display"));
      }, 200);
    } else if (event.detail === 2) {
      // console.log("DOUBLE CLICK");
      dispatch(currentDocAction(idea));
      dispatch(editModeAction("edit"));
    }
  };


  
  // console.log(idea.documentID)
  return (
    <div
      className="flex items-center justify-center px-4 pt-2 sm:px-6 lg:px-8 drop-shadow-xl md:w-[80em]  "
      onClick={onClickHandler
      }
    >
      <div
        className={"w-[22em]  p-1  shadow !rounded-xl normal-box-soft drop-shadow-xl flex-col  items-center " + (type === "ideas" ? "bg-blues-100/70" : (type === "problem" ? "bg-t-pl/70" : "bg-t-bpop/30"))}
        // onMouseOver={() => setHover(true)}
        // onMouseOut={() => setHover(false)}
      >
        <div className="flex">
          <div className="normal-box !rounded-xl w-[100%] ">
            {/* <Link href={`/${idea.username}`}>
            <a>
              <strong className="italic text-t-bl">@{idea.username}</strong>
            </a>
          </Link> */}

            {/* <Link href={`/${idea.username}/${idea.slug}`}>
              <a> */}
            <div className="cursor-pointer">
              <h2 className="text-t-bd truncate text-[18px] nun ">{idea.title || "*Unnamed Idea"}</h2>
              {/* <p className="truncate text-[14px]">{idea.content}</p> */}
            
            {type === "problem" && (<><p
                className="overflow-hidden max-h-[3em]"
              >Why:{" " +idea.why}</p><p
              className="overflow-hidden max-h-[3em]"
            >What:{" " +idea.what}</p><p
            className="overflow-hidden max-h-[3em]"
          >Who:{" " +idea.who}</p><p
          className="overflow-hidden max-h-[3em]"
        >Root Cause:{" " +idea.pq3}</p></>)}

        
             {type !== "problem" && (   <div
                className="overflow-hidden max-h-[3em]"
                dangerouslySetInnerHTML={{
                  __html: sanitize(idea.content, {
                    USE_PROFILES: { html: true },
                  }),
                }}
              ></div>)}
            </div>
            {/* </a>
            </Link> */}
            {/* <Stars rating={idea.rating} /> */}
          </div>

          <div></div>
        </div>

        <div className="flex items-center justify-between ">
          {/* If admin view, show extra controls for user */}

         
          <p className="text-slate-500 text-[12px] ml-1 mb-0">
            {TimeDisplay(idea.createdAt)}
          </p>
          {type === "ideas" && ( 
          <div className="flex ">
            <span className="flex ml-auto ">
              {idea.rating || 0}
              <OneStar className="ml-5" />
            </span>
          </div>)}
          {/* {admin && (
            <>
              {idea.published ? (
                <div className="flex items-center">
                  <span className="flex items-left">
                    {idea.heartCount || 0}
                    <p className="mr-1 ">💗</p>
                  </span>
                  <FaGlobeAmericas className="text-t-bl" />
                </div>
              ) : (
                <FaLock className="text-t-pd" />
              )}
            </>
          )} */}
        </div>
        <div className="flex">
          {/* {hover && (
            <Link href={`/admin/${idea.slug}`}>
              <button className=" w-[2em] h-[1.5em] rounded-3xl bg-t-bl flex items-center justify-center text-white drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer">
                <FaEdit />
              </button>
            </Link>
          )} */}
        </div>
      </div>
    </div>
  );
}
