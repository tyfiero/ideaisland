import React from "react";
import { FaTimes } from "react-icons/fa";
// import { useSelector } from "react-redux";

function ChipTechStackDisplay({ kind, name, cost, type }) {
//   const [clicked, setClicked] = React.useState(false);
//   const pFormRedux = useSelector((state) => state.pForm);
//   React.useEffect(() => {
//     if (reset) {
//       setClicked(false);
//     }
//   }, [reset]); // eslint-disable-line react-hooks/exhaustive-deps

//   React.useEffect(() => {
//     let find = pFormRedux.whyOptions?.includes(name);
//     if (find) {
//       setClicked(true);
//     } else {
//       setClicked(false);
//     }
//   }, [load]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      className={
        " h-[3.5em] rounded-xl px-2 flex flex-col items-center justify-center gap-1 drop-shadow-xl   md:transition-transform  bg-gradient-to-b from-white via-blue-200 to-blue-400 text-slate-700 -z-[1]"
      }
    //   onClick={(e) => {
    //     setClicked(!clicked);
    //   }}
    //   value={name}
    >
     <div>
     <p>{name}</p> 
         </div>
         <div>
     <p className="text-xs lowercase">{cost > 0 ? ("$" + cost + " " + type) : "Free"}</p> 
         </div>
      {/* {clicked ? (
        <span className="absolute flex items-center justify-center w-5 h-5 leading-none text-center text-black bg-blue-200 rounded-full -top-2 -left-2">
          <FaTimes className="text-blue-700" />
        </span>
      ) : null} */}
    </div>
  );
}

export default ChipTechStackDisplay;
