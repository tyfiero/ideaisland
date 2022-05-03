// import { FaBook, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { React, useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../lib/context";
import { logIn } from "../../redux/actions";
import { useUserData } from "../../lib/hooks";
import TopBarDropDown from "./TopBarDropDown";
// import onClickOutside from "react-onclickoutside";
import useVisible from "../../lib/useVisible";
// import Image from "next/image";

export default function TopBarRight({ user }) {
  // const { user, username } = useContext(UserContext);
  const userData = useUserData();
  // const [isLoggedIn, setIsLoggedIn] = useState();
  const [imgSrc, setimgSrc] = useState("/profilefallback.png");
  const [type, setType] = useState(0);

  // const [menuOpen, setMenuOpen] = useState(false);
  // const menuRef = useRef(null);
  const { ref, isVisible, setIsVisible } = useVisible(false);
  // const userRedux = useSelector((state) => state.userData);
  const userPhotoRedux = useSelector((state) => state.userPhoto);

  // let user;

  const loggedIn = useSelector((state) => state.loggedIn);

  // const dispatch = useDispatch();

  // console.log(user);

  //Now that the image thing is fixed, can I remove userRedux from the dependency array here? How can this UE be cleaned up?
  //UPDATE, it might be best to leave it, in case userphotoredux isnt defined, and so that it updates correctly on change.
  useEffect(() => {
    if (userPhotoRedux !== null) {
      try {
        // console.log(userRedux)
        setimgSrc(userPhotoRedux);
        setType(1);
      } catch {
        setimgSrc("/profilefallback.png");
        setType(0);
      }
    } else {
      setimgSrc("/profilefallback.png");
      setType(0);
    }
  }, [userPhotoRedux]);

  // const closeOpenMenus = (e) => {
  //   if (menuRef.current && menuOpen && !menuRef.current.contains(e.target)) {
  //     setMenuOpen(false);
  //   }
  // };

  // const dropdownAreaRef = useRef(null);

  // useEffect(() => {
  //   //Assign click handler to listen the click to close the dropdown when clicked outside
  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     //Remove the listener
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // const handleClickOutside = (event) => {
  //   const path = event.path || (event.composedPath && event.composedPath());

  //   if (!path.includes(dropdownAreaRef.current)) {
  //     setMenuOpen(false);
  //   }
  // };

  // document.addEventListener("mousedown", closeOpenMenus);

  let login = (
    <div className="hidden loginbutton md:block md:space-x-6 fade-effect">
      <Link href="/login">
        <a className="px-3 py-2 font-medium rounded-full text-blues-600 hover:text-blues-500 bg-blues-100">
          Sign in
        </a>
      </Link>
    </div>
  );
  // console.log("out" + isVisible);

  let profilePic = (
    <div
      className="rounded-full ring-2 md:w-[55px] md:h-[55px] sm:w-[45px] sm:h-[45px] overflow-hidden ring-slate-300 cursor-pointer md:top-1 absolute  md:right-4  md:hover:scale-105 transition sm:right-20 sm:top-3"
      onClick={() => {
        // if (!isVisible) {
        //   setIsVisible(true);
        //   // console.log("set true");
        //   // console.log("set true" + isVisible);
        // } else {
        //   setIsVisible(false);
        //   // console.log("set false");
        // }

        setIsVisible(!isVisible);
      }}
    >
      <img
        // src={loggedIn ? userRedux?.photoURL : "/profilefallback.png"}
        src={imgSrc}
        referrerPolicy="no-referrer"
        className={(!type && "profile-pic") + " fade-effect"}
        alt=""
      />
      {/* <Image
        src={imgSrc}
        className={(!type && "profile-pic") + " fade-effect"}
        // width={60}
        // height={60}
        layout="fill"
        // objectFit='cover'

        // fallback="/profilefallback.png"
        // alt="Identicons Profile Icon"
      /> */}
    </div>
  );

  return (
    <div className="relative">
      {/* {profilePic} */}
      {/* {!user && login} */}
      {loggedIn ? profilePic : login}
      <div ref={ref}>{isVisible && <TopBarDropDown />}</div>
    </div>
  );
}
