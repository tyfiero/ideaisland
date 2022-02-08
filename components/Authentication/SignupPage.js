import React, { useState, useEffect } from "react";
import shallow from "zustand/shallow";
import useStore from "../StateManagement";
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
import Link from "next/link";
import { auth } from "../firebase-init";
import collectAnalyticsEvent from "../Analytics/collectAnalyticsEvent";

function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAuth, setErrorAuth] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { user, set } = useStore(
    (state) => ({
      user: state.user,
      set: state.set,
    }),
    shallow
  );

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
      router.push("/getting-started");
    } catch (error) {
      console.log(error);
      setErrorAuth({ errorCode: error?.code });
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4 pb-[12rem] sm:px-6 lg:px-8 drop-shadow-xl ">
      <div className="w-full max-w-md p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl ">
        <div>
        <img  src="/bulb.svg" alt="logo" className="w-auto h-20 mx-auto sm:h-30" />
          {/* <LightningBoltIcon className="w-auto h-20 mx-auto transform scale-y-110 sm:h-30 rotate-12 stroke-blues-500 text-blues-200" /> */}
          <h2 className="mt-1 text-3xl font-extrabold text-center text-gray-900">
            Welcome to IdeaIsland!
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin} action="">
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
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-xl group bg-blues-500 hover:bg-blues-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500"
          >
            
            {loading ? (
              <Spinner className="w-5 h-5 text-white" />
            ) : (
              <span>Sign Up</span>
            )}
          </button>
          <p className="mt-2 text-center text-gray-600 text-md">
            Or{" "}
            <Link href="/login">
              <a className="font-medium text-blues-600 hover:text-blues-500">
                sign in to your account
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
