import React, { useState, useCallback, memo, useEffect } from "react";

import { Squash as Hamburger } from "hamburger-react";

import { Cascader } from "antd";
import "antd/dist/antd.css";
import WordsCard from "./WordsCard";
import CardImage from "./CardImage";
import { useSelector, useDispatch } from "react-redux";
import { allOptions } from "./ListOptions";
import { FaEquals, FaImage } from "react-icons/fa";
import Toggle from "react-toggle";
import { randomizeAction } from "../../../../redux/actions";

function NewCard(props) {
  const [cardCurrentWord, setCardCurrentWord] = useState(props.defaultWord);
  //Hamburger menu
  const [isOpen, setOpen] = useState(false);
  const [locked, setLocked] = useState(false);

  //TOGGLES
  const [imageOn, setImageOn] = useState(true);
  const [simOn, setSimOn] = useState(false);
  const isRandomized = useSelector((state) => state.randomize);
  const [listOptions, setListOptions] = useState(allOptions);
  const [randomized, setRandomized] = useState(false);

  const dispatch = useDispatch();
  const [list, setList] = useState(props.default);
  const [listLabel, setListLabel] = useState(props.defaultLabel);

  //Function that is run after cascade option picked
  function onCascadeChange(value, label) {
    if (value.length > 2) {
      setList(value[2]);
      setListLabel(label[2].label);
      setCardCurrentWord(value[2][4]);
    } else {
      setList(value[1]);
      setListLabel(label[1].label);
      // console.log(value[1]);
      setCardCurrentWord(value[1][4]);
    }

    setOpen(false);
  }

  // Just show the latest item. in list display
  function displayRender(label) {
    return label[label.length - 1];
  }

  //randomize button function
  useEffect(() => {
    // console.log(isRandomized);
    // console.log(isRandomized2);
    if ((randomized && !locked) || (isRandomized && !locked)) {
      // console.log(listOptions)
      // console.log(list)
      // console.log(displayText)

      try {
        let randomNumber = Math.floor(Math.random() * (list.length - 1));

        let item = list[randomNumber];
        if (item === cardCurrentWord) {
          item = list[randomNumber + 1];
        }

        setCardCurrentWord(item);
      } catch (error) {
        console.error(error);
      }

      if (randomized) {
        setRandomized(false);
      }
      dispatch(randomizeAction(false));
    }
  }, [randomized, isRandomized]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={
        "min-w-80 px-3 bg-white/30 rounded-2xl drop-shadow-2xl shadow-2xl relative flex flex-col justify-center items-center"
      }
    >
      <div className="absolute top-0 right-0 scale-75">
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
      </div>

      <div className="back-of-card">
        {isOpen && (
          <Cascader
            // style={{ borderRadius: "59px" }}
            options={listOptions}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onCascadeChange}
            style={{ zIndex: 8 }}
            placeholder="Select List"
            placement="bottomLeft"
            // size="middle"
          />
        )}
        {!isOpen && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!isOpen)}
          >
            <p className="text-sm">List:</p>
            <p>{listLabel}</p>
          </div>
        )}
        {isOpen && (
          <div className="toggles fade-effect-quick">
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
        )}
      </div>
      {imageOn && !isOpen && <CardImage alt={cardCurrentWord} />}
      {simOn && <WordsCard word={cardCurrentWord} />}

      <div className="max-w-20 min-w-[20em]">
        <h3
          // className="card__title"
          className={
            "md:text-4xl sm:text-2xl lg:text-3xl  md:hover:scale-[110%] md:active:scale-95 transition duration-500   underline-offset-8  grow-effect cursor-pointer nun select-none capitalize font-bold " +
            (isOpen ? " text-sky-500" : " text-t-bd")
          }
          onClick={() => {
            setRandomized(!randomized);
          }}
        >
          {cardCurrentWord}
        </h3>
      </div>
    </div>
  );
}

export default NewCard;
