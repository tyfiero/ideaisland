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

function KrModal({
  modalOpen,
  setModalOpen,
  className,
  setKrs,
  krs,
  selectedKr,
  setSelectedKr,
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
  const [color, setColor] = React.useState(" bg-sky-400/60");
  const [startDate, setStartDate] = React.useState(null);
  const [status, setStatus] = React.useState("On Track");
  // console.log(selectedKr?.num);
  // console.log(selectedKr);
  // console.log(krs[selectedKr?.num]);
  useEffect(() => {
    if (selectedKr !== null) {
      setModalTitle(selectedKr.title);
      // setModalContent(selectedKr.description);
      setModalValue(selectedKr.value);
      setModalTargetValue(selectedKr.target);
      setModalValueType(selectedKr.type);
      setColor(selectedKr.color);

      if (selectedKr.date !== null) {
        setShowDate(true);
        setStartDate(selectedKr.date);
      }
    }
  }, [selectedKr]);
  return (
    <>
      {/* <div
        // className=" fade-effect-quick bg-black/30 z-[80] fixed md:-top-[10em] md:-left-[10em] sm:w-[100.7vw] md:w-[103vw] lg:w-[100.9vw] xl:w-[100vw] h-[100vh] overflow-hidden"
        className=" fade-effect-quick darkBG bg-black/30 z-[80] absolute md:-top-[10em] md:-left-[10em] sm:w-[100.7vw] md:w-[103vw] lg:w-[100.9vw] xl:w-[100vw] h-[100vh] overflow-hidden"
        onClick={() => setModalOpen(false)}
      /> */}
      <div className="fixed  z-[10000]">
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
                        Key Results are important, quantifiable metrics for your
                        goal. Think of them as a way to measure the health of
                        your business, and help you guide it in the right
                        direction. An example of a key result would be: $5,000
                        MRR by Q4. ”
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
                {selectedKr === null ? "Add New Key Result" : "Edit Key Result"}
              </p>

              <div className="flex flex-col normal-box-soft w-[80%] bg-clear-bl3 ">
                <p className="ml-2">Title</p>

                <TextareaAutosize
                  className="w-full whitespace-normal textarea-box textarea-tw "
                  value={modalTitle}
                  placeholder="Enter Key Result Title"
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
              <div className="flex flex-col items-center gap-1 p-1 normal-box-soft">
             {showValues && <div className="flex gap-3 p-1 ">
                <div className="flex flex-col p-1 normal-box-soft bg-clear-bl2">
                  <p className="ml-2">Target Value</p>

                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue={{
                        value: modalValueType,
                        label: modalValueType,
                      }}
                      onChange={(value) => {
                        if (value.value === "Other") {
                          setOtherType(true);
                        } else {
                          setModalValueType(value.value);

                          if (otherType) {
                            setOtherType(false);
                          }
                        }
                      }}
                      className="react-select-container "
                      isSearchable={false}
                      classNamePrefix="react-select"
                      options={[
                        { value: "$", label: "$" },
                        { value: "%", label: "%" },
                        { value: "Other", label: "Other" },
                      ]}
                    />
                    <input
                      type="number"
                      // min="0.00"
                      onFocus={(event) => event.target.select()}
                      placeholder="10000"
                      value={modalTargetValue}
                      className="textarea-box  textarea-tw  rounded-xl h-[2.7em]   "
                      onChange={(e) => {
                        setModalTargetValue(e.target.valueAsNumber);
                      }}
                    />
                    {otherType && (
                      <TextareaAutosize
                        className="w-full whitespace-normal textarea-box textarea-tw w-[7em]"
                        placeholder="Units"
                        onChange={(e) => setModalValueType(e.target.value)}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col p-1 normal-box-soft bg-clear-bl2">
                  <p className="ml-2">Current Value</p>

                  <div
                    className={
                      "flex items-center gap-2  " +
                      (modalValueType === "$" ? " " : " flex-row-reverse ")
                    }
                  >
                    <p>{modalValueType}</p>
                    <input
                      type="number"
                      // min="0.00"
                      onFocus={(event) => event.target.select()}
                      placeholder="100"
                      value={modalValue}
                      className="textarea-box  textarea-tw  rounded-xl h-[2.7em]   "
                      onChange={(e) => {
                        setModalValue(e.target.valueAsNumber);
                      }}
                    />
                  </div>
                </div>
                </div>}
                <button
                    // type="submit"
                    // disabled={!isValid}
                    onClick={() => {
                      setShowValues(!showValues);
                    }}
                    className=" w-[12em] h-[1.8em]  rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                  >
                    {showValues ? (
                      <FaTimes className="text-[20px]" />
                    ) : (
                      <MdSpeed className="text-[20px]" />
                    )}
                    <p className="text-white">
                      {showValues ? "Delete Metrics" : "Add Metrics"}
                    </p>
                  </button>
              
              </div>
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
                <div className="flex flex-col p-1 normal-box-soft w-[12em]">
                  <p>Status</p>

                  <div className="flex flex-col">
                    <div className="flex flex-col justify-center gap-5 px-5 py-2 max-h-[6em] flex-wrap">
                      <button
                        onClick={() => {
                          setStatus("On Track");
                        }}
                        className={
                          " justify-center  min-w-[60px] flex gap-1 items-center rounded-full p-1    whitespace-nowrap transition  h-fit w-fit select-none text-bold cursor-pointer md:hover:scale-105 md:active:scale-95 bg-sky-200  text-sky-600 shadow-sm shadow-sky-400 " +
                          (status === "On Track"
                            ? "border-2 border-sky-500 scale-125"
                            : " scale-110")
                        }
                      >
                        <h5 className="m-0 text-xs md:hover:scale-100">
                          <b>On Track</b>
                        </h5>
                      </button>
                      <button
                        onClick={() => {
                          setStatus("Complete");
                        }}
                        className={
                          " justify-center  min-w-[60px] flex gap-1 items-center rounded-full p-1    whitespace-nowrap transition  h-fit w-fit select-none text-bold cursor-pointer md:hover:scale-105 md:active:scale-95 bg-green-200  text-green-600 shadow-sm shadow-green-400 " +
                          (status === "Complete"
                            ? " border-2 border-green-500 scale-125"
                            : " scale-110")
                        }
                      >
                        <h5 className="m-0 text-xs md:hover:scale-100">
                          <b>Complete</b>
                        </h5>
                      </button>
                      <button
                        onClick={() => {
                          setStatus("Off Track");
                        }}
                        className={
                          " justify-center  min-w-[60px] flex gap-1 items-center rounded-full p-1    whitespace-nowrap transition  h-fit w-fit select-none text-bold cursor-pointer md:hover:scale-105 md:active:scale-95 bg-yellow-200  text-yellow-600 shadow-sm shadow-yellow-400 " +
                          (status === "Off Track"
                            ? " border-2 border-yellow-500 scale-125"
                            : " scale-110")
                        }
                      >
                        <h5 className="m-0 text-xs md:hover:scale-100">
                          <b>Off Track</b>
                        </h5>
                      </button>
                      <button
                        onClick={() => {
                          setStatus("Behind");
                        }}
                        className={
                          " justify-center  min-w-[60px] flex gap-1 items-center rounded-full p-1    whitespace-nowrap transition  h-fit w-fit select-none text-bold cursor-pointer md:hover:scale-105 md:active:scale-95 bg-red-200  text-red-600 shadow-sm shadow-red-400 " +
                          (status === "Behind"
                            ? "border-2 border-red-500 scale-125"
                            : " scale-110")
                        }
                      >
                        <h5 className="m-0 text-xs md:hover:scale-100">
                          <b>Behind</b>
                        </h5>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-1 normal-box-soft ">
                <p>Color</p>
                <div className="flex gap-5 p-3">
                  <button
                    className={
                      "w-8 h-8 rounded-full bg-sky-400 md:hover:scale-105 active:scale-95 transition " +
                      (color === " bg-sky-400/60" &&
                        " scale-110 ring-2 ring-black")
                    }
                    onClick={() => {
                      setColor(" bg-sky-400/60");
                    }}
                  ></button>
                  <button
                    className={
                      "w-8 h-8 rounded-full bg-green-400 md:hover:scale-105 active:scale-95 transition " +
                      (color === " bg-green-400/60" &&
                        " scale-110 ring-2 ring-black")
                    }
                    onClick={() => {
                      setColor(" bg-green-400/60");
                    }}
                  ></button>
                  <button
                    className={
                      "w-8 h-8 rounded-full bg-yellow-400 md:hover:scale-105 active:scale-95 transition " +
                      (color === " bg-yellow-400/60" &&
                        " scale-110 ring-2 ring-black")
                    }
                    onClick={() => {
                      setColor(" bg-yellow-400/60");
                    }}
                  ></button>
                  <button
                    className={
                      "w-8 h-8 rounded-full bg-red-400 md:hover:scale-105 active:scale-95 transition " +
                      (color === " bg-red-400/60" &&
                        " scale-110 ring-2 ring-black")
                    }
                    onClick={() => {
                      setColor(" bg-red-400/60");
                    }}
                  ></button>
                  <button
                    className={
                      "w-8 h-8 rounded-full bg-purple-400 md:hover:scale-105 active:scale-95 transition " +
                      (color === " bg-purple-400/60" &&
                        " scale-110 ring-2 ring-black")
                    }
                    onClick={() => {
                      setColor(" bg-purple-400/60");
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
                    
                    
                    if (selectedKr !== null) {
                      let updated = krs;
                      console.log(selectedKr.num);
                      console.log(updated[selectedKr.num]);

                      updated[selectedKr.num] = {
                        title: modalTitle,
                        // description: modalContent,
                        status: status,
                        type: modalValueType,
                        value: modalValue || null,
                        target: modalTargetValue || null,
                        color: color,
                        date: startDate,
                        num: selectedKr.num,
                      };
                      setKrs(updated);
                    } else {
                      if (krs.length === 0) {
                        setKrs([
                          {
                            title: modalTitle,
                            // description: modalContent,
                            status: status,
                            type: modalValueType,
                            value: modalValue || null,
                            target: modalTargetValue || null,
                            color: color,
                            date: startDate,
                            num: 0,
                          },
                        ]);
                      } else {
                        setKrs([
                          ...krs,
                          {
                            title: modalTitle,
                            // description: modalContent,
                            status: status,
                            type: modalValueType,
                            value: modalValue || null,
                            target: modalTargetValue || null,
                            color: color,
                            date: startDate,
                            num: krs.length,
                          },
                        ]);
                      }
                    }
                    setModalTitle("");
                    // setModalContent("");
                    setModalValue();
                    setModalTargetValue();
                    setModalValueType("$");
                    setColor(" bg-sky-400/60");
                    setOtherType(false);
                    setStartDate(new Date());
                    setModalOpen(false);
                      setStatus("On Track");
      setSelectedKr(null);
                    
                  }}
                  className=" w-[12em] h-[3em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                >
                  <FaSave className="text-[20px]" />
                  <p className="text-white">
                    {selectedKr !== null
                      ? "Update Key Result"
                      : "Save Key Result"}
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

export default KrModal;
