import { FaBook, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import collectAnalyticsEvent from "../OLD/oldComponents/Analytics/collectAnalyticsEvent";
import { darkMode } from "../redux/actions";
import Toggle from "react-toggle";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { logIn } from "../redux/actions";
import { useUserData } from "../lib/hooks";

export default function TopBarRight() {
  // const { user, username } = useContext(UserContext);
  const userData = useUserData();
  // const [isLoggedIn, setIsLoggedIn] = useState();
  const [imgSrc, setimgSrc] = useState();

  const loggedIn = useSelector((state) => state.loggedIn);

  const darkRedux = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  // console.log(userData);

  useEffect(() => {
    if (userData.user !== null) {
      console.log("Logged In");
      // setIsLoggedIn(true)
      setimgSrc(userData.user.photoURL);
      dispatch(logIn(true));

      // console.log(imgSrc);
    } else {
      console.log("NOT logged in");
      // setIsLoggedIn(true)
      dispatch(logIn(false));

      setimgSrc("https://proficon.stablenetwork.uk/api/identicon/ty.svg");
    }
  }, [userData]);

  const darkModeFunc = () => {
    const body = document.body;
    const blob = document.querySelector("body > div.blobs");
    dispatch(darkMode(!darkRedux));

    if (!darkRedux) {
      body.setAttribute("style", "background-color: black");
      blob.setAttribute("style", "opacity: 0.4");
    } else {
      body.setAttribute("style", "background-color: white");
      blob.setAttribute("style", "opacity: 1");
    }
  };

  let login = (
    <div className="hidden loginbutton md:block md:space-x-6 fade-effect">
      <Link href="/login">
        <a
          onClick={() =>
            collectAnalyticsEvent({
              eventName: "login",
            })
          }
          className="px-3 py-2 font-medium rounded-full text-blues-600 hover:text-blues-500 bg-blues-100"
        >
          Sign in
        </a>
      </Link>
    </div>
  );

  let profilePic = (
    <div className="profile-pic-cropper">
      <Link href={`/${userData.username}`}>
        <a>
          <img
            className="fade-effect profile-pic "
            src={imgSrc}
            alt="Identicons Profile Icon"
          />
        </a>
      </Link>
    </div>
  );

  return (
    <div>
      {/* {user && profilePic} */}
      {/* {!user && login} */}
      {loggedIn ? profilePic : login}

      <Toggle
        className="dark-toggle fade-effect"
        defaultChecked={!darkRedux}
        icons={{
          unchecked: (
            <FaMoon
              style={{
                fontSize: "1em",
                color: "white",
                paddingBottom: "3px",
                paddingTop: "1px !important",
              }}
            />
          ),
          checked: (
            <FaSun
              style={{
                fontSize: "1em",
                color: "orange",
                paddingBottom: "2px",
                paddingTop: "1px !important",
              }}
            />
          ),
        }}
        onChange={darkModeFunc}
      />
    </div>
  );
}
