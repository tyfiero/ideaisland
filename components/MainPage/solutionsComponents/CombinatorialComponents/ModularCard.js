import { React, useEffect, useState, useRef } from "react";
import { Cascader } from "antd";
import "antd/dist/antd.css";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import {
  options,
  verbOptions,
  introOptions,
  nounOptions,
  outcomeOptions,
} from "./ListData";

function ModularCard({ card }) {
  const [type, setType] = useState("Intro");
  const [list, setList] = useState("List");
  const [listOptions, setListOptions] = useState(options);

  const [content, setContent] = useState("How might we");
  const [contentEdit, setContentEdit] = useState(false);

  const [ringColor, setRingColor] = useState(" ring-blues-600");
  const [textColor, setTextColor] = useState(" text-blues-600");
  const [colorClass, setColorClass] = useState(" blue-card");
  const focusTextInput = useRef(null);

  console.log(card);
useEffect(() => {
    if(contentEdit){
        focusTextInput.current.focus()
    }
}, [contentEdit])
  useEffect(() => {
    if (type === "Intro") {
      setRingColor(" ring-blues-600");
      setTextColor(" text-blues-600");
      setColorClass(" blue-card");
      setListOptions(introOptions);
      setList(introOptions[1].label);
      setContent("How might we");
    } else if (type === "Noun") {
      setRingColor(" ring-green-600");
      setTextColor(" text-green-600");
      setColorClass(" green-card");
      setListOptions(nounOptions);
      setList(nounOptions[0].label);
      setContent("noun");
    } else if (type === "Modifier Verb" || type === "Action Verb") {
      setRingColor(" ring-pinks-600");
      setTextColor(" text-pinks-600");
      setColorClass(" pink-card");
      setListOptions(verbOptions);
    } else if (type === "Desired Outcome") {
      setRingColor(" ring-orange-600");
      setTextColor(" text-orange-700");
      setColorClass(" orange-card");
      setListOptions(outcomeOptions);
      setList(outcomeOptions[1].label);
      setContent("to increase revenue?");
    }
  }, [type]);

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
    setType(value[0]);
  }

  // Just show the latest item.
  function displayRender(label) {
    return label[label.length - 1];
  }
  return (
    <div className={"h-[20em] w-fit  rounded-xl  p-2 nun" + colorClass}>
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
            <div
              className="normal-box !rounded-xl w-full flex flex-col items-center"
            >
              <input
                className="w-[94%] textarea-box"
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
              className="normal-box !rounded-xl w-full"
              onClick={() => {setContentEdit(true)}}
            >
              <p className={"text-xl select-none " + (card > 0 ? " lowercase" : "")}>
                {content}
              </p>
            </div>
          </>
        )}
        {/* <p className="">{card}</p> */}

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
              </div>
            </a>
          </Cascader>
        </div>
      </div>
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
