import React from 'react';
import Toggle from "react-toggle";
import { useSelector, useDispatch } from "react-redux";
import { darkMode } from "../../redux/actions";
import { FaSun, FaMoon } from "react-icons/fa";

function DarkModeToggle() {
      const darkRedux = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();


  const darkModeFunc = () => {

    if(typeof window !== "undefined"){
    const body = document.body;
    const blob = document.querySelector("body > div.blobs");
    dispatch(darkMode(!darkRedux));

    if (!darkRedux) {
      body.setAttribute("style", "background-color: RGBA(30, 41, 59, 1)");
      blob.setAttribute("style", "opacity: 0.4");
    } else {
      body.setAttribute("style", "background-color: white");
      blob.setAttribute("style", "opacity: 1");
    }
  }
  };


  
  return <div>
<Toggle
        className="dark-toggle fade-effect"
        defaultChecked={!darkRedux}
        icons={{
          unchecked: (
            <FaMoon
              style={{
                fontSize: "1em",
                color: "white",
                paddingBottom: "3px",
                paddingTop: "1px !important",
              }}
            />
          ),
          checked: (
            <FaSun
              style={{
                fontSize: "1em",
                color: "orange",
                paddingBottom: "2px",
                paddingTop: "1px !important",
              }}
            />
          ),
        }}
        onChange={darkModeFunc}
      />

  </div>;
}

export default DarkModeToggle;
