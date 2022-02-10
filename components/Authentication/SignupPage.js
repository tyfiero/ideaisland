import React, { useState, useEffect, useContext } from "react";
// import shallow from "zustand/shallow";
// import useStore from "../StateManagement";
import {
  signOut,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
// import { LightningBoltIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import AuthError from "./AuthError";
import Spinner from "../Spinner";
import { FaEnvelope, FaChevronLeft } from "react-icons/fa";

import Link from "next/link";
// import { auth } from "../../OLD/oldComponents/firebase-init";
import { auth, googleAuthProvider } from "../../lib/firebase";
import collectAnalyticsEvent from "../../OLD/oldComponents/Analytics/collectAnalyticsEvent";
import { UserContext } from "../../lib/context";




export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const [signUpMethod, setSignUpMethod] = useState(0);

  function googleButton() {
    console.log("googlebutton clicked");


  const signInWithGoogle = async () => {
    console.log("tried");

    try {
      await auth.signInWithPopup(googleAuthProvider);
      await setSignUpMethod(2);
      await router.push("/usernameform");
       
    } catch (error) {
      console.log(error);
    }
  };

  signInWithGoogle();
}



let backArrow = () => {
  setSignUpMethod(0);
};


let emailButton = () => {
  setSignUpMethod(1);
};

  useEffect(() => {
    //Clear the error on page load
    setErrorAuth(undefined);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorAuth(undefined);

    if (email === "") {
      setErrorAuth({
        errorCode: "custom",
        customMessage: "Please enter an email address",
      });
      setLoading(false);
      return;
    }
    if (password === "") {
      setErrorAuth({
        errorCode: "custom",
        customMessage: "Please enter a password",
      });
      setLoading(false);

      return;
    }
    if (password.length < 6) {
      setErrorAuth({
        errorCode: "custom",
        customMessage: "Please enter a password with six character or more",
      });
      setLoading(false);

      return;
    }
    try {
      const isAnonymousUser = user && !user.email;
      const isNormalUser = user && user.email;
      if (isNormalUser) {
        // If we have a user signed in that has a normal account
        // we sign them out and create a new user
        await signOut(auth);
        await createUserWithEmailAndPassword(auth, email, password);
      } else if (isAnonymousUser) {
        // If the current user is anonymous, we will convert the
        // user into a normal account with username/password auth
        const credential = EmailAuthProvider.credential(email, password);
        const linkedUser = await linkWithCredential(
          auth.currentUser,
          credential
        );
        if (linkedUser?.user) {
          set((state) => {
            state.user = linkedUser.user;
          });
        }
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setLoading(false);
      collectAnalyticsEvent({
        eventName: "signup_action_emailpassword",
      });
      router.push("/usernameform");
    } catch (error) {
      console.log(error);
      setErrorAuth({ errorCode: error?.code });
      setLoading(false);
    }
  };



  let emailForm = ( <form className="mt-8 space-y-6" onSubmit={handleLogin} action="">
  {errorAuth && (
    <AuthError
      errorCode={errorAuth.errorCode}
      customMessage={errorAuth.customMessage}
    />
  )}

  <input type="hidden" name="remember" defaultValue="true" />
  <div className="-space-y-px rounded-md shadow-sm">
    <div>
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        id="email-address"
        name="email"
        type="email"
        autoComplete="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-blues-500 focus:border-blues-500 focus:z-10 sm:text-sm"
        placeholder="Email address"
      />
    </div>
    <div>
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        required
        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-blues-500 focus:border-blues-500 focus:z-10 sm:text-sm"
        placeholder="Password"
      />
    </div>
  </div>

  <button
    type="submit"
    disabled={loading}
    onClick={handleLogin}
    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-xl group bg-blues-500 hover:bg-blues-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500 md:hover:scale-105 md:transition-transform md:active:scale-95"
  >
    
    {loading ? (
      <Spinner className="w-5 h-5 text-white" />
    ) : (
      <span>Sign Up</span>
    )}
  </button>
  
</form>)



  return (
    <div className="flex items-center justify-center min-h-screen px-4 pb-[12rem] sm:px-6 lg:px-8 drop-shadow-xl ">
      <div className="w-full max-w-md p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl ">
      {signUpMethod !== 0 ? (
          <FaChevronLeft
            onClick={backArrow}
            className="fixed cursor-pointer text-[24px]"
          />
        ) : null}
        <div>
        <img  src="/bulb.svg" alt="logo" className="w-auto h-20 mx-auto sm:h-30" />
          {/* <LightningBoltIcon className="w-auto h-20 mx-auto transform scale-y-110 sm:h-30 rotate-12 stroke-blues-500 text-blues-200" /> */}
          <h2 className="mt-1 text-3xl font-extrabold text-center text-gray-900">
            Welcome to IdeaIsland!
          </h2>
        </div>
        {signUpMethod === 0 ? (
            <div className="flex flex-col items-center gap-2 pt-3">
              
              <button
                onClick={emailButton}
                className="w-[18em] h-12 rounded-3xl bg-t-pm flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
              >
                <FaEnvelope className="text-[28px]  text-white" /> Sign up with
                Email
              </button>
              <button
                onClick={googleButton}
                className="w-[18em] h-12 rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
              >
                <div className="flex items-center w-8 h-8 bg-white rounded-xl">
                  <img src="/google.png" alt="google" />
                </div>
                Sign up with Google
              </button>
              <p className="mt-10">Have an account?</p>
              <Link href="/login">
              <a>
              <button
                onClick={emailButton}
                className="w-[10em] h-8 rounded-3xl bg-t-pl flex items-center justify-center text-black  flex-col drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95"
              >
                 <p>Sign in </p> 
              </button>
              </a>
              </Link>
            </div>
          ) : null}
          {signUpMethod === 1 && emailForm}

      </div>
    </div>
  );
}

