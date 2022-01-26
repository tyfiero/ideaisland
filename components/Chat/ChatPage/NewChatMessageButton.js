import React, { useState, useRef } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import useStore from "../../StateManagement";
import Spinner from "../../Spinner";
import { firestore, functions } from "../../firebase-init";

import { httpsCallable } from "firebase/functions";
import {
  doc,
  collection,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { CheckIcon } from "@heroicons/react/outline";

function NewChatMessageButton({ isMobile }) {
  const buttonClassNames = isMobile
    ? "sm:hidden relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blues-600 hover:bg-blues-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500"
    : "relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blues-600 hover:bg-blues-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500";
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const user = useStore((state) => state.user);
  const [success, setSuccess] = useState(false);
  const [userNotExists, setUserNotExists] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const messageInputRef = useRef();
  const userUIDRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showSpinner) return;
    setShowSpinner(true);
    try {
      const checkUserExists = httpsCallable(
        functions,
        "callable-checkUserExists"
      );
      const chatUserUID = userUIDRef.current.value;
      const resultCheckUserExists = await checkUserExists({
        userUID: chatUserUID,
      });
      if (resultCheckUserExists?.data?.userExists === false) {
        //   the user does not exists
        setUserNotExists(true);
      }
      // we add a message and update the user message collection at once

      if (!firestore) return;
      const batchWrite = writeBatch(firestore);
      const chatUserRef = doc(collection(firestore, "chatUsers"), chatUserUID);

      // new chat message document ref
      const newMessageRef = doc(collection(chatUserRef, "chatMessages"));

      // add the chat message to the batchWrite
      batchWrite.set(newMessageRef, {
        customerEmail: resultCheckUserExists?.data?.userEmail || "Anonymous",
        message: messageInputRef.current.value,
        reply: user.uid,
        unread: true,
        createdAt: serverTimestamp(),
      });

      batchWrite.set(chatUserRef, {
        processed: false,
        email: resultCheckUserExists?.data?.userEmail || "Anonymous",
        newestMessageCreatedAt: serverTimestamp(),
      });
      // execute the batch write
      await batchWrite.commit();

      setShowSpinner(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setShowSpinner(false);
      setSuccess(false);
    }
  };

  return (
    <Popover className="relative">
      <Popover.Button ref={setReferenceElement} className={buttonClassNames}>
        Create new chat
      </Popover.Button>
      <Popover.Panel
        className="absolute z-10 bg-white max-w-xs sm:max-w-sm w-screen rounded-xl overflow-hidden shadow"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {success === false ? (
          <div className=" ">
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3">
                      <label
                        htmlFor="user-uid"
                        className="block text-sm font-medium text-gray-700"
                      >
                        User UID
                      </label>
                      <input
                        ref={userUIDRef}
                        required
                        type="text"
                        disabled={showSpinner}
                        onChange={() => setUserNotExists(false)}
                        name="user-uid"
                        id="user-uid"
                        className="mt-1 focus:ring-blues-500 focus:border-blues-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {userNotExists && (
                        <p className="text-red-500 text-sm font-medium mt-1">
                          The user does not exists.
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="messageInput"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="messageInput"
                        name="messageInput"
                        ref={messageInputRef}
                        required
                        disabled={showSpinner}
                        rows={3}
                        className="shadow-sm focus:ring-blues-500 focus:border-blues-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Write your message here..."
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={showSpinner}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blues-600 hover:bg-blues-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500"
                  >
                    {showSpinner ? (
                      <Spinner className="h-6 w-6 text-white" />
                    ) : (
                      <p>Send</p>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="flex justify-center flex-col">
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center  text-white bg-green-500  rounded-full p-2 ">
                  <CheckIcon className="h-6 w-6" />
                </div>
              </div>
              <div className="text-center mt-3 text-gray-700">
                Message successfully sent!
              </div>
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
}

export default NewChatMessageButton;
