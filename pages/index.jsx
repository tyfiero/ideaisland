import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
import React, { useState } from "react";
// import TopBar from "../components/TopBar";
// import Sidebar from "../components/SideBar/Sidebar";
import HomePage from "./Home";
import NotePopUp from "../components/MainPage/NoteBubble/NotePopUp";
import { FaBook, FaTimes } from "react-icons/fa";
import NotePopUpModal from "../components/MainPage/NoteBubble/NotePopUpModal";
import LandingPage from "../components/LandingPage/LandingPage";
import MainPage from "../components/MainPage/MainPage";
// import styled from "styled-components";
import HelpPage from "./Help";
import ImplementationPage from "./Index";
// import {SentencePage} from "./pages/solutions/Sentence.js";
import SentencePage from "./Solutions/Sentence";
import CombinatorialPage from "./Solutions/Combinatorial";
import AIPage from "./Solutions/Ai";
import SolutionsPageIndex from "./Solutions";
import ProblemPageIndex from "./Problem";

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

  return (
    <>
      <div className="content">
        <HomePage />
        <SolutionsPageIndex />
        <SentencePage />
        <CombinatorialPage />
        <AIPage />
        <ProblemPageIndex />
        <ImplementationPage />
        <HelpPage />

        <MainPage />
      </div>

      {/* <LandingPage /> */}
    </>
  );
}
