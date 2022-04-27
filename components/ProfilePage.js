import { React, useContext, useState } from "react";
import { useUserData } from "../lib/hooks";
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "../lib/context";
import { getAuth, deleteUser } from "firebase/auth";
import {
  doc,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "../lib/firebase";
// import { logIn } from "../../redux/actions";
import { logIn, logOutAction } from "../redux/actions";
import toast from "react-hot-toast";
import Link from "next/link";
import LogOutButton from "./Authentication/LogOutButton";
import { useRouter } from "next/router";
function ProfilePage(props) {
  const { user, username } = useContext(UserContext);
const router = useRouter;
  const userData = useUserData();
  const userRedux = useSelector((state) => state.userData);
  const userPhotoRedux = useSelector((state) => state.userPhoto);
  const userNameRedux = useSelector((state) => state.userName);
const [deleteWindow, setDeleteWindow] = useState(false)
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center pt-12 fade-effect">
      <h2 className="text-3xl text-t-bd dark:text-blues-100">Profile</h2>
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

<Link href="/pricing">
      <a
        className="hidden w-[12em] px-3 py-2 font-medium rounded-full md:block md:space-x-6 fade-effect text-white hover:text-t-bd bg-t-bl my-5"
        
      >
        Upgrade to pro!
      </a>
</Link>
      <LogOutButton />


    </div>
  );
}

export default ProfilePage;
