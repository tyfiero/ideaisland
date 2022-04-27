import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";

function ToolTip({ id, place, text }) {
  const [type, setType] = useState("dark");
  const darkRedux = useSelector((state) => state.darkMode);

  useEffect(() => {
    if (darkRedux) {
      setType("light");
    } else {
      setType("dark");
    }
  }, [darkRedux]);

  return (
    <ReactTooltip
      id={id}
      place={place || "bottom"}
      type={type}
      className="!rounded-lg "
      effect="solid"
      delayShow={300}
    >
      <p className={type === "dark" ? "text-slate-50" : "text-slate-700"}>
        {text}
      </p>
    </ReactTooltip>
  );
}

export default ToolTip;
