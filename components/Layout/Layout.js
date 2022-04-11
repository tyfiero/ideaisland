import styled from "styled-components";
import TopBar from "./TopBar";
import TopBarRight from "./TopBarRight";
import Sidebar2 from "../Sidebar/SidebarRebuild";
import { FaBook, FaPlus, FaTimes } from "react-icons/fa";

import NotePopUp from "../MainPage/NoteBubble/NotePopUp";
import NotePopUpModal from "../MainPage/NoteBubble/NotePopUpModal";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { logIn, userDataRedux } from "../../redux/actions";
import { useUserData } from "../../lib/hooks";
// import firebase from "firebase/compat";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import { onAuthStateChanged } from "firebase/auth";
import {
  userNameAction,
  userPhotoAction,
  userDisplayNameAction,
  userUIDAction,
  logIn,
} from "../../redux/actions";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CircleTimer from "./Timer";
import { Toaster } from "react-hot-toast";
// import Loader from "./Loader";
import FullLoader from "./FullLoader";
import { isMobile } from "react-device-detect";
import { Router } from "next/router";
import { useRouter } from "next/router";

import FullSidebar from "../Sidebar/FullSidebar";

export default function Layout({ children }) {
  // console.log("Layout Rerendered")
  const router = useRouter();

  const userData = useUserData();

  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(false);

  const loggedIn = useSelector((state) => state.loggedIn);
  const userUIDRedux = useSelector((state) => state.userUID);
  const userPhotoRedux = useSelector((state) => state.userPhoto);
  const userDisplayNameRedux = useSelector((state) => state.userDisplayName);

  const userNameRedux = useSelector((state) => state.userName);
  // console.log(userNameRedux + "unr")

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const togglePopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  // let user;

  useEffect(() => {
    //if mobile, redirect to mobile page
    if (isMobile) {
      router.push("/mobile");
    }

    const sliceHsl = (fullString) =>{
      let sliced = fullString.slice(5);
  let slicedAgain = sliced.slice(0, -7);
  return slicedAgain;
  }
  const sliceHslAlpha = (fullString) =>{
      let sliced = fullString.slice(5);
  let slicedAgain = sliced.slice(0, -3);
  return slicedAgain;
  }
    //set bg opacity
    let opacityNum = localStorage.getItem("colorOpacity") || 0.6;

    document.documentElement.style.setProperty("--blobOpacity", opacityNum);
    //set bg colors
    let blobc1 = localStorage.getItem("blob1") || "hsla(206,91%,64%,1)";
    let blobc2 = localStorage.getItem("blob2") || "hsla(224,64%,40%,1)";
    let blobc3 = localStorage.getItem("blob3") || " hsla(319,100%,37%,1)";
    let blobc4 = localStorage.getItem("blob4") || "hsla(284,94%,88%,1)";
    let blobc5 = localStorage.getItem("blob5") || "hsla(178,100%,50%,1)";
    let blobc6 = localStorage.getItem("blob6") || "hsla(312,59%,61%,1)";

    document.documentElement.style.setProperty("--blob1", blobc1);
    document.documentElement.style.setProperty("--colorDark1", blobc1);
    document.documentElement.style.setProperty("--colorDark1HslBase", sliceHsl(blobc1));
    document.documentElement.style.setProperty("--colorDark1base", sliceHslAlpha(blobc1));

    
    document.documentElement.style.setProperty("--blob2", blobc2);
    document.documentElement.style.setProperty("--colorDark2", blobc2);
    document.documentElement.style.setProperty("--colorDark2base", sliceHslAlpha(blobc2));

    
    document.documentElement.style.setProperty("--blob3", blobc3);
    document.documentElement.style.setProperty("--colorLight2", blobc3);
    document.documentElement.style.setProperty("--colorLight2base", sliceHslAlpha(blobc3));
    
    document.documentElement.style.setProperty("--blob4", blobc4);
    document.documentElement.style.setProperty("--colorLight1", blobc4);
    document.documentElement.style.setProperty("--colorLight1base", sliceHslAlpha(blobc4));
    document.documentElement.style.setProperty("--colorLight1HslBase", sliceHsl(blobc4));
    
    document.documentElement.style.setProperty("--blob5", blobc5);
    document.documentElement.style.setProperty("--colorPop", blobc5);

    
    document.documentElement.style.setProperty("--blob6", blobc6);
    document.documentElement.style.setProperty("--colorLight3", blobc6);
    document.documentElement.style.setProperty("--colorLight3base", sliceHslAlpha(blobc6));


    //set img
  let img1 = localStorage.getItem("bgImg") || "";
  document.querySelector('body').style.backgroundImage = (`url(${img1})`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if(typeof window === "undefined"){
  //   // console.log("SERVER DATA")
  //   // console.log(userData)
  //   // console.log(auth.currentUser)

  // }

  // useEffect(() => {
  //   //Dear GOD please clean this code up. Im getting anxiety just looking at it @auth. UPDATE: I dont think  I need any of this code now that persistence is in place. This was my shitty workaround to redux persist.
  //   // console.log(userRedux);
  //   // console.log("TOP useEffect");

  //   if (userUIDRedux === undefined || userUIDRedux === null) {
  //     setLoading(true);
  //     if (
  //       localStorage.getItem("userLocal") !== null ||
  //       localStorage.getItem("userLocal") !== undefined
  //     ) {
  //       let localStorageUser = JSON.parse(localStorage.getItem("userLocal"));
  //       console.log(localStorageUser);
  //       // dispatch(userDataRedux(localStorageUser));
  //       dispatch(logIn(true));

  //       // user = userRedux;

  //       // setLoading(false);
  //       // console.log("NO MORE LOADING");
  //     }
  //   } else {
  //     console.log("redux user is defined :D");
  //     user = userUIDRedux;
  //   }
  // }, [userUIDRedux]);

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

    //UPDATE: I think I cleaned it up. Time to test it a bunch.  @auth...

    if (userData.user !== null) {
      // setTimeout(()=>{

      if (userUIDRedux === null) {
        console.log("LAYOUT IS SETTING USER REDUX VALUES");
        dispatch(userUIDAction(userData.user.uid));
      }
      if (userPhotoRedux === null) {
        // console.log("LAYOUT IS SETTING USER REDUX VALUES")

        dispatch(userPhotoAction(userData.user.photoURL));
      }
      if (userDisplayNameRedux === null) {
        // console.log("LAYOUT IS SETTING USER REDUX VALUES")

        dispatch(userDisplayNameAction(userData.user.displayName));
      }
      if (userNameRedux === null) {
        // console.log("LAYOUT IS SETTING USER REDUX VALUES")

        dispatch(userNameAction(userData.username));
      }

      // },[2000])

      // if (!loggedIn) {
      //   // dispatch(logIn(true));
      // }
    } else {
      // console.log("Somehow userData (useContext) === null  ???????");
      // if (localStorage.getItem("userLocal") !== null) {
      //   user = localStorage.getItem("userLocal");
      if (userUIDRedux === null) {
        console.log("Layout doesnt have user Redux values");
      }
      //   //   // console.log("USERDATA EXISTS");
      //   //   // user = JSON.parse(localStorage.getItem("userLocal"));
      //   //   // console.log(user);

      //   dispatch(userDataRedux(user));
      // } else {
      //   console.log("NOT logged in");
      //   user = {
      //     username: "notSignedIn",
      //   };
      // }
      // dispatch(logIn(false));
    }

    // setIsLoggedIn(true)
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div>
          <Toaster />
        </div>
        <div className="logo-bar bg-white/40">
          <TopBar />
        </div>
        <div className="bg-white/40 top-bar">
          {/* {loading ? <FullLoader />: <TopBarRight user={user} />} */}

          <TopBarRight />
        </div>

        <div className="side-nav-bar ">
          {/* <Sidebar toggle={isToggled} />
           */}
          <Sidebar2 toggle={isToggled} />
          {/* <FullSidebar /> */}
        </div>
        <div className="overflow-y-auto fade-effect-quick content ">
          <main>{children}</main>
        </div>
        <div>
          {isPopUpOpen ? (
            <>
              {" "}
              <div className="notepad-container">
                <NotePopUpModal handleClose={togglePopup} />{" "}
                <NotePopUp handleClose={togglePopup} />
              </div>
            </>
          ) : (
            <>
              <div></div>
            </>
          )}
        </div>
        <div className="button-holder">
          <button
            className="z-100 flex items-center justify-center w-[4em] h-[4em]  delay-200 transform rounded-full notepad-button fade-effect text-t-pd hover:scale-125 hover:rotate-90 bg-gradient-to-br from-white/60 to-clear-pl5 hover:shadow-2xl duration-1000 ease-in-out"
            onClick={togglePopup}
          >
            <FaPlus style={{ fontSize: "1.8em" }} />
          </button>
        </div>
      </div>
    </>
  );
}
