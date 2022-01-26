import { LightningBoltIcon } from "@heroicons/react/solid";
import { useRef, useState, useEffect } from "react";
import AuthError from "./AuthError";
import Link from "next/link";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase-init";

import { useRouter } from "next/router";
import Spinner from "../Spinner";

function ResetPage() {
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [errorAuth, setErrorAuth] = useState(undefined);
  const router = useRouter();

  // Clear Auth Errors on mount
  useEffect(() => () => setErrorAuth(undefined), []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { oobCode } = router.query;
    if (!router.query) {
      setErrorAuth({
        errorCode: "custom",
        customMessage: "Missing the password reset code",
      });
      return;
    }
    try {
      setLoading(true);
      await verifyPasswordResetCode(auth, oobCode);
      await confirmPasswordReset(auth, oobCode, passwordRef.current.value);
      setSuccessMessage("Password successfully changed.");
    } catch (error) {
      console.log(error);
      setErrorAuth({ errorCode: error?.code });
      setLoading(false);
    }

    setLoading(false);
  }
  return (
    <div className="flex flex-col justify-center py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LightningBoltIcon className="mx-auto h-20 w-auto sm:h-30 transform rotate-12 scale-y-110 stroke-lightning-500 text-lightning-200" />
        <h2 className="mt-6 text-center text-gray-900 text-3xl font-extrabold">
          Reset your password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:px-10 sm:rounded-lg">
          {successMessage ? (
            <>
              <div className="text-center">
                <h3 className="text-green-600 text-sm font-medium">
                  {successMessage}
                </h3>
              </div>
              <Link href="/login">
                <a
                  disabled={loading}
                  className="flex justify-center mt-6 px-4 py-2 w-full text-white text-sm font-medium bg-lightning-500 hover:bg-lightning-600 border border-transparent rounded-md focus:outline-none shadow-sm focus:ring-lightning-400 focus:ring-offset-2 focus:ring-2"
                >
                  You can sign in with your new password now.
                </a>
              </Link>
            </>
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
                    htmlFor="password"
                    className="block text-gray-700 text-base font-medium"
                  >
                    Enter a new password
                  </label>
                  <div className="mt-3">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      ref={passwordRef}
                      required
                      placeholder="Password"
                      className="placeholder-gray-400 block px-3 py-2 w-full border border-gray-300 focus:border-lightning-400 rounded-md focus:outline-none shadow-sm appearance-none focus:ring-lightning-400 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center px-4 py-2 w-full text-white text-sm font-medium bg-lightning-500 hover:bg-lightning-600 border border-transparent rounded-md focus:outline-none shadow-sm focus:ring-lightning-400 focus:ring-offset-2 focus:ring-2"
                  >
                    {loading ? (
                      <Spinner className="w-5 h-5 text-white" />
                    ) : (
                      <span>Reset password</span>
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

export default ResetPage;
