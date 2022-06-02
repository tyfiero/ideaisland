import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { ProgressBar } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import KeyResult from "./KeyResult";
import KrModal from "./KrModal";
import KrTableTopper from "./KrTableTopper";

function Objective(props) {
  const [progress, setProgress] = React.useState(50);

  const [krs, setKrs] = React.useState([]);
  const [krProgress, setKrProgress] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedKr, setSelectedKr] = React.useState(null);

  useEffect(() => {
    if (!modalOpen && selectedKr !== null) {
      setSelectedKr(null);
    }
  }, [modalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!modalOpen && selectedKr !== null) {
      setSelectedKr(null);
    }
  }, [krProgress]); // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <>
      <div className={"flex flex-col items-center w-full glass-box " + props.color[0]}>
        <div className="flex justify-between w-full px-4">
          <p className="text-2xl font-extrabold">{props.title}</p>

          <div className="flex items-center gap-2">
            <div className="w-[10em]  shadow-3xl shadow-t-bl">
              <ProgressBar
                percent={progress}
                filledBackground={props.color[2]}
                unfilledBackground={props.color[1]}
              />
            </div>

            <p className="font-bold">{progress}%</p>
          </div>
        </div>
        {/* <hr className="w-[97%] border-clear-bl4" /> */}
        <div className="relative flex flex-col items-center justify-center w-full gap-1 glass-box fade-effect-quick min-h-[3em]">
          <div className="flex flex-col justify-start w-full ml-5 mt-7">
            <h2 className="absolute top-0 text-base left-1 nun text-t-bd dark:text-blues-100">
              Key Results:
            </h2>
            {krs.length === 0 && !modalOpen ? <p>No Key Results yet</p> : <KrTableTopper />}

            {krs.map((kr, index) => (
              <KeyResult
                title={kr.title}
                // description={kr.description}
                status={kr.status}
                value={kr.value}
                target={kr.target}
                type={kr.type}
                key={index}
                num={index}
                setModalOpen={setModalOpen}
                color={props.color}
                date={kr.date}
                setSelectedKr={setSelectedKr}
                setKrProgress={setKrProgress}
                krs={krs}
              />
            ))}
             {modalOpen && (
        <KrModal
          setModalOpen={setModalOpen}
          className=" !py-2"
          krs={krs}
          setKrs={setKrs}
          selectedKr={selectedKr}
          setSelectedKr={setSelectedKr}
        />
      )}
          </div>

          <div className="absolute right-0 -top-1">
            <div className="relative mt-2 group">
              <div className="absolute transition duration-1000 rounded-full opacity-25 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
              {/* <div className="relative flex justify-start rounded-lg ring-1 items-top"> */}

              <button
                // type="submit"
                // disabled={!isValid}
                onClick={() => {
                  // setObjectives([...objectives, { name: "title 1", progress: "50" }]);
                  setModalOpen(!modalOpen);
                  setSelectedKr(null);
                }}
                className=" px-2 h-[2em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
              >
                <FaPlus className="text-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Objective;
