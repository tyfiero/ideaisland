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

function ProjectModal({
  modalOpen,
  setModalOpen,
  className,
  setProjects,
  projects,
}) {
  const [modalTitle, setModalTitle] = React.useState("");
  const [route, setRoute] = React.useState("");
  const [modalDescription, setModalDescription] = React.useState("");
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [color, setColor] = React.useState(" bg-sky-400/60");

  return (
    <>
      <div
        // className=" fade-effect-quick bg-black/30 z-[80] fixed md:-top-[10em] md:-left-[10em] sm:w-[100.7vw] md:w-[103vw] lg:w-[100.9vw] xl:w-[100vw] h-[100vh] overflow-hidden"
        className=" fade-effect-quick darkBG bg-black/30 z-[80] absolute top-0 left-0 w-full  overflow-hidden"
        onClick={() => setModalOpen(false)}
      />
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
                        Any idea you are considering pursuing should become a
                        project. This allows you to add validation metrics and
                        track progress.
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
              <p className="text-2xl font-bold">Create New Project</p>

              <div className="flex flex-col normal-box-soft w-[80%] bg-clear-bl3 ">
                <p className="ml-2 text-lg font-bold">Title</p>

                <TextareaAutosize
                  className="w-full text-xl font-bold whitespace-normal textarea-box textarea-tw"
                  value={modalTitle}
                  placeholder="Enter Project Title"
                  onChange={(e) => {
                    setModalTitle(e.target.value);
                    let trim = e.target.value.trim();
                    let rmvSpace = trim.replace(/\s+/g, "-").toLowerCase();
                    let encode = encodeURI(rmvSpace);
                    console.log(encode);
                    setRoute(encode);
                  }}
                />
              </div>
              <div className="flex flex-col normal-box-soft w-[90%] bg-clear-bl2 p-1">
                <p className="ml-2">Description</p>

                <TextareaAutosize
                  className="w-full whitespace-normal textarea-box textarea-tw "
                  value={modalDescription}
                  placeholder="Enter Description"
                  onChange={(e) => setModalDescription(e.target.value)}
                />
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
                    if (projects.length === 0) {
                      setProjects([
                        {
                          title: modalTitle,
                          description: modalDescription,
                          imgSrc:
                            "https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
                          route: route,
                          bColor: "",
                          color: color,
                          num: 0,
                        },
                      ]);
                    } else {
                      setProjects([
                        ...projects,
                        {
                          title: modalTitle,
                          description: modalDescription,
                          imgSrc:
                            "https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
                          route: route,
                          bColor: "",
                          color: color,
                          num: projects.length,
                        },
                      ]);
                    }
                    setModalTitle("");
                    // setModalContent("");
                    setColor(" bg-sky-400/60");
                    setModalOpen(false);
                  }}
                  className=" w-[12em] h-[3em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                >
                  <FaSave className="text-[20px]" />
                  <p className="text-white">Create Project</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectModal;
