import styled from "styled-components";
import TopBar from "./TopBar";
import Sidebar from "./SideBar/Sidebar";
import Sidebar2 from "./SideBar/SidebarRebuild";

import NotePopUp from "./MainPage/NoteBubble/NotePopUp";
import NotePopUpModal from "./MainPage/NoteBubble/NotePopUpModal";
import React, { useEffect, useState } from "react";
import { FaBook, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import collectAnalyticsEvent from "./Analytics/collectAnalyticsEvent";
import { darkMode } from "../redux/actions";
import Toggle from "react-toggle";



export default function Layout({ children }) {
  const loggedIn = useSelector((state) => state.loggedIn);

  const darkRedux = useSelector((state) => state.darkMode);

  const [isToggled, setIsToggled] = useState(false);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const dispatch = useDispatch();

  const togglePopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };
  let notes = "Notes";

  // useEffect(() => {
  const darkModeFunc = () => {
    const body = document.body;
    const blob = document.querySelector("body > div.blobs");
    dispatch(darkMode(!darkRedux));

    if (!darkRedux) {
      body.setAttribute("style", "background-color: black");
      blob.setAttribute("style", "opacity: 0.4");
    } else {
      body.setAttribute("style", "background-color: white");
      blob.setAttribute("style", "opacity: 1");
    }
  };
  // useEffect(() => {

  // }, []);

  // console.log(document.body);

  let login = (
    <div className="hidden loginbutton md:block md:space-x-6 fade-effect">
      <Link href="/login">
        <a
          onClick={() =>
            collectAnalyticsEvent({
              eventName: "login",
            })
          }
          className="px-3 py-2 font-medium rounded-full text-blues-600 hover:text-blues-500 bg-blues-100"
        >
          Sign in
        </a>
      </Link>
    </div>
  );

  let profilePic = (
    <div className="profile-pic-cropper">
      <img
        className="fade-effect profile-pic "
        src="https://proficon.stablenetwork.uk/api/identicon/ty.svg"
        alt="Identicons Profile Icon"
      />
    </div>
  );

  return (
    <>
      <div
        className="wrapper"
        // style={
        //   darkRedux
        //     ? { backgroundColor: "white" }
        //     : { backgroundColor: "black" }
        // }
      >
        {/* <div className="background blur"></div> */}
        {/* <noscript>You need to enable JavaScript to run this app.</noscript> */}
        <div className="logo-bar">
          <TopBar />
        </div>
        <div className="top-bar">
          {loggedIn ? profilePic : login}

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
        </div>

        <div className="side-nav-bar">
          {/* <Sidebar toggle={isToggled} />
           */}
          <Sidebar2 toggle={isToggled} />
        </div>
        <div className="fade-effect-quick">
        <main>{children}</main>
        </div>
        <div className="notepad-container">
          {isPopUpOpen && <NotePopUpModal handleClose={togglePopup} />}

          {isPopUpOpen && <NotePopUp handleClose={togglePopup} />}
          <button className="notepad-button fade-effect" onClick={togglePopup}>
            {!isPopUpOpen ? (
              <FaBook style={{ fontSize: "2.2em" }} />
            ) : (
              <FaTimes style={{ fontSize: "3.2em" }} />
            )}
            {!isPopUpOpen && notes}
          </button>
        </div>
      </div>
    </>
  );
}
