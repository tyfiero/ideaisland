import React, { useEffect, useState } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import {
  FaShareSquare,
  FaChevronLeft,
  FaChevronRight,
  FaRedo,
  FaLongArrowAltLeft,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Layout/Modal";
import ReusableModal from "../Layout/ReusableModal";
function ThoughtToolBar({ SW, setPlay, fullScreen, setFullScreen }) {
  const sFormRedux = useSelector((state) => state.sForm);
  const sUpdate = useSelector((state) => state.sUpdate);

  const { idea } = useSelector((state) => state.sForm);

  const [ideaBar, setIdeaBar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openShareMenu, setOpenShareMenu] = useState(false);


  useEffect(() => {

    if (sFormRedux.idea?.title) {
      setIdeaBar(sFormRedux.idea.title);
    } else {
      setIdeaBar(null);
    }
  }, [sUpdate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={
        "sticky  z-40 flex items-center justify-between border-t-0 shadow-xl  " +
        (fullScreen ? "" : "top-0 bg-white/30")
      }
    >
      <div
        className={
          "flex justify-between w-full h-full   " +
          (fullScreen
            ? " bg-gradient-to-b from-clear-pl2 via-slate-500/40"
            : " bg-gradient-to-l from-clear-pl2")
        }
      >
        <div className="flex justify-start text-xl fade-effect-quick">
          <button
            className="flex items-center gap-2 px-3 py-1 my-1 ml-3 text-sm transition rounded-lg nun bg-clear-pl4 hover:scale-105 active:scale-95"
            onClick={() => {
              setPlay(false);
            }}
          >
            <FaLongArrowAltLeft /> Back to Builder
          </button>
        </div>
        {modalOpen && (
          <ReusableModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            header="Start Over"
          >
            <div className="flex flex-col items-center">
              <p>
                Are you sure you want to start over? Changes may not be saved
              </p>
              <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick !w-[14em] gap-3 mt-5"
                onClick={() => {
                  SW?.goToStep(1);
                  setModalOpen(false);
                }}
              >
                <FaRedo className="mr-1 text-[24px]" />
                Yes, Start Over
              </button>
            </div>
            {/* <img src="ii-palm.png" alt="" /> */}
          </ReusableModal>
        )}

        {openShareMenu && <Modal setOpenShareMenu={setOpenShareMenu} />}

        {ideaBar ? (
          <div className="whitespace-nowrap flex w-[30em] ml-4 fade-effect-quick">
            <p className="text-t-bl">Current Idea: </p>
            <p className="ml-2 truncate text-t-pd">{ideaBar}</p>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex justify-end text-xl fade-effect-quick">
          <div className="flex gap-5 py-1 pl-3 pr-5 text-xl">
            <p className="text-sm">
              Step: {SW?.currentStep} / {SW?.totalSteps}
            </p>
            {fullScreen ? (
              <AiOutlineFullscreenExit
                onClick={() => setFullScreen(!fullScreen)}
                className="scale-125 cursor-pointer text-t-pm md:hover:scale-110"
              />
            ) : (
              <AiOutlineFullscreen
                onClick={() => setFullScreen(!fullScreen)}
                className="scale-125 cursor-pointer text-t-pm md:hover:scale-110"
              />
            )}
            <FaRedo
              className={
                "cursor-pointer  md:hover:scale-110 " +
                (fullScreen ? " text-blues-200" : "text-t-bd  ")
              }
              onClick={() => setModalOpen(!modalOpen)}
            />
            <FaChevronLeft
              className="cursor-pointer text-t-pm md:hover:scale-110"
              onClick={SW?.previousStep}
            />
            <FaChevronRight
              className="cursor-pointer text-t-bl md:hover:scale-110"
              onClick={SW?.nextStep}
            />
            <FaShareSquare
              className={
                "cursor-pointer  md:hover:scale-110 " +
                (fullScreen ? " text-blues-200" : "text-t-bd  ")
              }
              onClick={() => {
                setOpenShareMenu(!openShareMenu);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThoughtToolBar;
