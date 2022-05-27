import { useRouter } from "next/router";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { currentJourneyAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function LastSlide() {
  const router = useRouter();
  const currentJourney = useSelector((state) => state.currentJourney);
  const dispatch = useDispatch();

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick h-full
    
    "
      >
        <div className="w-full max-w-[42rem] max-h-[80vh] px-5 py-2 space-y-2  glass-box border-2 border-slate-200 bg-slate-200/60 flex flex-col items-center">
          <h1 className="text-3xl text-t-bd dark:text-blues-100">Results</h1>
          <div className="max-w-[98%] max-h-[70vh]  glass-box border-2 border-slate-200 bg-slate-200/60 overflow-y-auto">
            <div className="flex flex-col items-center w-full gap-4">
              {currentJourney.results.map((result, index) => (
                <Unit
                  key={index}
                  q={result.q}
                  step={result.step}
                  a={result.a}
                />
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute transition duration-1000 opacity-70 !rounded-3xl -inset-1 bg-gradient-to-r from-t-bd via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
            <button
              // className=" px-3 h-[3em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
              className=" px-3 w-[20em] h-[3em] glass-box text-white !border-white/0 bg-gradient-to-r from-clear-bl4 via-clear-bl4 to-clear-bl2 rounded-2xl  right-[50px] flex items-center justify-center md:hover:scale-105 transition md:active:scale-95 fade-effect cursor-pointer shadow-clear-bl3 shadow-xl m-1 drop-shadow-xl text-xl"
              onClick={() => {
                dispatch(currentJourneyAction({ results: [] }));
                router.push("/devlab/journey-explorer");
              }}
            >
              Exit
              <FaLongArrowAltRight className="ml-1 text-[24px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastSlide;

function Unit({ q, a, step }) {
  return (
    <div className="flex flex-col w-full gap-2 p-2 bg-white/50 normal-box">
      <p className="text-lg font-bold">{step + ". " + q}</p>
      <div className="p-3 normal-box bg-white/70">
        <p className="text-base">{a}</p>
      </div>
    </div>
  );
}
