import { React, useState, useEffect } from "react";
import { BsDice3 } from "react-icons/bs";
import { FaChevronDown, FaEdit, FaListUl, FaTimes } from "react-icons/fa";
import { TiLockClosedOutline, TiLockOpenOutline } from "react-icons/ti";
import { Cascader } from "antd";
import "antd/dist/antd.css";
import {
  verbOptions,
  introOptions,
  nounOptions,
  outcomeOptions,
} from "./ListData";
import { useSelector, useDispatch } from "react-redux";
import { randomizeAction, sArrayAction } from "../../../../redux/actions";
import Image from "next/image";
import { MdOutlineHideImage, MdOutlineImage } from "react-icons/md";
import CardImage from "./CardImage";
import WordsCard from "./WordsCard";

// import ToolTip from "../../../Layout/ToolTip";
function WordButton({
  text,
  word,
  updateSelected,
  selectedWords,
  update,
}) {
  const isRandomized = useSelector((state) => state.randomize);
  const [clicked, setClicked] = useState(false);
  const [locked, setLocked] = useState(false);

  const [randomized, setRandomized] = useState(false);

  const [ringColor, setRingColor] = useState(" ring-blues-600");
  const [listOptions, setListOptions] = useState(nounOptions);
  const [displayText, setDisplayText] = useState(text);
  const [textColor, setTextColor] = useState(
    " underline decoration-t-bl text-blues-200 "
  );
  const [list, setList] = useState("💻 Hardware");
  const dispatch = useDispatch();
  const [showImage, setShowImage] = useState(false);
  const [showSimWords, setShowSimWords] = useState(false);

  
  useEffect(() => {
    console.log(selectedWords)
    if (clicked) {
      let search = selectedWords?.findIndex((x) => x === displayText);
console.log(search)
      if (search === 0) {
        setTextColor(" underline decoration-t-bl text-blues-300 ");
      } else if (search === 1) {
        setTextColor(" underline decoration-t-pm text-pinks-300 ");
      } else if (search === 2) {
        setTextColor(" underline decoration-green-500 text-green-400 ");
      } else if (search === 3) {
        setTextColor(" underline decoration-orange-500 text-orange-400 ");
      } else if (search === 4) {
        setTextColor(" underline decoration-yellow-500 text-yellow-400 ");
      } else {
        setTextColor(" underline decoration-t-bl text-blues-300 ");
      }
    }
  }, [clicked]);

  //randomize button function
  useEffect(() => {
    if ((randomized && clicked) || (isRandomized && !locked && clicked)) {
      // console.log(listOptions)
      // console.log(list)
      try {
        let listContent, randomNumber;
        //find the index of the list header
        let index = listOptions.findIndex((x) => x.label === list);
        //If the index is -1, (not found) then search again
        if (index === -1) {
          //  console.log("not found 1")
          let index2 = listOptions[0].children.findIndex(
            (x) => x.label === list
          );
          //if listOptions[0] is not found, then search listOptions[1]
          if (index2 === -1) {
            // console.log("not found 2")
            let index3 = listOptions[1].children.findIndex(
              (x) => x.label === list
            );
            listContent = listOptions[1].children[index3].children;
          } else {
            listContent = listOptions[0].children[index2].children;
          }
          randomNumber = Math.floor(Math.random() * (listContent.length - 1));
        } else {
          //Index was found, so use that. WORKS
          listContent = listOptions[index].children;
          randomNumber = Math.floor(Math.random() * (listContent.length - 1));
        }
        //Item is the word associated with the random index of the listContent
        let item = listContent[randomNumber].label;
        //If the random item is the same as the current item, then use the next item. Prevents duplicates
        if (item === displayText) {
          item = listContent[randomNumber + 1].label;
        }
        // setContent(item)
        setDisplayText(item);
        // let newArray = sArray;
        //   newArray[card] = {
        //     id: id,
        //     type: type,
        //     list: list,
        //     text: item,
        //   };
        //   dispatch(sArrayAction(newArray));
      } catch (error) {
        console.error(error);
      }

      if (randomized) {
        setRandomized(false);
      }
    }
    if (isRandomized) {
      dispatch(randomizeAction(false));
    }
  }, [randomized, isRandomized]); // eslint-disable-line react-hooks/exhaustive-deps

  //Function that is run after cascade option picked
  function onCascadeChange(value, label) {
    console.log(value);
    console.log(label);
    setDisplayText(value[2]);
    setList(label[1].label);

    //     setContent(value[1]);
    //     if (type === "Intro") {
    //       setList(label[0].label);
    //     } else if (type === "Noun") {
    //       //thisll be a tricky one
    //       if (value.length > 2) {
    //         setList(label[1].label);
    //         // setContent(value[2]);
    //       } else {
    //         setList(label[0].label);
    //       }
    //     } else if (type === "Verb") {
    //       setList(label[0].label);
    //     } else if (type === "Desired Outcome") {
    //       setList(label[0].label);
    //     } else {
    //       if (value.length > 2) {
    //         setList(label[2].label);
    //       } else {
    //         setList(label[1].label);
    //       }
    //     }

    //     //This code is meant to determine what content to display based off of what is selected in the tree
    // let textValueFromCascade;
    // if(value.length > 2){
    // textValueFromCascade = value[2]
    // }else if(value.length > 1){
    // textValueFromCascade = value[1]
    // }else{
    // textValueFromCascade = value[0]
    // }

    //     let newArray = sArray;
    //   newArray[card] = {
    //     id: id,
    //     type: type,
    //     list: list,
    //     text: textValueFromCascade,
    //   };
    //   dispatch(sArrayAction(newArray));
  }
 
  // Just show the latest item. in list display
  function displayRender(label) {
    return label[label.length - 1];
  }
  return (
    <div
      className={
        "flex flex-col items-center gap-4 select-none   " 
      }
    >

    </div>
  );
}

export default WordButton;
