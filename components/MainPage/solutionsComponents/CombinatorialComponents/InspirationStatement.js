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
import { randomize2Action, sArrayAction } from "../../../../redux/actions";

function InspirationStatement({ randomizeAll }) {
  const randomized2 = useSelector((state) => state.randomize2);
  const dispatch = useDispatch();
  const [selectedWords, setSelectedWords] = useState([]);
  const [editSentence, setEditSentence] = useState(false);
  const [splitTextArray, setSplitTextArray] = useState([]);
 
  const [splitText, setSplitText] = useState("The Tinder of innovation");
  const [update, setUpdate] = useState(false);
  const focusTextInput = useRef(null);
  const previousSplitTextValue = useRef("");

  useEffect(() => {
    previousSplitTextValue.current = splitText;
  }, [splitText]);

  //Use efffect to focus text input on click
  useEffect(() => {
    if (editSentence) {
      focusTextInput.current.focus();
    }
  }, [editSentence]);

  useEffect(() => {
    separateText();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
 
  const updateSelected = (data) => {
    if (data[1] === "add") {
      let array = selectedWords;


      array.push(data[0]);
      setSelectedWords(array);
    } else if (data[1] === "delete") {
      let array = selectedWords;

      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === data[0]) {
          array.splice(i, 1);
          setSelectedWords(array);
        }
      }
    } else {
      //This is the update section that happens on randomization. If the updated word from word button contains a space, replace that space with a dash to keep it together as one word.
      // console.log(data[0]);
      let word = data[0];
      if (word.includes(" ")) {
        word = word.replace(" ", "-");
      }
      const splitArray = previousSplitTextValue.current.split(" ");
      splitArray[data[2]] = word;
      let joined = splitArray.join(" ");
      setSplitText(joined);
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
          mode="solution"
        />
      );
    });
    setSplitTextArray(formatted);
  
  };

  function onCascadeChange(value, label) {
    if (value.length > 2) {
      setSplitText(label[2].label);
      separateText();

      // setUpdate(!update);
    } else if (value.length === 2) {
      setSplitText(label[1].label);
      separateText();
      // setUpdate(!update);
    } else {
      setSplitText(label[0].label);
      separateText();
    }

  }

  // Just show the latest item.
  function displayRender(label) {
    return label[label.length - 1];
  }

  return (
    <div className="relative flex flex-col w-full gap-2 ">
      <div className="flex flex-col items-center w-full gap-0 text-left">
        <div className="flex items-start justify-center w-full ">
          <div className="flex flex-wrap items-start justify-center w-full py-4 pt-16 sm:gap-2 md:gap-4 glass-box bg-sky-100/70 dark:bg-sky-700/70">
            <div className="absolute flex justify-between gap-2 px-1 transition duration-500 border-b-2 border-l-2 sm:-right-5 md:right-0 sm:-top-1 md:-top-0 rounded-bl-md border-t-bl rounded-tr-md bg-clear-bl2 sm:scale-[85%]">
              <button
                data-tip
                data-for="random-all2"
                className="flex items-center justify-center w-10 gap-4 p-2 px-2 m-1 text-white cursor-pointer rounded-3xl bg-t-bl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                onClick={() => {
                  dispatch(randomize2Action(true));
                }}
              >
                <FaDice className="text-xl" />
                <ToolTip
                  text="Randomize all selected"
                  id="random-all2"
                  w=" !w-[15em]"
                  place="left"
                />
              </button>
              <button
                data-tip
                data-for="copy2"
                className="flex items-center justify-center w-10 gap-4 p-2 px-2 m-1 text-white cursor-pointer rounded-3xl bg-t-bl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
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
                  id="copy2"
                  w=" !w-[15em]"
                  place="left"
                />
              </button>

              <button
                data-tip
                data-for="edit2"
                className="w-[8em] h-[2em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-blues-100 via-t-bl  to-t-bpop !shadow-2xl gap-2"
                onClick={() => {
                  if (editSentence) {
                    separateText();
                    setEditSentence(false);
                  } else {
                    setEditSentence(true);
                  }
                }}
              >
                <p className="text-t-bd">{editSentence ? "Done" : "Edit"}</p>
                <FaEdit className="text-t-bd" />

                <ToolTip
                  text="Edit Sentence"
                  id="edit2"
                  w=" !w-[15em]"
                  place="left"
                />

             
              </button>
            </div>
            <div className="absolute text-lg left-1 top-6 ">
              <div data-tip data-for="templates2">
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
                      className="w-[6em] h-[1.3em] rounded-xl p-2 right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-bd5 md:hover:shadow-xl m-1 drop-shadow-xl !bg-blues-100 ring-2 !shadow-2xl gap-2 ring-t-bl dark:!bg-blues-500"
                      onClick={() => {
                        setEditSentence(true);
                      }}
                    >
                      <p className="text-sm text-slate-700 dark:text-white">
                        Templates
                      </p>
                      <FaRegFolderOpen className="text-md text-slate-700 dark:text-white" />

                     
                    </button>
                  </a>
                </Cascader>
                
              </div>
            </div>
            <p className="absolute top-0 text-lg left-2 text-t-bl dark:text-t-bl">
              Idea Inspiration
            </p>
           
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

