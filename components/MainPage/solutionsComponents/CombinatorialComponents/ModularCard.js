
import { React, useEffect, useState, useRef } from "react";
import { Cascader } from "antd";
import "antd/dist/antd.css";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import {
  verbOptions,
  introOptions,
  nounOptions,
  outcomeOptions,
} from "./ListData";
import ToolTip from "../../../../components/Layout/ToolTip";

// import useKeyboardShortcut from 'use-keyboard-shortcut'
import useKeyboardShortcut from "../../../../lib/useKeyboardShortcut";
import { BsDice3 } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { sArrayAction } from "../../../../redux/actions";

function ModularCard({
  id,
  card,
  variant,
  text,
  listProp,
  deleteSegment,
  updateSegment,
}) {
  // console.log(variant + " " + id + " " + card + " " + text + " " + listProp);
  const sArray = useSelector((state) => state.sArray);
  const dispatch = useDispatch();

  // console.log(id)
  const [type, setType] = useState(variant);
  const [typeChanged, setTypeChanged] = useState(false);

  const [list, setList] = useState(listProp);
  const [listOptions, setListOptions] = useState(introOptions);

  const [content, setContent] = useState(text);
  const [contentEdit, setContentEdit] = useState(false);

  const [ringColor, setRingColor] = useState(" ring-blues-600");
  const [textColor, setTextColor] = useState(" text-blues-600");
  const [colorClass, setColorClass] = useState(" blue-card");
  const focusTextInput = useRef(null);

  const { flushHeldKeys } = useKeyboardShortcut(
    ["Enter"],
    (shortcutKeys) => {
      if (contentEdit) {
        setContentEdit(false);
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  );
  useEffect(() => {
    if (contentEdit) {
      focusTextInput.current.focus();
    }
  }, [contentEdit]);
  // console.log(content);

  useEffect(() => {
    setType(variant);
    setTypeChanged(true);
  }, [id, variant]);

  useEffect(() => {
    // if(typeChanged){
    // console.log(variant +" variant")
    // console.log(type + " type")

    if (type === "Intro") {
      // console.log("Intro UE RAN")

      setRingColor(" ring-blue-600");
      setTextColor(" text-blue-600");
      setColorClass(" blue-card");
      setListOptions(introOptions);
      setList(introOptions[1].label);
      if (typeChanged) {
        let newArray = sArray;
        newArray[card] = {
          id: id,
          type: type,
          list: introOptions[1].label,
          text: "How might we",
        };
        dispatch(sArrayAction(newArray));
        setContent("How might we");
      }
    } else if (type === "Noun") {
      // console.log("Noun UE RAN")

      setRingColor(" ring-green-600");
      setTextColor(" text-green-600");
      setColorClass(" green-card");
      setListOptions(nounOptions);
      setList(nounOptions[0].label);
      if (typeChanged) {
        // console.log(type + " " + list + " " + content + " " + text);
        // updateSegment({ id: id, type: type, list: list, text: content });
        // console.log(sArray)
        let newArray = sArray;
        //  console.log(newArray[card])

        newArray[card] = {
          id: id,
          type: type,
          list: nounOptions[0].label,
          text: "noun",
        };
        //  console.log(newArray[card])

        dispatch(sArrayAction(newArray));
        // console.log(sArray)
        setContent("noun");
      }
    } else if (type === "Verb") {
      // console.log("Verb")

      setRingColor(" ring-pink-600");
      setTextColor(" text-pink-600");
      setColorClass(" pink-card");
      setList(verbOptions[1].label);
      setListOptions(verbOptions);
      if (typeChanged) {
        let newArray = sArray;
        newArray[card] = {
          id: id,
          type: type,
          list: verbOptions[1].label,
          text: "verb",
        };
        dispatch(sArrayAction(newArray));
        console.log(sArray);
        setContent("verb");
      }
    } else if (type === "Desired Outcome") {
      // console.log("Outcome UE RAN")

      setRingColor(" ring-orange-600");
      setTextColor(" text-orange-700");
      setColorClass(" orange-card");
      setListOptions(outcomeOptions);
      setList(outcomeOptions[1].label);
      if (typeChanged) {
        let newArray = sArray;
        newArray[card] = {
          id: id,
          type: type,
          list: outcomeOptions[1].label,
          text: "for entrepreneurs?",
        };
        dispatch(sArrayAction(newArray));
        setContent("for entrepreneurs?");
      }
    } else {
      // console.log("Blank UE RAN")

      setRingColor(" ring-slate-600");
      setTextColor(" text-slate-700");
      setColorClass(" blank-card");
      setType("Blank");
    }

    setTypeChanged(false);
  }, [type, id]);

  function onCascadeChange(value, label) {
    console.log(value);
    console.log(label);

    setContent(value[1]);
    if (type === "Intro") {
      setList(value[0]);
    } else if (type === "Noun") {
      //thisll be a tricky one
    } else if (type === "Modifier Verb" || type === "Action Verb") {
      setList(value[0]);
    } else if (type === "Desired Outcome") {
      setList(value[0]);
    } else {
      if (value.length > 2) {
        setList(label[2].label);
      } else {
        setList(label[1].label);
      }
    }
  }
  function onTypeChange(value, label) {
    setTypeChanged(true);
    setType(value[0]);
  }

  // Just show the latest item.k
  function displayRender(label) {
    return label[label.length - 1];
  }
  return (
    <div className={"h-[17em] w-fit  rounded-xl  p-2 nun  " + colorClass}>
      {type === "Blank" ? (
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <p>Select Segment</p>
          <button
            className=" w-[8em] h-[2em] mt-1 rounded-3xl bg-blue-400 flex items-center justify-center text-black gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
            onClick={() => {
              setType("Intro");
              setTypeChanged(true);
            }}
          >
            Intro
          </button>
          <button
            className=" w-[8em] h-[2em] mt-1 rounded-3xl bg-pink-400 flex items-center justify-center text-black gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
            onClick={() => {
              setType("Verb");
              setTypeChanged(true);
            }}
          >
            Verb
          </button>
          <button
            className=" w-[8em] h-[2em] mt-1 rounded-3xl bg-green-400 flex items-center justify-center text-black gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
            onClick={() => {
              setType("Noun");
              setTypeChanged(true);
            }}
          >
            Noun
          </button>
          <button
            className=" w-[8em] h-[2em] mt-1 rounded-3xl bg-orange-400 flex items-center justify-center text-black gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
            onClick={() => {
              setType("Desired Outcome");
              setTypeChanged(true);
            }}
          >
            Outcome
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between h-full">
          <div>
            <Cascader
              // style={{ borderRadius: "59px" }}
              options={listOptions}
              expandTrigger="hover"
              displayRender={displayRender}
              onChange={onCascadeChange}
              style={{ zIndex: 8 }}
              placement="bottomLeft"
            >
              <a href="#" className="">
                <div
                  className={
                    "flex items-center justify-between gap-2 px-2 py-1 ring-2 ring-blues-600 w-fit rounded-xl text-blues-600 bg-white/50" +
                    textColor +
                    ringColor
                  }
                >
                  <p className="">{list}</p>
                  <FaChevronDown />
                </div>
              </a>
            </Cascader>
          </div>

          {contentEdit ? (
            <>
              <div>
                <div className="normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] !rounded-xl w-full flex flex-col items-center">
                  <input
                    className="w-[94%] textarea-box  textarea-tw  "
                    value={content}
                    ref={focusTextInput}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    placeholder={content}
                  />
                  <button
                    className=" w-[90%] h-[2em] mt-1 rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
                    onClick={() => {
                      setContentEdit(false);
                    }}
                  >
                    Done <FaCheck />
                  </button>
                </div>
                <p className="text-xs">Note: This will not save.</p>
              </div>
            </>
          ) : (
            <>
              <div
                className="normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] !rounded-xl w-full"
                onClick={() => {
                  setContentEdit(true);
                }}
              >
                <p
                  className={
                    "text-xl select-none " + (card > 0 ? " lowercase" : "")
                  }
                >
                  {content}
                </p>
              </div>
            </>
          )}
          <p className="">id:{id}</p>

          <p className="">card:{card}</p>

          <div className="">
            <div className="group">
              <Cascader
                // style={{ borderRadius: "59px" }}
                options={typeOptions}
                expandTrigger="hover"
                displayRender={displayRender}
                onChange={onTypeChange}
                style={{ zIndex: 8 }}
                placement="bottomLeft"
              >
                <a href="#" className="">
                  <div
                    className={
                      "flex items-center justify-between gap-2 px-2 py-1 md:hover:ring-2  w-fit rounded-xl  md:hover:bg-white/50 group " +
                      textColor +
                      ringColor
                    }
                  >
                    <p className={"text-lg" + textColor}>{type}</p>
                    <FaChevronDown className="text-sm " />
                  </div>
                </a>
              </Cascader>
            </div>
            <div className="flex justify-evenly">
              <button
                data-tip
                data-for="random1"
                className="flex items-center justify-center gap-4 p-2 text-white cursor-pointer rounded-3xl bg-slate-100/70 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 "
                // onClick={randomizeAll}
              >
                <BsDice3 className={"text-lg" + textColor} />
                <ToolTip text="Randomize segment" id="random1" w="10" />
              </button>
              <button
                data-tip
                data-for="trash"
                className="flex items-center justify-center gap-4 p-2 text-white cursor-pointer rounded-3xl bg-slate-100/70 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 "
                onClick={() => deleteSegment(id)}
              >
                <FiTrash2 className={"text-lg" + textColor} />
                <ToolTip text="Delete" id="trash" w="6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModularCard;
const typeOptions = [
  {
    value: "Intro",
    label: "🔵 Intro",
  },
  {
    value: "Noun",
    label: "🟢 Noun",
  },
  {
    value: "Verb",
    label: "🔴 Verb",
  },
  {
    value: "Desired Outcome",
    label: "🟠 Desired Outcome",
  },
];
