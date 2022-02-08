import styled from "styled-components";
import TopBar from "./TopBar";
import TopBarRight from "./TopBarRight";
import Sidebar from "./SideBar/Sidebar";
import Sidebar2 from "./SideBar/SidebarRebuild";
import { FaBook, FaTimes } from "react-icons/fa";

import NotePopUp from "./MainPage/NoteBubble/NotePopUp";
import NotePopUpModal from "./MainPage/NoteBubble/NotePopUpModal";
import React, { useEffect, useState } from "react";


export default function Layout({ children }) {
  

  const [isToggled, setIsToggled] = useState(false);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const togglePopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };
  let notes = "Notes";

  // useEffect(() => {

  // useEffect(() => {

  // }, []);

  // console.log(document.body);





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
        <TopBarRight />
     
        </div>

        <div className="side-nav-bar">
          {/* <Sidebar toggle={isToggled} />
           */}
          <Sidebar2 toggle={isToggled} />
        </div>
        <div className="fade-effect-quick content">
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
