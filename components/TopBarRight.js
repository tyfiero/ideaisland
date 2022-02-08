import { FaBook, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import collectAnalyticsEvent from "./Analytics/collectAnalyticsEvent";
import { darkMode } from "../redux/actions";
import Toggle from "react-toggle";
import React from "react";

export default function TopBarRight() {

    const user = null;
    const username = null;


    
  const loggedIn = useSelector((state) => state.loggedIn);

  const darkRedux = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

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
          <Link href={`/${username}`}>
        <a   >
      <img
        className="fade-effect profile-pic "
        src="https://proficon.stablenetwork.uk/api/identicon/ty.svg"
        alt="Identicons Profile Icon"
      />
      </a>
      </Link>
    </div>
  );

  return (
    <div>
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
