import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import { IconName } from "react-icons/fa";

// import { isMobile, browserName } from "react-device-detect";
// import { Squash as Hamburger } from "hamburger-react";
// import { SentencePage } from "../pages/SolutionPage";
import {
  FaHome,
  FaBug,
  FaBrain,
  FaSitemap,
  FaQuestion,
  FaBook,
  FaRegLightbulb,
  FaRegEdit,
} from "react-icons/fa";
import Link from "next/link";
import { useUserData } from "../../../lib/hooks";
import { UserContext } from "../../../lib/context";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";

import { HiOutlineHome } from "react-icons/hi";
import { CgNotes } from "react-icons/cg";
import { GoLightBulb } from "react-icons/go";
import { RiQuestionMark } from "react-icons/ri";
import { IoHelpCircleOutline, IoMdHelp, IoIosTimer } from "react-icons/io";
import { BiRocket } from "react-icons/bi";
import { BsBug } from "react-icons/bs";
import CircleTimer from "../Timer";
import TopBarRight from "../TopBarRight";

const Sidebar2 = (props) => {
  const { user, username } = useContext(UserContext);

  const [selected, setSelected] = useState(0);
  const [timerOpen, setTimerOpen] = useState(false);

  // const [usernameSlug, setUsernameSlug] = useState("");
  const userData = useUserData();
  const userRedux = useSelector((state) => state.userData);
  const userNameRedux = useSelector((state) => state.userName);
  const loggedIn = useSelector((state) => state.loggedIn);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === "/home" || router.asPath === "/") {
      setSelected(0);
    } else if (router.asPath === "/notes") {
      setSelected(4);
    } else if (router.asPath === "/problem") {
      setSelected(1);
    } else if (router.asPath === "/solutions") {
      setSelected(2);
    } else if (router.asPath === "/next-steps") {
      setSelected(3);
    } else if (router.asPath === "/help") {
      setSelected(5);
    }
  }, [router.asPath]);

  let clickStyle = {
    color: "grey",
  };
  let unClickStyle = {
    color: "black",
  };

  return (
    <div className={"sidebar-container md:border-l-0 flex md:left-0  md:h-full  sm:h-[6em] sm:w-full md:w-[4.5em] md:flex-col  md:rounded-br-[3px] sm:flex md:rounded-tl-none  md:absolute  sm:bg-none md:bg-gradient-to-t  md:from-clear-pl2 md:border-black md:border-[0px] content-center items-center md:justify-between	md:py-4  z-10 fade-effect-quick sm:justify-evenly  " + (props.toggle ? " sm:flex md:flex" :  " sm:hidden md:flex")}>
      <div className="flex items-center w-full gap-3 md:flex-col sm:flex-row sm:justify-evenly">
        <Link href="/home">
          <a>
            <div className="flex flex-col items-center group">
            <div
              className={"flex flex-col items-center p-2 min-h-10 min-w-10 transition-all duration-700 rounded-lg shadow-lg sidebar-unit-container bg-gradient-to-br from-white/20 via-t-pl to-t-pd bg-size-200  drop-shadow-xl group-hover:bg-pos-100 " + (selected === 0 ? " bg-pos-100" : " bg-pos-0")}
              onClick={() => {
                setSelected(0);
              }}
            >
              {/* <FaHome className="text-2xl " /> */}
              <HiOutlineHome className={"text-2xl transition duration-1000  group-hover:text-pink-50 " + (selected === 0 ? " text-pinks-50" : "text-pinks-700") } />
             
            </div>
            <p className="text-xs text-black transition duration-1000 opacity-50 group-hover:opacity-100 dark:text-slate-50">Home</p>
            </div>
          </a>
        </Link>
       
        
        <Link href={`/notes`} passHref>
          <a>
          <div className="flex flex-col items-center group">

            <div
              className={"flex flex-col items-center p-2 min-h-10 min-w-10 transition-all duration-700 rounded-lg shadow-lg sidebar-unit-container bg-gradient-to-br from-white/20 via-t-pl to-t-pd bg-size-200  drop-shadow-xl group-hover:bg-pos-100 " + (selected === 4 ? " bg-pos-100" : " bg-pos-0")}
              onClick={() => {
                setSelected(4);
              }}
            >
              {/* <FaBook className="side-icon" /> */}
              <FaRegEdit className={"text-2xl ml-[4px] transition duration-1000  group-hover:text-pink-50 " + (selected === 4 ? " text-pinks-50" : "text-pinks-700") } />
              </div>
            <p className="text-xs text-black transition duration-1000 opacity-50 group-hover:opacity-100 dark:text-slate-50">Notes</p>
            </div>
          </a>
        </Link>
        <Link href="/problem">
          <a>
          <div className="flex flex-col items-center group">
            <div
              className={"flex flex-col items-center p-2 min-h-10 min-w-10 transition-all duration-700 rounded-lg shadow-lg sidebar-unit-container bg-gradient-to-br from-white/20 via-t-pl to-t-pd bg-size-200  drop-shadow-xl group-hover:bg-pos-100 " + (selected === 1 ? " bg-pos-100" : " bg-pos-0")}
              onClick={() => {
                setSelected(1);
              }}
            >
              {/* <GrBug className={"text-2xl  transition duration-1000  group-hover:text-pink-50 " + (selected === 1 ? " text-pinks-50" : "text-pinks-700") }  /> */}
              <BsBug className={"text-[1.6rem]  transition duration-1000  group-hover:text-pink-50 " + (selected === 1 ? " text-pinks-50" : "text-pinks-700") } />
               </div>
            <p className="text-xs text-black transition duration-1000 opacity-50 group-hover:opacity-100 dark:text-slate-50">Problems</p>
            </div>
          </a>
        </Link>
        <Link href="/solutions">
          <a>
          <div className="flex flex-col items-center group">

            <div
               className={"flex flex-col items-center p-2 min-h-10 min-w-10 transition-all duration-700 rounded-lg shadow-lg sidebar-unit-container bg-gradient-to-br from-white/20 via-t-pl to-t-pd bg-size-200  drop-shadow-xl group-hover:bg-pos-100 " + (selected === 2 ? " bg-pos-100" : " bg-pos-0")}
              onClick={() => {
                setSelected(2);
              }}
            >
              <GoLightBulb className={"text-[1.6rem] leading-8 pr-[1px] transition duration-1000  group-hover:text-pink-50 " + (selected === 2 ? " text-pinks-50" : "text-pinks-700") } />
              </div>
            <p className="text-xs text-black transition duration-1000 opacity-50 group-hover:opacity-100 dark:text-slate-50">Solutions</p>
            </div>
          </a>
        </Link>
        <Link href="/next-steps">
          <a>
          <div className="flex flex-col items-center group">

            <div
               className={"flex flex-col items-center p-2 min-h-10 min-w-10 transition-all duration-700 rounded-lg shadow-lg sidebar-unit-container bg-gradient-to-br from-white/20 via-t-pl to-t-pd bg-size-200  drop-shadow-xl group-hover:bg-pos-100 " + (selected === 3 ? " bg-pos-100" : " bg-pos-0")}
              onClick={() => {
                setSelected(3);
              }}
            >
              <BiRocket className={"text-2xl transition duration-1000 group-hover:text-pink-50 " + (selected === 3 ? "  text-pinks-50" : " text-pinks-700") } />
              </div>
            <p className="text-xs text-black transition duration-1000 opacity-50 group-hover:opacity-100 dark:text-slate-50">Next Steps</p>
            </div>
          </a>
        </Link>

        <Link href="/help">
          <a>
          <div className="flex flex-col items-center group">

            <div
              className={"flex flex-col items-center p-2 min-h-10 min-w-10 transition-all duration-700 rounded-lg shadow-lg sidebar-unit-container bg-gradient-to-br from-white/20 via-t-pl to-t-pd bg-size-200  drop-shadow-xl group-hover:bg-pos-100 " + (selected === 5 ? " bg-pos-100" : " bg-pos-0")}
              onClick={() => {
                setSelected(5);
              }}
            >
              <IoMdHelp className={"text-2xl transition duration-1000  group-hover:text-pink-50 " + (selected === 5 ? " text-pinks-50" : "text-pinks-700") } />
              
              </div>
            <p className="text-xs text-black transition duration-1000 opacity-50 group-hover:opacity-100 dark:text-slate-50">Help</p>
            </div>
          </a>
        </Link>
        {/* <Link href="/Home"></Link> */}
      </div>
      {/* {props.signedIn && <TopBarRight />} */}
      <div className="flex flex-col items-center mb-[4.5em] group sm:hidden md:block">
      <div className="flex flex-col items-center group">

   {!timerOpen && <> <div
  className={"flex flex-col items-center p-1 transition-all duration-700 rounded-full shadow-lg sidebar-unit-container bg-gradient-to-br from-white/20 via-t-pl to-t-pd bg-size-200  drop-shadow-xl group-hover:bg-pos-100  bg-pos-0"}
  onClick={() => {
    // setSelected(5);
    setTimerOpen(!timerOpen);
  }}
>
  <IoIosTimer className={"text-2xl transition duration-1000  group-hover:text-pink-50 text-pinks-700" } />
  
  </div>
<p className="text-xs text-black transition duration-1000 opacity-50 dark:text-slate-50 group-hover:opacity-100">Timer</p></>} 
</div>
      
      {timerOpen && <CircleTimer setTimerOpen={setTimerOpen} className="fade-effect-quick"/>}

      </div>
    </div>
    // <>
    //   <IconContext.Provider value={{ color: "black" }}>
    //     <div
    //       sidebar={sidebar}
    //       onMouseEnter={handleMouseEnter}
    //       onMouseLeave={handleMouseLeave}
    //       onClick={sidebarClickHandler}
    //       //   onClick={console.log("clicked")}
    //     >
    //       <SidebarWrap>
    //         {/* <NavIcon to="#">
    //           <AiIcons.AiOutlineClose onClick={showSidebar} />
    //         </NavIcon> */}
    //         {/* {SidebarData.map((item, index) => {
    //           return <SubMenu item={item} key={index} />;
    //         })} */}
    //         {SidebarData.map((item, index) => {
    //           {
    //             // console.log(item);
    //           }

    //           return (
    //             <div
    //               className={
    //                 index === selectedIcon ? "sidebar-item-selected" : null
    //               }
    //               //   className={
    //               //     "sidebar-item" + index + " " + (selectedIcon && selected)
    //               //   }
    //               key={index}
    //             >
    //               <SubMenu
    //                 hover={showText}
    //                 item={item}
    //                 key={index}
    //                 click={clicked}
    //                 onClick={submenuClickHandler}
    //               />
    //             </div>
    //           );
    //         })}
    //         {/* <SubMenu item={item} key={index} /> */}
    //       </SidebarWrap>
    //     </div>
    //   </IconContext.Provider>
    // </>
  );
};

