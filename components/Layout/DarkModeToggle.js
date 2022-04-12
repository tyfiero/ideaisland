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
    dispatch(darkMode(!darkRedux));
    localStorage.setItem("darkMode", darkRedux);
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
