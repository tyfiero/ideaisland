import React, { useEffect, useState } from "react";
import {
  FaShareSquare,
  FaChevronLeft,
  FaChevronRight,
  FaRedo,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../Layout/Modal";
import ReusableModal from "../../Layout/ReusableModal";
function ToolBar({SW}) {
  const sFormRedux = useSelector((state) => state.sForm);
  const sUpdate = useSelector((state) => state.sUpdate);
  const {idea} = useSelector((state) => state.sForm);
  const [ideaBar, setIdeaBar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openShareMenu, setOpenShareMenu] = useState(false);
  useEffect(() => {

    if(sFormRedux.idea?.title){
      // console.log("idea")
      setIdeaBar(sFormRedux.idea.title)
    }else{
      setIdeaBar(null)
    }
  },[sUpdate]);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-t-0 shadow-xl bg-white/30">
      <div className="flex justify-between w-full h-full bg-gradient-to-l from-clear-pl2">
   {modalOpen &&   <ReusableModal modalOpen={modalOpen} setModalOpen={setModalOpen} header="Start Over">  

   <div className="flex flex-col items-center">
      <p>Are you sure you want to start over? Changes may not be saved</p>
      <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick !w-[14em] gap-3 mt-5"
                onClick={() => {SW?.goToStep(1)
                setModalOpen(false)
                }}
              >
                <FaRedo className="mr-1 text-[24px]" />
                Yes, Start Over
              </button>
              </div>
    </ReusableModal>}

    {openShareMenu && <Modal setOpenShareMenu={setOpenShareMenu} />}
    
      {ideaBar ? ( <div className="whitespace-nowrap flex w-[30em] ml-4 fade-effect-quick"><p className="text-t-bl">Current Idea: </p><p className="ml-2 truncate text-t-pd">{ideaBar}</p></div>) : <div></div>}
      
    <div className="flex justify-end text-xl fade-effect-quick">
      <div className="flex gap-5 py-1 pl-3 pr-5 text-xl">
        <FaRedo className="cursor-pointer text-t-bd md:hover:scale-110"   onClick={() => setModalOpen(!modalOpen)}/>
        <FaChevronLeft className="cursor-pointer text-t-pm md:hover:scale-110" onClick={SW?.previousStep}/>
        <FaChevronRight className="cursor-pointer text-t-bl md:hover:scale-110" onClick={SW?.nextStep}/>
        <FaShareSquare className="cursor-pointer text-t-bd md:hover:scale-110"  onClick={() => {
                setOpenShareMenu(!openShareMenu);
              }}/>
      </div>
    </div>
    </div>
    </div>

  );
}

export default ToolBar;
