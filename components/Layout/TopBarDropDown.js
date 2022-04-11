import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import {
  FaUserAlt,
  FaCog,
  FaBook,
  FaRegLightbulb,
  FaLightbulb,
  FaFileExport,
  FaShareAlt,
  FaRegUser,
} from "react-icons/fa";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";
// import { auth } from "../lib/firebase";
import { HiOutlineCog } from "react-icons/hi";
import { FiShare2 } from "react-icons/fi";



import Modal from "./Modal";

export default function TopBarDropDown() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [openShareMenu, setOpenShareMenu] = useState(false);

  // const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const darkRedux = useSelector((state) => state.darkMode);
  const userNameRedux = useSelector((state) => state.userName);

  //   console.log(user);
  // useEffect(() => {
  //   setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  // }, [])

  // function calcHeight(el) {
  //   const height = el.offsetHeight;
  //   setMenuHeight(height);
  // }




  
  // eslint-disable-next-line
  const DropdownItem = React.forwardRef(
    ({ onClick, href, leftIcon, rightIcon, goToMenu, children }, ref) => {
      return (
        <div
          href={href}
          className="cursor-pointer menu-item md:hover:bg-clear-bl2"
          onClick={() => goToMenu && setActiveMenu(goToMenu)}
        >
          <span className="icon-button bg-clear-bl2">{leftIcon}</span>
          {children}
          <span className="icon-right">{rightIcon}</span>
        </div>
      );
    }
  );

  return (
    
    <>
    <div
      className="dropdown fade-effect-fast md:left-[85%] lg:left-[88%] xl:left-[92%] absolute z-100 glass-box "
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className=" menu">
          {/* <Link href={`/${user.username}`}> */}

          <Link href={`/profile`} passHref>
            <a>
              <div>
                {/* <a> */}
                <DropdownItem leftIcon={<FaRegUser className="text-t-bd ml-[1px]" />}>
                  
                <p className="text-blues-700">My Profile</p>  

                </DropdownItem>
              </div>
            </a>
            {/* </a> */}
          </Link>
          <hr/>
          <Link href={`/settings`} passHref>
            <a>
              <div>
                <DropdownItem
                  leftIcon={<HiOutlineCog className="scale-125 text-t-bd" />}
                  //   goToMenu="settings"
                >
                <p className="text-blues-700">Settings</p>  
                </DropdownItem>
              </div>
            </a>
          </Link>
          <hr/>

         

          {/* <Link href={`/profile`} passHref> */}
            {/* <a> */}
              <div onClick={()=>{setOpenShareMenu(!openShareMenu)}}>
                {/* <a> */}
                <DropdownItem leftIcon={<FiShare2 className="text-t-bd" />}>
                 
                <p className=" text-blues-700"> Share</p>  

                </DropdownItem>
              </div>
            {/* </a> */}
            {/* </a> */}
          {/* </Link> */}
          
          {/* <DropdownItem
            leftIcon="🦧"
            rightIcon={<FaUserAlt />}
            goToMenu="animals"
          >
            Animals
          </DropdownItem> */}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="menu">
          {/* <DropdownItem goToMenu="main" leftIcon={<FaUserAlt />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<FaUserAlt />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<FaUserAlt />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<FaUserAlt />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<FaUserAlt />}>Awesome!</DropdownItem> */}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="menu">
          {/* <DropdownItem goToMenu="main" leftIcon={<FaUserAlt />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem> */}
        </div>
      </CSSTransition>
    </div>
    {openShareMenu && <Modal setOpenShareMenu={setOpenShareMenu} />}
    </>
  );
}
