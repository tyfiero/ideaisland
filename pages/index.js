// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import React, { useState } from "react";
// import TopBar from "../components/TopBar";
// import Sidebar from "../components/SideBar/Sidebar";
// import HomePage from "./Home";
// import NotePopUp from "../components/MainPage/NoteBubble/NotePopUp";
import Dashboard from "../components/MainPage/dashboard/Dashboard";
// import 'dotenv/config'
// import express from 'express'
// This page will be rendered at the root of the website. E.g.: www.example.com/

export default function Root() {
  return (
    <>
      <Dashboard />
    </>
  );
}
