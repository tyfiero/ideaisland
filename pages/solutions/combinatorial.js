import { React, useState, useEffect } from "react";
import { FaDice, FaLightbulb, FaPlus, FaRandom, FaRobot } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/MainPage/solutionsComponents/CombinatorialComponents/Card";
import GPTtool from "../../components/MainPage/solutionsComponents/AI/GPT3";
import { randomizeAction } from "../../redux/actions";
import IdeaNote from "../../components/MainPage/NoteBubble/Idea";
import RandomPics from "../../components/MainPage/solutionsComponents/CombinatorialComponents/RandomPics";
import TemplateBar from "../../components/MainPage/solutionsComponents/CombinatorialComponents/TemplateBar";
import ModularCard from "../../components/MainPage/solutionsComponents/CombinatorialComponents/ModularCard";
import { useHotkeys } from "react-hotkeys-hook";
import { GlobalHotKeys } from "react-hotkeys";
import useKeyboardShortcut from "../../lib/useKeyboardShortcut";
const CombinatorialPage = (props) => {
  const isRandomized = useSelector((state) => state.randomize);

  const dispatch = useDispatch();
  const [inputList, setInputList] = useState([]);
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
  const randomizeAll = (event) => {
    dispatch(randomizeAction(true));
  };

  //Load first sentence chunk on load
  useEffect(() => {
    setInputList(
      inputList.concat(<ModularCard card={cardNum} key={cardNum} />)
    );
  }, []);

  //Add a card on each click of add button
  const onAddBtnClick = (event) => {
    // let nextCard = cardNum++;

    let cardInc = cardNum + 1;
    setCardNum(cardInc);
    setInputList(
      inputList.concat(<ModularCard card={cardInc} key={cardInc} />)
    );
  };
  return (
    <div>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />

      <div className="card-container fade-effect-quick">
        {/* div that holds all the cards, note the img prop where the url lives, as well as the array thats passed in to Card.js as a prop */}
        <h1 className="heading-top">Combinatorial Tool</h1>
        <div className="flex flex-col items-center w-full">
          <p className="text-left">Template:</p>
          <TemplateBar />
        </div>
        <div className="w-[98%] rounded-xl cards ring-4 p-5 mt-5">
          <div className="w-[98%] rounded-xl cards  p-5 mt-5 relative group glass-box !border-4 !border-t-bl">
            <div className="absolute top-0 right-0 flex justify-between gap-2 px-3 py-1 transition duration-500 border-b-2 border-l-2 opacity-0 rounded-bl-md border-t-bl group-hover:opacity-100">
              <button
                className="flex items-center justify-center gap-4 p-2 text-white cursor-pointer rounded-3xl bg-t-pd drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
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
            <div className="flex flex-wrap gap-2">
              {/* <ModularCard card={cardNum} key={cardNum}/> */}
              {/* <Card cardNum="0" key="0" /> */}

              {inputList}
            </div>
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="flex w-[40em] p-2 gap-2 items-center justify-evenly text-center normal-box-soft mb-5 mt-2">
              <button
                className={
                  "w-[9em] h-[2em] rounded-3xl  flex items-center justify-between px-4 text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
                  (aiOpen
                    ? " bg-t-bl/70 shadow-lg shadow-t-bl/60 ring-4 ring-blues-500"
                    : " bg-blues-100 shadow-inner")
                }
                onClick={() => setAiOpen(!aiOpen)}
              >
                <FaRobot
                  className={
                    "text-[18px] " + (aiOpen ? "text-white" : "text-blue-600")
                  }
                />

                <p
                  className={
                    "mr-1  mb-0 " +
                    (aiOpen
                      ? "text-white text-[18px]"
                      : "text-blue-600 text-[18px]")
                  }
                >
                  AI Tool
                </p>
              </button>
              <button
                className={
                  "w-[12em] h-[2em] rounded-3xl  flex items-center justify-between px-3 text-white gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer " +
                  (notesOpen
                    ? " bg-pinks-400/70 shadow-lg shadow-pinks-300/60 ring-4 ring-pinks-700"
                    : " bg-pinks-200 shadow-inner")
                }
                onClick={() => setNotesOpen(!notesOpen)}
              >
                <FaLightbulb
                  className={
                    "text-[18px] " +
                    (notesOpen ? "text-white" : "text-pinks-700")
                  }
                />

                <p
                  className={
                    "mr-1 mb-0 " +
                    (notesOpen
                      ? "text-white text-[18px]"
                      : "text-pinks-700 text-[18px]")
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

            {randomImageOpen && (
              <div className="px-2 pb-5 glass-box ring-4 ring-green-200 bg-t-bl/10 min-w-[42em] h-full !border-0 mb-5 bg-green-400/20">
                <p className="text-lg text-left text-green-600">Random Cues</p>
                <p className="text-sm text-left text-green-800">
                  For inspiration and lateral thinking
                </p>
                <RandomPics />
              </div>
            )}

            <div className="flex flex-wrap justify-center w-full h-full gap-5">
              {notesOpen && (
                <div className="px-2 pb-5 glass-box ring-4 ring-t-bl bg-t-bl/10 min-w-[42em] h-full !border-0">
                  <p className="pb-2 text-lg text-left text-t-bl">
                    {" "}
                    Idea NotePad
                  </p>
                  <IdeaNote />
                </div>
              )}

              {aiOpen && (
                <div className="h-full px-5 py-2 ring-4 rounded-xl ring-t-pl bg-t-pl/40">
                  <p className="text-lg text-left text-t-pd">Innovation AI</p>
                  <GPTtool />
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
