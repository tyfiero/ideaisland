import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../lib/firebase";

import { HiOutlineCog } from "react-icons/hi";
import { FiShare2 } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import LogOutButton, { logOutFunction } from "../Authentication/LogOutButton";
import Modal from "./Modal";
import { MdLogout } from "react-icons/md";
import { logIn, logOutAction } from "../../redux/actions";

export default function TopBarDropDown({ setIsVisible }) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [openShareMenu, setOpenShareMenu] = useState(false);

  const dropdownRef = useRef(null);
  const darkRedux = useSelector((state) => state.darkMode);
  const userNameRedux = useSelector((state) => state.userName);
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const DropdownItem = React.forwardRef(
    (
      { onClick, href, leftIcon, rightIcon, goToMenu, children, mode = null },
      ref
    ) => {
      return (
        <div
          href={href}
          className={
            "cursor-pointer menu-item " +
            (mode ? " md:hover:bg-clear-pl2" : " md:hover:bg-clear-bl2")
          }
          onClick={() => goToMenu && setActiveMenu(goToMenu)}
        >
          <span
            className={
              "icon-button  " + (mode ? " bg-clear-pm2" : "bg-clear-bl2")
            }
          >
            {leftIcon}
          </span>
          {children}
          <span className="icon-right">{rightIcon}</span>
        </div>
      );
    }
  );

  return (
    <>
      <div
        ref={dropdownRef}
        className="dropdown fade-effect-fast md:left-[85%] lg:left-[88%] xl:left-[92%] absolute z-100 glass-box bg-white/70 dark:bg-[hsla(200,0%,5%,0.35)]   "
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
              <a onClick={() => setIsVisible(false)}>
                <div>
                  {/* <a> */}
                  <DropdownItem
                    leftIcon={
                      <FaRegUser className="text-t-bd dark:text-t-bl ml-[1px]" />
                    }
                  >
                    <p className="text-blues-700 dark:text-blues-100">
                      My Profile
                    </p>
                  </DropdownItem>
                </div>
              </a>
              {/* </a> */}
            </Link>
            <hr />
            <Link href={`/settings`} passHref>
              <a onClick={() => setIsVisible(false)}>
                <div>
                  <DropdownItem
                    leftIcon={
                      <HiOutlineCog className="scale-125 text-t-bd dark:text-t-bl" />
                    }
                    //   goToMenu="settings"
                  >
                    <p className="text-blues-700 dark:text-blues-100">
                      Settings
                    </p>
                  </DropdownItem>
                </div>
              </a>
            </Link>
            <hr />
            <Link href={`/pricing`} passHref>
              <a onClick={() => setIsVisible(false)}>
                <div>
                  <DropdownItem
                    leftIcon={
                      <BsCreditCard className=" text-t-bd dark:text-t-bl" />
                    }
                    //   goToMenu="settings"
                  >
                    <p className="text-blues-700 dark:text-blues-100">
                      Billing
                    </p>
                  </DropdownItem>
                </div>
              </a>
            </Link>
            <hr />

            {/* <Link href={`/profile`} passHref> */}
            {/* <a> */}
            <div
              onClick={() => {
                setOpenShareMenu(!openShareMenu);
                // setIsVisible(false);
              }}
            >
              {/* <a> */}
              <DropdownItem
                leftIcon={<FiShare2 className="text-t-bd dark:text-t-bl" />}
              >
                <p className=" text-blues-700 dark:text-blues-100"> Share</p>
              </DropdownItem>
            </div>
            <hr />

            <div
              onClick={() => {
                // setOpenShareMenu(!openShareMenu);
                setIsVisible(false);
                auth
                  .signOut()
                  .then(() => {
                    console.log("Sign out successful");
                    dispatch(logIn(false));
                    dispatch(logOutAction(true));

                    //   localStorage.removeItem("persist:root");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              {/* <a> */}
              <DropdownItem
                mode="signout"
                className="!bg-t-pl"
                leftIcon={
                  <MdLogout className="ml-1 text-t-pd dark:text-t-pl" />
                }
              >
                <p className=" text-pinks-700 dark:text-pinks-100"> Sign Out</p>
              </DropdownItem>
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === "settings"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
        >
          <div className="menu"></div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === "animals"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
        >
          <div className="menu"></div>
        </CSSTransition>
      </div>
      {openShareMenu && <Modal setOpenShareMenu={setOpenShareMenu} />}
    </>
  );
}
