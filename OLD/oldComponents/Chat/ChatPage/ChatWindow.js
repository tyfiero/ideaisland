import React, { useState, useRef, useEffect } from "react";
import useStore from "../../StateManagement";
import Spinner from "../../Spinner";

import {
  doc,
  collection,
  serverTimestamp,
  writeBatch,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebase-init";

import { PaperAirplaneIcon, CheckIcon } from "@heroicons/react/outline";
import Linkifier from "../Linkifier/Linkifier";
import classNames from "../../classnames";

function ChatWindow({ chatUserId, chatUserEmail }) {
  const user = useStore((state) => state.user);

  const [showSpinner, setShowSpinner] = useState(false);
  const [queryLimit, setQueryLimit] = useState(20);
  const [skipScroll, setSkipScroll] = useState(false);

  const [messages, setMessages] = useState(undefined);
  useEffect(() => {
    try {
      if (!firestore) return;
      // Only create and execute the query when there is a logged in user
      const q = user
        ? query(
            collection(firestore, "chatUsers", chatUserId, "chatMessages"),
            orderBy("createdAt", "desc"),
            limit(queryLimit)
          )
        : null;

      if (q === null) return;
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setMessages(querySnapshot);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [user, queryLimit, chatUserId]);

  const messagesEndRef = useRef();
  const firstReloadedRef = useRef();
  const refTextInput = useRef();

  useEffect(() => {
    // This effect gets executed, when there are new messages
    // and serves the purpose to scroll the scroll view to the
    // new message
    const scrollToTop = () => {
      firstReloadedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    };
    if (skipScroll) {
      setSkipScroll(false);
      scrollToTop();
      return;
    }
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
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
      // we add a message and update the user message collection at once

      if (!firestore) return;
      const batchWrite = writeBatch(firestore);
      const chatUserRef = doc(collection(firestore, "chatUsers"), chatUserId);

      // new chat message document ref
      const newMessageRef = doc(collection(chatUserRef, "chatMessages"));

      // add the chat message to the batchWrite
      batchWrite.set(newMessageRef, {
        customerEmail: chatUserEmail || "Anonymous",
        message: refTextInput.current.value,
        reply: user.uid,
        unread: true,
        createdAt: serverTimestamp(),
      });

      batchWrite.update(chatUserRef, {
        newestMessageCreatedAt: serverTimestamp(),
      });
      // execute the batch write
      await batchWrite.commit();

      refTextInput.current.value = "";

      setShowSpinner(false);
    } catch (error) {
      console.log(error);
      setShowSpinner(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="px-3 mb-3 flex flex-col-reverse text-sm font-medium text-gray-700 overflow-scroll max-h-56 sm:max-h-72"
        style={{ minHeight: "200px" }}
      >
        {user && messages && (
          <>
            <div ref={messagesEndRef} />
            {/* The Linkifier component will look for URLS and emails in the messages and formats them as links */}
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
                return (
                  <div
                    ref={
                      index === queryLimit - 20 + 1 ? firstReloadedRef : null
                    }
                    key={messageItem.id}
                    className={classNames(
                      "mx-3 px-3 py-1 my-1 rounded-xl text-sm text-gray-900 whitespace-pre-wrap relative",
                      messageData.reply
                        ? "self-end bg-blues-200"
                        : "self-start bg-blue-50"
                    )}
                    style={{ maxWidth: "80%" }}
                  >
                    {messageData.message}
                    {messageData.unread === false && (
                      <div className="absolute -bottom-1 -right-1 flex text-green-700">
                        <CheckIcon className="transform translate-x-2 w-3 h-3" />
                        <CheckIcon className="w-3 h-3" />
                      </div>
                    )}
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
                className="self-center bg-blues-500 hover:bg-blues-600 px-3 py-1 my-1 rounded-xl text-sm text-white"
              >
                Load older messages
              </button>
            )}
          </>
        )}
      </div>
      <form
        className="border-t-2 p-2 border-blues-300 relative"
        onSubmit={handleSubmit}
      >
        <textarea
          className="rounded-xl shadow py-4 whitespace-pre-wrap break-words w-full text-sm h-auto text-gray-900 pr-16 resize-none focus:ring-0 leading-5 border-none focus:outline-none"
          placeholder="Reply to the user..."
          aria-label="Reply to the user..."
          style={{ minHeight: "56px", maxHeight: "200px" }}
          required
          disabled={showSpinner}
          ref={refTextInput}
        />
        <button
          type="submit"
          disabled={showSpinner}
          className="absolute right-7 top-6 p-2 bg-blues-500 hover:bg-blues-600 rounded-full"
        >
          {showSpinner ? (
            <Spinner className="h-6 w-6 text-white" />
          ) : (
            <PaperAirplaneIcon className="h-6 w-6 transform rotate-45 text-white translate-x-0.5 -translate-y-0.5  " />
          )}
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
