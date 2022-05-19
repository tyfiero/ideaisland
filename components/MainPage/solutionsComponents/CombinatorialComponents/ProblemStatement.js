import { React, useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

import {
  FaDice,
  FaEdit,
  FaEquals,
  FaExpandAlt,
  FaLightbulb,
  FaLongArrowAltRight,
  FaPlus,
  FaRandom,
  FaRegCopy,
  FaRegFolderOpen,
  FaRobot,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineHideImage, MdOutlineImage } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import ToolTip from "../../../Layout/ToolTip";
import WordButton from "./WordButton";
import { Cascader } from "antd";
import "antd/dist/antd.css";
import { randomizeAction, sArrayAction } from "../../../../redux/actions";

function ProblemStatement(props) {

  

  // const sArray = useSelector((state) => state.sArray);

  const isRandomized = useSelector((state) => state.randomize);
  const dispatch = useDispatch();
  const [selectedWords, setSelectedWords] = useState([]);
  const [editSentence, setEditSentence] = useState(false);
  const [splitTextArray, setSplitTextArray] = useState([]);
  // const [edited, setEdited] = useState(false);
  // let splitTextDefault = edited ? "" : "";
  // const [splitText, setSplitText] = useState(edited ? "" : "How might we improve brainstorming for entrepreneurs?");
  // const [splitTextDefault, setSplitTextDefault] = useState("How might we improve brainstorming for entrepreneurs?");
  const [splitText, setSplitText] = useState(
    "How might we improve brainstorming for entrepreneurs?"
  );
  const [update, setUpdate] = useState(false);
  const focusTextInput = useRef(null);
  const previousSplitTextValue = useRef("");

  // console.log(splitTextArray)
  // console.log("updateMAIN--"+update)
  useEffect(() => {
    previousSplitTextValue.current = splitText;
    // console.log(splitText);
  }, [splitText]);

  //Use efffect to focus text input on click
  useEffect(() => {
    if (editSentence) {
      focusTextInput.current.focus();
    }
  }, [editSentence]);

  useEffect(() => {
    separateText();
  }, []);


  const randomizeAll = (event) => {
    dispatch(randomizeAction(true));
  };
  // useEffect(() => {
  //   if(!splitText){
  //     console.log("RAN")
  //   setSplitText("How might we 10X brainstorming for tech entrepreneurs?")
  //   }
  //   separateText();
  //   setUpdate(!update)
  // }, [splitText]);

  //   const updateSentence = (data) => {
  // console.log(data)
  //   }

  const updateSelected = (data) => {
    if (data[1] === "add") {
      let array = selectedWords;
      //   let pointer = wordArray.indexOf(data[0])
      //   console.log(pointer)
      // console.log(data[0]);

      array.push(data[0]);
      // setUpdate(!update);
      setSelectedWords(array);
    } else if (data[1] === "delete") {
      let array = selectedWords;

      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === data[0]) {
          array.splice(i, 1);
          // setUpdate(!update);
          setSelectedWords(array);
          // setChanges(false)
        }
      }
    } else {
      //This is the update section that happens on randomization. If the updated word from word button contains a space, replace that space with a dash to keep it together as one word.
      // console.log(data[0]);
      let word = data[0];
      if (word.includes(" ")) {
        word = word.replace(" ", "-");
      }
      // console.log(word);

      const splitArray = previousSplitTextValue.current.split(" ");
      // console.log(data[2]);

      splitArray[data[2]] = word;
      // console.log(splitArray);

      let joined = splitArray.join(" ");
      // console.log(joined);

      setSplitText(joined);

      // setUpdate((update ? false : true));

      // console.log(splitText);
    }
  };

  const separateText = () => {
    const splitArray = splitText.split(" ");

    let formatted = splitArray.map((data, index) => {
      return (
        <WordButton
          key={index}
          word={index}
          updateSelected={updateSelected}
          selectedWords={selectedWords}
          text={data}
          mode={"problem"}
        />
      );
    });
    setSplitTextArray(formatted);
    // if(template){
    //   setEditSentence(false)
    // }
    // setUpdate(!update);
    // setUpdate((update ? false : true));
  };

  function onCascadeChange(value, label) {
    // console.log(value);
    // console.log(label);

    if (value.length > 2) {
      setSplitText(label[2].label);
      separateText();

      // setUpdate(!update);
    } else {
      setSplitText(label[1].label);
      separateText();
      // setUpdate(!update);
    }
    // setEditSentence(false);
    //     setTimeout(() => {
    //       setEditSentence(false);
    //       setUpdate(!update);
    // }, 2000);
  }

  // Just show the latest item.
  function displayRender(label) {
    return label[label.length - 1];
  }

  return (
    <div className="relative flex flex-col w-full gap-2 ">
      <div className="flex flex-col items-center w-full gap-0 text-left">
        <div className="flex items-start justify-center w-full ">
          <div className="flex flex-wrap items-start justify-center w-full py-4 pt-16 sm:gap-2 md:gap-4 glass-box bg-pink-100/70 dark:bg-pink-500/40">
            <div className="absolute sm:-right-5 md:right-0 flex justify-between gap-2 px-1 transition duration-500 border-b-2 border-l-2 opacity-100 sm:-top-1 md:-top-0 rounded-bl-md border-t-pl rounded-tr-md group-hover:opacity-100 bg-clear-pl2 sm:scale-[85%]">
              <button
                data-tip
                data-for="random-all"
                className="flex items-center justify-center w-10 gap-4 p-2 px-2 m-1 text-white cursor-pointer rounded-3xl bg-t-pd drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                onClick={randomizeAll}
              >
                <FaDice className="text-xl" />
                <ToolTip
                  text="Randomize all selected"
                  id="random-all"
                  w=" !w-[15em]"
                  place="left"
                />
              </button>
              <button
                data-tip
                data-for="copy"
                className="flex items-center justify-center w-10 gap-4 p-2 px-2 m-1 text-white cursor-pointer rounded-3xl bg-t-pd drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                onClick={() => {
                  if (process.browser) {
                    navigator.clipboard.writeText(splitText);
                  }
                  toast.success("Copied sentence!");
                }}
              >
                <FaRegCopy className="text-xl" />
                <ToolTip
                  text="Copy Sentence for AI tool"
                  id="copy"
                  w=" !w-[15em]"
                  place="left"
                />
              </button>

              <button
                data-tip
                data-for="edit"
                className="w-[8em] h-[2em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-pinks-100 via-t-pl  to-t-pd !shadow-2xl gap-2"
                onClick={() => {
                  if (editSentence) {
                    separateText();
                    setEditSentence(false);
                  } else {
                    setEditSentence(true);
                  }
                }}
              >
                <p className="text-t-pd">{editSentence ? "Done" : "Edit"}</p>
                <FaEdit className="text-t-pd" />

                <ToolTip
                  text="Edit Sentence"
                  id="edit"
                  w=" !w-[15em]"
                  place="left"
                />

                {/* <BsArrowRight
          style={{ fontSize: "32px" }}
          className="pl-2 text-t-pd"
        /> */}
              </button>
            </div>
            <div className="absolute text-lg left-1 top-6 ">
              <div data-tip data-for="templates">
                <Cascader
                  // style={{ borderRadius: "59px" }}
                  className="nun"
                  options={options}
                  expandTrigger="hover"
                  displayRender={displayRender}
                  onChange={onCascadeChange}
                  style={{ zIndex: 8 }}
                  // placeholder="Select Template"
                  placement="bottomLeft"
                  size="large"
                >
                  <a href="#">
                    <button
                      className="w-[6em] h-[1.3em] rounded-xl p-2 right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-pinks-50 ring-2 !shadow-2xl gap-2 ring-t-pd dark:!bg-pink-400"
                      onClick={() => {
                        setEditSentence(true);
                      }}
                    >
                      <p className="text-sm text-slate-700 dark:text-white">
                        Templates
                      </p>
                      <FaRegFolderOpen className="text-md text-slate-700 dark:text-white" />

                      {/* <BsArrowRight
          style={{ fontSize: "32px" }}
          className="pl-2 text-t-pd"
        /> */}
                    </button>
                  </a>
                </Cascader>
                {/* <ToolTip text="Select a sentence template to start from" id="templates" w=" !w-[15em]" /> */}
              </div>
            </div>
            <p className="absolute top-0 text-lg left-2 text-t-pm dark:text-t-pm">
              Problem Statement
            </p>
            {/* <div className="flex flex-col">

              <p>split text:{splitText}</p>
              <p>prev text:{previousSplitTextValue.current}</p>
            </div> */}
            {editSentence ? (
              <>
                <input
                  type="text"
                  className="rounded-xl w-[90%] text-4xl nun text-center fade-effect-quick"
                  value={splitText}
                  ref={focusTextInput}
                  onChange={(e) => {
                    let updatedText = e.target.value;
                    setSplitText(updatedText);
                  }}
                />
              </>
            ) : (
              splitTextArray
            )}
            {/* {!editSentence &&    (splitTextArray)} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemStatement;

const options = [
  {
    value: "Problem Discovery ?'s",
    label: "🔎 Problem Discovery ?'s",
    children: [
      {
        value: "What do (person place or thing) have issues with?",
        label: "What do (person place or thing) have issues with?",
       
      },
      {
        value: "What could annoy someone who is trying to (business verb)?",
        label: "What could annoy someone who is trying to (business verb)??",
       
      },
      {
        value: "If you were a (blank), what would be something you would want to help you ____?",
        label: "If you were a (blank), what would be something you would want to help you ____?",
       
      },
    ],
  },
  {
    value: "Incremental Improvement ?'s",
    label: "⬆️ Incremental Improvement ?'s",
    children: [
      {
        value: "How could the process involved with ____ strip away inefficiency?",
        label: "How could the process involved with ____ strip away inefficiency?",
      },
      {
        value: "How might we decrease the time necessary to accomplish ____?",
        label: "How might we decrease the time necessary to accomplish ____?",
      },
      {
        value: "What would improve the ____ process 1%?",
        label: "What would improve the ____ process 1%?",
      },
    ],
  },
  {
    value: "🦄 Unicorn Maker ?'s",
    label: "🦄 Unicorn Maker ?'s",
    children: [
      {
        value: "What is something that everybody does on a daily basis that is less than ideal?",
        label: "What is something that everybody does on a daily basis that is less than ideal?",
      },
      {
        value: "How would you improve a daily activity for (a group of people, ie bankers, baristas, commuters)?",
        label: "How would you improve a daily activity for (a group of people, ie bankers, baristas, commuters)?",
      },
      {
        value: "What activity do large companies in ____ industry do poorly in general?",
        label: "What activity do large companies in ____ industry do poorly in general?",
      },
    ],
  },
  {
    value: "Big Picture ?'s",
    label: "🌍 Big Picture ?'s",
    children: [
      {
        value: "How might we decrease the waste involved with ____?",
        label: "How might we decrease the waste involved with ____?",
      },
      {
        value: "How can we revise the production process for ____ to be more carbon friendly?",
        label: "How can we revise the production process for ____ to be more carbon friendly?",
      },
      {
        value: "How do we help the people of ____ with ____?",
        label: "How do we help the people of ____ with ____?",
      },
    ],
  },
  {
    value: " Systems Thinking",
    label: "⚙️ Systems Thinking ?'s",
    children: [
      {
        value: "How do we decrease net inputs for the ____ system?",
        label: "How do we decrease net inputs for the ____ system?",
      },
      {
        value: "How might we manage the wider context of the ____ system to improve outcomes?",
        label: "How might we manage the wider context of the ____ system to improve outcomes?",
      },
      {
        value: "How might we leverage underutilized emergent properties of the ____ system to improve output?",
        label: "How might we leverage underutilized emergent properties of the ____ system to improve output?",
      },
    ],
  },
];