export default InspirationStatement;

const options = [
  {
    value: "The ___ of ___",
    label: "The ___ of ___",
  },
  {
    value: "If ___ and ___ had a baby",
    label: "If ___ and ___ had a baby",
  },
  {
    value: "What if ___ worked more like ___?",
    label: "What if ___ worked more like ___?",
  },
  {
    value: "A product that ___ with ___",
    label: "A product that ___ with ___",
  },
  {
    value: "10X'ing ___ with ___",
    label: "10X'ing ___ with ___",
  },
  {
    value: "Its like ___ but more ___",
    label: "Its like ___ but more ___",
  },
  {
    value: "Tap a button, get ____",
    label: "Tap a button, get ____",
  },
  {
    value: "Using ___ , a ___ product is born",
    label: "Using ___ , a ___ product is born",
  },
  {
    value: "It started as a small feature at ___, we just expanded it. ",
    label: "It started as a small feature at ___, we just expanded it. ",
  },
  {
    value: "Why can't I just ___?",
    label: "Why can't I just ___?",
  },
  {
    value: "People working in ___ need ___ to perform better",
    label: "People working in ___ need ___ to perform better",
  },
  {
    value: "Everyone wants to ___, thankfully they can with ___ with ___",
    label: "Everyone wants to ___, thankfully they can with ___ with ___",
  },
  {
    value: "___ combined with ___ and a little ___",
    label: "___ combined with ___ and a little ___",
  },
  {
    value: "___ is not just a ___. It's also a ___",
    label: "___ is not just a ___. It's also a ___",
  },
  {
    value: "The swiss army knife of ___",
    label: "The swiss army knife of ___",
  },
  {
    value: "___ is a huge problem, to combat it, we will ___",
    label: "___ is a huge problem, to combat it, we will ___",
  },
  {
    value: "This new trend of ___ could be enhanced with ___",
    label: "This new trend of ___ could be enhanced with ___",
  },
  {
    value: "We make ___ so easy a five year old could do it.",
    label: "We make ___ so easy a five year old could do it.",
  },
  {
    value: "A ___ that is ___ using ___",
    label: "A ___ that is ___ using ___",
  },
  {
    value: "Have you ever ___? Thats why we made ___",
    label: "Have you ever ___? Thats why we made ___",
  },
  {
    value: "___ can be made better with ___",
    label: "___ can be made better with ___",
  },
  {
    value: "Compete on price with ___",
    label: "Compete on price with ___",
  },
  {
    value:
      "Omg, I saw this new ___ on TV last night, it's so cool! It lets you ___ with ___",
    label:
      "Omg, I saw this new ___ on TV last night, it's so cool! It lets you ___ with ___",
  },
  {
    value: "Why is it so hard to ___? Can it be easier in anyway?",
    label: "Why is it so hard to ___? Can it be easier in anyway?",
  },
  {
    value: "What makes ___ so good? What can be emulated?",
    label: "What makes ___ so good? What can be emulated?",
  },
  {
    value: "How could the digitization of ___ help a group of people?",
    label: "How could the digitization of ___ help a group of people?",
  },
];
