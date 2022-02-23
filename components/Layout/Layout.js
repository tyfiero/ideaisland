import styled from "styled-components";
import TopBar from "./TopBar";
import TopBarRight from "./TopBarRight";
import Sidebar from "../SideBar/Sidebar";
import Sidebar2 from "../SideBar/SidebarRebuild";
import { FaBook, FaTimes } from "react-icons/fa";

import NotePopUp from "../MainPage/NoteBubble/NotePopUp";
import NotePopUpModal from "../MainPage/NoteBubble/NotePopUpModal";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, userDataRedux } from "../../redux/actions";
import { useUserData } from "../../lib/hooks";
// import firebase from "firebase/compat";
import { auth } from "../../lib/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "firebase/compat/app";
import {  onAuthStateChanged } from "firebase/auth";

// import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CircleTimer from "./Timer";
import { Toaster } from "react-hot-toast";
// import Loader from "./Loader";
import FullLoader from "./FullLoader";

export default function Layout({ children }) {
  // console.log("Layout Rerendered")

  const userData = useUserData();

  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(false);

  const loggedIn = useSelector((state) => state.loggedIn);
  const userRedux = useSelector((state) => state.userData);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const togglePopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  let user;
  
  



useEffect(() => {
  // console.log(userRedux);
  console.log("TOP useEffect");

if(userRedux === undefined || userRedux === null){
  setLoading(true)
  if (localStorage.getItem("userLocal") !== null || localStorage.getItem("userLocal") !== undefined) {
    let localStorageUser = JSON.parse(localStorage.getItem("userLocal"));
    console.log(localStorageUser)
  dispatch(userDataRedux(localStorageUser));
  dispatch(logIn(true));

  // user = userRedux;
     
  // setLoading(false);
  // console.log("NO MORE LOADING");

  }
}else{
  console.log("redux user is defined :D")
  user = userRedux;
}

}, [userRedux]);

// auth.onAuthStateChanged(userObjFromAuthStateFunc => {
//   if (userObjFromAuthStateFunc) {
    // console.log("state = definitely signed in")
    // console.log(userTest3)
    // localStorage.setItem("userLocal", JSON.stringify(userObjFromAuthStateFunc));
    
    // dispatch(userDataRedux(userTest3));
   


  // }
  // else {
  //   // console.log("state = definitely signed out")
  // }
// })

  useEffect(() => {
  // console.log("USEEFFECT Layout Rerendered")
  // console.timeEnd("redux")

  // console.time("redux")

if (userData.user !== null) {
  user = userData.user;
  // console.log(user);


  // localStorage.setItem("userLocal", JSON.stringify(user));
  dispatch(userDataRedux(user));

  if (!loggedIn) {
    // dispatch(logIn(true));
  }
} else {
  if (localStorage.getItem("userLocal") !== null) {
  user = localStorage.getItem("userLocal");

  //   // console.log("USERDATA EXISTS");
  //   // user = JSON.parse(localStorage.getItem("userLocal"));
  //   // console.log(user);


    dispatch(userDataRedux(user));

  } else {
    console.log("NOT logged in");
    user = {
      username: "notSignedIn",
    };
  }
    // dispatch(logIn(false));
  
}
 
    // setIsLoggedIn(true)
  }, [userData]);

    








  
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
        <div><Toaster/></div>
        <div className="logo-bar">
          <TopBar />
        </div>
        <div className="top-bar">
         {/* {loading ? <FullLoader />: <TopBarRight user={user} />} */}
         <TopBarRight user={userRedux} />
        </div>

        <div className="side-nav-bar">
          {/* <Sidebar toggle={isToggled} />
           */}
           <Sidebar2 toggle={isToggled} />
           <CircleTimer />
    
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