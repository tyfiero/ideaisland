import { useState, useRef, useEffect, useContext } from "react";

import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import AuthError from "./AuthError";
import Link from "next/link";

import {
  FaEnvelope,
  FaChevronLeft,
  FaSignInAlt,
  FaUserPlus,
  FaArrowLeft,
  FaLongArrowAltLeft,
  FaArrowRight,
} from "react-icons/fa";

import { auth, googleAuthProvider } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  logIn,
  userPhotoAction,
  userDisplayNameAction,
  userUIDAction,
} from "../../redux/actions";

export default function LoginPage() {
  const loggedIn = useSelector((state) => state.loggedIn);
  const userNameRedux = useSelector((state) => state.userName);

  const dispatch = useDispatch();


  const rememberMeRef = useRef();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [cookiePop, setCookiePop] = useState(false);

  const [expandSignIn, setExpandSignIn] = useState(false);

  const [signInMethod, setSignInMethod] = useState(0);

  //TEST Add logic to check to see if they have a username or not @auth UPDATE: I figured out how to delete persisted data, I have it defaulting to send them to the username page now. 

  let emailButton = () => {
    // f;
    setSignInMethod(1);
  };
  function googleButton() {

    const signInWithGoogle = async () => {

      try {
        await signInWithPopup(auth, googleAuthProvider).then((result) => {
          console.log(result.user.photoURL);
          // localStorage.setItem("userLocal", JSON.stringify(result.user));
          // dispatch(userNameRedux(username));
          dispatch(userUIDAction(result.user.uid));
          dispatch(userDisplayNameAction(result.user.displayName));
          dispatch(userPhotoAction(result.user.photoURL));
          if (!loggedIn) {
            dispatch(logIn(true));
            console.log("logged in");
          }

          if (userNameRedux) {
            router.push("/");
          } else {
            router.push("/signup#select-username");
          }

          toast("Welcome back!", {
            icon: "😀",
          });
        });
      } catch (error) {
        console.log(error);
      }

      // console.log(user);
    };

    signInWithGoogle();
  }

  let backArrow = () => {
    setSignInMethod(0);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 pb-[12rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

    "
    >
      <div className="relative w-full max-w-md px-10 pb-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl ">
        {signInMethod !== 0 ? (
          <FaChevronLeft
            onClick={backArrow}
            className="fixed cursor-pointer text-[24px]"
          />
        ) : null}
        {expandSignIn && (
          <button
            onClick={() => setExpandSignIn(!expandSignIn)}
            className="absolute left-0 flex items-center justify-center w-16 h-8 gap-4 px-2 text-4xl top-2 right-50 text-blues-500 rounded-3xl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
          >
            <FaLongArrowAltLeft />
          </button>
        )}
        <div className="flex flex-col items-center">
          <img
            src="/ii-palm.png"
            // src="/bulb.svg"

            alt="logo"
            className="mx-auto "
          />
          <div className="flex mt-1 text-3xl font-extrabold text-center text-gray-900">
            {expandSignIn ? (
              "Sign in to your account"
            ) : (
              <>
                <p>
                  Welcome to<span className="logo fre">&nbsp;ideaisland </span>!
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 pt-3">
           

            {expandSignIn ? (
              <button
                onClick={googleButton}
                className="w-[18em] h-12 rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
              >
                <div className="flex items-center w-8 h-8 bg-white rounded-xl">
                  <img src="/google.png" alt="google" />
                </div>
                Sign in with Google
              </button>
            ) : (
              <>
                {cookiePop ? (
                  <div>
                    <p className="text-center nun">
                      This website requires cookies to work properly. By
                      continuing you are agreeing to our use of necessary
                      cookies.
                    </p>
                    <Link href="/signup">
                      <a>
                        <div
                          className="flex items-center justify-center h-16 gap-4 px-12 text-2xl cursor-pointer text-pinks-50 rounded-3xl bg-t-bl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                          onClick={() => setCookiePop(!cookiePop)}
                        >
                          Accept and Continue
                          <FaArrowRight />
                        </div>
                      </a>
                    </Link>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center h-16 gap-4 px-12 text-2xl cursor-pointer text-pinks-50 rounded-3xl bg-t-pm drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                    onClick={() => setCookiePop(!cookiePop)}
                  >
                    Sign up
                    <FaUserPlus />
                  </div>
                )}

                {!cookiePop && (
                  <button
                    onClick={() => setExpandSignIn(!expandSignIn)}
                    className="flex items-center justify-center h-10 gap-4 px-12 text-2xl text-blues-50 rounded-3xl bg-t-bl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                  >
                    Sign in <FaSignInAlt />
                  </button>
                )}
              </>
            )}
          </div>
          {/* ) : null} */}
          {/* {signInMethod === 1 && emailForm} */}
        </div>
      </div>
      {/* <Enter /> */}
    </div>
  );
}
