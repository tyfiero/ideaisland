import React, { useState, useEffect, useContext } from "react";

import {
  signOut,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { useRouter } from "next/router";
import AuthError from "../AuthError";
import { FaEnvelope, FaChevronLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";

import { auth, googleAuthProvider } from "../../../lib/firebase";
import { signInWithPopup } from "firebase/auth";

import { UserContext } from "../../../lib/context";
import {
  userPhotoAction,
  userDisplayNameAction,
  userUIDAction,
  logIn,
} from "../../../redux/actions";
import CookieBanner from "../../Layout/CookieBanner/CookieBanner";
import {
  serverTimestamp,
  query,
  where,
  collection,
  orderBy,
  doc,
  getFirestore,
  updateDoc,
  addDoc,
  onSnapshot,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import axios from "axios";
export default function SignupPage(props) {
  const router = useRouter();
  const userUIDRedux = useSelector((state) => state.userUID);
  const userPhotoRedux = useSelector((state) => state.userPhoto);
  const userDisplayNameRedux = useSelector((state) => state.userDisplayName);
  const loggedIn = useSelector((state) => state.loggedIn);

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const [signUpMethod, setSignUpMethod] = useState(0);


  function googleButton() {

    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleAuthProvider).then((result) => {
          dispatch(userUIDAction(result.user.uid));
          dispatch(userDisplayNameAction(result.user.displayName));
          dispatch(userPhotoAction(result.user.photoURL));
          if (!loggedIn) {
            dispatch(logIn(true));
            console.log("logged in");
          }

          if (checked) {
            //Write emails to firestore
            // saveEmail(result);
             axios({
              method: "POST",
              url: "/api/saveEmail",
              data: {
                email: result.user.email,
                name: result.user.displayName,
                uid: result.user.uid,
              },
          })

        } 
        });
        props.goToStep(2);
      } catch (error) {
        console.log(error);
      }

      // await setSignUpMethod(2);

      // await router.push("/signup#select-username");
    };
    signInWithGoogle();
  }


  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 drop-shadow-xl ">
      <div className="w-full max-w-md p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl ">
   
        <div>
          <img
            src="/bulb.svg"
            alt="logo"
            className="w-auto h-20 mx-auto sm:h-30"
          />
         
          <h2 className="mt-1 text-3xl font-extrabold text-center text-gray-900">
            Welcome to IdeaIsland!
          </h2>
        </div>
        {signUpMethod === 0 ? (
          <div className="flex flex-col items-center gap-2 pt-3">
          

            <button
              onClick={googleButton}
              className="w-[18em] h-12 rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
            >
              <div className="flex items-center w-8 h-8 bg-white rounded-xl">
                <img src="/google.png" alt="google" />
              </div>
              Sign up with Google
            </button>
            <label className="nun">
              <input
                type="checkbox"
                name="marketing"
                className="mr-3 scale-125 rounded-md"
                id=""
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              Sign up for marketing emails?
            </label>
            <p className="mt-10">Have an account?</p>
            <Link href="/login">
              <a>
                <button
                  // onClick={emailButton}
                  className="w-[10em] h-8 rounded-3xl bg-t-pl flex items-center justify-center text-black  flex-col drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                >
                  <p>Sign in </p>
                </button>
              </a>
            </Link>
          </div>
        ) : null}
        {/* {signUpMethod === 1 && emailForm} */}
      </div>
    </div>
  );
}
