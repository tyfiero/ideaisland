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
import { Squash as Hamburger } from "hamburger-react";
import styled from "styled-components";
import CardModal from "./CardModal";
import WordsCard from "./WordsCard";
import CardImage from "./CardImage";
import Toggle from "react-toggle";
import { FaEquals, FaImage } from "react-icons/fa";
import { Cascader } from "antd";
import "antd/dist/antd.css";

var list;
var input;

const CardStyle = styled.div`
  position: relative;

  padding: 1rem;
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
function Card({ cardNum }) {
  //redux
  const isRandomized = useSelector((state) => state.randomize);

  const dispatch = useDispatch();
  const allWordLists = useSelector((state) => state.allListsContent);

  //parent data transfer
  const [DDList, setDDList] = React.useState(0); // the lifted state
  const [DDListChanged, setDDListChanged] = React.useState(false); // the lifted state

  const [listContent, setListContent] = React.useState(allWordLists.industry); // the lifted state
  const [dropdownWord, setDropdownWord] = React.useState(0);
  const sendDataToParent = (index) => {
    setDDList(index[0]);
    setDDListChanged(index[1]);
  };

 

  const [cardCurrentWord, setCardCurrentWord] = React.useState("innovation");
  useEffect(() => {
    if (isRandomized) {
      // console.log("ITS BEEN RANDOMIZED");
      wordClickHandler();
      dispatch(randomizeAction(false));
    }
  }, [isRandomized]);// eslint-disable-line react-hooks/exhaustive-deps
  //THIS useEffect runs once to set the initial state of the cards
  useEffect(() => {
    console.log("UE1");

    if (cardNum === "0") {
      setListContent(allWordLists.industry);

      setDDList(0);

      setDropdownWord(0)
      setCardCurrentWord("Innovation");
    } else if (cardNum === "1") {
      setListContent(allWordLists.idZone);
      setDropdownWord(1)


      setDDList(1);

      setCardCurrentWord("Efficiency");
    } else if (cardNum === "2") {
      setListContent(allWordLists.embody);

      setDDList(2);

      setDropdownWord(2)

      setCardCurrentWord("Virtual Reality");
    } else {
      setListContent(allWordLists.industry);

      setDDList(3);
      setDropdownWord(3)

      setCardCurrentWord("Innovation");
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  //RANDOM WORD IN ARRAY PROP

  const wordClickHandler = () => {
 

    let prevWord = cardCurrentWord;

    let arrayLength = listContent.length;

    let randomNumber = Math.floor(Math.random() * arrayLength);

    let randomizedInput = listContent[randomNumber];

    if (randomizedInput === prevWord) {
      randomizedInput = listContent[randomNumber + 1];
    }

  
    setCardCurrentWord(randomizedInput);

  
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
      wordClickHandler();
      setDDListChanged(false);
    }
  }, [DDListChanged, DDList]);// eslint-disable-line react-hooks/exhaustive-deps

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
      {imageOn && <CardImage word={cardCurrentWord} key={cardNum} />}
      <div className="card__body">
        <div
          className="text-hover"
      
        >
          <h3
            className="card__title"
            onClick={wordClickHandler}

          
          >
           
            {cardCurrentWord}
          </h3>
          <div className="dice">🎲</div>
        </div>
        {simOn && <WordsCard word={cardCurrentWord} />}
      </div>
     
    </CardStyle>
  );
}

export default Card;
