import React from "react";
import { useUserData } from "../lib/hooks";
import { useSelector, useDispatch } from "react-redux";

import { auth } from "../lib/firebase";
// import { logIn } from "../../redux/actions";
import { logIn } from "../redux/actions";

import Link from "next/link";
import LogOutButton from "./Authentication/LogOutButton";
function ProfilePage({ user }) {
  //THIS WHOLE PAGE needs cleaning with redux user @auth
  const userData = useUserData();
  const userRedux = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center pt-12 fade-effect">
      <h2 className="heading-top">Profile</h2>
      <div className="bg-white rounded-full profile-pic-page-holder">
        <img
          src={user.photoURL || "/cryingpepe.png"}
          className="card-img-center"
          referrerPolicy="no-referrer"
        />
      </div>
      <div>
        <i className="italic text-blues-100">@{user.username || "username"}</i>
      </div>
      <div className="text-xl">
        {/* {userData.user !== null
          ? "Hello " + userData.user.displayName + "!"
          : "Hello"} */}
        <h3>{user.displayName || "Anonymous User"} </h3>
        {/* <h3>{"Hello " + (user.displayName || 'Anonymous User') + "!"} </h3> */}
      </div>
      {/* <div>
        {" "}
        {userData.user !== null
          ? "Email: " + userData.user.email
          : "Email not visible, please sign in."}
      </div> */}

      <button
        className="hidden w-[12em] px-3 py-2 font-medium rounded-full md:block md:space-x-6 fade-effect text-white hover:text-t-bd bg-t-bl my-5"
        onClick={() => {
          console.log("SEND TO UPGRADE PAGE");
        }}
      >
        Upgrade to pro!
      </button>

     <LogOutButton />
    </div>
  );
}

export default ProfilePage;
