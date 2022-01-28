import styled from "styled-components";
import TopBar from "./TopBar";
import Sidebar from "./SideBar/Sidebar";
import Sidebar2 from "./SideBar/SidebarRebuild";

import NotePopUp from "./MainPage/NoteBubble/NotePopUp";
import NotePopUpModal from "./MainPage/NoteBubble/NotePopUpModal";
import React, { useState } from "react";
import { FaBook, FaTimes } from "react-icons/fa";

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

export default function Layout({ children }) {
  const [isToggled, setIsToggled] = useState(false);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const togglePopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };
  let notes = "Notes";
  return (
    <>
      <Wrapper className="wrapper">
        <div className="background blur"></div>
        {/* <noscript>You need to enable JavaScript to run this app.</noscript> */}
        <div className="logo-bar">
          <TopBar />
        </div>
        <div className="top-bar"></div>

        <div className="side-nav-bar">
          {/* <Sidebar toggle={isToggled} />
           */}
          <Sidebar2 toggle={isToggled} />
        </div>
        <main>
          {children}
        </main>
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
    </>
  );
}
