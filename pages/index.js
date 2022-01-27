import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
import React, { useState } from "react";

import TopBar from "../components/TopBar";
import Sidebar from "../components/SideBar/Sidebar";
import HomePage from "./home";
import NotePopUp from "../components/MainPage/NoteBubble/NotePopUp";
import { FaBook, FaTimes } from "react-icons/fa";
import NotePopUpModal from "../components/MainPage/NoteBubble/NotePopUpModal";
import LandingPage from "../components/LandingPage/LandingPage";
import MainPage from "../components/MainPage/MainPage";
import styled from "styled-components";
// import SentencePage from "../solutions/Sentence";

let Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  /* grid-auto-rows: 1fr; */

  grid-template-columns: 6% 93%;
  grid-template-rows: 10% 100%;
  /* gap: 2px 9px; */
  grid-template-areas:
    "logo top-bar"
    "side-nav-bar content";
`;
// This page will be rendered at the root of the website. E.g.: www.example.com/

export default function Root() {
  // // const [loadChat, setLoadChat] = useState(false);
  // // We wil load the chat only after a few seconds to speed up the page load
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoadChat(true);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);

  const [isToggled, setIsToggled] = useState(false);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const togglePopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };
  let notes = "Notes";

  return (
    <>
      <Wrapper className="wrapper">
        {/* <noscript>You need to enable JavaScript to run this app.</noscript> */}
        <div className="logo-bar">
          <TopBar />
        </div>
        <div className="top-bar"></div>

        <div className="side-nav-bar">
          <Sidebar toggle={isToggled} />
        </div>
        <div className="content">
          {/* <HomePage /> */}

          {/* <MainPage /> */}
        </div>

        <div className="notepad-container">
          {isPopUpOpen && <NotePopUpModal handleClose={togglePopup} />}

          {isPopUpOpen && <NotePopUp handleClose={togglePopup} />}
          <button className="notepad-button" onClick={togglePopup}>
            {!isPopUpOpen ? (
              <FaBook style={{ fontSize: "2.2em" }} />
            ) : (
              <FaTimes style={{ fontSize: "3.2em" }} />
            )}
            {!isPopUpOpen && notes}
          </button>
        </div>
      </Wrapper>

      {/* <LandingPage /> */}
    </>
  );
}
