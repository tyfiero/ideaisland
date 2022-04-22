import React, { useState, useMemo, useRef } from "react";
import { BsSkipForward } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";

const db = [
  {
    name: "Could it be more specific?",
    url: "https://rb.gy/df8y2i",
  },
  {
    name: "Could it be downsized?",
    url: "https://rb.gy/osiw9l",
  },
  {
    name: "How would your family solve this problem?",
    url: "https://rb.gy/s8a3mn",
  },
  {
    name: "How might we make it cheaper?",
    url: "https://rb.gy/1jfgm0",
  },
  {
    name: "How could we speed up the process?",
    url: "https://rb.gy/ujaeir",
  },
];

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx]?.current?.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="flex flex-col items-center mt-5 overflow-x-hidden">
      <h1 className="mb-10 text-3xl text-t-bd">Question Cards</h1>
      <div className="w-[40em] h-[30em] flex items-center justify-center ">
        {db.map((question, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={question.name}
            onSwipe={(dir) => swiped(dir, question.name, index)}
            onCardLeftScreen={() => outOfFrame(question.name, index)}
          >
            <div
              style={{
                backgroundImage: "url(" + question.url + ")",
                // transform: `translateX(${index * 10}px)`,
              }}
              className=" bg-center rounded-2xl bg-cover w-[25em] h-[30em] flex flex-col items-center justify-center p-5 md:hover:rotate-3 transition transform  duration-1000 md:hover:scale-105 translate-x-10"
            >
              <h3 className="text-xl text-white nun infoText">
                {question.name}
              </h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button
          className="flex items-center justify-center gap-3"
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          Skip <BsSkipForward />
        </button>
        <button
          className="flex items-center justify-center gap-3"
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
        >
          Previous Card
        </button>
        <button
          className="flex items-center justify-center gap-3"
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          Favorite <FaRegHeart />
        </button>
      </div>
      {/* {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )} */}
    </div>
  );
}

export default Advanced;
