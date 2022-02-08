import React from "react";
import { Switch, Disclosure } from "@headlessui/react";
import {
  IdentificationIcon,
  CalendarIcon,
  ChevronDownIcon,
  MailIcon,
  ChevronUpIcon,
  UserIcon,
} from "@heroicons/react/outline";

import ChatWindow from "./ChatWindow";
import { firestore } from "../../firebase-init";
import classNames from "../../classnames";

function ChatRow({ chat }) {
  const chatData = chat.data();

  const newestMessageCreatedAt = chatData.newestMessageCreatedAt
    ? new Date(chatData.newestMessageCreatedAt.seconds * 1000)
    : new Date();

  const handleChangeProcessed = async () => {
    try {
      const { doc, collection, updateDoc } = await import("firebase/firestore");
      if (!firestore) return;
      // Change the processed flag of a conversation with an user
      const chatUserRef = doc(collection(firestore, "chatUsers"), chat.id);
      await updateDoc(chatUserRef, {
        processed: !chatData.processed,
        email: chatData.email,
        newestMessageCreatedAt: chatData.newestMessageCreatedAt,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const { doc, collection, deleteDoc } = await import("firebase/firestore");
      if (!firestore) return;
      const chatUserRef = doc(collection(firestore, "chatUsers"), chat.id);

      await deleteDoc(chatUserRef);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Disclosure>
      {({ open }) => (
        <li className="z-10">
          <div
            className={classNames(
              "flex items-center",
              open && "border-b border-blues-400"
            )}
          >
            <div className="block flex-1 ">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center text-sm font-medium text-blues-600 truncate lowercase">
                        {chatData.email !== "Anonymous" ? (
                          <MailIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <UserIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        )}
                        {(chatData.email && chatData.email !== "Anonymous" && (
                          <a
                            className="underline"
                            href={`mailto:${chatData.email}`}
                          >
                            {chatData.email}
                          </a>
                        )) ||
                          "Anonymous"}
                      </p>
                    </div>
                    <div className="mt-2">
                      <div className="">
                        <p className="flex items-center text-xs sm:text-sm text-gray-500">
                          <IdentificationIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {chat.id}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-xs sm:text-sm text-gray-500">
                        <CalendarIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          {`Last message: ${newestMessageCreatedAt.toLocaleDateString(
                            undefined
                          )} at ${newestMessageCreatedAt.toLocaleTimeString(
                            undefined
                          )}
                           `}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-3 sm:mt-0 sm:ml-2 sm:flex-col justify-between flex-shrink-0 flex sm:items-stretch">
                      <Switch.Group as="div" className="flex items-center">
                        <Switch
                          checked={chatData.processed}
                          onChange={handleChangeProcessed}
                          className={classNames(
                            chatData.processed ? "bg-blues-600" : "bg-gray-200",
                            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              chatData.processed
                                ? "translate-x-5"
                                : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                            )}
                          />
                        </Switch>
                        <Switch.Label as="span" className="ml-3">
                          <span className="text-sm font-medium text-gray-900">
                            Processed
                          </span>
                        </Switch.Label>
                      </Switch.Group>

                      <button
                        onClick={handleDelete}
                        className="inline-flex items-center justify-center mt-0 sm:mt-2 px-4 py-1 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                      >
                        Delete chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Disclosure.Button className="p-2 mr-4 sm:mr-6 bg-blues-100 hover:bg-blues-200 rounded-full border border-blues-500">
              {open ? (
                <ChevronUpIcon className="w-5 h-5 text-blues-500" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-blues-500" />
              )}
            </Disclosure.Button>
          </div>
          <Disclosure.Panel className="overflow-hidden z-0 relative">
            <div className="px-4 pb-4 pt-1 sm:px-6 bg-blues-50 overflow-hidden">
              <ChatWindow chatUserId={chat.id} chatUserEmail={chatData.email} />
            </div>
          </Disclosure.Panel>
        </li>
      )}
    </Disclosure>
  );
}

export default ChatRow;
