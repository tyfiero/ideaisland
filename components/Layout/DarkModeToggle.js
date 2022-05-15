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

  const toggleIcons = React.useMemo(() => ({
    unchecked: (
      <FaMoon
      className='text-[1em] text-white  !pt-[0px] -translate-y-[3px] '
       
      />
    ),
    checked: (
      <FaSun
      className='text-[1em] text-amber-300   -translate-y-[3px]'
       
      />
    ),
  }), []);

  
  return <div>
<Toggle
        className="dark-toggle fade-effect"
        defaultChecked={!darkRedux}
        icons={toggleIcons}
        onChange={darkModeFunc}
      />

  </div>;
}

export default DarkModeToggle;
