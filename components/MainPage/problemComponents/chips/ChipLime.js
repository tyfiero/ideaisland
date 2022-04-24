import React from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

function ChipLime({ icon, text, cN = " w-fit ", updateButton, reset, load }) {
  const [clicked, setClicked] = React.useState(false);
  const pFormRedux = useSelector((state) => state.pForm);
  React.useEffect(() => {
    if (reset) {
      setClicked(false);
    }
  }, [reset]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    let find = pFormRedux.whyOptions?.includes(text);
    if (find) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [load]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <button
      className={
        " h-[2em] rounded-3xl px-2 flex items-center justify-center gap-1 drop-shadow-xl  md:hover:scale-[102%] md:transition-transform md:active:scale-95 cursor-pointer  " +
        cN +
        (clicked
          ? " border-4 border-lime-700 bg-lime-400 text-white"
          : "bg-lime-200 text-slate-700")
      }
      onClick={(e) => {
        setClicked(!clicked);
        updateButton(text, clicked ? "1" : "0");
      }}
      value={text}
    >
      {icon} {text}
      {clicked ? (
        <span className="absolute flex items-center justify-center w-5 h-5 leading-none text-center text-black rounded-full bg-lime-200 -top-2 -left-2">
          <FaTimes className="text-lime-700" />
        </span>
      ) : null}
    </button>
  );
}

export default ChipLime;
