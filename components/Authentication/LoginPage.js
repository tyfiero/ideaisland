import { useState, useRef, useEffect, useContext } from "react";

import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import AuthError from "./AuthError";
// import Spinner from "../Spinner";
import Link from "next/link";
// import useStore from "../StateManagement";

import { FaEnvelope, FaChevronLeft, FaSignInAlt, FaUserPlus, FaArrowLeft, FaLongArrowAltLeft, FaArrowRight } from "react-icons/fa";
// import { UserContext } from "../../lib/context";
// import { auth, googleAuthProvider } from "../../lib/firebase";
// import { useContext } from 'react';
// import { UserContext } from '../../lib/context';
import { auth, googleAuthProvider } from "../../lib/firebase";
// import Enter from "./UsernameForm";
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
  // const userRedux = useSelector((state) => state.userData);
  const userNameRedux = useSelector((state) => state.userName);

  const dispatch = useDispatch();

  // const { user, username } = useContext(UserContext);

  const rememberMeRef = useRef();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [cookiePop, setCookiePop] = useState(false);

  const [expandSignIn, setExpandSignIn] = useState(false);

  const [signInMethod, setSignInMethod] = useState(0);

  //TEST Add logic to check to see if they have a username or not @auth UPDATE: I figured out how to delete persisted data, I have it defaulting to send them to the username page now. TEST IT

  let emailButton = () => {
    // f;
    setSignInMethod(1);
  };
  function googleButton() {
    // setSignInMethod(2);
    // console.log("googlebutton clicked");

    // console.log(auth.signInWithPopup);

    const signInWithGoogle = async () => {
      // console.log("tried");
      // console.log(user);

      try {
        await signInWithPopup(auth, googleAuthProvider).then((result) => {
          console.log(result.user.photoURL);
          // console.log(result.user);
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

  //old google sign in
  // function googleButton() {
  //   // setSignInMethod(2);
  //   console.log("googlebutton clicked");

  //   // console.log(auth.signInWithPopup);

  //   const signInWithGoogle = async () => {
  //     // console.log("tried");
  //     // console.log(user);

  //

  //   signInWithGoogle();
  // }
  let backArrow = () => {
    setSignInMethod(0);
  };

  // //from template for email
  // useEffect(() => {
  //   // Route the user to the password reset page
  //   if (router.query?.mode === "resetPassword") {
  //     router.push({ pathname: "/reset", query: router.query });
  //     return;
  //   }
  //   // If the user is already logged in, we redirect to the protected area.
  //   // Only redirect for users that have an email. Otherwise, it is an
  //   // anonymous user
  //   if (user && user.email) {
  //     // store the user in localStorage
  //     //  localStorage.setItem('userDataLocal', user)

  //     // Get return url from query parameters or default to sending the
  //     // authenticated user to the protected area.
  //     const returnUrl = router.query.returnUrl || "/";
  //     router.push(returnUrl);
  //     return;
  //   } else if (user && router?.query?.returnUrl) {
  //     // Is anonymous user and a returnUrl is present
  //     // then we push the anonymous user through
  //     const returnUrl = router.query.returnUrl;
  //     router.push(returnUrl);
  //     return;
  //   }

  //   // Clear the error on page load
  //   setErrorAuth(undefined);
  // }, [user, router]);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorAuth(undefined);

  //   if (email === "") {
  //     setErrorAuth({
  //       errorCode: "custom",
  //       customMessage: "Please enter an email address",
  //     });
  //     setLoading(false);
  //     return;
  //   }
  //   if (password === "") {
  //     setErrorAuth({
  //       errorCode: "custom",
  //       customMessage: "Please enter a password",
  //     });
  //     setLoading(false);

  //     return;
  //   }
  //   if (password.length < 6) {
  //     setErrorAuth({
  //       errorCode: "custom",
  //       customMessage: "Please enter a password with six characters or more",
  //     });
  //     setLoading(false);

  //     return;
  //   }
  //   try {
  //     const {
  //       signOut,
  //       signInWithEmailAndPassword,
  //       setPersistence,
  //       browserSessionPersistence,
  //       browserLocalPersistence,
  //     } = await import("firebase/auth");
  //     await signOut(auth);
  //     await setPersistence(
  //       auth,
  //       rememberMeRef.current.checked
  //         ? browserLocalPersistence
  //         : browserSessionPersistence
  //     );
  //     await signInWithEmailAndPassword(auth, email, password);

  //     // Get return url from query parameters or default to sending the
  //     // authenticated user to the protected area.
  //     const returnUrl = router.query.returnUrl || "/";
  //     router.push(returnUrl);
  //   } catch (error) {
  //     console.log(error);
  //     setErrorAuth({ errorCode: error?.code });
  //     setLoading(false);
  //   }
  // };

  // let emailForm = (
  //   <form className="mt-8 space-y-6" onSubmit={handleLogin} action="">
  //     {errorAuth && (
  //       <AuthError
  //         errorCode={errorAuth.errorCode}
  //         customMessage={errorAuth.customMessage}
  //       />
  //     )}

  //     <input type="hidden" name="remember" defaultValue="true" />
  //     <div className="-space-y-px rounded-md shadow-sm">
  //       <div>
  //         <label htmlFor="email-address" className="sr-only">
  //           Email address
  //         </label>
  //         <input
  //           id="email-address"
  //           name="email"
  //           type="email"
  //           autoComplete="email"
  //           required
  //           onChange={(e) => setEmail(e.target.value)}
  //           className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-blues-500 focus:border-blues-500 focus:z-10 sm:text-sm"
  //           placeholder="Email address"
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="password" className="sr-only">
  //           Password
  //         </label>
  //         <input
  //           id="password"
  //           name="password"
  //           type="password"
  //           autoComplete="current-password"
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //           className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-blues-500 focus:border-blues-500 focus:z-10 sm:text-sm"
  //           placeholder="Password"
  //         />
  //       </div>
  //     </div>

  //     <div className="flex items-center justify-between">
  //       <div className="flex items-center">
  //         <input
  //           id="remember-me"
  //           name="remember-me"
  //           type="checkbox"
  //           ref={rememberMeRef}
  //           className="w-4 h-4 border-gray-300 rounded text-blues-600 focus:ring-blues-500"
  //         />
  //         <label
  //           htmlFor="remember-me"
  //           className="block ml-2 text-sm text-gray-900"
  //         >
  //           Remember me
  //         </label>
  //       </div>

  //       <div className="text-sm text-right">
  //         <Link href="/forgot">
  //           <a className="font-medium text-blues-600 hover:text-blues-500">
  //             Forgot your password?
  //           </a>
  //         </Link>
  //       </div>
  //     </div>

  //     <button
  //       type="submit"
  //       disabled={loading}
  //       onClick={handleLogin}
  //       className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-blues-600 hover:bg-blues-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500"
  //     >
  //       <span className="absolute inset-y-0 left-0 flex items-center pl-3">
  //         <LockClosedIcon
  //           className="w-5 h-5 text-blues-500 group-hover:text-blues-400"
  //           aria-hidden="true"
  //         />
  //       </span>
  //       {loading ? (
  //         <Spinner className="w-5 h-5 text-white" />
  //       ) : (
  //         <span>Sign in</span>
  //       )}
  //     </button>
  //   </form>
  // );
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
{expandSignIn && <button
                onClick={()=>setExpandSignIn(!expandSignIn)}
                className="absolute left-0 flex items-center justify-center w-16 h-8 gap-4 px-2 text-4xl top-2 right-50 text-blues-500 rounded-3xl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
              >
              
                 <FaLongArrowAltLeft/>
              </button>}
        <div className="flex flex-col items-center">
          <img
            src="/ii-palm.png"
            // src="/bulb.svg"

            alt="logo"
            className="mx-auto "
          />
          <div className="flex mt-1 text-3xl font-extrabold text-center text-gray-900">
          {expandSignIn ? ("Sign in to your account"):(<><p>Welcome to </p><p className="logo fre">&nbsp;ideaisland </p>!</>)}
          </div>

          {/* {signInMethod === 0 ? ( */}
            <div className="flex flex-col items-center gap-2 pt-3">
              {/* <button
                onClick={emailButton}
                className="w-[18em] h-12 rounded-3xl bg-t-pm flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
              >
                <FaEnvelope className="text-[28px]  text-white" /> Sign in with
                Email
              </button> */}
                
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
                {!cookiePop &&<button
                  onClick={()=>setExpandSignIn(!expandSignIn)}
                  className="flex items-center justify-center h-16 gap-4 px-12 text-2xl text-blues-50 rounded-3xl bg-t-bl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                >
                
                  Sign in <FaSignInAlt/>
                </button>}


                
                 


                  {cookiePop ? (<div><p className="text-center nun">This website requires cookies to work properly.  By continuing you are agreeing to our use of necessary cookies.</p>
                  <Link href="/signup">
                    <div className="flex items-center justify-center h-16 gap-4 px-12 text-2xl cursor-pointer text-pinks-50 rounded-3xl bg-t-bl drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                     onClick={()=>setCookiePop(!cookiePop)}>Accept and Continue<FaArrowRight/></div>
                  </Link></div>) : (<div className="flex items-center justify-center h-16 gap-4 px-12 text-2xl cursor-pointer text-pinks-50 rounded-3xl bg-t-pm drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
                     onClick={()=>setCookiePop(!cookiePop)}>Sign up<FaUserPlus/></div>)}
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
