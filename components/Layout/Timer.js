import React from "react";
// import ReactDOM from "react-dom";
import { useState, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Toggle from "react-toggle";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaUndo,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { soundSetting } from "../../redux/actions";
// import "./styles.css";
import toast from "react-hot-toast";
import useVisible from "../../lib/useVisible";

const RenderTime = ({ remainingTime }) => {
  var audioRef = useRef(null);
  // const [timerDone, setTimerDone] = useState(false);
  const soundRedux = useSelector((state) => state.soundSetting);

  const minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;
  const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`;
  let timeLeft = `${minutes}:${stringifiedSeconds}`;

  if (remainingTime === 0) {
    if (soundRedux) {
      return (
        <>
          <div className="timer">Done!</div>
          <audio ref={audioRef} src={"../timersound.mp3"} autoPlay />
        </>
      );
    } else {
      return (
        <>
          <div className="timer">Done!</div>
        </>
      );
    }
  }

  return (
    <div className="timer">
      <div className="value">{timeLeft}</div>
    </div>
  );
};

function CircleTimer() {
  const [play, setPlay] = useState(false);
  const [timerMenuOpen, setTimerMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  // const [timerDone, setTimerDone] = useState(false);
  const [key, setKey] = useState(0);
  const [duration, setDuration] = useState(25);
  const dispatch = useDispatch();
  const soundRedux = useSelector((state) => state.soundSetting);
  const { ref, isVisible, setIsVisible } = useVisible(false);

  let clickTimer;
  const onClickHandler = (event) => {
    clearTimeout(clickTimer);
    if (event.detail === 1) {
      clickTimer = setTimeout(() => {
        // console.log("SINGLE CLICK");
        // setTimerMenuOpen(!timerMenuOpen)
        setIsVisible(!isVisible);
      }, 200);
    } else if (event.detail === 2) {
      // console.log("DOUBLE CLICK");
      setPlay(!play);
    }
  };
  // const [, forceUpdate] = useReducer(x => x + 1, 0);

  let timerMenuContent = (
    <div className="flex flex-col items-center timer-menu normal-box fade-effect-fast">
      <h5 className="text-[22px]">Timer Settings</h5>
      <div className="normal-box w-[100%] flex flex-col items-center mt-1">
        <p className="text-[18px]">Length</p>
        {/* <input type="number" min="1" max="60"></input> */}
        <div className="flex flex-wrap items-center justify-center gap-1 mb-3">
          <button
            className="w-[3em] h-6 rounded-3xl bg-blues-200 flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
            onClick={() => {
              setKey((prevKey) => prevKey + 1);
              setDuration(2);
              setPlay(true);
              setIsVisible(false);

              toast.success("2 min Timer Started!", {
                iconTheme: {
                  primary: "#4eaef7",
                  secondary: "#FFFAEE",
                },
                position: "top-center",
              });
            }}
          >
            2 min
          </button>
          <button
            className="w-[3em] h-6 rounded-3xl bg-blues-300 flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
            onClick={() => {
              setKey((prevKey) => prevKey + 1);
              setDuration(5);
              setPlay(true);
              setIsVisible(false);

              toast.success("5 min Timer Started!", {
                iconTheme: {
                  primary: "#4eaef7",
                  secondary: "#FFFAEE",
                },
                position: "top-center",
              });
            }}
          >
            5 min
          </button>
          <button
            className="w-[3.5em] h-6 rounded-3xl bg-blues-500 flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
            onClick={() => {
              setKey((prevKey) => prevKey + 1);
              setDuration(10);
              setPlay(true);
              setIsVisible(false);

              toast.success("10 min Timer Started!", {
                iconTheme: {
                  primary: "#4eaef7",
                  secondary: "#FFFAEE",
                },
                position: "top-center",
              });
            }}
          >
            10 min
          </button>
          <button
            className="w-[3.5em] h-6 rounded-3xl bg-blues-600 flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
            onClick={() => {
              setKey((prevKey) => prevKey + 1);
              setDuration(15);
              setPlay(true);
              setIsVisible(false);

              toast.success("15 min Timer Started!", {
                iconTheme: {
                  primary: "#4eaef7",
                  secondary: "#FFFAEE",
                },
                position: "top-center",
              });
            }}
          >
            15 min
          </button>
          <button
            className="w-[3.5em] h-6 rounded-3xl bg-pinks-600 flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
            onClick={() => {
              setKey((prevKey) => prevKey + 1);
              setDuration(25);
              setPlay(true);
              setIsVisible(false);

              toast.success("25 min Timer Started!", {
                iconTheme: {
                  primary: "#4eaef7",
                  secondary: "#FFFAEE",
                },
                position: "top-center",
              });
            }}
          >
            25 min
          </button>
          <button
            className="w-[3.5em] h-6 rounded-3xl bg-pinks-400 flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
            onClick={() => {
              setKey((prevKey) => prevKey + 1);
              setDuration(30);
              setPlay(true);
              setIsVisible(false);

              toast.success("30 min Timer Started!", {
                iconTheme: {
                  primary: "#4eaef7",
                  secondary: "#FFFAEE",
                },
                position: "top-center",
              });
            }}
          >
            30 min
          </button>
          <button
            className="w-[3.5em] h-6 rounded-3xl bg-pinks-300 flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
            onClick={() => {
              setKey((prevKey) => prevKey + 1);
              setDuration(45);
              setPlay(true);
              setIsVisible(false);

              toast.success("45 min Timer Started!", {
                iconTheme: {
                  primary: "#4eaef7",
                  secondary: "#FFFAEE",
                },
                position: "top-center",
              });
            }}
          >
            45 min
          </button>
          <button
            className=" w-[3em] h-6 rounded-3xl bg-pinks-200 flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
            onClick={() => {
              setKey((prevKey) => prevKey + 1);
              setDuration(60);
              setPlay(true);
              setIsVisible(false);

              toast.success("1 hour Timer Started!", {
                iconTheme: {
                  primary: "#4eaef7",
                  secondary: "#FFFAEE",
                },
                position: "top-center",
              });
            }}
          >
            1 hr
          </button>
        </div>
      </div>

      <div className="normal-box w-[50%] flex flex-col items-center mt-2">
        <p className="text-[18px] ">Sound</p>
        <Toggle
          className="dark-toggle "
          defaultChecked={soundOn}
          onChange={() => {
            dispatch(soundSetting(!soundRedux));
          }}
          icons={{
            unchecked: (
              <FaVolumeMute
                style={{
                  fontSize: "1em",
                  color: "white",
                  paddingBottom: "3px",
                  paddingTop: "1px !important",
                }}
              />
            ),
            checked: (
              <FaVolumeUp
                style={{
                  fontSize: "1em",
                  color: "white",
                  paddingBottom: "2px",
                  paddingTop: "1px !important",
                }}
              />
            ),
          }}
        />
      </div>
      <div className="normal-box w-[50%] flex justify-evenly items-center mt-2">
        {play ? (
          <FaPause
            className="md:hover:scale-110 md:transition-transform md:active:scale-95"
            style={{
              fontSize: "2em",
              color: "#4eaef7",
              cursor: "pointer",
            }}
            onClick={() => {
              setPlay(false);
            }}
          />
        ) : (
          <FaPlay
            className="md:hover:scale-110 md:transition-transform md:active:scale-95"
            style={{
              fontSize: "2em",
              color: "#4eaef7",
              cursor: "pointer",
            }}
            onClick={() => {
              setPlay(true);
              setIsVisible(false);

              toast.success("Timer Started!", {
                iconTheme: {
                  primary: "#4eaef7",
                  secondary: "#FFFAEE",
                },
                position: "top-center",
              });
            }}
          />
        )}
        <FaUndo
          className="md:hover:scale-110 md:transition-transform md:active:scale-95"
          style={{
            fontSize: "1.7em",
            color: "#4eaef7",
            cursor: "pointer",
          }}
          onClick={() => {
            setKey((prevKey) => prevKey + 1);
            setPlay(false);
          }}
        />
      </div>
      <p className="text-[12px] pt-2">Tip: Double click timer to play/pause</p>
    </div>
  );
  return (
    <>
      {/* {timerMenuOpen && timerMenuContent} */}
      <div ref={ref}>{isVisible && timerMenuContent}</div>
      {/* {timerMenuContent} */}
      <div
        className="cursor-pointer timer-wrapper"
        onClick={onClickHandler}
        // onMouseEnter={() => setTimerMenuOpen(true)}
        // onMouseLeave={() => setTimerMenuOpen(false)}
      >
        <CountdownCircleTimer
          isPlaying={play}
          key={key}
          duration={duration * 60}
          size={80}
          strokeWidth={16}
          updateInterval={0.01}
          rotation="counterclockwise"
          colors={["#4eaef7", "#2549a8", "#eec3fd", "#be0081"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => {
            setPlay(false);
            toast.success("Times up!", {
              icon: "⏰",
              position: "top-center",
              duration: 6000,
            });
            setTimeout(() => {
              setKey((prevKey) => prevKey + 1);
            }, 2000);
          }}
        >
          {RenderTime}
        </CountdownCircleTimer>
      </div>
    </>
  );
}

export default CircleTimer;
