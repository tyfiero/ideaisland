import { React, useState, useEffect } from "react";
import {
  FaDice,
  FaEdit,
  FaEquals,
  FaExpandAlt,
  FaLightbulb,
  FaLongArrowAltRight,
  FaPlus,
  FaRandom,
  FaRobot,
  FaTimes,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/MainPage/solutionsComponents/CombinatorialComponents/Card";
import GPTtool from "../../components/MainPage/solutionsComponents/AI/GPT3";
import { randomizeAction, sArrayAction } from "../../redux/actions";
import IdeaNote from "../../components/MainPage/NoteBubble/Idea";
import RandomPics from "../../components/MainPage/solutionsComponents/CombinatorialComponents/RandomPics";
import TemplateBar from "../../components/MainPage/solutionsComponents/CombinatorialComponents/TemplateBar";
import ModularCard from "../../components/MainPage/solutionsComponents/CombinatorialComponents/ModularCard";
import { useHotkeys } from "react-hotkeys-hook";
import { GlobalHotKeys } from "react-hotkeys";
import useKeyboardShortcut from "../../lib/useKeyboardShortcut";
import { useRouter } from "next/router";
import SentenceTool from "../../components/MainPage/solutionsComponents/sentenceTool";
import { BsDice3 } from "react-icons/bs";
import { TiLockClosedOutline, TiLockOpenOutline } from "react-icons/ti";
import WordButton from "../../components/MainPage/solutionsComponents/CombinatorialComponents/WordButton";
import ProblemStatement from "../../components/MainPage/solutionsComponents/CombinatorialComponents/ProblemStatement";



const CombinatorialPage = (props) => {
  const router = useRouter();
  // console.log("RERENDER");
  const isRandomized = useSelector((state) => state.randomize);
  const sArray = useSelector((state) => state.sArray);

  const [update, setUpdate] = useState(false);
  // const [counter, setCounter] = useState(false);
  // console.log(sArray);

  const dispatch = useDispatch();
  const [inputList, setInputList] = useState([
    { id: 0, type: "Intro", list: "How", text: "How might we" },
    { id: 1, type: "Verb", list: "Modifier", text: "improve" },
    { id: 2, type: "Noun", list: "Software", text: "tech" },
    { id: 3, type: "Verb", list: "Action", text: "brainstorming" },
    {
      id: 4,
      type: "Desired Outcome",
      list: "People",
      text: "for entrepreneurs?",
    },
  ]);

  const [cardNum, setCardNum] = useState(0);
  const [aiOpen, setAiOpen] = useState(true);




  const [randomImageOpen, setRandomImageOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(true);
  useHotkeys("ctrl+n", (e) => {
    setNotesOpen(!notesOpen);
    console.log(e);
  });

  const noteHandler = () => {
    if (notesOpen) {
      setNotesOpen(true);
      console.log("notesopen");
    } else {
      setNotesOpen(false);
      console.log("NAH");
    }
  };
  const keyMap = {
    NOTES: "space",
  };
  const handlers = {
    NOTES: noteHandler,
  };

// useEffect(() => {
 
//   setSplitTextArray(['How', 'might', 'we', '10X', 'brainstorming', 'for', 'tech', 'companies?'])
// }, [])


 
  // const [card0Word, setCard0Word] = useState("");
  // const [card1Word, setCard1Word] = useState("Efficiency");
  // const [card2Word, setCard2Word] = useState("Virtual Reality");

  // let card0Word = "Innovation";
  // let card1Word = "Efficiency";
  // let card2Word = "Virtual Reality";

  // const sendDataToPage0 = (index) => {
  //   // the callback. Use a better name

  //   // if (index[1] === 0) {
  //   //   setCard0Word(index[0])
  //   // } else if (index[1] === 1) {
  //   //   setCard1Word(index[0])
  //   // } else if (index[1] === 2) {
  //   //   setCard2Word(index[0]);
  //   // }
  //   console.log(index);

  //   setCard0Word(index[0]);
  //   console.log(index);
  // };
  // const sendDataToPage1 = (index) => {
  //   setCard0Word(index[0]);
  //   console.log(index);
  // };
  // const sendDataToPage2 = (index) => {
  //   setCard0Word(index[0]);
  //   console.log(index);
  // };

  // console.log(card0Word, card1Word, card2Word);

  const swapPositions = (array, a, b) => {

    [array[a], array[b]] = [array[b], array[a]]

    dispatch(sArrayAction(array));
setUpdate(!update);
  }

  
  const randomizeAll = (event) => {
    dispatch(randomizeAction(true));
  };

  const onAddBtnClick = (event) => {
    let newArray = sArray;
    var highestId = Math.max.apply(
      Math,
      newArray.map(function (data) {
        return data.id;
      })
    );
    console.log(highestId);
    let nextId = highestId + 1;

    newArray.push({ id: nextId, type: "Blank", list: "", text: "" });
    console.log(newArray);
    dispatch(sArrayAction(newArray));

    setUpdate(!update);
  };

  const deleteSegment = (id) => {
    let newArray = sArray;
    console.log(id);
    console.log("before");
    console.log(newArray);

    for (var i = newArray.length - 1; i >= 0; i--) {
      if (newArray[i].id === id) {
        console.log(newArray[i]);
        newArray.splice(i, 1);
      }
    }
    dispatch(sArrayAction(newArray));
    setUpdate(!update);
    console.log("after");
    console.log(newArray);
  };

  const updateSegment = (data) => {
    //     let newArray = inputList;
    // console.log(newArray);
    //     for (var i = newArray.length - 1; i >= 0; i--) {
    //       if (newArray[i].id === data.id) {
    //         console.log(newArray[i]);
    //         newArray[i] = data;
    //         console.log(newArray[i]);
    //       }
    //     }
    //     setInputList(newArray);
    //     setUpdate(!update);
  };

  // console.log(selectedWords)
 
  return (
    <div>
      
    </div>
  );
};

export default CombinatorialPage;


