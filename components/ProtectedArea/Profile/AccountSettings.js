import Link from "next/link";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import useStore from "../../StateManagement";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../Spinner";
import AuthError from "../../Authentication/AuthError";
import toast from "react-hot-toast";
import Toaster from "../../Toaster";
import { auth } from "../../firebase-init";

function AccountSettings() {
  const user = useStore((state) => state.user);
  const newPasswordRef = useRef();
  const newPasswordRepetitionRef = useRef();
  const oldPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    //Clear the error on page load
    setAuthError(undefined);
  }, []);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const email = user.email;
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const newPasswordRepeated = newPasswordRepetitionRef.current.value;
    if (newPassword.length < 6) {
      setAuthError({
        errorCode: "custom",
        customMessage: "Please enter a password with six character or more.",
      });
      return;
    }
    if (newPassword !== newPasswordRepeated) {
      setAuthError({
        errorCode: "custom",
        customMessage: "The new passwords do not match.",
      });
      return;
    }
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, oldPassword)
      .then(function (userCredential) {
        updatePassword(userCredential.user, newPassword)
          .then(function () {
            setIsLoading(false);
            toast.success("Password successfully updated.", { duration: 4000 });
            oldPasswordRef.current.value = "";
            newPasswordRef.current.value = "";
            newPasswordRepetitionRef.current.value = "";
            setAuthError(undefined);
          })
          .catch(function (error) {
            console.log(error);
            setAuthError({ errorCode: error?.code });
            setIsLoading(false);
          });
      })
      .catch(function (error) {
        console.log(error);
        setAuthError({ errorCode: error?.code });

        setIsLoading(false);
      });
  };
  return (
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Account security
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Change your password here.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handlePasswordChange}>
              <div className="shadow overflow-hidden rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="old-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Old password
                      </label>
                      <input
                        type="password"
                        ref={oldPasswordRef}
                        name="old-password"
                        id="old-password"
                        required
                        className="mt-1 focus:ring-lightning-500 focus:border-lightning-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="new-password"
                        required
                        className="block text-sm font-medium text-gray-700"
                      >
                        New password
                      </label>
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        ref={newPasswordRef}
                        required
                        className="mt-1 focus:ring-lightning-500 focus:border-lightning-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="new-password-repeat"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm new password
                      </label>
                      <input
                        type="password"
                        ref={newPasswordRepetitionRef}
                        name="new-password-repeat"
                        id="new-password-repeat"
                        className="mt-1 focus:ring-lightning-500 focus:border-lightning-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6">
                      <div className="text-sm">
                        <Link href="/forgot">
                          <a className="font-medium text-lightning-500 hover:text-lightning-600 hover:underline">
                            Forgot your password?
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {authError && (
                  <div className="px-4">
                    <AuthError
                      errorCode={authError.errorCode}
                      customMessage={authError.customMessage}
                    />
                  </div>
                )}
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  {user?.email ? ( // if the user is not anonymous, we show the button to change the password
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lightning-600 hover:bg-lightning-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightning-500"
                    >
                      {isLoading ? (
                        <Spinner className="w-5 h-5" />
                      ) : (
                        "Change password"
                      )}
                    </button>
                  ) : (
                    <div className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-300  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightning-500">
                      Action not possible as an anonymous user
                    </div>
                  )}
                </div>
              </div>
              <Toaster />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
