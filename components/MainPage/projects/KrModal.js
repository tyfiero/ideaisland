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
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { MdSpeed } from "react-icons/md";
import StatusChip from "./StatusChip";

function KrModalOld({
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
      <div
        className={
          "flex flex-col w-[99%] relative items-start px-4 glass-box bg-white/60 cursor-pointer fade-effect-quick " 
        }
      >

        <button
        className="absolute scale-125 top-2 right-2 text-t-bd dark:text-blues-100"
        onClick={() => setModalOpen(false)}
        ><FaTimes/></button>


        <p>{selectedKr === null ? "Add New Key Result" :"Edit Key Result"}</p>
        <div
          className={
            "flex flex-wrap w-full  items-center  cursor-pointer "
          }
          // onClick={() => {
          //   props.setSelectedKr(props.krs[props.num]);
          //   props.setModalOpen(true);
          //   // setViewKr(!viewKr);
          // }}
        >
          <div className="flex px-2  BOX1   min-w-[15em]">
            <div className="flex flex-col normal-box-soft w-[99%]  ">
                <p className="ml-2">Title</p>

                <TextareaAutosize
                  className="w-full whitespace-normal textarea-box textarea-tw "
                  value={modalTitle}
                  placeholder="Enter Key Result Title"
                  onChange={(e) => setModalTitle(e.target.value)}
                />
              </div>
          </div>
          <div className="flex justify-center px-2 BOX2 ">
          <div className="flex flex-col p-1 normal-box-soft ">
                  <p>Status</p>

                  <div className="flex flex-col">
                    <div className="flex flex-col justify-center gap-2 px-5 py-2 max-h-[6em] flex-wrap">
                      <div className="scale-125">
                      <StatusChip setStatus={setStatus} status={status} clickable />
                      </div>
                     {/* <p className="text-xs">Click to cycle</p> */}
                    </div>
                  </div>
                </div>
          </div>
          <div className="flex justify-center px-2 BOX3 ">
          <div className="flex gap-3 p-1 normal-box-soft ">
                <div className="flex flex-col p-1 normal-box-soft ">
                  {showDate && (
                    <>
                      {" "}
                      <p>Due Date</p>
                      <DatePicker
                        className={" !rounded-xl textarea-tw !w-[7em]"}
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
                  {/* <button
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
                  </button> */}
                </div>
                </div>
          </div>
          <div className="flex justify-center px-2 BOX4 ">
          <div className="flex flex-col items-center gap-1 p-1 normal-box-soft">
                {showValues && (
                  <div className="flex gap-3 p-1 ">
                    <div className="flex flex-col p-1 normal-box-soft ">
                      <p className="ml-2">Current Value</p>

                      <div className="flex items-center gap-2">
                       {!otherType &&  <Select
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
                        />}
                         <input
                          type="number"
                          // min="0.00"
                          onFocus={(event) => event.target.select()}
                          placeholder="100"
                          value={modalValue}
                          className="textarea-box  textarea-tw w-[6em] rounded-xl h-[2.7em]   "
                          onChange={(e) => {
                            setModalValue(e.target.valueAsNumber);
                          }}
                        />
                       
                        {otherType && (
                          <TextareaAutosize
                            className=" whitespace-normal textarea-box textarea-tw w-[7em]"
                            placeholder="Units"
                            onChange={(e) => setModalValueType(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                    {/* <p>/</p> */}

                    <div className="flex flex-col p-1 normal-box-soft ">
                      <p className="ml-2">Target Value</p>

                      <div
                        className={
                          "flex items-center gap-2  " +
                          (modalValueType === "$" ? " " : " flex-row-reverse ")
                        }
                      >
                        {/* <p>{modalValueType}</p> */}
                        <input
                          type="number"
                          // min="0.00"
                          onFocus={(event) => event.target.select()}
                          placeholder="10000"
                          value={modalTargetValue}
                          className="textarea-box  textarea-tw w-[6em] rounded-xl h-[2.7em]   "
                          onChange={(e) => {
                            setModalTargetValue(e.target.valueAsNumber);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* <button
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
                </button> */}
              </div>
          </div>
          <div className="flex items-center justify-center gap-2 BOX4 ">
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
                  className=" px-3 h-[3em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-2 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                >
                  <FaSave className="text-[20px]" />
                  <p className="text-white">
                    {selectedKr !== null
                      ? "Update"
                      : "Save"}
                  </p>
                </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default KrModalOld;
