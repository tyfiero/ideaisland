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
import { sArrayAction } from "../../../../redux/actions";

function InspirationStatement({ randomizeAll }) {

  

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
    "The Tinder of innovation"
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
      console.log(data[0]);
      let word = data[0];
      if (word.includes(" ")) {
        word = word.replace(" ", "-");
      }
      console.log(word);

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
          <div className="flex flex-wrap items-start justify-center w-full gap-4 py-4 pt-16 glass-box bg-sky-100/70 dark:bg-sky-700/70">
            <div className="absolute right-0 flex justify-between gap-2 px-1 transition duration-500 border-b-2 border-l-2 -top-0 rounded-bl-md border-t-bl rounded-tr-md bg-clear-bl2">
              <button
                data-tip
                data-for="random-all"
                className="flex items-center justify-center w-10 gap-4 p-2 px-2 m-1 text-white cursor-pointer rounded-3xl bg-t-bl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
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
                  id="copy"
                  w=" !w-[15em]"
                  place="left"
                />
              </button>

              <button
                data-tip
                data-for="edit"
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
                      className="w-[6em] h-[1.3em] rounded-xl p-2 right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-bd5 md:hover:shadow-xl m-1 drop-shadow-xl !bg-blues-100 ring-2 !shadow-2xl gap-2 ring-t-bl dark:!bg-blues-500"
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
            <p className="absolute top-0 text-lg left-2 text-t-bl dark:text-t-bl">
              Idea Inspiration
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

export default InspirationStatement;

const options = [
  {
    value: "popular",
    label: "⭐️ Popular",
    children: [
      {
        value: "New products",
        label: "New products",
      },
      {
        value: "Incremental Improvements",
        label: "Incremental Improvements",
        children: [
          {
            value: "How would Elon Musk Change social media to fight spam?",
            label: "How would Elon Musk change social media to fight spam?",
          },
          {
            value: "How might we improve tech brainstorming for entrepreneurs?",
            label: "How might we improve tech brainstorming for entrepreneurs?",
          },
        ],
      },
      {
        value: "blockchain",
        label: "Disruption ?'s",
        children: [
          {
            value: "nft",
            label: "🖼 NFT",
          },
          {
            value: "consensus",
            label:
              "How might we improve SAAS with encryption to protect privacy?",
          },
        ],
      },
    ],
  },
  {
    value: "Problem Discovery ?'s",
    label: "🔎 Problem Discovery ?'s",
    children: [
      {
        value: "all",
        label: "All Industries",
        children: [
          {
            value: "all",
            label: "💼 All Industries",
          },
        ],
      },
    ],
  },
  {
    value: "Incremental Improvement ?'s",
    label: "⬆️ Incremental Improvement ?'s",
    children: [
      {
        value: "all",
        label: "All Industries",
        children: [
          {
            value: "all",
            label: "💼 All Industries",
          },
        ],
      },
    ],
  },
  {
    value: "🦄 Unicorn Maker ?'s",
    label: "🦄 Unicorn Maker ?'s",
    children: [
      {
        value: "all",
        label: "All Industries",
        children: [
          {
            value: "all",
            label: "💼 All Industries",
          },
        ],
      },
    ],
  },
  {
    value: "Big Picture ?'s",
    label: "🌍 Big Picture ?'s",
    children: [
      {
        value: "all",
        label: "All Industries",
        children: [
          {
            value: "all",
            label: "💼 All Industries",
          },
        ],
      },
    ],
  },
  {
    value: " Systems Thinking",
    label: "⚙️ Systems Thinking ?'s",
    children: [
      {
        value: "all",
        label: "All Industries",
        children: [
          {
            value: "all",
            label: "💼 All Industries",
          },
        ],
      },
    ],
  },
];
