import React, { useState, useCallback, memo, useEffect } from "react";
import Dropdown from "./Dropdown";
import { useSelector, useDispatch } from "react-redux";

import {
  listNum,
  listChanged,
  wordAction,
  allLists,
  randomizeAction,
} from "../../../../redux/actions";
import { connect } from "react-redux";
// import useFitText from "use-fit-text";
import { Squash as Hamburger } from "hamburger-react";
import styled from "styled-components";
// import ResizeObserver from "react-resize-observer";
import CardModal from "./CardModal";
import WordsCard from "./WordsCard";
import CardImage from "./CardImage";
import Toggle from "react-toggle";
import { FaEquals, FaImage } from "react-icons/fa";
// import Cascaderr from "./Cascader";

import { Cascader } from "antd";
import "antd/dist/antd.css";
//card.js global variables

var list;
var input;
// const { faker } = require("@faker-js/faker");

const CardStyle = styled.div`
  position: relative;

  padding: 1rem;
  /* height: 90% !important; */
  width: 20rem;
  overflow: hidden;
  box-shadow: 0 2px 30px #e1e5eebb;
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 200ms ease-in;
  text-align: center;
  background-color: #ffffff94;
  box-shadow: 9px 9px 17px #989898, -9px -9px 17px #ffffff;
`;
const options = [
  {
    value: "popular",
    label: "⭐️ Popular",
    children: [
      {
        value: "emoji",
        label: "😄 Emojis",
      },
      {
        value: "companies",
        label: "🏢 Companies",
        children: [
          {
            value: "fortune5",
            label: "Fortune 500",
          },
        ],
      },
      {
        value: "blockchain",
        label: "🔗 Blockchain",
        children: [
          {
            value: "nft",
            label: "🖼 NFT",
          },
          {
            value: "consensus",
            label: "🤝 Consensus mechanisms",
          },
        ],
      },
    ],
  },
  {
    value: "industries",
    label: "💼 Industries",
    children: [
      {
        value: "all",
        label: "All Industries",
        children: [
          {
            value: "all",
            label: "💼 All Industries",
          },
          {
            value: "tech",
            label: "💻 Tech",
          },
          {
            value: "food",
            label: "🍌 Food",
          },
        ],
      },
    ],
  },
];
function Card(props) {
  // console.log("======CARD RERENDERED=======");

  //redux
  const isRandomized = useSelector((state) => state.randomize);

  const dispatch = useDispatch();
  // const listRedux = useSelector((state) => state.list);
  // const listChangeRedux = useSelector((state) => state.listChanged);
  // const currentWord = useSelector((state) => state.word);
  const allWordLists = useSelector((state) => state.allListsContent);

  // const dispatch = useDispatch();

  //parent data transfer
  const [DDList, setDDList] = React.useState(0); // the lifted state
  const [DDListChanged, setDDListChanged] = React.useState(false); // the lifted state

  const [listContent, setListContent] = React.useState(allWordLists.industry); // the lifted state

  const sendDataToParent = (index) => {
    // console.log(index + "CHILD DATA");

    setDDList(index[0]);
    setDDListChanged(index[1]);
  };

  //set dropdown initial word
  let dropdownWord = 0;

  const [cardCurrentWord, setCardCurrentWord] = React.useState("innovation");
  useEffect(() => {
    if (isRandomized) {
      console.log("ITS BEEN RANDOMIZED");
      wordClickHandler();
      dispatch(randomizeAction(false));
    }
  }, [isRandomized]);
  //THIS useEffect runs once to set the initial state of the cards
  useEffect(() => {
    console.log("UE1");

    if (props.card === "0") {
      // list = allWordLists.industry;
      setListContent(allWordLists.industry);

      setDDList(0);

      dropdownWord = 0;
      // defaultWord = "Innovation";
      setCardCurrentWord("Innovation");
      // console.log(0 + "AHHHHHHHHH");
      // console.log(1 + list);
    } else if (props.card === "1") {
      // list = allWordLists.idZone;
      setListContent(allWordLists.idZone);

      dropdownWord = 1;
      setDDList(1);

      // defaultWord = "Generation";
      setCardCurrentWord("Efficiency");
    } else if (props.card === "2") {
      // list = allWordLists.embody;
      setListContent(allWordLists.embody);

      setDDList(2);

      dropdownWord = 2;
      // defaultWord = "Virtual Reality";
      setCardCurrentWord("Virtual Reality");
    } else {
      // list = allWordLists.industry;
      setListContent(allWordLists.industry);

      setDDList(3);

      dropdownWord = 0;
      setCardCurrentWord("Innovation");
    }
  }, []);

  //RANDOM WORD IN ARRAY PROP

  const wordClickHandler = () => {
    // console.log("wordclick " + listContent);
    // console.log("RW");

    // console.log("RW " + listContent);

    // input = listContent[0];

    let prevWord = cardCurrentWord;

    let arrayLength = listContent.length;

    let randomNumber = Math.floor(Math.random() * arrayLength);

    let randomizedInput = listContent[randomNumber];

    if (randomizedInput === prevWord) {
      randomizedInput = listContent[randomNumber + 1];
    }

    // console.log(randomizedInput);
    // setWord(randomizedInput);
    setCardCurrentWord(randomizedInput);
    // navigator.vibrate(200);
    // dispatch(wordAction(randomizedInput));
  };
  //THIS useEffect listens for changes to DDListChanged to change the lists and reset the word.

  useEffect(() => {
    console.log("UE2");

    if (DDListChanged === true) {
      // console.log("ddlistchanged happened");

      if (DDList === 0) {
        // console.log("0 DD");

        // list = allWordLists.industry;
        setListContent(allWordLists.industry);
      } else if (DDList === 1) {
        // console.log("1 DD");
        // console.log("BEFORE 1 DD" + listContent);

        // list = allWordLists.idZone;
        setListContent(allWordLists.idZone);
        // console.log("1 DD" + listContent);
      } else if (DDList === 2) {
        // list = allWordLists.embody;
        setListContent(allWordLists.embody);
      } else if (DDList === 3) {
        // list = allWordLists.blockchain;
        setListContent(allWordLists.blockchain);
      } else if (DDList === 4) {
        // list = allWordLists.nft;
        setListContent(allWordLists.nft);
      } else if (DDList === 5) {
        // list = allWordLists.primitives;
        setListContent(allWordLists.primitives);
      } else if (DDList === 6) {
        // list = allWordLists.companies;
        setListContent(allWordLists.companies);
      } else {
        // list = allWordLists.industry;
        setListContent(allWordLists.industry);
      }
      // input = listContent[0];

      // // let arrayLength = list.length;
      // let arrayLength = listContent.length;

      // let randomNumber = Math.floor(Math.random() * arrayLength);

      // let randomizedInput = listContent[randomNumber];
      // console.log("before " + listContent);

      // // dispatch(wordAction(randomizedInput));

      // // dispatch(listChanged(false));
      // setCardCurrentWord(randomizedInput);
      wordClickHandler();
      setDDListChanged(false);
    }
  }, [DDListChanged, DDList, allWordLists, listContent, wordClickHandler]);

  //Hamburger menu
  const [isOpen, setOpen] = useState(false);

  //TOGGLES
  const [imageOn, setImageOn] = useState(true);
  const [simOn, setSimOn] = useState(false);

  var toggles = (
    <div className="toggles">
      <label className="card-label">
        <Toggle
          defaultChecked={imageOn}
          icons={{
            checked: <FaImage />,
            unchecked: null,
          }}
          onChange={() => {
            setImageOn(!imageOn);
          }}
        />
        <span className="card-label">Image</span>
      </label>
      <label className="card-label">
        <Toggle
          defaultChecked={simOn}
          icons={{
            checked: <FaEquals />,
            unchecked: null,
          }}
          onChange={() => {
            setSimOn(!simOn);
          }}
        />
        <span className="card-label">Similar Words</span>
      </label>
    </div>
  );

  function onCascadeChange(value) {
    console.log(value);
  }

  // Just show the latest item.
  function displayRender(label) {
    return label[label.length - 1];
  }

  return (
    <CardStyle className="card">
      {isOpen && <CardModal />}
      <Hamburger
        className="hamburger"
        toggled={isOpen}
        toggle={() => {
          setOpen(!isOpen);
        }}
        // size={25}
        easing="ease-in"
        label="Show menu"
        rounded
      />
      <div className="back-of-card">
        {isOpen && (
          <Cascader
            // style={{ borderRadius: "59px" }}
            options={options}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onCascadeChange}
            style={{ zIndex: 8 }}
            placeholder="Select List"
            placement="bottomLeft"
            size="middle"
          />
        )}
        {isOpen && toggles}
        <Dropdown
          initial={dropdownWord}
          sendDataToParent={sendDataToParent}
          listNumber={DDList}
          open={isOpen}
        />
      </div>
      {imageOn && <CardImage word={cardCurrentWord} key={props.card} />}
      <div className="card__body">
        <div
          className="text-hover"
          // style={{ fontSize, whiteSpace: "nowrap", width: "80%" }}
          // ref={ref}
        >
          <h3
            className="card__title"
            onClick={wordClickHandler}

            // onMouseEnter={() => setIsShown(true)}
            // onMouseLeave={() => setIsShown(false)}
          >
            {/* <ResizeObserver
              onResize={textResizer}
              // onPosition={(rect) => {
              //   console.log("Moved. New position:", rect.left, "x", rect.top);
              // }}
            /> */}
            {cardCurrentWord}
          </h3>
          <div className="dice">🎲</div>
        </div>
        {simOn && <WordsCard word={cardCurrentWord} />}
      </div>
      {/* <button className="card__btn" onClick={wordClickHandler}>
        Randomize
      </button> */}
    </CardStyle>
  );
}

export default Card;
