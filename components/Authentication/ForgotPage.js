import { LightningBoltIcon } from "@heroicons/react/solid";
import { useRef, useState, useEffect } from "react";
import AuthError from "./AuthError";
import { sendPasswordResetEmail } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import Spinner from "../Spinner";
import { functions, auth } from "../firebase-init";

function ForgotPage() {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [errorAuth, setErrorAuth] = useState(undefined);

  // Clear Auth Errors on mount
  useEffect(() => () => setErrorAuth(undefined), []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      // If you want to send custom password reset email,
      // we will use a Cloud Function to send the email
      // with Postmark
      // if (process.env.NEXT_PUBLIC_SEND_CUSTOM_AUTH_EMAILS === "true") {
      //   const passwordReset = httpsCallable(
      //     functions,
      //     "callable-passwordReset"
      //   );
      //   await passwordReset({ email: emailRef.current.value });
      // } else {
      //   await sendPasswordResetEmail(auth, emailRef.current.value);
      // }

      setSuccessMessage(
        "Check your email inbox for further instructions to reset your password."
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorAuth({ errorCode: error?.code });
    }

    setLoading(false);
  }
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LightningBoltIcon className="w-auto h-20 mx-auto transform scale-y-110 sm:h-30 rotate-12 stroke-blues-500 text-blues-200" />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:px-10 sm:rounded-lg">
          {successMessage ? (
            <div className="text-center">
              <h3 className="text-sm font-medium text-green-600">
                {successMessage}
              </h3>
            </div>
          ) : (
            <>
              {errorAuth && (
                <AuthError
                  errorCode={errorAuth.errorCode}
                  customMessage={errorAuth.customMessage}
                />
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-base font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-3">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      ref={emailRef}
                      required
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-blues-400 focus:outline-none focus:ring-blues-400 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-blues-500 hover:bg-blues-600 focus:outline-none focus:ring-blues-400 focus:ring-offset-2 focus:ring-2"
                  >
                    {loading ? (
                      <Spinner className="w-5 h-5 text-white" />
                    ) : (
                      <span> Send password reset email</span>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPage;
