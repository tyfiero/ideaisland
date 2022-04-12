import { React, useContext } from "react";
import { useUserData } from "../lib/hooks";
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "../lib/context";

import { auth } from "../lib/firebase";
// import { logIn } from "../../redux/actions";
import { logIn } from "../redux/actions";

import Link from "next/link";
import LogOutButton from "./Authentication/LogOutButton";
function ProfilePage(props) {
  const { user, username } = useContext(UserContext);

  const userData = useUserData();
  const userRedux = useSelector((state) => state.userData);
  const userPhotoRedux = useSelector((state) => state.userPhoto);
  const userNameRedux = useSelector((state) => state.userName);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center pt-12 fade-effect">
      <h2 className=" text-3xl text-t-bd dark:text-blues-100 ">Profile</h2>
      <div className="bg-white rounded-full profile-pic-page-holder">
        <img
          src={userPhotoRedux || "/profilefallback.png"}
          className="rounded-full card-img-center"
          referrerPolicy="no-referrer"
          alt=""
        />
      </div>
      <div>
        <i className="italic text-blues-100">
          @{username || userNameRedux || "username"}
        </i>
      </div>
      <div className="text-xl"></div>

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
