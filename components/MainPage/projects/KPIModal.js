import React, { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Select from "react-select";
import {
  FaQuestionCircle,
  FaRegCalendar,
  FaRegCalendarTimes,
  FaSave,
} from "react-icons/fa";
import { Popover, ArrowContainer } from "react-tiny-popover";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function KPIModal({
  modalOpen,
  setModalOpen,
  children,
  header,
  className,
  setKpis,
  kpis,
  selectedKpi,
}) {
  const [kpiModalTitle, setKpiModalTitle] = React.useState("");
  const [kpiModalContent, setKpiModalContent] = React.useState("");
  const [kpiModalValue, setKpiModalValue] = React.useState("");
  const [kpiModalValueType, setKpiModalValueType] = React.useState("$");
  const [otherType, setOtherType] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [showDate, setShowDate] = React.useState(true);
  const [color, setColor] = React.useState(" bg-sky-400/60");
  const [startDate, setStartDate] = React.useState(null);

  console.log(selectedKpi);

  useEffect(() => {
    if (selectedKpi !== null) {
      setKpiModalTitle(selectedKpi.title);
      setKpiModalContent(selectedKpi.description);
      setKpiModalValue(selectedKpi.value);
      setKpiModalValueType(selectedKpi.type);
      setColor(selectedKpi.color);

      if (selectedKpi.date !== null) {
        setShowDate(true);
        setStartDate(selectedKpi.date);
      }
    }
  }, [selectedKpi]);
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
                        Key Performance Indicators (KPIs) are important,
                        quantifiable metrics for your goal. Think of them as a
                        way to measure the health of your business, and help you
                        guide it in the right direction. Monthly recurring
                        revenue, profit margin, and customer satisfaction are
                        all good examples of KPIs. An example of a KPI statement
                        would be: $5,000 MRR by Q4. ”
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
                {selectedKpi === null ? "Add New KPI" : "Edit KPI"}
              </p>

              <div className="flex flex-col normal-box-soft w-[80%] bg-clear-bl3 ">
                <p className="ml-2">Title</p>

                <TextareaAutosize
                  className="w-full whitespace-normal textarea-box textarea-tw "
                  value={kpiModalTitle}
                  placeholder="Enter KPI"
                  onChange={(e) => setKpiModalTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col normal-box-soft w-[90%] bg-clear-bl2 p-1">
                <p className="ml-2">Description</p>

                <TextareaAutosize
                  className="w-full whitespace-normal textarea-box textarea-tw "
                  value={kpiModalContent}
                  placeholder="Enter Description"
                  onChange={(e) => setKpiModalContent(e.target.value)}
                />
              </div>
              <div className="flex flex-col p-1 normal-box-soft bg-clear-bl2">
                <p className="ml-2">Value</p>

                <div className="flex items-center gap-2">
                  <Select
                    defaultValue={{
                      value: kpiModalValueType,
                      label: kpiModalValueType,
                    }}
                    onChange={(value) => {
                      if (value.value === "Other") {
                        setOtherType(true);
                      } else {
                        setKpiModalValueType(value.value);

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
                    min="0.00"
                    placeholder="10"
                    value={kpiModalValue}
                    className="textarea-box  textarea-tw  rounded-xl h-[2.7em]   "
                    onChange={(e) => {
                      setKpiModalValue(e.target.valueAsNumber);
                    }}
                  />
                  {otherType && (
                    <TextareaAutosize
                      className="w-full whitespace-normal textarea-box textarea-tw w-[7em]"
                      placeholder="Units"
                      onChange={(e) => setKpiModalValueType(e.target.value)}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col p-1 normal-box-soft ">
                {showDate && (
                  <>
                    {" "}
                    <p>By:</p>
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
                    if (selectedKpi !== null) {
                      
                      let updated = kpis;
                      console.log(updated[selectedKpi.num]);

                      updated[selectedKpi.num] = {
                        title: kpiModalTitle,
                        description: kpiModalContent,
                        type: kpiModalValueType,
                        value: kpiModalValue,
                        color: color,
                        date: startDate,
                        num: kpis.length,
                      }
                      setKpis(updated);
                      console.log(kpis);
                    } else {
                      if (kpis.length === 0) {
                        setKpis([
                          {
                            title: kpiModalTitle,
                            description: kpiModalContent,
                            type: kpiModalValueType,
                            value: kpiModalValue,
                            color: color,
                            date: startDate,
                            num: 0,
                          },
                        ]);
                      } else {
                        setKpis([
                          ...kpis,
                          {
                            title: kpiModalTitle,
                            description: kpiModalContent,
                            type: kpiModalValueType,
                            value: kpiModalValue,
                            color: color,
                            date: startDate,
                            num: kpis.length,
                          },
                        ]);
                      }
                    }
                    setKpiModalTitle("");
                    setKpiModalContent("");
                    setKpiModalValue("");
                    setKpiModalValueType("$");
                    setColor(" bg-sky-400/60");
                    setOtherType(false);
                    setStartDate(new Date());
                    setModalOpen(false);
                  }}
                  className=" w-[12em] h-[3em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                >
                  <FaSave className="text-[20px]" />
                  <p className="text-white">{selectedKpi !== null ? "Update KPI" : "Save KPI"}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KPIModal;
