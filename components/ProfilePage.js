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

{/* <div className="bg-white/60 glass-box mt-36">
    <p className="text-t-pm ">Danger Zone:</p>
    {!deleteWindow && <button  className="flex items-center gap-3 px-3 py-2 font-medium text-black bg-red-400 rounded-full fade-effect hover:text-t-pd"
    onClick={()=>{
      setDeleteWindow(true)
    }}
    >Delete Account</button>}


    {deleteWindow && <><p>Are you sure you want to delete your account?</p><div className="flex gap-3"><button  className="flex items-center gap-3 px-3 py-2 font-medium text-white rounded-full bg-t-bl fade-effect hover:text-t-pd"
    onClick={()=>{
      setDeleteWindow(false)
    }}
    >No, keep account</button><button  className="flex items-center gap-3 px-3 py-2 font-medium text-black bg-red-400 rounded-full fade-effect hover:text-t-pd"
    onClick={()=>{
      const auth = getAuth();
      const user = auth.currentUser;
      const userUid = auth.currentUser.uid


      const credential = promptForCredentials();

reauthenticateWithCredential(user, credential).then(() => {
  // User re-authenticated.
}).catch((error) => {
  // An error ocurred
  // ...
});


      const deleteAccount = async (e) => {
        const ref = doc(getFirestore(), "users", userUid);
        await deleteDoc(ref)
          .then(() => {
            console.log("deleted info");
          })
          .catch((error) => {
            console.log("Delete failed!" + error);
          });
      };
      
      deleteUser(user).then(()=>{
        toast.success("Account deleted, sorry to see you go!")
      setDeleteWindow(false)

        dispatch(logIn(false));
        dispatch(logOutAction(true));
        // router.push("/login")
      })
    }}
    >Yes, delete account</button></div></>}
     </div> */}
    </div>
  );
}

export default ProfilePage;
