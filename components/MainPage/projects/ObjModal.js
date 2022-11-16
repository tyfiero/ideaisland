import React, { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Select from "react-select";
import {
  FaQuestionCircle,
  FaRegCalendar,
  FaRegCalendarTimes,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { Popover, ArrowContainer } from "react-tiny-popover";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { MdSpeed } from "react-icons/md";

function ObjModal({
  modalOpen,
  setModalOpen,
  className,
  setObjectives,
  objectives,
  selectedObj,
  setSelectedObj,
}) {
  const [modalTitle, setModalTitle] = React.useState("");
  // const [modalContent, setModalContent] = React.useState("");
  const [modalValue, setModalValue] = React.useState(0);
  const [modalTargetValue, setModalTargetValue] = React.useState(0);
  const [modalValueType, setModalValueType] = React.useState("$");
  const [otherType, setOtherType] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [showDate, setShowDate] = React.useState(true);
  const [showValues, setShowValues] = React.useState(true);
  const [color, setColor] = React.useState([" bg-sky-400/40", "#e0f2fe", "#0369a1"]);
  const [startDate, setStartDate] = React.useState(null);
  const [status, setStatus] = React.useState("On Track");
  console.log(selectedObj);
 
  return (
    <>
      <div
        className="darkBG fade-effect-quick"
        onClick={() => setModalOpen(false)}
      />
      <div className="centered">
        <div
          className={
            " glass-box  shadow-2xl flex flex-col  items-center p-10 z-100 bg-white/80 dark:bg-slate-600/80 grow-effect" +
            className
          }
        >
          <button className="closeBtn" onClick={() => setModalOpen(false)}>
            X
          </button>
          <div className="modalContent">
            <div className="flex flex-col items-center w-full h-full min-w-[30em] gap-2">
              <div className="absolute top-5 left-5">
                <Popover
                  isOpen={isPopoverOpen}
                  containerStyle={{
                    zIndex: 100,
                    boxShadow: "5px 13px 28px 0px rgba(0,0,0,0.48)",
                    backgroundColor: "white",
                    borderRadius: "2em",
                  }}
                  onClickOutside={() => setIsPopoverOpen(false)}
                  positions={["bottom", "right"]}
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
                        className="!opacity-100 bg-white w-[25em] nun rounded-xl p-3"
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                      >
                     Objectives are steps towards your goal.
                      </div>
                    </ArrowContainer>
                  )}
                >
                  <div
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    className="w-5"
                  >
                    <FaQuestionCircle className="text-3xl cursor-pointer text-blues-300 dark:text-blues-100 md:hover:scale-110" />
                  </div>
                </Popover>
              </div>
              <p className="text-2xl font-bold">
                {selectedObj === null ? "Add New Objective" : "Edit Objective"}
              </p>

              <div className="flex flex-col normal-box-soft w-[80%] bg-clear-bl3 ">
                <p className="ml-2">Name</p>

                <TextareaAutosize
                  className="w-full whitespace-normal textarea-box textarea-tw "
                  value={modalTitle}
                  placeholder="..."
                  onChange={(e) => setModalTitle(e.target.value)}
                />
              </div>
              {/* <div className="flex flex-col normal-box-soft w-[90%] bg-clear-bl2 p-1">
                <p className="ml-2">Description</p>

                <TextareaAutosize
                  className="w-full whitespace-normal textarea-box textarea-tw "
                  value={modalContent}
                  placeholder="Enter Description"
                  onChange={(e) => setModalContent(e.target.value)}
                />
              </div> */}
             
              <div className="flex gap-3 p-1 normal-box-soft ">
                <div className="flex flex-col p-1 normal-box-soft ">
                  {showDate && (
                    <>
                      {" "}
                      <p>Due Date</p>
                      <DatePicker
                        className={" !rounded-xl textarea-tw "}
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          console.log(date);
                        }}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Click to add date"
                        popperClassName="!rounded-xl "
                        showMonthDropdown
                        wrapperClassName={"!rounded-xl "}
                        // showQuarterYearPicker
                      />
                    </>
                  )}
                  <button
                    // type="submit"
                    // disabled={!isValid}
                    onClick={() => {
                      setShowDate(!showDate);
                    }}
                    className=" w-[12em] h-[1.5em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                  >
                    {showDate ? (
                      <FaRegCalendarTimes className="text-[20px]" />
                    ) : (
                      <FaRegCalendar className="text-[20px]" />
                    )}
                    <p className="text-white">
                      {showDate ? "No Date" : "Add Date"}
                    </p>
                  </button>
                </div>
               
              </div>
              <div className="flex flex-col p-1 normal-box-soft ">
                <p>Color</p>
                <div className="flex gap-5 p-3">
                  <button
                    className={
                      "w-8 h-8 rounded-full bg-sky-400 md:hover:scale-105 active:scale-95 transition " +
                      (color[0] === " bg-sky-400/40" &&
                        " scale-110 ring-2 ring-black")
                    }
                    onClick={() => {
                      setColor([" bg-sky-400/40", "#e0f2fe", "#0369a1"]);
                    }}
                  ></button>
                  <button
                    className={
                      "w-8 h-8 rounded-full bg-green-400 md:hover:scale-105 active:scale-95 transition " +
                      (color[0] === " bg-green-400/40" &&
                        " scale-110 ring-2 ring-black")
                    }
                    onClick={() => {
                      setColor([" bg-green-400/40", "#dcfce7", "#16a34a"]);
                    }}
                  ></button>
                  <button
                    className={
                      "w-8 h-8 rounded-full bg-yellow-400 md:hover:scale-105 active:scale-95 transition " +
                      (color[0] === " bg-yellow-400/40" &&
                        " scale-110 ring-2 ring-black")
                    }
                    onClick={() => {
                      setColor([" bg-yellow-400/40", "#fef9c3", "#ca8a04"]);
                    }}
                  ></button>
                  <button
                    className={
                      "w-8 h-8 rounded-full bg-red-400 md:hover:scale-105 active:scale-95 transition " +
                      (color[0] === " bg-red-400/40" &&
                        " scale-110 ring-2 ring-black")
                    }
                    onClick={() => {
                      setColor([" bg-red-400/40", "#fee2e2", "#dc2626"]);
                    }}
                  ></button>
                  <button
                    className={
                      "w-8 h-8 rounded-full bg-purple-400 md:hover:scale-105 active:scale-95 transition " +
                      (color[0] === " bg-purple-400/40" &&
                        " scale-110 ring-2 ring-black")
                    }
                    onClick={() => {
                      setColor([" bg-purple-400/40", "#e0f2fe", "#0369a1"]);
                    }}
                  ></button>
                </div>
              </div>

              <div className="relative mt-2 group">
                <div className="absolute transition duration-1000 rounded-full opacity-25 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                {/* <div className="relative flex justify-start rounded-lg ring-1 items-top"> */}

                <button
                  // type="submit"
                  // disabled={!isValid}
                  onClick={() => {
                    
                    
                    if (selectedObj !== null) {
                      let updated = objectives;
                

                      updated[selectedObj.num] = {
                        title: modalTitle,
                        // description: modalContent,
                        color: color,
                        date: startDate,
                        num: selectedObj.num,
                      };
                      setObjectives(updated);
                    } else {
                      if (objectives.length === 0) {
                        setObjectives([
                          {
                            title: modalTitle,
                            color: color,
                            date: startDate,
                            num: 0,
                            // description: modalContent,
                            // status: status,
                            // type: modalValueType,
                            // value: modalValue || null,
                            // target: modalTargetValue || null,
                          },
                        ]);
                      } else {
                        setObjectives([
                          ...objectives,
                          {
                            title: modalTitle,
                            color: color,
                            date: startDate,
                            num: objectives.length,
                            // description: modalContent,
                            // status: status,
                            // type: modalValueType,
                            // value: modalValue || null,
                            // target: modalTargetValue || null,
                          },
                        ]);
                      }
                    }
                    setModalTitle("");
                    setColor([" bg-sky-400/40", "#e0f2fe", "#0369a1"]);
                    setModalOpen(false);
                    setStartDate(new Date());
                    setSelectedObj(null);
                    // setModalContent("");
                    // setModalValue();
                    // setModalTargetValue();
                    // setModalValueType("$");
                    // setOtherType(false);
                      // setStatus("On Track");
                    
                  }}
                  className=" w-[12em] h-[3em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                >
                  <FaSave className="text-[20px]" />
                  <p className="text-white">
                    {selectedObj !== null
                      ? "Update Objective"
                      : "Save Objective"}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ObjModal;
