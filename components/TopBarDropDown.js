import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { FaUserAlt, FaCog, FaBook, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
// import { auth } from "../lib/firebase";

export default function TopBarDropDown({ user }) {
  const [activeMenu, setActiveMenu] = useState("main");
  // const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

//   console.log(user);
  // useEffect(() => {
  //   setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  // }, [])

  // function calcHeight(el) {
  //   const height = el.offsetHeight;
  //   setMenuHeight(height);
  // }

  const DropdownItem =  React.forwardRef(({ onClick, href, leftIcon, rightIcon, goToMenu, children}, ref) => {
    return (
      <a
        href={href}
        className="menu-item"
        onClick={() => goToMenu && setActiveMenu(goToMenu)}
      >
        <span className="icon-button">{leftIcon}</span>
        {children}
        <span className="icon-right">{rightIcon}</span>
      </a>
    );
  })

  return (
    <div
      className="dropdown fade-effect-quick md:left-[85%] lg:left-[88%] xl:left-[92%] absolute"
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className="menu">
          {/* <Link href={`/${user.username}`}> */}
          <Link href="/user/priceart" passHref>

            {/* <a> */}
              <DropdownItem leftIcon={<FaUserAlt className="text-t-bl" />}>
                My Profile
              </DropdownItem>
            {/* </a> */}
          </Link>
          <Link href="/user/priceart/settings" passHref>

          <DropdownItem
            leftIcon={<FaCog className="text-t-bd" />}
            //   goToMenu="settings"
          >
            Settings
          </DropdownItem>
          </Link>

          <Link href="/notes" passHref>

          <DropdownItem
            leftIcon={<FaBook className="text-t-pd" />}
            //   goToMenu="settings"
          >
            Ideas + Notes
          </DropdownItem>
          </Link>

          <div className="flex flex-col items-center pt-5">
            <p>Dark Mode</p>

            <DarkModeToggle />
          </div>
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
          <DropdownItem goToMenu="main" leftIcon={<FaUserAlt />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<FaUserAlt />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<FaUserAlt />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<FaUserAlt />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<FaUserAlt />}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<FaUserAlt />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
