
import styled from "styled-components";
import TopBar from "./TopBar";
import TopBarRight from "./TopBarRight";
import Sidebar2 from "./Sidebar/SidebarRebuild";
import { FaBook, FaPlus, FaTimes } from "react-icons/fa";

import NotePopUp from "../Notes/NoteBubble/NotePopUp";
import NotePopUpModal from "../Notes/NoteBubble/NotePopUpModal";
import { useEffect, useState, useContext, React, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { logIn, userDataRedux } from "../../redux/actions";
import { useUserData } from "../../lib/hooks";
import { UserContext } from "../../lib/context";
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

import Footer from "./Footer";
import Loader from "./Loader";
import { collection } from "firebase/firestore";
import { HiMusicNote } from "react-icons/hi";
import { Squash as Hamburger } from "hamburger-react";






export default function Layout({ children }) {
  // console.log("Layout Rerendered")





 
  const router = useRouter();

  const userData = useUserData();
  const { user, username, loading } = useContext(UserContext);

  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(true);
  const [loadingUI, setLoadingUI] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const loggedIn = useSelector((state) => state.loggedIn);
  const userUIDRedux = useSelector((state) => state.userUID);
  const userPhotoRedux = useSelector((state) => state.userPhoto);
  const userDisplayNameRedux = useSelector((state) => state.userDisplayName);
  const darkRedux = useSelector((state) => state.darkMode);

  const userNameRedux = useSelector((state) => state.userName);
  // console.log(userNameRedux + "unr")

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  // const [isPopUpModalOpen, setIsPopUpModalOpen] = useState(false);
const videoRef = useRef(null);



  const togglePopup = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  // let user;
  // console.log(userData)
  // console.log(user)

  //This use effect is important! It waits for firebase auth to load the current user object, feed it to the userContext hook, then display content.
  useEffect(() => {
    // console.log(loading);

    if (user?.uid) {
      setLoadingUI(false);
      setSignedIn(true);
      if (userUIDRedux === null) {
        console.log("LAYOUT IS SETTING USER REDUX VALUES");
        dispatch(userUIDAction(userData.user.uid));
      }
      if (userPhotoRedux === null) {
        dispatch(userPhotoAction(userData.user.photoURL));
      }
      if (userDisplayNameRedux === null) {
        dispatch(userDisplayNameAction(userData.user.displayName));
      }
      if (userNameRedux === null) {
        dispatch(userNameAction(userData.username));
      }
    } else {
      if (loading) {
        setLoadingUI(true);
        setSignedIn(false);
        console.log("uid not available yet");
      } else {
        console.log("User is not logged in");
        setLoadingUI(false);
        setSignedIn(false);
        router.push("/login");
      }
    }
  }, [user, username, loading]);// eslint-disable-line react-hooks/exhaustive-deps



  //dark mode
  useEffect(() => {
const body = document.body;
let menuOpacityNum = localStorage.getItem("menuOpacity") || 0.7;

let base = darkRedux ? "hsla(200,0%,50%," : "hsla(200,0%,100%,";
let concat = base + menuOpacityNum + ")";


if (darkRedux) {
  body.setAttribute("style", "background-color: RGBA(30, 41, 59, 1)")
  ;
  document.documentElement.classList.add('dark')
    document.documentElement.style.setProperty("--menuColor", concat);

} else {
  body.setAttribute("style", "background-color: white");
  document.documentElement.classList.remove('dark')
  document.documentElement.style.setProperty("--menuColor", concat);

}
  }, [darkRedux]);// eslint-disable-line react-hooks/exhaustive-deps



  
  useEffect(() => {

    // videoRef.current.playbackRate ="0.5"

    
    //if mobile, redirect to mobile page
    if (isMobile) {
      router.push("/mobile");
    }
    console.log(`
    _   _         _     _           _ 
   |_|_| |___ ___|_|___| |___ ___ _| |
   | | . | -_| .'| |_ -| | .'|   | . |
   |_|___|___|__,|_|___|_|__,|_|_|___|
   
   The place where 'Aha' moments are made!      
   `);
  

    const sliceHsl = (fullString) => {
      let sliced = fullString.slice(5);
      let slicedAgain = sliced.slice(0, -7);
      return slicedAgain;
    };
    const sliceHslAlpha = (fullString) => {
      let sliced = fullString.slice(5);
      let slicedAgain = sliced.slice(0, -3);
      return slicedAgain;
    };
    //set bg opacity
    let opacityNum = localStorage.getItem("colorOpacity") || 0.6;
    let menuOpacityNum = localStorage.getItem("menuOpacity") || 0.7;
    let base = "hsla(200,100%,100%,";
    let concat = base + menuOpacityNum + ")";

    document.documentElement.style.setProperty("--blobOpacity", opacityNum);
    document.documentElement.style.setProperty("--menuColor", concat);

    //set bg colors
    let blobc1 = localStorage.getItem("blob1") || "hsla(206,91%,64%,1)";
    let blobc2 = localStorage.getItem("blob2") || "hsla(224,64%,40%,1)";
    let blobc3 = localStorage.getItem("blob3") || " hsla(319,100%,37%,1)";
    let blobc4 = localStorage.getItem("blob4") || "hsla(284,94%,88%,1)";
    let blobc5 = localStorage.getItem("blob5") || "hsla(178,100%,50%,1)";
    let blobc6 = localStorage.getItem("blob6") || "hsla(312,59%,61%,1)";

    document.documentElement.style.setProperty("--blob1", blobc1);
    document.documentElement.style.setProperty("--colorDark1", blobc1);
    document.documentElement.style.setProperty(
      "--colorDark1HslBase",
      sliceHsl(blobc1)
    );
    document.documentElement.style.setProperty(
      "--colorDark1base",
      sliceHslAlpha(blobc1)
    );

    document.documentElement.style.setProperty("--blob2", blobc2);
    document.documentElement.style.setProperty("--colorDark2", blobc2);
    document.documentElement.style.setProperty(
      "--colorDark2base",
      sliceHslAlpha(blobc2)
    );

    document.documentElement.style.setProperty("--blob3", blobc3);
    document.documentElement.style.setProperty("--colorLight2", blobc3);
    document.documentElement.style.setProperty(
      "--colorLight2base",
      sliceHslAlpha(blobc3)
    );

    document.documentElement.style.setProperty("--blob4", blobc4);
    document.documentElement.style.setProperty("--colorLight1", blobc4);
    document.documentElement.style.setProperty(
      "--colorLight1base",
      sliceHslAlpha(blobc4)
    );
    document.documentElement.style.setProperty(
      "--colorLight1HslBase",
      sliceHsl(blobc4)
    );

    document.documentElement.style.setProperty("--blob5", blobc5);
    document.documentElement.style.setProperty("--colorPop", blobc5);

    document.documentElement.style.setProperty("--blob6", blobc6);
    document.documentElement.style.setProperty("--colorLight3", blobc6);
    document.documentElement.style.setProperty(
      "--colorLight3base",
      sliceHslAlpha(blobc6)
    );

    //set img
    let img1 = localStorage.getItem("bgImg") || "";
    document.querySelector("body").style.backgroundImage = `url(${img1})`;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        {/* <video playsinline autoPlay muted loop ref={videoRef}  className="absolute top-0 left-0" >
    <source src="/vid2.mp4" type="video/webm"/>
    Your browser does not support the video tag.
</video> */}



        {/* <div className="background blur"></div> */}
        {/* <noscript>You need to enable JavaScript to run this app.</noscript> */}
       
        <div className=" blobs">
        <div className="svg-blob1 rotate-effect scale-effect"></div>
            <div className="svg-blob2 rotate-effect scale-effect"></div>
            <div className="svg-blob3 rotate-effect scale-effect"></div>
            <div className="svg-blob4 rotate-effect scale-effect"></div>
            <div className="svg-blob5 rotate-effect scale-effect"></div>
        </div>
        {/* <div className="blobs rotate-effect-slow">
            <div className="svg-blob1 rotate-effect scale-effect"></div>
            <div className="svg-blob2 rotate-effect scale-effect"></div>
            <div className="svg-blob3 rotate-effect scale-effect"></div>
            <div className="svg-blob4 rotate-effect scale-effect"></div>
            <div className="svg-blob5 rotate-effect scale-effect"></div>

          </div> */}
        <div className=" flex top-bar !min-h-[4em] ">
          {/* {loadingUI ? <Loader show={true}/>: "NOT LOADING YO"} */}
        <div className="w-[25em]">

          <TopBar signedIn={signedIn} />
   </div>

          {signedIn && 
        <div className="w-full md:block sm:hidden">
   <TopBarRight />
   
   </div>
   }
    {signedIn && isToggled &&
        <div className="w-full md:hidden sm:block">
   <TopBarRight />
   
   </div>
   }
<div className="absolute sm:flex right-2 top-2 md:hidden"> <Hamburger
        className=""
        toggled={isToggled}
        color="var(--colorDark1)"
        toggle={() => {
          setIsToggled(!isToggled);
        }}
        // size={25}
        easing="ease-in"
        label="Show menu"
        rounded
      /></div>
          
         
          <div>
          <Toaster />
        </div>
        </div>
        
        <div className="flex w-full h-full sm:flex-col md:flex-row">

        <div className="side-nav-bar md:!w-[5em] md:!mr-2 sm:!w-full md:h-full sm:h-[4em] ">
          {signedIn &&  <Sidebar2 toggle={isToggled} signedIn={signedIn}/>}
        </div>
        <div className="w-full overflow-y-auto fade-effect-quick content">
          {loadingUI ? <FullLoader show={true} /> : <main>{children}</main>}


          
          {/* <Footer /> */}
        </div>
        </div>
        
        <div>
          
         
           
              <div className={ isPopUpOpen ? "notepad-container" : " "}>
              {isPopUpOpen && (  <NotePopUpModal handleClose={togglePopup} />     )}
                <NotePopUp handleClose={togglePopup} isPopUpOpen={isPopUpOpen}/>
              </div>
          
         
     
        </div>
        {!loadingUI && signedIn && (
          <div className="button-holder">
            <button
              className={"z-100 flex items-center justify-center w-[4em] h-[4em]   transform rounded-full notepad-button fade-effect text-t-pd hover:scale-125 bg-gradient-to-br from-white/60 to-clear-pl5 hover:shadow-2xl duration-500  " + (isPopUpOpen ? "  ease-in-out  rotate-[135deg] " : " ")}
              onClick={togglePopup}
            >
              <FaPlus style={{ fontSize: "1.8em" }} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}