export default Sidebar2;

//old for reference
// return (
//   <div className="sidebar-container md:border-l-0 flex md:left-0 md:top-[25%] sm:bottom-0  md:bottom-[30%] sm:w-full md:w-[3.5em] md:flex-col sm:flex-row md:rounded-r-[3rem] sm:rounded-t-[3rem]  md:rounded-tl-none sm:rounded-b-1xl md:absolute sm:fixed bg-gradient-to-t from-clear-bl  to-clear-pl border-black border-[0px] content-center md:items-left  justify-evenly	md:py-4 sm:pb-1 sm:pt-4 sm:overflow-visible  z-10">
//     <Link href="/home">
//       <a>
//         <div
//           className="sidebar-unit-container flex rounded-[4rem] h-12 md:flex-row sm:flex-col  hover:bg-clear-w4 sm:items-center  md:rounded-l-none"
//           style={selected === 0 ? clickStyle : unClickStyle}
//           onClick={() => {
//             setSelected(0);
//           }}
//         >
//           <FaHome className=" side-icon" />
//           <p className="sidebar-text ml-2 text-[14px]">Home</p>
//         </div>
//       </a>
//     </Link>

//     <Link href={`/notes`} passHref>
//       <a>
//         <div
//           className=" sidebar-unit-container flex rounded-[4rem] h-12 md:flex-row sm:flex-col  hover:bg-clear-w1 sm:items-center md:rounded-l-none"
//           style={selected === 4 ? clickStyle : unClickStyle}
//           onClick={() => {
//             setSelected(4);
//           }}
//         >
//           <FaBook className="side-icon" />
//           <p className="sidebar-text sm:text-[14px] ml-2">Notes</p>
//         </div>
//       </a>
//     </Link>
//     <Link href="/problem">
//       <a>
//         <div
//           className="sidebar-unit-container flex rounded-[4rem] h-12 md:flex-row sm:flex-col   hover:bg-clear-w3 sm:items-center md:rounded-l-none"
//           style={selected === 1 ? clickStyle : unClickStyle}
//           onClick={() => {
//             setSelected(1);
//           }}
//         >
//           <FaBug className="side-icon" />
//           <p className="sidebar-text sm:text-[14px] ml-2">Problem</p>
//         </div>
//       </a>
//     </Link>
//     <Link href="/solutions">
//       <a>
//         <div
//           className="sidebar-unit-container flex rounded-[4rem] h-12 md:flex-row sm:flex-col   hover:bg-clear-w2 sm:items-center md:rounded-l-none"
//           style={selected === 2 ? clickStyle : unClickStyle}
//           onClick={() => {
//             setSelected(2);
//           }}
//         >
//           <FaBrain className="side-icon" />
//           <p className="sidebar-text sm:text-[14px] ml-2">Solutions</p>
//         </div>
//       </a>
//     </Link>
//     <Link href="/implementation">
//       <a>
//         <div
//           className=" sidebar-unit-container flex rounded-[4rem] h-12 md:flex-row sm:flex-col  hover:bg-clear-w1 sm:items-center md:rounded-l-none"
//           style={selected === 3 ? clickStyle : unClickStyle}
//           onClick={() => {
//             setSelected(3);
//           }}
//         >
//           <FaSitemap className="side-icon" />
//           <p className="sidebar-text sm:text-[14px] ml-2">Plan</p>
//         </div>
//       </a>
//     </Link>

//     <Link href="/help">
//       <a>
//         <div
//           className="sidebar-unit-container flex rounded-[4rem] h-12 md:flex-row sm:flex-col hover:text-white  hover:bg-clear-w sm:items-center md:rounded-l-none "
//           style={selected === 5 ? clickStyle : unClickStyle}
//           onClick={() => {
//             setSelected(5);
//           }}
//         >
//           <FaQuestion className="z-10 side-icon" />
//           <p className=" sidebar-text sm:text-[14px] ml-2">Help</p>
//         </div>
//       </a>
//     </Link>
//     {/* <Link href="/Home"></Link> */}
//   </div>
