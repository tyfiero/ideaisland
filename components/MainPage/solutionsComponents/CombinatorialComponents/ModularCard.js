
import { React, useEffect, useState, useRef } from "react";
import { Cascader } from "antd";
import "antd/dist/antd.css";
import { FaArrowLeft, FaArrowRight, FaCheck, FaChevronDown, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import {
  verbOptions,
  introOptions,
  nounOptions,
  outcomeOptions,
} from "./ListData";
// import ToolTip from "../../../../components/Layout/ToolTip";

// import useKeyboardShortcut from 'use-keyboard-shortcut'
import useKeyboardShortcut from "../../../../lib/useKeyboardShortcut";
import { BsDice3 } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { randomizeAction, sArrayAction } from "../../../../redux/actions";
import { TiLockClosedOutline, TiLockOpenOutline } from "react-icons/ti";

function ModularCard({
  id,
  card,
  variant,
  text,
  listProp,
  deleteSegment,
  updateSegment,
  swapPositions,
}) {
  // console.log(variant + " " + id + " " + card + " " + text + " " + listProp);
  const sArray = useSelector((state) => state.sArray);
  const isRandomized = useSelector((state) => state.randomize);
  const dispatch = useDispatch();

  // console.log(id)
  const [type, setType] = useState(variant);
  const [typeChanged, setTypeChanged] = useState(false);
  const [randomized, setRandomized] = useState(false);
  const [locked, setLocked] = useState(false);



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

  //Use efffect to focus text input on click
  useEffect(() => {
    if (contentEdit) {
      focusTextInput.current.focus();
    }
  }, [contentEdit]);
  // console.log(content);


  //randomize button function
  useEffect(() => {
    if(randomized || (isRandomized && !locked)){
  console.log(listOptions)
  console.log(list)
  
  try{
    let listContent, randomNumber;
    //find the index of the list header
 let index = listOptions.findIndex(x => x.label === list)
 console.log(index)


 //If the index is -1, (not found) then search again
 if(index === -1){
 console.log("not found 1")

//TEST SANDBOX
// let asdf = listOptions[0].children.findIndex(x => x.label === list)
// console.log(asdf);
// let asdfff = listOptions[1].children.findIndex(x => x.label === list)
// console.log(asdfff);

//END SANDBOX
  
  let index2 = listOptions[0].children.findIndex(x => x.label === list)

  //if listOptions[0] is not found, then search listOptions[1]
  if(index2 === -1){
    console.log("not found 2")


    let index3 = listOptions[1].children.findIndex(x => x.label === list)
    listContent = listOptions[1].children[index3].children
  }else{
   listContent = listOptions[0].children[index2].children

  }
//  console.log(index2)
//  console.log(listContent)
//  console.log(listOptions[0].children[index2].children)

 randomNumber = Math.floor(Math.random() * listContent.length -1); 
 }else{
   //Index was found, so use that. WORKS
 listContent = listOptions[index].children
randomNumber = Math.floor(Math.random() * listContent.length -1);
 }
 console.log(listContent.length)

console.log(item);

//Item is the word associated with the random index of the listContent
let item = listContent[randomNumber].label;

//If the random item is the same as the current item, then use the next item. Prevents duplicates
if (item === content) {
      item = listContent[randomNumber + 1].label;
    }
setContent(item)
  }catch (error){
    console.error(error)
  }

  if(randomized){
   setRandomized(false)}
  }
   if(isRandomized){
    dispatch(randomizeAction(false));
  }
  }, [randomized, isRandomized]);

  
//use effect that sets type and runs when the id or variant changes
  useEffect(() => {
    setType(variant);
    setTypeChanged(true);
  }, [id, variant]);





  //the big meaty useEffect that sets colors and content after a type switch or template load. It is curently buggy and overwrites content from template
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
      setList(verbOptions[0].label);
      setListOptions(verbOptions);
      if (typeChanged) {
        let newArray = sArray;
        newArray[card] = {
          id: id,
          type: type,
          list: verbOptions[0].label,
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
      setLocked(true)
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


  //Function that is run after cascade option picked
  function onCascadeChange(value, label) {
    console.log(value);
    console.log(label);

    setContent(value[1]);
    if (type === "Intro") {
      setList(label[0].label);
    } else if (type === "Noun") {
      //thisll be a tricky one
      if (value.length > 2) {
        setList(label[1].label);
        setContent(value[2]);
      } else {
        setList(label[0].label);
      }
    } else if (type === "Verb") {
      setList(label[0].label);
    } else if (type === "Desired Outcome") {
      setList(label[0].label);
    } else {
      if (value.length > 2) {
        setList(label[2].label);
      } else {
        setList(label[1].label);
      }
    }
  }
  //function to change the type
  function onTypeChange(value, label) {
    setTypeChanged(true);
    setType(value[0]);
  }

  // Just show the latest item. in list display
  function displayRender(label) {
    return label[label.length - 1];
  }
  return (
    <div className={"h-[17em] w-fit  rounded-xl  p-2 nun  group  " + colorClass}>
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

          <div className="relative flex flex-col items-center w-full">
          <div className="flex gap-1 transition duration-500 opacity-0 justify-evenly group-hover:opacity-100">
      
             {!locked && <button
                data-tip
                data-for="random1"
                className={"flex items-center justify-center gap-4 p-2 text-white  rounded-3xl bg-slate-100/70 drop-shadow-xl  md:transition-transform  md:hover:scale-105 md:active:scale-95 cursor-pointer fade-effect-quick"}
                onClick={() => {
                  
                  if(!locked){
                    
                  setRandomized(!randomized)
                  }
                  }}
              >
                <BsDice3 className={"text-lg" + textColor} />
                {/* <ToolTip text="Randomize segment" id="random1" w="10" /> */}
              </button>}
              <button
                data-tip
                data-for="trash"
                className={"flex items-center justify-center gap-4 p-2 text-white cursor-pointer rounded-3xl  drop-shadow-xl bg-slate-100/70 md:hover:scale-105 md:transition-transform md:active:scale-95 " + (locked ? ("ring-2 bg-slate-300/70 " + ringColor) : "bg-slate-100/70")}
                onClick={() => setLocked(!locked)}
              >
               {locked ? <TiLockClosedOutline className={"text-lg scale-125" + textColor} /> :
                <TiLockOpenOutline className={"text-lg scale-125" + textColor} /> }
                

                
                {/* <ToolTip text="Delete" id="trash" w="6" /> */}
              </button>
              {!locked &&  <button
                data-tip
                data-for="trash"
                className="flex items-center justify-center gap-4 p-2 text-white cursor-pointer rounded-3xl bg-slate-100/70 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick "
                onClick={() => deleteSegment(id)}
              >
                <FiTrash2 className={"text-lg" + textColor} />
                {/* <ToolTip text="Delete" id="trash" w="6" /> */}
              </button>}
            
              
            </div>
            <div className="">
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
                      "flex items-center justify-between gap-2 px-2 py-1 md:hover:ring-2  w-fit rounded-xl  md:hover:bg-white/50  " +
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
            {card !== 0 &&   <button
              
                className="absolute left-0 flex items-center justify-center cursor-pointer -bottom-2 md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => {

                  swapPositions(sArray, card, card - 1)
                    

                }}
              >
                <FaLongArrowAltLeft className={"text-2xl" + textColor} />
                {/* <ToolTip text="Delete" id="trash" w="6" /> */}
              </button>}
            {card !== sArray?.length -1 &&     <button
             
             className="absolute right-0 flex items-center justify-center cursor-pointer -bottom-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
             onClick={() => swapPositions(sArray, card, card + 1)}
           >
             <FaLongArrowAltRight className={"text-2xl" + textColor} />
             {/* <ToolTip text="Delete" id="trash" w="6" /> */}
           </button>}
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
