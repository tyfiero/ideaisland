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

export default function TopBarRight({ user }) {
  // const { user, username } = useContext(UserContext);
  const userData = useUserData();
  // const [isLoggedIn, setIsLoggedIn] = useState();
  const [imgSrc, setimgSrc] = useState();
  // const [menuOpen, setMenuOpen] = useState(false);
  // const menuRef = useRef(null);
  const { ref, isVisible, setIsVisible } = useVisible(false);
  const userRedux = useSelector((state) => state.userData);

  // let user;

  const loggedIn = useSelector((state) => state.loggedIn);

  // const dispatch = useDispatch();

  // console.log(user);

  useEffect(() => {
    if (user !== null) {
      try {
        setimgSrc(userRedux.photoURL);
      } catch {
        setimgSrc("https://proficon.stablenetwork.uk/api/identicon/ty.svg");
      }
    } else {
      setimgSrc("https://proficon.stablenetwork.uk/api/identicon/ty.svg");
    }
  }, [loggedIn]);

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
      className="profile-pic-cropper"
      onClick={() => {
        if (!isVisible) {
          setIsVisible(true);
          // console.log("set true");
          // console.log("set true" + isVisible);
        } else {
          setIsVisible(false);
          // console.log("set false");
        }
      }}
    >
      <img
        className="fade-effect profile-pic "
        src={imgSrc}
        alt="Identicons Profile Icon"
      />
    </div>
  );

  return (
    <div>
      {/* {user && profilePic} */}
      {/* {!user && login} */}
      {loggedIn ? profilePic : login}
      <div ref={ref}>{isVisible && <TopBarDropDown user={user} />}</div>
    </div>
  );
}
