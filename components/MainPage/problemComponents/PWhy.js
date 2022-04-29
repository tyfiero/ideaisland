import React, { useState, useEffect } from "react";

import {
  FaBuilding,
  FaLaptopCode,
  FaQuestion,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaInfoCircle,
  FaUser,
  FaGlobeAmericas,
  FaMountain,
  FaPeopleCarry,
  FaTree,
  FaPaintBrush,
  FaChartLine,
  FaCity,
  FaHandsHelping,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

import { Popover, ArrowContainer } from "react-tiny-popover";
import { useSelector, useDispatch } from "react-redux";
import { pFormAction } from "../../../redux/actions";
import { BsBuilding } from "react-icons/bs";
import { BiBrain } from "react-icons/bi";
import { AiOutlinePieChart } from "react-icons/ai";
import ChipFuchsia from "./chips/ChipFuchsia";
import ChipBlue from "./chips/ChipBlue";
import ChipSky from "./chips/ChipSky";
import ChipTeal from "./chips/ChipTeal";
import ChipCyan from "./chips/ChipCyan";
import ChipGreen from "./chips/ChipGreen";
import ChipLime from "./chips/ChipLime";
import ChipYellow from "./chips/ChipYellow";
import ChipOrange from "./chips/ChipOrange";
import ChipRed from "./chips/ChipRed";
import ChipPink from "./chips/ChipPink";
import ChipPurple from "./chips/ChipPurple.js";
import ChipIndigo from "./chips/ChipIndigo.js";

function PWhy(props) {
  // console.log(props.update)
  const pFormRedux = useSelector((state) => state.pForm);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [startMenu, setStartMenu] = useState(true);
  const [content, setContent] = useState("");

  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const [button3, setButton3] = useState(false);
  const [button4, setButton4] = useState(false);
  const [button5, setButton5] = useState(false);
  const [button6, setButton6] = useState(false);
  const [button7, setButton7] = useState(false);
  const [button8, setButton8] = useState(false);
  const [button9, setButton9] = useState(false);
  const [button10, setButton10] = useState(false);
  const [button11, setButton11] = useState(false);
  const [button12, setButton12] = useState(false);
  const [button13, setButton13] = useState(false);

  const dispatch = useDispatch();
  const update = (e) => {
    let updated = pFormRedux;
    updated.why = e.target.value;
    dispatch(pFormAction(updated));
    setContent(e.target.value);
    props.setChanges(true);
    if (!props.changes) {
      props.setChanges(true);
    }
    // props.update(e.target.name, e.target.value);
  };
  const updateButton = (text, type) => {
    let updated = pFormRedux;
    let updatedArray = updated.whyOptions;
    if (updatedArray === null || typeof updatedArray === "string"){
updatedArray = []
dispatch(pFormAction(updated));
    }

    
    if (Number(type) === 0) {
  
      console.log(updatedArray)

      updatedArray.push(text);
      // console.log(updatedArray)
      // console.log('add')

      dispatch(pFormAction(updated));
    } else {
      let index = updatedArray.indexOf(text);

      if (index >= 0) {
        updatedArray.splice(index, 1);
        dispatch(pFormAction(updated));
      }
    }
    if (!props.changes) {
      props.setChanges(true);
    }
  };

  useEffect(() => {
    if (props.reset) {
      setContent("");
      setButton1(false);
      setButton2(false);
      setButton3(false);
      setButton4(false);
      setButton5(false);
      setButton6(false);
      setButton7(false);
      setButton8(false);
      setButton9(false);
      setButton10(false);
      setButton11(false);
      setButton12(false);
      setButton13(false);
    } else {
      if (pFormRedux.why) {
        setContent(pFormRedux.why);
      }
    }
  }, [props.reset]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pFormRedux.why) {
      setContent(pFormRedux.why);
    }
  }, [props.loadData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

  "
      >
        <div className="w-full max-w-[47rem] p-10 space-y-8   normal-box-soft">
          <div className="relative flex flex-col items-center justify-center gap-3 p-3 problem-page fade-effect-quick">
            <div className="absolute -top-5 -left-5">
              <Popover
                isOpen={isPopoverOpen}
                containerStyle={{
                  zIndex: 100,
                  boxShadow: "5px 13px 28px 0px rgba(0,0,0,0.48)",
                  backgroundColor: "white",
                  borderRadius: "2em",
                }}
                onClickOutside={() => setIsPopoverOpen(false)}
                positions={["bottom", "left", "right"]}
                content={({ position, childRect, popoverRect }) => (
                  <ArrowContainer
                    position={position}
                    childRect={childRect}
                    popoverRect={popoverRect}
                    arrowColor={"white"}
                    arrowSize={10}
                    arrowStyle={{ opacity: 1, top: "-6px" }}
                    className="popover-arrow-container"
                    arrowClassName="popover-arrow"
                  >
                    <div
                      className="!opacity-100 bg-white w-[25em] nun rounded-xl p-5"
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      Starting with why helps keep the end in mind. It helps
                      frame the entire reason you embark on the innovation
                      journey. <br /> Check out Simon Sinek&apos;s
                      <a
                        className="underline text-blues-300"
                        href="https://www.youtube.com/watch?v=u4ZoJKF_VuA&ab_channel=TEDxTalks"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        TED talk
                      </a>{" "}
                      for more on the importance of starting with why.
                    </div>
                  </ArrowContainer>
                )}
              >
                <div
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  className="w-5"
                >
                  <FaInfoCircle className="text-2xl cursor-pointer text-blues-300 dark:text-blues-100 md:hover:scale-110" />
                </div>
              </Popover>
            </div>
            <button></button>
            <h1 className="text-3xl text-t-bd dark:text-blues-100">Why?</h1>
            <div className="normal-box-soft">
              <h3 className="heading">
                Why are you building something? Why are you innovating?
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 w-[110%]">
              <ChipBlue
                text="Follow my dreams"
                icon={<FaMountain />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}
              />
              <ChipSky
                text="Help others"
                icon={<FaPeopleCarry />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}
              />
              <ChipCyan
                text="Pursue a noble cause"
                icon={<FaTree />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}
              />

              <ChipTeal
                text="Expand my skill set"
                icon={<BiBrain />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}
              />
              <ChipGreen
                text="Nurture my creativity"
                icon={<FaPaintBrush />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}
              />
              <ChipLime
                text="Improve my industry"
                icon={<FaChartLine />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}
              />
              <ChipYellow
                text="Make an open source project"
                icon={<FaGlobeAmericas />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}
              />
              <ChipOrange
                text="Start a business"
                icon={<FaBuilding />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}

              />

              <ChipRed
                text="Improve an existing business"
                icon={<BsBuilding />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}

              />
              <ChipPink
                text="Make life easier for people"
                icon={<FaHandsHelping />}
                updateButton={updateButton}
                load={props.loadData}
                reset={props.reset}
              />

              <ChipFuchsia
                text="Solve a problem I have"
                icon={<FaUser />}
                // cN=" w-[13em] "
                updateButton={updateButton}
                load={props.loadData}
                reset={props.reset}
              />

              <ChipPurple
                text="Solve a problem for my team"
                icon={<IoIosPeople className="text-2xl" />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}
              />
              <ChipIndigo
                text="Solve a problem for a niche"
                icon={<AiOutlinePieChart className="text-xl" />}
                updateButton={updateButton}
                reset={props.reset}
                load={props.loadData}
              />
            </div>

            <div className="flex flex-col">
              <div className="mb-2 text-left glass-box bg-white/70 dark:bg-slate-600/80">
                {" "}
                <p>
                  Do you feel a sense of purpose for this endeavor? What is it?
                  <br /> It can be simple: &quot;To start my own business and
                  pursue financial freedom&quot;. Or deeper: &quot;To promote
                  diversity and inclusion in the tech industry through ethical
                  and fair HR software.&quot; Whatever your &apos;Why&apos; is,
                  make sure it resonates with you.
                </p>
              </div>

              <textarea
                // type="text"
                className="textarea-box  textarea-tw   h-[10em] whitespace-normal"
                // name="why"
                value={content}
                placeholder="Enter your why, and try to make it specific..."
                onChange={update}
              />
              <p>
                *This note will be saved to your Idea Page for your review
                later.
              </p>
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => props.goToStep(1)}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>
              <div className="relative group">
                <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="w-[5em] h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
                  onClick={() => props.goToStep(3)}
                >
                  Next
                  <FaLongArrowAltRight className="ml-1 text-[24px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PWhy;
