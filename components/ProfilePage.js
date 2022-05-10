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
import { FaArrowRight, FaArrowUp, FaEnvelope, FaRegFrown, FaRegSmile, FaTimes } from "react-icons/fa";
import ReusableModal from "./Layout/ReusableModal";
function ProfilePage(props) {
  const { user, username, paidPlan, aiCredits } = useContext(UserContext);
const router = useRouter;
  const userData = useUserData();
  const userRedux = useSelector((state) => state.userData);
  const userPhotoRedux = useSelector((state) => state.userPhoto);
  const userNameRedux = useSelector((state) => state.userName);
const [deleteWindow, setDeleteWindow] = useState(false)
const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center pt-12 fade-effect">
   {modalOpen &&   <ReusableModal modalOpen={modalOpen} setModalOpen={setModalOpen} header="Cancel Subscription">  

<div className="flex flex-col items-center">
   <p>Are you sure you want to cancel? All data associated with your account will be deleted and your progress will be lost.  </p>
   <button
             className="bg-t-bl text-white p-3 rounded-xl left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick  gap-3 mt-5 !w-[20em]"
             onClick={() => {
               

             setModalOpen(false)
             toast.custom("😄 Great Choice! We're happy you're here")
             }}
           >
             
             <FaRegSmile className="mr-1 text-[24px]" />
             No, Keep My Subscription Active
           </button>
           <button
              className="bg-t-pm text-white p-3 rounded-xl left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick  gap-3 mt-5 !w-[20em]"
             onClick={() => {
               
            //  setModalOpen(false)
            //eslint-disable-next-line 
             Paddle.Checkout.open({
              override: 'https://subscription-management.paddle.com/subscription/12345/hash/.../cancel'
            });
             }}
           >
             <FaRegFrown className="mr-1 text-[24px]" />
             Yes, Please Cancel My Subscription
           </button>
           </div>

 </ReusableModal>}

      <div className="flex flex-col items-center glass-box p-5 bg-white/60 min-w-[30em] min-h-[20em]">
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
        <p className="mt-2 text-xl italic text-blues-400 dark:text-blues-100 fre">
          @{username || userNameRedux || "username"}
        </p>
      </div>
      <div className="flex flex-col items-center p-5 mt-3 mb-5 text-xl bg-clear-bl2 rounded-xl">

        <div className="flex items-center gap-10">
        <p className="text-base">Your current plan:</p>
         <p className="text-t-bl fre">{paidPlan || "Free"}</p>
          
        </div>
        <div className="flex items-center gap-5">
        <p className="text-base">AI credits remaining:</p>
         <p className="text-t-bl fre">{aiCredits || "0"}</p>
          
        </div>
        <Link href="/pricing">
      <a
        className=" w-[11em] px-3 py-2 font-medium rounded-full md:space-x-6 fade-effect text-white hover:text-t-bd bg-t-bl mt-2 flex justify-between items-center transition duration-500"
        
      >
        Upgrade Plan
        <FaArrowUp />
      </a>
</Link>

<button
        className=" w-[16em] px-3 py-2 font-medium rounded-full md:space-x-6 text-sm fade-effect text-white hover:text-blues-100 bg-t-bd mt-2 flex gap-3 items-center transition duration-500"
        onClick={() => {
          
                          // eslint-disable-next-line
          Paddle.User.History(user.email, null, function(response) {					
            if(response.success) {
              // Let the user know they'll receive an email with their 
              // order history and license codes if their email was matched.
              toast.success("Your order history has been sent to your email.");
            } else {
              // Likely a formatting error in the email, vendorID, or ProductID.
              toast.error("There was an error sending your order history. Please contact us for support.");
            }
          });
        }}
      >
        Send Order History to Email
        <FaEnvelope />
      </button>

      <button
        className="flex items-center gap-3 px-3 py-1 mt-2 text-sm font-medium underline rounded-full md:space-x-6 fade-effect text-t-pm hover:text-t-pd"
        onClick={() => {
        setModalOpen(true)
        }}
      >
        Cancel Subscription
      </button>
      </div>
    
     
      <LogOutButton />
      </div>
{/* <div className="bg-white/60 glass-box mt-36">
    <p className="text-t-pm ">Danger Zone:</p>
    {!deleteWindow && <button  className="flex items-center gap-3 px-3 py-2 font-medium text-black bg-red-400 rounded-full fade-effect hover:text-t-pd"
    onClick={()=>{
      setDeleteWindow(true)
    }}
    >Delete Account</button>}
fa

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
