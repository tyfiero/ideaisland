import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/solid";
import { signInWithEmailAndPassword, deleteUser } from "firebase/auth";

import { auth } from "../../firebase-init";
import useStore from "../../StateManagement";
import Spinner from "../../Spinner";
import AuthError from "../../Authentication/AuthError";
import router from "next/router";

function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const passwordRef = useRef();

  const user = useStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    //Clear the error on page load
    setAuthError(undefined);
  }, []);

  const handleAccountDeletion = (e) => {
    e.preventDefault();
    const email = user.email;
    const password = passwordRef.current.value;
    if (password.length < 6) {
      setAuthError({
        errorCode: "custom",
        customMessage: "Please enter a password with six character or more",
      });
      return;
    }
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(function (userCredential) {
        deleteUser(userCredential.user)
          .then(function () {
            // user sucessfully deleted
            // we will forward to the account deletion page
            router.push("/account-deletion");
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
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <form onSubmit={handleAccountDeletion}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Delete account
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete your account? All
                              of your data will be permanently removed. This
                              action cannot be undone.
                            </p>
                          </div>
                          <div className="mt-4">
                            <label
                              htmlFor="new-password-repeat"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Confirm your password
                            </label>
                            <input
                              type="password"
                              ref={passwordRef}
                              name="password"
                              id="password"
                              className="mt-1 focus:ring-lightning-500 focus:border-lightning-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          {authError && (
                            <div className="mt-2">
                              <AuthError
                                errorCode={authError.errorCode}
                                customMessage={authError.customMessage}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      {user?.email ? ( // if the user is not anonymous, we show the button to change the password
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {isLoading ? (
                            <Spinner className="w-5 h-5" />
                          ) : (
                            "Delete account"
                          )}
                        </button>
                      ) : (
                        <div className="w-full sm:ml-8 sm:w-auto sm:text-sm text-center inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-300  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightning-500">
                          Account deletion not possible as an anonymous user
                        </div>
                      )}

                      <button
                        type="button"
                        className="mt-3 w-full items-center inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightning-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setOpen(true)}
        >
          <ExclamationIcon className="w-5 h-5 mr-3" />
          Delete your account
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
