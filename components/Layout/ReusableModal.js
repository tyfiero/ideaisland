import React from 'react'

function ReusableModal({modalOpen, setModalOpen, children, header, className}) {
  return (
      <>
    <div className="darkBG fade-effect-quick" onClick={() => setModalOpen(false)} />
    <div className="centered">
      <div
        className={
          " glass-box  shadow-2xl flex flex-col  items-center p-10 z-100 bg-white/80 dark:bg-slate-600/80 grow-effect" + className
        }
      >
        <div className={"modalHeader"}>
          <h5 className="text-2xl text-t-bd dark:text-blues-100">{header}</h5>
        </div>
        <button className="closeBtn" onClick={() => setModalOpen(false)}>
          X
        </button>
        <div className="modalContent">
        {children}
        </div>
        </div>
        
        
        </div>

        </>
  )
}

export default ReusableModal