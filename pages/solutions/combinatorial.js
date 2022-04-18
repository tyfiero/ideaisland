import { React, useState, useEffect } from "react";
import {
  FaDice,
  FaEquals,
  FaLightbulb,
  FaLongArrowAltRight,
  FaPlus,
  FaRandom,
  FaRobot,
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

  return (
    <div>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />

      <div className="relative card-container fade-effect-quick">
        {/* div that holds all the cards, note the img prop where the url lives, as well as the array thats passed in to Card.js as a prop */}
        <h1 className="text-3xl text-t-bd dark:text-blues-100">
          Combinatorial Tool
        </h1>
        <div >
          {" "}

          <div className="absolute top-2 right-2">
          <div className="relative group">
            <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
            <button
              className="w-[5em] h-[2.5em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
              onClick={() =>router.push("/solutions#select-idea")}
            >
              Next
              <FaLongArrowAltRight className="ml-1 text-[24px]" />
            </button>
          </div>
          </div>
        </div>
        <div
          className="flex flex-col items-center w-full"
         
        >
          <p  className="text-left">
            Template:
          </p>
          <TemplateBar />
         
        </div>

        <div className="w-[98%] rounded-xl cards ring-2 p-5 mt-5 relative">
          <div className="flex w-[40em] p-2 gap-2 items-center justify-evenly text-center normal-box-soft absolute top-0 right-0">
            <button
              className={
                "w-[9em] h-[2em] rounded-3xl  flex items-center justify-between px-4 text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
                (aiOpen
                  ? " bg-clear-pm4 shadow-lg shadow-clear-pm4 ring-4 ring-pinks-700"
                  : " bg-pinks-100 shadow-inner")
              }
              onClick={() => setAiOpen(!aiOpen)}
            >
              <FaRobot
                className={
                  "text-[18px] " + (aiOpen ? "text-white" : "text-pinks-600")
                }
              />

              <p
                className={
                  "mr-1  mb-0 " +
                  (aiOpen
                    ? "text-white text-[18px]"
                    : "text-pinks-600 text-[18px]")
                }
              >
                AI Tool
              </p>
            </button>
            <button
              className={
                "w-[12em] h-[2em] rounded-3xl  flex items-center justify-between px-3 text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
                (notesOpen
                  ? " bg-clear-bl4 shadow-lg shadow-clear-bl3 ring-4 ring-blues-600"
                  : " bg-blues-200 shadow-inner")
              }
              onClick={() => setNotesOpen(!notesOpen)}
            >
              <FaLightbulb
                className={
                  "text-[18px] " + (notesOpen ? "text-white" : "text-blues-700")
                }
              />

              <p
                className={
                  "mr-1 mb-0 " +
                  (notesOpen
                    ? "text-white text-[18px]"
                    : "text-blues-700 text-[18px]")
                }
              >
                Idea Notepad
              </p>
            </button>
            <button
              className={
                "w-[12em] h-[2em] rounded-3xl  flex items-center justify-between px-3 text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
                (randomImageOpen
                  ? " bg-green-400/70 shadow-lg shadow-green-300/60 ring-4 ring-green-600"
                  : " bg-green-200 shadow-inner")
              }
              onClick={() => setRandomImageOpen(!randomImageOpen)}
            >
              <FaRandom
                className={
                  "text-[18px] " +
                  (randomImageOpen ? "text-white" : "text-green-600")
                }
              />

              <p
                className={
                  "mr-1 mb-0 " +
                  (randomImageOpen
                    ? "text-white text-[18px]"
                    : "text-green-600 text-[18px]")
                }
              >
                Random Cues
              </p>
            </button>
          </div>
          <div className="relative flex flex-col items-center w-full mt-5">
            <div className="max-w-[98%] rounded-xl cards  p-5 mt-5 relative group glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   !border-4 !border-t-bl">
              <div className="absolute top-0 right-0 flex justify-between gap-2 px-3 py-1 transition duration-500 border-b-2 border-l-2 opacity-0 rounded-bl-md border-t-bl group-hover:opacity-100 bg-clear-bl2">
                <button
              
                  className="flex items-center justify-center gap-4 p-2 text-white cursor-pointer rounded-3xl bg-t-pd drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 "
                  onClick={randomizeAll}
                >
                  <FaDice className="text-2xl" />
                 
                </button>
                <button
            
                  className="flex items-center justify-center gap-4 p-2 text-white cursor-pointer rounded-3xl bg-t-bl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                  onClick={onAddBtnClick}
                >
                  <FaPlus className="text-2xl" />
                 
                </button>
              </div>
              <div className="flex flex-wrap gap-2 ">
                {/* <ModularCard card={cardNum} key={cardNum}/> */}
                {/* <Card cardNum="0" key="0" /> */}

                {/* {inputList[0] && (
                  <ModularCard
                    key={0}
                    card={0}
                    id={inputList[0].id}
                    variant={inputList[0].type}
                    text={inputList[0].text}
                    listProp={inputList[0].list}
                    deleteSegment={deleteSegment}
                  />
                )}

                {inputList[1] && (<ModularCard key={1} card={1} id={inputList[1].id}
                    variant={inputList[1].type}
                    text={inputList[1].text}
                    listProp={inputList[1].list}
                    deleteSegment={deleteSegment}/>)} */}
                {/* 
                {inputList[0]?.type}

                {inputList[1]?.type}
                {inputList[2]?.type}
                {inputList[3]?.type}
                {inputList[4]?.type} */}

                {/* {sArray.length + " list length"} */}

                {sArray.map((data, index) => {
                  return (
                    <ModularCard
                      key={index}
                      card={index}
                      id={data.id}
                      variant={data.type}
                      text={data.text}
                      listProp={data.list}
                      deleteSegment={deleteSegment}
                      updateSegment={updateSegment}
                      swapPositions={swapPositions}
                    />
                  );
                })}
              </div>
            </div>

            {randomImageOpen && (
              <div className="px-2 pb-5 glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   ring-4 ring-green-200 bg-t-bl/10 min-w-[42em] h-full !border-0 mb-5 bg-green-400/20">
                <p className="text-lg text-left text-green-600">Random Cues</p>
                <p className="text-sm text-left text-green-800">
                  For inspiration and lateral thinking
                </p>
                <RandomPics />
              </div>
            )}

            <div className="flex flex-wrap justify-center w-full h-full gap-10 mt-5">
              {aiOpen && (
                <div className="h-full px-5 py-2 ring-4 rounded-xl ring-t-pl bg-clear-pl3">
                  <p className="text-lg text-left text-t-pd">Innovation AI</p>
                  <GPTtool showButton={true}/>
                </div>
              )}
              {notesOpen && (
                <div className="px-2 pb-5 glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]   ring-4 ring-t-bl bg-clear-bl1 min-w-[42em] h-full !border-0 relative">
                  <p className="pb-2 text-lg text-left text-t-bl">
                    {" "}
                    Idea NotePad
                  </p>
                  <IdeaNote />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinatorialPage;
