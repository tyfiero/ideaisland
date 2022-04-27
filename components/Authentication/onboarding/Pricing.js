import {React, useContext, useState} from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Toggle from "react-toggle";
import Script from "next/script";
import dynamic from 'next/dynamic';
import { UserContext } from "../../../lib/context";
import { auth } from "../../../lib/firebase";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
// const PaddleScript = dynamic(() => import("react-quill"), {
//     ssr: false,
//   });
let Paddle;
function Pricing(props) {
  const [annual, setAnnual] = useState(true);
  const userUIDRedux = useSelector((state) => state.userUID);
  const { username, user } = useContext(UserContext);
  
  const updateIdea = async (amount, plan) => {
    let uid;

    if (user?.uid) {
      uid = user?.uid;
    } else if (userUIDRedux) {
      uid = userUIDRedux;
    } else if (auth.currentUser?.uid) {
      uid = auth.currentUser?.uid;
    } else {
      uid = "default";
      // console.log("no uid available :(");
    }
    const ref = doc(getFirestore(), "users", uid);


    let data = {credits: amount, plan: plan}
    await updateDoc(ref, data)
    .then(() => {
        toast.success(`New AI credit balance: ${amount}`);

    })
    .catch((error) => {
      toast.error("Error occured, please contact support");
      console.log("Update failed!" + error);
    });


    }
  
  return (
    <div>
     
    </div>
  );
}

export default Pricing;
