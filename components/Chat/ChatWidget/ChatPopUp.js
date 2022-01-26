import { useState, useRef, useEffect } from "react";

import { ExclamationIcon } from "@heroicons/react/solid";

import Spinner from "../../Spinner";
import { auth, firestore } from "../../firebase-init";

import {
  PaperAirplaneIcon,
  MailIcon,
  LightBulbIcon,
  BeakerIcon,
  SupportIcon,
} from "@heroicons/react/outline";
import shallow from "zustand/shallow";
import {
  query,
  doc,
  collection,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";

import useStore from "../../StateManagement";
import Linkifier from "../Linkifier/Linkifier";
import classNames from "../../classnames";

const hints = [
  {
    name: "Feature request",
    description: "Tell us what is missing!",
    icon: <BeakerIcon className="w-4 h-4" />,
  },
  {
    name: "Bug",
    description: "What went wrong?",
    icon: <ExclamationIcon className="w-4 h-4" />,
  },
  {
    name: "Feedback",
    description: "What can be improved?",
    icon: <LightBulbIcon className="w-4 h-4" />,
  },
  {
    name: "Support",
    description: "How can we help?",
    icon: <SupportIcon className="w-4 h-4" />,
  },
];

function ChatPopUp() {
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [showSpinner, setShowSpinner] = useState(false);
  const [queryLimit, setQueryLimit] = useState(20);
  const [skipScroll, setSkipScroll] = useState(false);

  const { user, set } = useStore(
    (state) => ({
      user: state.user,
      set: state.set,
    }),
    shallow
  );

  useEffect(() => {
    // return early if auth is not yet defined
    if (!auth) return;
    // We will generate an anonymous user
    // if there is no signed in user (with email/password)
    const isAuthenticatedUser = user && user.email;
    if (isAuthenticatedUser) return;
    import("firebase/auth").then(({ signInAnonymously }) => {
      signInAnonymously(auth);
    });
  }, [user]);

  const refEmail = useRef();
  const refTextInput = useRef();

  const [messages, setMessages] = useState(undefined);
  useEffect(() => {
    try {
      if (!firestore) return;

      // Create and execute the query when there is a logged in user
      const querySignedInUser =
        user && firestore
          ? query(
              collection(firestore, "chatUsers", user.uid, "chatMessages"),
              orderBy("createdAt", "desc"),
              limit(queryLimit)
            )
          : null;
      // One of the queries must be valid
      if (querySignedInUser === null) return;
      const unsubscribe = onSnapshot(querySignedInUser, (querySnapshot) => {
        setMessages(querySnapshot);
        // We will mark the unread messages as read in one
        // batch transaction
        try {
          const batchWrite = writeBatch(firestore);

          querySnapshot.docs.forEach((message) => {
            if (message.data().unread === true) {
              // If the message is unread, we update the message unread field
              // as the user has seen the message
              const chatUserRef = collection(
                firestore,
                "chatUsers",
                user.uid,
                "chatMessages"
              );

              const messageRef = doc(chatUserRef, message.id);

              batchWrite.update(messageRef, {
                unread: false,
              });
            }
          });
          batchWrite.commit();
          // we then set the unread message counter to zero
          // this will update the badge on the chat icon
          set((state) => {
            state.unreadChatMessage = 0;
          });
        } catch (error) {
          console.log(error);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [user, queryLimit, set]);

  const messagesEndRef = useRef();
  const firstReloadedRef = useRef();

  useEffect(() => {
    const scrollToTop = () => {
      firstReloadedRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    if (skipScroll) {
      setSkipScroll(false);
      scrollToTop();
      return;
    }
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // disable submit function while loading
    if (showSpinner) return;
    setShowSpinner(true);

    try {
      if (!firestore) return;
      const isAuthenticatedUser = user && user.email;

      // we add a message and update the user message collection at once

      const batchWrite = writeBatch(firestore);
      const chatUserRef = doc(collection(firestore, "chatUsers"), user.uid);

      // new chat message document ref
      const newMessageRef = doc(collection(chatUserRef, "chatMessages"));

      // add the chat message to the batchWrite
      const email =
        (isAuthenticatedUser && user.email) ||
        refEmail?.current?.value ||
        "Anonymous";
      batchWrite.set(newMessageRef, {
        customerEmail: email,
        message: refTextInput.current.value,
        createdAt: serverTimestamp(),
      });

      batchWrite.set(chatUserRef, {
        newestMessageCreatedAt: serverTimestamp(),
        email: email,
        processed: false,
      });
      // execute the batch write
      await batchWrite.commit();

      refTextInput.current.value = "";
      setSelectedOption("vanish");

      setShowSpinner(false);
    } catch (error) {
      console.log(error);
      setShowSpinner(false);
    }
  };
  return (
    <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-lightning-500 ring-opacity-50 bg-white">
      <div className="relative bg-white">
        {!selectedOption && (
          <div className="grid sm:grid-cols-2 gap-x-2 px-3 my-2">
            {hints.map((item) => (
              <button
                key={item.name}
                onClick={() =>
                  setSelectedOption(`👋   Hi! ${item.description}`)
                }
                className="flex items-center bg-lightning-200 p-1 my-1 transition duration-150 ease-in-out rounded-3xl hover:bg-lightning-300 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
              >
                <div className="bg-lightning-500 rounded-full p-1 ">
                  <div className="flex items-center justify-center flex-shrink-0  text-white ">
                    {item.icon}
                  </div>
                </div>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="px-3 my-3 flex flex-col-reverse text-sm font-medium text-gray-700 overflow-scroll max-h-56 sm:max-h-72 min-h-[150px] sm:min-h-[200px]">
          {user && messages && (
            <>
              <div ref={messagesEndRef} />
              <Linkifier
                renderer={({ href, children }) => (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                    href={href}
                  >
                    {children}
                  </a>
                )}
              >
                {messages.docs.map((messageItem, index) => {
                  const messageData = messageItem.data();
                  if (
                    index === 0 &&
                    messageData.customerEmail !== "Anonymous"
                  ) {
                    // Set the value of the email ref to the email
                    // of the last sent message
                    if (refEmail.current) {
                      refEmail.current.value = messageData.customerEmail;
                    }
                  }
                  return (
                    <div
                      ref={
                        index === queryLimit - 20 + 1 ? firstReloadedRef : null
                      }
                      key={messageItem.id}
                      className={classNames(
                        "mx-3 px-3 py-1 my-1 rounded-xl text-sm text-gray-900 whitespace-pre-wrap",
                        messageData.reply
                          ? "self-start bg-blue-50"
                          : "self-end bg-lightning-100"
                      )}
                      style={{ maxWidth: "80%" }}
                    >
                      {messageData.message}
                    </div>
                  );
                })}
              </Linkifier>
              {messages.size === queryLimit && (
                <button
                  onClick={() => {
                    setSkipScroll(true);
                    setQueryLimit(queryLimit + 20);
                  }}
                  className="self-center bg-lightning-500 hover:bg-lightning-600 px-3 py-1 my-1 rounded-xl text-sm text-white"
                >
                  Load older messages
                </button>
              )}
            </>
          )}
        </div>
        {selectedOption && selectedOption !== "vanish" && (
          <div className="px-3 my-3 flex flex-col-reverse text-sm font-medium text-gray-700 overflow-scroll max-h-56 sm:max-h-72">
            <div
              className="px-3 py-1 my-1 rounded-xl text-sm text-gray-900 whitespace-pre-wrap
              self-start bg-blue-50"
              style={{ maxWidth: "80%" }}
            >
              {selectedOption}
            </div>
          </div>
        )}
        {/* If there is an user but it is an anonymous user as no email is present we show
                an email input field
            */}
        {!user?.email && (
          <div className="mx-3 mb-4 mt-6">
            <div className="flex justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <span className="text-sm text-gray-500" id="email-optional">
                Optional
              </span>
            </div>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="email"
                ref={refEmail}
                name="email"
                id="email"
                className="focus:ring-lightning-500 focus:border-lightning-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="you@example.com"
              />
            </div>
          </div>
        )}
        <form
          className="border-t-2 p-2 border-lightning-300 relative"
          onSubmit={handleSubmit}
        >
          <textarea
            className=" whitespace-pre-wrap break-words w-full text-sm h-auto text-gray-900 pr-16 resize-none focus:ring-0 leading-5 border-none focus:outline-none"
            placeholder="Send us a message..."
            aria-label="Send us a message..."
            style={{ minHeight: "56px", maxHeight: "200px" }}
            required
            disabled={showSpinner}
            ref={refTextInput}
          />
          <button
            type="submit"
            aria-label="Send message"
            className="absolute right-7 top-4 p-2 bg-lightning-500 hover:bg-lightning-600 rounded-full"
          >
            {showSpinner ? (
              <Spinner className="h-6 w-6 text-white" />
            ) : (
              <PaperAirplaneIcon className="h-6 w-6 transform rotate-45 text-white translate-x-0.5 -translate-y-0.5  " />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPopUp;
